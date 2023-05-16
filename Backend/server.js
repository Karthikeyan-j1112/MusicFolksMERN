require('dotenv').config()
const express = require('express')
const cors = require('cors')
const moongose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const songRoutes = require('./routes/songRoutes')
const morgan = require('morgan');

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/users',userRoutes)
app.use('/api/songs',songRoutes)


moongose.connect(process.env.MONGO_URI)
        .then(()=>{
            const port = process.env.PORT;
            app.listen(port,()=>console.log(`Listening on the port ${port}`))
        })
        .catch(err=>console.log(err))
