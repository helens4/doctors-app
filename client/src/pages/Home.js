import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Layout from '../components/Layout'
import { showLoading, hideLoading } from '../redux/alertsReducer'
import { setUser } from '../redux/userSlice'
import { Col, Row } from 'antd'
import Doctor from '../components/Doctor'

const Home = () => {

    const [doctors, setDoctors] = useState([])
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('http://localhost:5001/api/users/get-approved-doctors',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {
                console.log(response.data.data)
                setDoctors(response.data.data)
            }

        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Layout>
            <Row gutter={20}>
                {doctors.map(doctor => (
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Doctor doctor={doctor} />
                    </Col>
                ))}
            </Row>
        </Layout>
    )
}

export default Home