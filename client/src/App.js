import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';
import UsersList from './pages/admin/UsersList';
import DoctorsList from './pages/admin/DoctorsList';
import Profile from './pages/doctor/Profile';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import DoctorAppointment from './pages/doctor/DoctorAppointment';

function App() {

  const { loading } = useSelector(state => state.alerts)

  return (
    <BrowserRouter>
      {loading && (
        <div className='loader-parent'>
          <div className="spinner-border" role="status">
          </div>
        </div>
      )}

      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute>} />
        <Route path='/register' element={<PublicRoute> <Register /> </PublicRoute>} />
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/apply-doctor' element={
          <ProtectedRoute>
            <ApplyDoctor />
          </ProtectedRoute>
        } />

        <Route path='/notifications' element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />

        <Route path='/users' element={
          <ProtectedRoute>
            <UsersList />
          </ProtectedRoute>
        } />

        <Route path='/doctors' element={
          <ProtectedRoute>
            <DoctorsList />
          </ProtectedRoute>
        } />

        <Route path='/doctor/profile/:userId' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path='/book-appointment/:doctorId' element={
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        } />

        <Route path='/appointments' element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        } />

        <Route path='/doctor/appointments' element={
          <ProtectedRoute>
            <DoctorAppointment />
          </ProtectedRoute>
        } />


      </Routes>

    </BrowserRouter>
  );
}

export default App;
