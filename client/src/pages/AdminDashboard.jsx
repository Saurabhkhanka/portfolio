import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("messages"); // "messages", "users", or "logs"
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null
    });

    const triggerConfirm = (title, message, onConfirm) => {
        setConfirmModal({
            isOpen: true,
            title,
            message,
            onConfirm
        });
    };

    const handleDeleteMessage = (id) => {
        triggerConfirm(
            "Delete Inquiry",
            "Are you sure you want to delete this message inquiry? This action cannot be undone.",
            async () => {
                try {
                    const res = await axios.delete(`/api/v1/auth/clintInfo/${id}`);
                    if (res.data.success) {
                        setMessages(prev => prev.filter(msg => msg._id !== id));
                        toast.success(res.data.message || "Inquiry deleted successfully");
                    }
                } catch (err) {
                    console.error("Error deleting message:", err);
                    toast.error(err.response?.data?.message || "Failed to delete message.");
                }
            }
        );
    };

    const handleClearAllMessages = () => {
        triggerConfirm(
            "Clear All Inquiries",
            "WARNING: Are you absolutely sure you want to clear ALL inquiry submissions? This will permanently delete all records.",
            async () => {
                try {
                    const res = await axios.delete("/api/v1/auth/clintInfo");
                    if (res.data.success) {
                        setMessages([]);
                        toast.success(res.data.message || "All inquiries cleared successfully");
                    }
                } catch (err) {
                    console.error("Error clearing messages:", err);
                    toast.error(err.response?.data?.message || "Failed to clear inquiries.");
                }
            }
        );
    };

    const handleDeleteLog = (id) => {
        triggerConfirm(
            "Delete Login Log",
            "Are you sure you want to delete this activity log entry?",
            async () => {
                try {
                    const res = await axios.delete(`/api/v1/auth/activity-logs/${id}`);
                    if (res.data.success) {
                        setLogs(prev => prev.filter(log => log._id !== id));
                        toast.success(res.data.message || "Log entry deleted successfully");
                    }
                } catch (err) {
                    console.error("Error deleting log:", err);
                    toast.error(err.response?.data?.message || "Failed to delete log entry.");
                }
            }
        );
    };

    const handleClearAllLogs = () => {
        triggerConfirm(
            "Clear All Activity Logs",
            "WARNING: Are you absolutely sure you want to clear ALL login activity logs? This action cannot be undone.",
            async () => {
                try {
                    const res = await axios.delete("/api/v1/auth/activity-logs");
                    if (res.data.success) {
                        setLogs([]);
                        toast.success(res.data.message || "All activity logs cleared successfully");
                    }
                } catch (err) {
                    console.error("Error clearing logs:", err);
                    toast.error(err.response?.data?.message || "Failed to clear activity logs.");
                }
            }
        );
    };

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

    return (
        <Layout>
            <section className="admin-dashboard-section min-vh-80 d-flex align-items-center">
                {/* Background Glowing Blur Orbs */}
                <div className="orb-admin-1"></div>
                <div className="orb-admin-2"></div>

                <div className="container py-4" style={{ position: "relative", zIndex: 3 }}>
                    <div className="row mb-5">
                        <div className="col text-center animate-fade-in">
                            <h2 className="fw-bold text-dark d-inline-block position-relative pb-3">
                                <span className="text-gradient">Admin Dashboard</span>
                                <div className="heading-underline"></div>
                            </h2>
                            <p className="text-muted mt-3">Monitor contact form inquiries, registered profiles, and login activity logs.</p>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="row mb-5">
                        <div className="col-12">
                            <ul className="nav nav-pills justify-content-center admin-nav-tabs p-2 border-0 gap-2 mx-auto" style={{ maxWidth: "600px" }}>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link px-4 py-2 rounded-4 fw-bold admin-tab-btn ${
                                            activeTab === "messages" ? "active" : "text-muted bg-transparent"
                                        }`}
                                        onClick={() => setActiveTab("messages")}
                                    >
                                        <i className="ri-mail-line me-1 align-middle"></i>
                                        Inquiries ({messages.length})
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link px-4 py-2 rounded-4 fw-bold admin-tab-btn ${
                                            activeTab === "users" ? "active" : "text-muted bg-transparent"
                                        }`}
                                        onClick={() => setActiveTab("users")}
                                    >
                                        <i className="ri-user-line me-1 align-middle"></i>
                                        Users ({users.length})
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link px-4 py-2 rounded-4 fw-bold admin-tab-btn ${
                                            activeTab === "logs" ? "active" : "text-muted bg-transparent"
                                        }`}
                                        onClick={() => setActiveTab("logs")}
                                    >
                                        <i className="ri-history-line me-1 align-middle"></i>
                                        Logins ({logs.length})
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
                        <div className="alert alert-danger shadow-sm rounded-4 text-center my-4 p-4" role="alert">
                            <i className="ri-error-warning-line me-2 fs-4 align-middle"></i>
                            {error}
                        </div>
                    ) : activeTab === "messages" ? (
                        messages.length === 0 ? (
                            <div className="admin-card-glass text-center p-5">
                                <p className="text-muted mb-0 fs-5">No client submissions found.</p>
                            </div>
                        ) : (
                            <div className="admin-card-glass p-4 p-md-5">
                                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-light flex-wrap gap-2">
                                    <span className="text-dark fw-bold fs-5">
                                        <i className="ri-mail-line text-primary me-2"></i> 
                                        Inquiry Submissions <span className="badge bg-primary rounded-pill ms-2">{messages.length}</span>
                                    </span>
                                    <button 
                                        className="btn-admin-clear"
                                        onClick={handleClearAllMessages}
                                    >
                                        <i className="ri-delete-bin-line"></i> Clear All Inquiries
                                    </button>
                                </div>
                                <div className="row g-4">
                                    {messages.map((msg, index) => (
                                        <div className="col-12 animate-fade-in" key={msg._id || index}>
                                            <div 
                                                className={`card border-0 shadow-sm p-4 admin-item-card ${
                                                    index % 2 === 0 ? "border-left-secondary" : "border-left-primary"
                                                }`}
                                            >
                                                <div className="row align-items-center">
                                                    <div className="col-md-1 d-none d-md-block text-center">
                                                        <span className="badge bg-secondary-subtle text-secondary rounded-circle px-3 py-2 fs-6">{index + 1}</span>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <div className="row g-3 mb-3">
                                                            <div className="col-sm-6">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-user-line me-1 text-primary"></i> Client Name
                                                                </span>
                                                                <span className="admin-meta-value">{msg.name}</span>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-mail-line me-1 text-primary"></i> Email Address
                                                                </span>
                                                                <a href={`mailto:${msg.email}`} className="text-primary text-decoration-none admin-meta-value">{msg.email}</a>
                                                            </div>
                                                        </div>
                                                        <div className="row g-3">
                                                            <div className="col-12">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-chat-quote-line me-1 text-primary"></i> Message
                                                                </span>
                                                                <p className="admin-message-quote mt-2 mb-0" style={{ whiteSpace: "pre-wrap" }}>
                                                                    {msg.message}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-light">
                                                            <button
                                                                className="btn-admin-action-danger"
                                                                onClick={() => handleDeleteMessage(msg._id)}
                                                            >
                                                                <i className="ri-delete-bin-line"></i> Delete
                                                            </button>
                                                            {msg.createdAt && (
                                                                <span className="text-muted small d-flex align-items-center gap-1 fw-medium">
                                                                    <i className="ri-time-line text-muted"></i>
                                                                    {new Date(msg.createdAt).toLocaleString()}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ) : activeTab === "users" ? (
                        users.length === 0 ? (
                            <div className="admin-card-glass text-center p-5">
                                <p className="text-muted mb-0 fs-5">No registered users found.</p>
                            </div>
                        ) : (
                            <div className="admin-card-glass p-4 p-md-5">
                                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-light">
                                    <span className="text-dark fw-bold fs-5">
                                        <i className="ri-user-line text-primary me-2"></i> 
                                        Registered User Profiles <span className="badge bg-primary rounded-pill ms-2">{users.length}</span>
                                    </span>
                                </div>
                                <div className="row g-4">
                                    {users.map((u, index) => (
                                        <div className="col-12" key={u._id || index}>
                                            <div 
                                                className={`card border-0 shadow-sm p-4 admin-item-card ${
                                                    u.role === "admin" ? "border-left-warning" : "border-left-primary"
                                                }`}
                                            >
                                                <div className="row align-items-center">
                                                    <div className="col-md-1 d-none d-md-block text-center">
                                                        <span className="badge bg-secondary-subtle text-secondary rounded-circle px-3 py-2 fs-6">{index + 1}</span>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <div className="row g-3 align-items-center text-center text-md-start">
                                                            <div className="col-md-3">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-user-3-line me-1 text-primary"></i> Full Name
                                                                </span>
                                                                <span className="admin-meta-value fw-bold text-dark">{u.name}</span>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-mail-line me-1 text-primary"></i> Email Address
                                                                </span>
                                                                <a href={`mailto:${u.email}`} className="text-primary text-decoration-none admin-meta-value small">{u.email}</a>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-shield-user-line me-1 text-primary"></i> Role
                                                                </span>
                                                                <span className={`badge text-uppercase px-3 py-2 rounded-pill small fw-bold d-inline-flex align-items-center gap-1 ${
                                                                    u.role === "admin" ? "admin-badge-admin" : "admin-badge-user"
                                                                }`}>
                                                                    {u.role === "admin" ? <i className="ri-vip-crown-fill small"></i> : <i className="ri-user-line small"></i>}
                                                                    {u.role}
                                                                </span>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-checkbox-circle-line me-1 text-primary"></i> Status
                                                                </span>
                                                                <span className={`badge text-uppercase px-3 py-2 rounded-pill small fw-bold d-inline-flex align-items-center gap-1 ${
                                                                    u.isVerified ? "admin-badge-verified" : "admin-badge-unverified"
                                                                }`}>
                                                                    {u.isVerified ? <i className="ri-shield-check-fill small"></i> : <i className="ri-error-warning-fill small"></i>}
                                                                    {u.isVerified ? "Verified" : "Unverified"}
                                                                </span>
                                                            </div>
                                                            <div className="col-md-1 text-md-end">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-calendar-line me-1 text-primary"></i> Joined
                                                                </span>
                                                                <span className="small text-muted fw-semibold">{new Date(u.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ) : (
                        logs.length === 0 ? (
                            <div className="admin-card-glass text-center p-5">
                                <p className="text-muted mb-0 fs-5">No recent login activities recorded.</p>
                            </div>
                        ) : (
                            <div className="admin-card-glass p-4 p-md-5">
                                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-light flex-wrap gap-2">
                                    <span className="text-dark fw-bold fs-5">
                                        <i className="ri-history-line text-primary me-2"></i> 
                                        Login Activity Audit Logs <span className="badge bg-primary rounded-pill ms-2">{logs.length}</span>
                                    </span>
                                    <button 
                                        className="btn-admin-clear"
                                        onClick={handleClearAllLogs}
                                    >
                                        <i className="ri-delete-bin-line"></i> Clear All Logins
                                    </button>
                                </div>
                                <div className="row g-4">
                                    {logs.map((log, index) => (
                                        <div className="col-12 animate-fade-in" key={log._id || index}>
                                            <div 
                                                className={`card border-0 shadow-sm p-4 admin-item-card ${
                                                    log.action === "login" ? "border-left-success" : "border-left-danger"
                                                }`}
                                            >
                                                <div className="row align-items-center">
                                                    <div className="col-md-2 text-center text-md-start mb-3 mb-md-0">
                                                        <span className={`badge text-uppercase px-3 py-2 fs-6 rounded-3 d-inline-flex align-items-center gap-1 ${
                                                            log.action === "login" ? "admin-badge-login" : "admin-badge-logout"
                                                        }`}>
                                                            <i className={`${log.action === "login" ? "ri-login-box-line" : "ri-logout-box-line"} align-middle`}></i>
                                                            {log.action}
                                                        </span>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <div className="row g-3 text-center text-md-start align-items-center">
                                                            <div className="col-md-3">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-user-shared-line me-1 text-primary"></i> User Email
                                                                </span>
                                                                <span className="admin-meta-value">{log.email}</span>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-global-line me-1 text-primary"></i> IP Address
                                                                </span>
                                                                <span className="admin-meta-value small">{log.ip}</span>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-macbook-line me-1 text-primary"></i> Browser / OS
                                                                </span>
                                                                <span className="admin-meta-value small" title={log.userAgent}>{formatUserAgent(log.userAgent)}</span>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <span className="admin-meta-label d-block">
                                                                    <i className="ri-time-line me-1 text-primary"></i> Time
                                                                </span>
                                                                <span className="small text-muted fw-semibold">{new Date(log.createdAt).toLocaleString()}</span>
                                                            </div>
                                                            <div className="col-md-2 text-md-end">
                                                                <button
                                                                    className="btn-admin-action-danger justify-content-center mx-auto mx-md-0 ms-md-auto"
                                                                    onClick={() => handleDeleteLog(log._id)}
                                                                    title="Delete Log Entry"
                                                                >
                                                                    <i className="ri-delete-bin-line"></i> Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}

                    {/* Custom Confirmation Modal */}
                    {confirmModal.isOpen && (
                        <div 
                            className="modal fade show" 
                            style={{ 
                                display: "block", 
                                backgroundColor: "rgba(0, 0, 0, 0.55)", 
                                backdropFilter: "blur(4px)",
                                zIndex: 1060 
                            }} 
                            tabIndex="-1"
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content border-0 shadow-lg rounded-4 p-3 bg-white">
                                    <div className="modal-header border-0 pb-0">
                                        <h5 className="modal-title fw-bold text-dark d-flex align-items-center">
                                            <i className="ri-error-warning-line text-danger me-2 fs-4"></i>
                                            {confirmModal.title}
                                        </h5>
                                        <button 
                                            type="button" 
                                            className="btn-close shadow-none" 
                                            onClick={() => setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null })}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body py-3">
                                        <p className="text-muted mb-0">{confirmModal.message}</p>
                                    </div>
                                    <div className="modal-footer border-0 pt-0 gap-2">
                                        <button 
                                            type="button" 
                                            className="btn btn-light border rounded-3 px-3 fw-semibold text-muted" 
                                            onClick={() => setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null })}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-danger rounded-3 px-4 fw-bold shadow-sm" 
                                            onClick={() => {
                                                if (confirmModal.onConfirm) confirmModal.onConfirm();
                                                setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null });
                                            }}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default AdminDashboard;
