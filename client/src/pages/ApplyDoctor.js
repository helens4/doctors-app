import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import DoctorForm from '../components/DoctorForm'
import { showLoading, hodeLoading, hideLoading } from '../redux/alertsReducer'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const ApplyDoctor = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    const onFinish = async values => {

        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/users/apply-doctor-account',
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

    return (
        <Layout>
            <h1 className='card-title'>Apply Doctor</h1>
            <hr />

            <DoctorForm onFinish={onFinish} />

        </Layout>
    )
}

export default ApplyDoctor