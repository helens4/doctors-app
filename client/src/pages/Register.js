import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../redux/alertsReducer'

function Register() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async values => {
    try {
      dispatch(showLoading())
      const response = await axios.post('http://localhost:5001/api/users/register', values)
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/login')
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
        <h1 className='card-title'>Nice to meet you</h1>

        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item label='Name' name='name'>
            <Input placeholder='Name' />
          </Form.Item>

          <Form.Item label='Email' name='email'>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <Input placeholder='Password' type='password' />
          </Form.Item>

          <Button className='primary-button full-button mt-2' htmlType='submit'>REGISTER</Button>

          <Link to='/login' className='anchor'>CLICK HERE TO LOGIN</Link>

        </Form>
      </div>
    </div>
  )
}

export default Register