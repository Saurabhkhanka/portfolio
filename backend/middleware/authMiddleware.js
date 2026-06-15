import jwt from "jsonwebtoken";

// Middleware to verify user session and CSRF token
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.cookies["__Secure-auth"] || req.cookies["auth-token"];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Access denied. Please log in."
            });
        }

        // Verify the JWT token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtErr) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or expired session. Please log in again."
            });
        }

        // CSRF verification for state-changing requests
        if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
            const csrfHeader = req.headers["x-csrf-token"];
            if (!csrfHeader || csrfHeader !== decoded.csrfToken) {
                // TODO(security): Log potential CSRF attack attempts securely
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: Security validation failed (CSRF mismatch)."
                });
            }
        }

        // Attach decoded user info to request
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in requireSignIn middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication"
        });
    }
};

// Middleware to verify admin permissions
export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Admin access restricted."
            });
        }
        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authorization verification"
        });
    }
};
