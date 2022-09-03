import { Button, Col, DatePicker, Row, TimePicker } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { showLoading, hideLoading } from '../redux/alertsReducer'
import moment from 'moment'
import toast from 'react-hot-toast'

const BookAppointment = () => {
    const { user } = useSelector(state => state.user)
    const params = useParams()
    const dispatch = useDispatch()
    const [doctor, setDoctor] = useState(null)
    const [isAvailable, setIsAvailable] = useState(false)
    const [date, setDate] = useState()
    const [time, setTime] = useState()


    const getDoctorData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/doctor/get-doctor-info-by-id',
                {
                    doctorId: params.doctorId
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            dispatch(hideLoading())
            if (response.data.success) {
                setDoctor(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())
        }
    }

    const bookNow = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/users/book-appointment',
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctor,
                    userInfo: user,
                    date,
                    time,
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error('error booking appointment')
            dispatch(hideLoading())
        }
    }

    const checkAvailability = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/users/check-booking-availability',
                {
                    doctorId: params.doctorId,
                    date,
                    time,
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                setIsAvailable(true)
            } else {
                toast.error('Error booking appointment')
            }
        } catch (error) {
            toast.error('error booking appointment')
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getDoctorData()
    }, [])

    return (
        <Layout>
            {doctor && (
                <div>
                    <div className='page-title'>
                        {doctor.firstName} {doctor.lastName}
                    </div>
                    <hr />
                    <Row gutter={20} className='mt-5' align='middle'>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <img
                                src='https://thumbs.dreamstime.com/z/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg'
                                alt=''
                                width='200'
                            />

                        </Col>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <h1 className='normal-text'>Timings: {doctor.timings[0]} - {doctor.timings[1]}</h1>
                            <p className='card-text m-0 p-0'>
                                <span className='text-primary'>Phone number: </span>
                                {doctor.phoneNumber}
                            </p>
                            <p className='card-text m-0 p-0'>
                                <span className='text-primary'>Address: </span>
                                {doctor.address}
                            </p>
                            <p className='card-text m-0 p-0'>
                                <span className='text-primary'>Fee per Visit: </span>
                                {doctor.feePerConsultation}zł
                            </p>
                            <div className='d-flex flex-column pt-2'>
                                <DatePicker
                                    format='DD-MM-YYYY'
                                    onChange={(value) => {
                                        setDate(moment(value).format('DD-MM-YYY'))
                                        setIsAvailable(false)
                                    }}
                                />
                                <TimePicker
                                    format='HH:mm'
                                    className='mt-3'
                                    onChange={(value) => {
                                        setIsAvailable(false)
                                        setTime(moment(value).format('HH:mm'))
                                    }}
                                />
                                <Button className='primary-button mt-3 full-width-button' onClick={checkAvailability}>Check Availability</Button>
                                {isAvailable && (
                                    <Button className='primary-button mt-3 full-width-button' onClick={bookNow}>Book Now</Button>
                                )}
                            </div>
                        </Col>

                    </Row>

                </div>

            )}
        </Layout>
    )
}

export default BookAppointment