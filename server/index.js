const express = require('express')
const mongoose = require('mongoose');
const app = express()
const appRoute=require('./routes/authRoute')
const cors=require('cors')

const cookieParser = require('cookie-parser')
// const {requireAuth,checkUser}=require('./Middleware/authMiddleware')

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cors({
    origin:"https://seek-safe-work-frontend.vercel.app",
    methods:["GET","POST","OPTIONS","PUT","PATCH","DELETE"],
    allowedHeaders:["X-CSRF-Token","X-Requested-With","Accept","Accept-Version","Content-Length","Content-MD5","Content-Type","Date","X-Api-Version"],
    credentials:true
}));
app.use(express.urlencoded({ extended: false }));

//monogodb connection
// const dbURI = 'mongodb://127.0.0.1:27017/Mini'
const dbURI=process.env.DB_URL
mongoose.connect(dbURI)
    .then((result) => app.listen(4000))
    .catch((err) => console.log('My error', err));


// app.get('/getCookie', (req, res) => {
//     res.cookie('sai', true, {
//         httpOnly: true,
//     })
//     res.send("ok ")
// })

app.use(appRoute)



