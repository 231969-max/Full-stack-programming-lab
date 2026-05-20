const jwt = require("jsonwebtoken");

module.exports = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        
        // Handle Bearer <token> format
        const token = authHeader && authHeader.split(" ")[1] || authHeader;
        
        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // If a specific role is required (e.g., "admin")
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ message: `Forbidden: Requires ${requiredRole} role` });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error.message);
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    };
};
