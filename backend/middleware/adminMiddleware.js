// Middleware for authorization

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: "Access Forbidden: Admin role required" });
    }
    next();
}

// Example usage in your routes

router.get('/admin/dashboard', authorizeAdmin, (req, res) => {
    // Only admin can access this route
});

/* Remember to include middleware to authenticate users before the authorization middleware. */