require('dotenv').config()
const express = require('express')
const app = express()
const adminRouter = require('./api/admin/admin.router')
const userRouter = require('./api/users/user.router')

app.use(express.json())


app.use('/api/admin', adminRouter)
app.use('/api/users', userRouter)

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running of port...${process.env.APP_PORT}`)
})