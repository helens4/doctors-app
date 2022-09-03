import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { showLoading, hideLoading } from '../../redux/alertsReducer'
import { Table } from 'antd'

const DoctorsList = () => {

    const [doctors, setDoctors] = useState([])
    const dispatch = useDispatch()

    const changeDoctorStatus = async (record, status) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/admin/change-doctor-status', {
                doctorId: record._id,
                userId: record.userId,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                getDoctorsData()
            }
        } catch (error) {
            toast.error('error changing doctor account status')
            dispatch(hideLoading())
        }
    }

    const getDoctorsData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('http://localhost:5001/api/admin/get-all-doctors', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                setDoctors(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => <p className='card-text'>{record.firstName} {record.lastName}</p>
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber'
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt'
        },
        {
            title: 'status',
            dataIndex: 'status'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === 'pending' && <h1 className='anchor' onClick={() => changeDoctorStatus(record, 'approved')}>Approve</h1>}
                    {record.status === 'approved' && <h1 className='anchor' onClick={() => changeDoctorStatus(record, 'blocked')}>Block</h1>}
                </div>
            )
        }
    ]

    return (
        <Layout>
            <h1 className='page-header'>Doctors List</h1>
            <Table columns={columns} dataSource={doctors}></Table>
        </Layout>
    )
}

export default DoctorsList