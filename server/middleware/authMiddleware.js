// Mock Database of Users for the assignment
const mockUsers = {
    'token-viewer-123': { id: 1, username: 'John', role: 'viewer', status: 'active' },
    'token-analyst-456': { id: 2, username: 'Jane', role: 'analyst', status: 'active' },
    'token-admin-789': { id: 3, username: 'Boss', role: 'admin', status: 'active' }
};

// 1. Authenticate User Middleware
export const authenticate = (req, res, next) => {
    // Look for the token in the headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
    }

    const user = mockUsers[token];

    if (!user || user.status !== 'active') {
        return res.status(403).json({ success: false, error: 'Invalid or inactive user.' });
    }

    // Attach user to the request object so the next functions know who is making the request
    req.user = user; 
    next();
};

// 2. Role Authorization Middleware Factory
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                error: `Role (${req.user?.role}) is not allowed to access this resource.` 
            });
        }
        next();
    };
};