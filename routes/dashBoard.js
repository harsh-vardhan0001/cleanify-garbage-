
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, checkRole } = require('../middleWares');


// User Dashboard
router.get('/user/dashboard', ensureAuthenticated, checkRole('user'), (req, res) => {
    res.render('./dashboard/userDashboard.ejs', { user: req.user });
});

// Admin Dashboard
router.get('/admin/dashboard', ensureAuthenticated, checkRole('admin'), (req, res) => {
    res.render('./dashboard/adminDashboard.ejs', { user: req.user });
});

// Worker Dashboard
router.get('/worker/dashboard', ensureAuthenticated, checkRole('worker'), (req, res) => {
    res.render('./dashboard/workerDashboard.ejs', { user: req.user });
});