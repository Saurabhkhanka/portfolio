import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import userModel from "../models/userModel.js";
import activityLogModel from "../models/activityLogModel.js";

// Helper to configure email transporter
const getTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields (name, email, password) are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const existingUser = await userModel.findOne({ email: email.toLowerCase() });
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate 6-digit numeric OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

        let user = existingUser;
        if (user) {
            // Overwrite unverified user registration details
            user.name = name.trim();
            user.password = hashedPassword;
            user.otp = otp;
            user.otpExpires = otpExpires;
        } else {
            // Create a new unverified user record
            user = new userModel({
                name: name.trim(),
                email: email.toLowerCase(),
                password: hashedPassword,
                isVerified: false,
                otp,
                otpExpires
            });
        }
        await user.save();

        // ALWAYS print OTP in backend console during local development for fake email testing
        console.log(`\n========================================\n[OTP DEBUG] Register Email: ${email} | OTP: ${otp}\n========================================\n`);

        // Check if SMTP details exist
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const transporter = getTransporter();
                const mailOptions = {
                    from: `"Portfolio Auth" <${process.env.SMTP_USER}>`,
                    to: user.email,
                    subject: "Verify Your Portfolio Account Registration",
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #333; text-align: center;">Account Registration OTP</h2>
                            <p>Hello ${user.name},</p>
                            <p>Thank you for registering. Please use the following 6-digit verification code to complete your signup process:</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #28a745; background: #f8f9fa; padding: 10px 20px; border-radius: 5px; border: 1px dashed #28a745;">${otp}</span>
                            </div>
                            <p style="color: #666; font-size: 14px;">This OTP is valid for <strong>5 minutes</strong>. If you did not request this, you can safely ignore this email.</p>
                            <hr style="border: 0; border-top: 1px solid #eee;" />
                            <p style="font-size: 12px; color: #999; text-align: center;">Secure Portfolio System</p>
                        </div>
                    `
                };
                await transporter.sendMail(mailOptions);
                return res.status(200).json({
                    success: true,
                    message: "OTP sent successfully. Please check your email to verify."
                });
            } catch (mailError) {
                console.error("Mailer Error:", mailError);
                if (process.env.NODE_ENV !== "production") {
                    return res.status(200).json({
                        success: true,
                        message: "OTP generated successfully (Dev Fallback: check terminal console)."
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: "Failed to send email. Please verify your SMTP server configurations."
                });
            }
        } else {
            return res.status(200).json({
                success: true,
                message: "OTP generated successfully (Dev Mode: printed to server console)."
            });
        }

    } catch (error) {
        console.error("Error in registerController:", error);
        return res.status(500).json({ success: false, message: "Internal server error during registration" });
    }
};

export const verifyRegisterController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email and OTP are required" });
        }

        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ success: false, message: "Registration record not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "Account is already verified" });
        }

        // Verify OTP expiration
        if (user.otpExpires && new Date() > user.otpExpires) {
            return res.status(400).json({ success: false, message: "OTP has expired. Please register again to obtain a new code." });
        }

        // Match OTP
        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP code. Please try again." });
        }

        // Finalize verification and resolve role
        const adminEmails = (process.env.ADMIN_EMAILS || "")
            .toLowerCase()
            .split(",")
            .map(e => e.trim());
        const isEmailAdmin = adminEmails.includes(user.email.toLowerCase());

        user.isVerified = true;
        user.role = isEmailAdmin ? "admin" : "user";
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        // Generate CSRF token
        const csrfToken = crypto.randomBytes(32).toString("hex");

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role, csrfToken },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const isProd = process.env.NODE_ENV === "production";

        // Set cookies
        res.cookie("__Secure-auth", token, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("csrfToken", csrfToken, {
            secure: true,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Log login activity
        try {
            await new activityLogModel({
                userId: user._id,
                email: user.email,
                action: "login",
                ip: req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown",
                userAgent: req.headers["user-agent"] || "unknown"
            }).save();
        } catch (logErr) {
            console.error("Failed to save login activity log:", logErr);
        }

        return res.status(200).json({
            success: true,
            message: "Account verified and logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            csrfToken
        });

    } catch (error) {
        console.error("Error in verifyRegisterController:", error);
        return res.status(500).json({ success: false, message: "Internal server error during verification" });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user || !user.isVerified) {
            // Keep error generic for security reasons
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Compare password hashes
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate CSRF token
        const csrfToken = crypto.randomBytes(32).toString("hex");

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role, csrfToken },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const isProd = process.env.NODE_ENV === "production";

        // Set JWT and CSRF cookies
        res.cookie("__Secure-auth", token, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("csrfToken", csrfToken, {
            secure: true,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Log login activity
        try {
            await new activityLogModel({
                userId: user._id,
                email: user.email,
                action: "login",
                ip: req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown",
                userAgent: req.headers["user-agent"] || "unknown"
            }).save();
        } catch (logErr) {
            console.error("Failed to save login activity log:", logErr);
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            csrfToken
        });

    } catch (error) {
        console.error("Error in loginController:", error);
        return res.status(500).json({ success: false, message: "Internal server error during login" });
    }
};

export const logoutController = async (req, res) => {
    try {
        const isProd = process.env.NODE_ENV === "production";

        // Log logout activity
        if (req.user && req.user.userId) {
            try {
                const user = await userModel.findById(req.user.userId);
                if (user) {
                    await new activityLogModel({
                        userId: user._id,
                        email: user.email,
                        action: "logout",
                        ip: req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown",
                        userAgent: req.headers["user-agent"] || "unknown"
                    }).save();
                }
            } catch (logErr) {
                console.error("Failed to save logout activity log:", logErr);
            }
        }

        res.clearCookie("__Secure-auth", {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? "none" : "lax",
        });
        res.clearCookie("auth-token", {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
        });
        res.clearCookie("csrfToken", {
            secure: true,
            sameSite: isProd ? "none" : "lax",
        });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Error in logoutController:", error);
        return res.status(500).json({ success: false, message: "Internal server error during logout" });
    }
};

export const getMeController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userId);
        if (!user || !user.isVerified) {
            return res.status(404).json({ success: false, message: "User not found or unverified" });
        }
        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error in getMeController:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getActivityLogsController = async (req, res) => {
    try {
        const logs = await activityLogModel.find({}).sort({ createdAt: -1 }).limit(50);
        return res.status(200).json({
            success: true,
            logs
        });
    } catch (error) {
        console.error("Error in getActivityLogsController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching activity logs"
        });
    }
};

export const getUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error("Error in getUsersController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching users list"
        });
    }
};

export const uploadResumeController = async (req, res) => {
    try {
        const { resume } = req.body;
        if (!resume) {
            return res.status(400).json({
                success: false,
                message: "No resume file data provided."
            });
        }

        // Verify it is a valid base64 encoded PDF string
        if (!resume.startsWith("data:application/pdf;base64,")) {
            return res.status(400).json({
                success: false,
                message: "Invalid file format. Please upload a PDF file."
            });
        }

        // Extract the base64 data part
        const base64Data = resume.replace(/^data:application\/pdf;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        // Ensure the uploads directory exists
        const dirPath = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filePath = path.join(dirPath, "resume.pdf");
        fs.writeFileSync(filePath, buffer);

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully!"
        });
    } catch (error) {
        console.error("Error in uploadResumeController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during resume upload"
        });
    }
};

export const downloadResumeController = async (req, res) => {
    try {
        const filePath = path.join(process.cwd(), "uploads", "resume.pdf");
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: "Resume file not found. Admin needs to upload a resume first."
            });
        }
        
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="Saurabh_Singh_Khanka_Resume.pdf"');
        
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error("Error in downloadResumeController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during resume download"
        });
    }
};
