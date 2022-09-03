import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import DoctorForm from '../../components/DoctorForm'
import { showLoading, hideLoading } from '../../redux/alertsReducer'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'


const Profile = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const params = useParams()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState(null)

    const onFinish = async values => {

        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/doctor/update-doctor-profile',
                {
                    ...values,
                    userId: user._id,
                    timings: [
                        moment(values.timings[0]).format('HH:mm'),
                        moment(values.timings[1]).format('HH:mm')
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

            dispatch(hideLoading())

        } catch (error) {
            dispatch(hideLoading())
            toast.error('sth went wrong')
        }
    }

    const getDoctorData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/doctor/get-doctor-info-by-user-id',
                { userId: params.userId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())

            if (response.data.success) {
                setDoctor(response.data.data)
            }

        } catch (error) {
            dispatch(hideLoading())
        }
    }


    useEffect(() => {

        getDoctorData()

    }, [])

    return (
        <Layout>
            <h1 className='page-title'>Doctor Profile</h1>
            <hr />

            {doctor && <DoctorForm onFinish={onFinish} initialValue={doctor} />}

        </Layout>
    )
}

export default Profile