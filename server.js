const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const session = require('express-session')
const {v4:uuidv4} = require('uuid')
const router = require('./router')

const port = 3000

app.use(express.urlencoded({
    extended:true
}))

app.set(bodyparser.json())
app.set(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs')

//load static assests
app.use('/static',express.static('public'))
app.use('/assets',express.static('public/assets'))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use('/route',router)

//home route
app.get('/',(req,res)=>{
    res.render('base',{title:'Login'})
})

app.get('*',(req,res)=>{
    res.send('Error 404')
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})