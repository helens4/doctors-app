import { Tabs } from "antd"
import Layout from "../components/Layout"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { hideLoading, showLoading } from "../redux/alertsReducer"
import { setUser } from '../redux/userSlice'
import toast from 'react-hot-toast'
import axios from "axios"

const Notifications = () => {

    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const markAllAsSeen = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/users/mark-as-seen', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error('sth went wrong')
        }
    }

    const deleteAllNotifications = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/users/delete-all-notifications', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error('sth went wrong')
        }
    }

    return (
        <Layout>
            <h1 className='page-title'>Notifications</h1>

            <Tabs>
                <Tabs.TabPane tab='Unseen' key={0}>
                    <div className='d-flex flex-column'>
                        <h1 className='anchor text-end' onClick={() => markAllAsSeen()}>Mark all as seen</h1>

                        {user?.unseenNotifications.map((notification) => (
                            <div className='card p-2 m-2' onClick={() => navigate(notification.onClickPath)}>
                                <div className='card-text'>{notification.message}</div>
                            </div>
                        ))}

                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab='Seen' ket={1}>
                    <div className='d-flex flex-column' onClick={() => deleteAllNotifications()}>
                        <h1 className='anchor'>Delete all</h1>
                        {user?.seenNotifications.map((notification) => (
                            <div className='card p-2 m-2' onClick={() => navigate(notification.onClickPath)}>
                                <div className='card-text'>{notification.message}</div>
                            </div>
                        ))}
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notifications