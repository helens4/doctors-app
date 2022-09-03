import { useNavigate } from "react-router-dom"

const Doctor = ({ doctor }) => {
    const navigate = useNavigate()
    return (
        <div className='card p-2' onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
            <h1 className='card-title'>{doctor.firstName} {doctor.lastName} </h1>
            <hr />
            <p className='card-text m-0 p-0'><span className='text-primary'>Phone number: </span>{doctor.phoneNumber}</p>
            <p className='card-text m-0 p-0'><span className='text-primary'>Address: </span>{doctor.address}</p>
            <p className='card-text m-0 p-0'><span className='text-primary'>Fee per Visit: </span>{doctor.feePerConsultation}zł</p>
            <p className='card-text m-0 p-0'><span className='text-primary'>Timings: </span> {doctor.timings[0]} - {doctor.timings[1]}</p>
        </div>
    )
}

export default Doctor