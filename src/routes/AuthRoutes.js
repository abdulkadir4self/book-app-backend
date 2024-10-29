const express = require('express');
const {promoteRole } = require('../controller/authControllers');
// const User = require('../models/schemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/schemas');
const authMiddleware = require('../middleware/AuthMiddleware');
const roleMiddleware = require('../middleware/RoleMiddleware');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { error } = new User().validate(req.body);
                if (error) {
                    console.log(error);
                    res.json({
                        status: 0,
                        message: error.message,
                        data: null
                    })
                } else {
                    const { email, password, role, name } = req.body;
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const user = new User({ name, email, password: hashedPassword, role });
                    await user.save();
                    res.json({
                        message: "user registered successfully",
                        data: user
                    }) }

    } catch (error) {
        console.log(error);
        res.json({
            message: "user not registered successfully",
            data: null
        })
    }})
        
router.post('/login', async (req, res) => {
    try {
        const { error } = new User().validate(req.body);
        if (error) {
            console.log(error);
            res.json({
                status: 0,
                message: error.message,
                data: null
            })
        } else {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).send({ message: "Invalid credentials"});

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).send({ message: "Invalid credentials" });

            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
            res.header('Authorization', token).send({ message: "login successful", token });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "login unsuccessful",
            data: null
        })
    }
})

router.put('/promote/:id', authMiddleware, roleMiddleware(['admin']), promoteRole);

router.get('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    const users = await User.find();
    res.send({ message: "all users fetched", data: users });
});

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send({ message: " user deleted successfully", data: deletedUser });
});

module.exports = router;
