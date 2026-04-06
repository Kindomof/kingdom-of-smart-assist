const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. REGISTER PLAYER
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Duba ko username ko email ya riga ya wanzu
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "Wannan Email din an riga an yi amfani da shi" });

        user = new User({ username, email, password });

        // Boye Password (Hashing)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Samar da JWT Token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, username: user.username });
        });

    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// 2. LOGIN PLAYER
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Bayanai ba daidai ba" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Bayanai ba daidai ba" });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, username: user.username });
        });

    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
// Routes
app.use('/api/auth', require('./routes/auth'));
