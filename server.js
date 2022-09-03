const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
app.use(express.json())
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const doctorRoute = require('./routes/doctorRoutes')

app.use(cors())
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/doctor', doctorRoute)


const port = process.env.PORT || 5001

console.log(process.env.MONGO_URL)
app.listen(port, () => console.log(`listening on the post ${port}`))