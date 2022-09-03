import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { showLoading, hideLoading } from '../../redux/alertsReducer'
import { Table } from 'antd'
import moment from 'moment'


const DoctorAppointment = () => {

    const [appointments, setAppointments] = useState([])
    const dispatch = useDispatch()

    const changeAppointmentStatus = async (record, status) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/doctor/change-appointment-status', {
                appointmentId: record._id,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                getAppointmentsData()
            }
        } catch (error) {
            toast.error('error changing doctor account status')
            dispatch(hideLoading())
        }
    }

    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('http://localhost:5001/api/doctor/get-appointments-by-doctor-id',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {
                setAppointments(response.data.data)
                console.log('appointments: ', response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getAppointmentsData()
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id'
        },
        {
            title: 'Patient',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.userInfo.name}
                </span>
            )
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.phoneNumber}
                </span>
            )
        },
        {
            title: 'Date & Time',
            dataIndex: 'createdAt',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} {moment(record.time).format('HH:mm')}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status == 'pending' && (
                        <div className='d-flex'>
                            <h1 className='anchor px-2' onClick={() => changeAppointmentStatus(record, 'approved')}>Approve</h1>
                            <h1 className='anchor' onClick={() => changeAppointmentStatus(record, 'rejected')}>Reject</h1>
                        </div>
                    )
                    }
                </div>
            )
        }
    ]

    return (
        <Layout>
            <h1 className='page-header'>Appointments</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointment