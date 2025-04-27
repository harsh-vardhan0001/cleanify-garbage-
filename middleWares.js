// middlewares/authMiddleware.js
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkRole(role) {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
            next();
        } else {
            res.status(403).send('Forbidden: You do not have access.');
        }
    };
}

module.exports = { ensureAuthenticated, checkRole };
