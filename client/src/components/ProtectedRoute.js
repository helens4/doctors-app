import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setUser, reloadUserData } from '../redux/userSlice'
import { showLoading, hideLoading } from '../redux/alertsReducer'

const ProtectedRoute = (props) => {

    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getUser = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/users/get-info-by-id',
                {
                    token: localStorage.getItem('token')
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())

            if (response.data.success) {
                dispatch(setUser(response.data.data))
            } else {
                localStorage.clear()
                navigate('/login')
            }

        } catch (error) {
            dispatch(hideLoading())
            localStorage.clear()
            navigate('/login')
        }
    }


    useEffect(() => {

        if (!user) {
            getUser()
        }

    }, [user])

    if (localStorage.getItem('token')) {
        return props.children
    } else {
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute