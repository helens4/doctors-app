const express = require('express')
const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')
const User = require('../models/userModel')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/get-doctor-info-by-user-id', authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId })
        doctor.password = undefined

        res.status(200).send({
            success: true,
            message: 'Doctor info fetched successfully',
            data: doctor
        })

    } catch (error) {
        res.status(500).send({
            message: 'error getting doctor info',
            success: false,
            error
        })
    }
})

router.post('/get-doctor-info-by-id', authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ _id: req.body.doctorId })
        doctor.password = undefined

        res.status(200).send({
            success: true,
            message: 'Doctor info fetched successfully',
            data: doctor
        })

    } catch (error) {
        res.status(500).send({
            message: 'error getting doctor info',
            success: false,
            error
        })
    }
})

router.post('/update-doctor-profile', authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId }, req.body)
        doctor.password = undefined

        res.status(200).send({
            success: true,
            message: 'Doctor info updated successfully',
            data: doctor
        })

    } catch (error) {
        res.status(500).send({
            message: 'error getting doctor info',
            success: false,
            error
        })
    }
})

router.get('/get-appointments-by-doctor-id', authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId })
        const appointments = await Appointment.find({ doctorId: doctor._id })
        res.status(200).send({
            message: 'appointments fetched successfully',
            success: true,
            data: appointments
        })
    } catch (error) {
        res.status(500).send({
            message: 'error',
            success: false,
            error
        })
    }
})

router.post('/change-appointment-status', authMiddleware, async (req, res) => {
    try {
        const { appointmentId, status } = req.body
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
            status
        })
        const user = await User.findOne({ _id: appointment.userId })
        const unseenNotifications = user.unseenNotifications
        unseenNotifications.push({
            type: 'appointment-status-changed',
            message: `Your appointment status has been ${status}`,
            onClickPath: '/appointments'
        })
        user.isDoctor = status === 'approved' ? true : false
        await User.findByIdAndUpdate(user._id, { unseenNotifications })

        res.status(200).send({
            message: 'appointment status updated successfully',
            success: true,
            data: appointment
        })
    } catch (error) {
        res.status(500).send({
            message: 'error changing appointment status',
            success: false,
            error
        })
    }
})







module.exports = router