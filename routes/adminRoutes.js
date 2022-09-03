const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/change-doctor-status', authMiddleware, async (req, res) => {
    try {
        const { doctorId, status, userId } = req.body
        const doctor = await Doctor.findByIdAndUpdate(doctorId, {
            status
        })
        const user = await User.findOne({ _id: doctor.userId })
        const unseenNotifications = user.unseenNotifications
        unseenNotifications.push({
            type: 'new-doctor-request-changed',
            message: `Your doctor account has been ${status}`,
            onClickPath: '/notifications'
        })
        user.isDoctor = status === 'approved' ? true : false
        await User.findByIdAndUpdate(user._id, { unseenNotifications })

        res.status(200).send({
            message: 'doctor status updated successfully',
            success: true,
            data: doctor
        })
    } catch (error) {
        res.status(500).send({
            message: 'error applying doctor account',
            success: false,
            error
        })
    }
})

router.get('/get-all-doctors', authMiddleware, async (req, res) => {
    try {
        const doctors = await Doctor.find({})
        res.status(200).send({
            message: 'doctors fetched successfully',
            success: true,
            data: doctors
        })
    } catch (error) {
        res.status(500).send({
            message: 'error',
            success: false,
            error
        })
    }
})

router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send({
            message: 'users fetched successfully',
            success: true,
            data: users
        })
    } catch (error) {
        res.status(500).send({
            message: 'error',
            success: false,
            error
        })
    }
})




module.exports = router