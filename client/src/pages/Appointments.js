import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import { showLoading, hideLoading } from '../redux/alertsReducer'
import { Table } from 'antd'
import moment from 'moment'


const Appointments = () => {

    const [appointments, setAppointments] = useState([])
    const dispatch = useDispatch()

    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('http://localhost:5001/api/users/get-appointments-by-user-id',
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
            title: 'Doctor',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.firstName} {record.doctorInfo.lastName}
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
        }
    ]

    return (
        <Layout>
            <h1 className='page-header'>Appointments</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default Appointments