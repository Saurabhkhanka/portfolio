import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("messages"); // "messages", "users", "logs", or "resume"
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resumeBase64, setResumeBase64] = useState(null);
    const [fileName, setFileName] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [messagesRes, logsRes, usersRes] = await Promise.all([
                    axios.get("/api/v1/auth/clintInfo"),
                    axios.get("/api/v1/auth/activity-logs"),
                    axios.get("/api/v1/auth/users")
                ]);

                if (messagesRes.data.success) {
                    setMessages(messagesRes.data.messages || []);
                }
                if (logsRes.data.success) {
                    setLogs(logsRes.data.logs || []);
                }
                if (usersRes.data.success) {
                    setUsers(usersRes.data.users || []);
                }
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError(err.response?.data?.message || "Failed to load dashboard data. Access denied.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Helper to format user agent strings
    const formatUserAgent = (ua) => {
        if (!ua || ua === "unknown") return "Unknown Client";
        if (ua.includes("Chrome")) return "Google Chrome";
        if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
        if (ua.includes("Firefox")) return "Mozilla Firefox";
        if (ua.includes("Edge")) return "Microsoft Edge";
        return ua.split(" ")[0] || "Web Browser";
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== "application/pdf") {
            toast.error("Please upload a valid PDF file.");
            e.target.value = null;
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setResumeBase64(reader.result);
            setFileName(file.name);
        };
        reader.readAsDataURL(file);
    };

    const handleUploadResume = async (e) => {
        e.preventDefault();
        if (!resumeBase64) {
            toast.error("Please select a PDF file first.");
            return;
        }
        setUploading(true);
        try {
            const res = await axios.post("/api/v1/auth/resume/upload", { resume: resumeBase64 });
            if (res.data.success) {
                toast.success("Resume uploaded successfully!");
                setResumeBase64(null);
                setFileName("");
                const fileInput = document.getElementById("resume-input-field");
                if (fileInput) fileInput.value = "";
            } else {
                toast.error(res.data.message || "Failed to upload resume.");
            }
        } catch (err) {
            console.error("Resume upload error:", err);
            toast.error(err.response?.data?.message || "Failed to upload resume.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Layout>
            <div className="container py-5" style={{ minHeight: "75vh" }}>
                <div className="row mb-4">
                    <div className="col text-center">
                        <h2 className="fw-bold text-dark">Admin Dashboard</h2>
                        <p className="text-muted">Monitor contact form inquiries, registered profiles, and login audits.</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="row mb-4">
                    <div className="col-12">
                        <ul className="nav nav-pills justify-content-center bg-white p-2 rounded-4 shadow-sm border-0 gap-2 mx-auto" style={{ maxWidth: "600px" }}>
                            <li className="nav-item">
                                <button
                                    className={`nav-link px-3 py-2 rounded-3 fw-bold border-0 ${
                                        activeTab === "messages" ? "bg-primary text-white" : "text-muted bg-transparent"
                                    }`}
                                    onClick={() => setActiveTab("messages")}
                                >
                                    <i className="ri-mail-line me-1 align-middle"></i>
                                    Inquiries ({messages.length})
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link px-3 py-2 rounded-3 fw-bold border-0 ${
                                        activeTab === "users" ? "bg-primary text-white" : "text-muted bg-transparent"
                                    }`}
                                    onClick={() => setActiveTab("users")}
                                >
                                    <i className="ri-user-line me-1 align-middle"></i>
                                    Users ({users.length})
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link px-3 py-2 rounded-3 fw-bold border-0 ${
                                        activeTab === "logs" ? "bg-primary text-white" : "text-muted bg-transparent"
                                    }`}
                                    onClick={() => setActiveTab("logs")}
                                >
                                    <i className="ri-history-line me-1 align-middle"></i>
                                    Logins ({logs.length})
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link px-3 py-2 rounded-3 fw-bold border-0 ${
                                        activeTab === "resume" ? "bg-primary text-white" : "text-muted bg-transparent"
                                    }`}
                                    onClick={() => setActiveTab("resume")}
                                >
                                    <i className="ri-file-pdf-line me-1 align-middle"></i>
                                    Resume
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger shadow-sm rounded-3 text-center my-4" role="alert">
                        <i className="ri-error-warning-line me-2 fs-5 align-middle"></i>
                        {error}
                    </div>
                ) : activeTab === "messages" ? (
                    messages.length === 0 ? (
                        <div className="card shadow-sm border-0 text-center p-5 rounded-4 bg-white">
                            <p className="text-muted mb-0 fs-5">No client submissions found.</p>
                        </div>
                    ) : (
                        <div className="row g-3 animate-fade-in">
                            {messages.map((msg, index) => (
                                <div className="col-12" key={msg._id || index}>
                                    <div 
                                        className="card border-0 shadow-sm p-4 rounded-4" 
                                        style={{ 
                                            backgroundColor: index % 2 === 0 ? "#fdfdfd" : "#f5f9fc",
                                            borderLeft: `5px solid ${index % 2 === 0 ? "#6c757d" : "#0d6efd"}` 
                                        }}
                                    >
                                        <div className="row align-items-center">
                                            <div className="col-md-1 d-none d-md-block text-center">
                                                <span className="badge bg-secondary rounded-circle px-3 py-2 fs-6">{index + 1}</span>
                                            </div>
                                            <div className="col-md-11">
                                                <div className="row g-2 mb-2">
                                                    <div className="col-sm-6">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Client Name</span>
                                                        <span className="fs-6 text-muted">{msg.name}</span>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Email Address</span>
                                                        <a href={`mailto:${msg.email}`} className="text-primary text-decoration-none">{msg.email}</a>
                                                    </div>
                                                </div>
                                                <div className="row g-2">
                                                    <div className="col-12">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Message</span>
                                                        <p className="mb-0 text-dark bg-light p-3 rounded-3 mt-1 small" style={{ whiteSpace: "pre-wrap" }}>
                                                            {msg.message}
                                                        </p>
                                                    </div>
                                                </div>
                                                {msg.createdAt && (
                                                    <div className="text-end mt-2">
                                                        <span className="text-muted small">
                                                            <i className="ri-time-line me-1 small"></i>
                                                            {new Date(msg.createdAt).toLocaleString()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : activeTab === "users" ? (
                    users.length === 0 ? (
                        <div className="card shadow-sm border-0 text-center p-5 rounded-4 bg-white">
                            <p className="text-muted mb-0 fs-5">No registered users found.</p>
                        </div>
                    ) : (
                        <div className="row g-3 animate-fade-in">
                            {users.map((u, index) => (
                                <div className="col-12" key={u._id || index}>
                                    <div 
                                        className="card border-0 shadow-sm p-4 rounded-4" 
                                        style={{ 
                                            backgroundColor: index % 2 === 0 ? "#fdfdfd" : "#fafafa",
                                            borderLeft: `5px solid ${u.role === "admin" ? "#ffc107" : "#0d6efd"}`
                                        }}
                                    >
                                        <div className="row align-items-center">
                                            <div className="col-md-1 d-none d-md-block text-center">
                                                <span className="badge bg-secondary rounded-circle px-3 py-2 fs-6">{index + 1}</span>
                                            </div>
                                            <div className="col-md-11">
                                                <div className="row g-3 align-items-center text-center text-md-start">
                                                    <div className="col-md-3">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Full Name</span>
                                                        <span className="fs-6 text-muted">{u.name}</span>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Email Address</span>
                                                        <a href={`mailto:${u.email}`} className="text-primary text-decoration-none small">{u.email}</a>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Role</span>
                                                        <span className={`badge bg-${u.role === "admin" ? "warning text-dark" : "info text-white"} text-uppercase px-2 py-1 small`}>
                                                            {u.role}
                                                        </span>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Status</span>
                                                        <span className={`badge bg-${u.isVerified ? "success" : "secondary"} text-uppercase px-2 py-1 small`}>
                                                            {u.isVerified ? "Verified" : "Unverified"}
                                                        </span>
                                                    </div>
                                                    <div className="col-md-1 text-md-end">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Joined</span>
                                                        <span className="small text-muted">{new Date(u.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : activeTab === "logs" ? (
                    logs.length === 0 ? (
                        <div className="card shadow-sm border-0 text-center p-5 rounded-4 bg-white">
                            <p className="text-muted mb-0 fs-5">No recent login activities recorded.</p>
                        </div>
                    ) : (
                        <div className="row g-3 animate-fade-in">
                            {logs.map((log, index) => (
                                <div className="col-12" key={log._id || index}>
                                    <div 
                                        className="card border-0 shadow-sm p-4 rounded-4" 
                                        style={{ 
                                            backgroundColor: index % 2 === 0 ? "#fdfdfd" : "#fafafa",
                                            borderLeft: `5px solid ${log.action === "login" ? "#198754" : "#dc3545"}`
                                        }}
                                    >
                                        <div className="row align-items-center">
                                            <div className="col-md-2 text-center text-md-start mb-3 mb-md-0">
                                                <span className={`badge bg-${log.action === "login" ? "success" : "danger"} text-uppercase px-3 py-2 fs-6`}>
                                                    <i className={`${log.action === "login" ? "ri-login-box-line" : "ri-logout-box-line"} me-1 align-middle`}></i>
                                                    {log.action}
                                                </span>
                                            </div>
                                            <div className="col-md-10">
                                                <div className="row g-3 text-center text-md-start">
                                                    <div className="col-md-4">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">User Email</span>
                                                        <span className="fs-6 text-muted">{log.email}</span>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">IP Address</span>
                                                        <span className="fs-6 text-muted small">{log.ip}</span>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Browser / OS</span>
                                                        <span className="fs-6 text-muted small" title={log.userAgent}>{formatUserAgent(log.userAgent)}</span>
                                                    </div>
                                                    <div className="col-md-2 text-md-end">
                                                        <span className="fw-bold text-dark small text-uppercase tracking-wider d-block">Time</span>
                                                        <span className="small text-muted">{new Date(log.createdAt).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="row justify-content-center animate-fade-in">
                        <div className="col-lg-6 col-md-8">
                            <div className="card border-0 shadow-sm p-5 rounded-4 bg-white text-center">
                                <div className="mb-4">
                                    <div className="info-icon-wrapper bg-primary text-white mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px", fontSize: "2.5rem" }}>
                                        <i className="ri-file-pdf-line"></i>
                                    </div>
                                </div>
                                <h4 className="fw-bold text-dark mb-2">Upload Updated Resume</h4>
                                <p className="text-muted mb-4">Select your latest professional PDF resume. It will overwrite the existing visitor download file.</p>
                                
                                <form onSubmit={handleUploadResume}>
                                    <div className="mb-4 border-dashed rounded-4 p-4 text-center bg-light position-relative" style={{ border: "2px dashed #dee2e6" }}>
                                        <input 
                                            type="file" 
                                            id="resume-input-field"
                                            className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                                            accept=".pdf" 
                                            onChange={handleFileChange} 
                                            style={{ cursor: "pointer" }}
                                        />
                                        <i className="ri-upload-cloud-2-line fs-1 text-muted d-block mb-2"></i>
                                        <span className="text-muted fw-bold d-block">
                                            {fileName || "Drag & Drop or Click to browse PDF"}
                                        </span>
                                        <span className="text-muted small mt-1 d-block">Only PDF files are supported</span>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100 rounded-3 py-3 fw-bold border-0"
                                        disabled={uploading || !resumeBase64}
                                        style={{ background: "linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%)" }}
                                    >
                                        {uploading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-send-plane-fill me-1"></i> Upload Resume
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AdminDashboard;
