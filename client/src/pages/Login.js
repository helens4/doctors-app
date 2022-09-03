import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsReducer'

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async values => {

    try {
      dispatch(showLoading())
      const response = await axios.post('http://localhost:5001/api/users/login', values)
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem('token', response.data.data)
        navigate('/')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error('sth went wrong')
    }
  }

  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>Welcome Back</h1>

        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item label='Email' name='email'>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <Input placeholder='Password' type='password' />
          </Form.Item>

          <Button className='primary-button full-button mt-2' htmlType='submit'>LOGIN</Button>

          <Link to='/register' className='anchor'>CLICK HERE TO REGISTER</Link>

        </Form>
      </div>
    </div>
  )
}

export default Login