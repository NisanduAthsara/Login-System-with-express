var express = require('express')
var router = express.Router()

const credential = {
    email:'admin@gmail.com',
    password:'123'
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email
        res.redirect('/route/dashboard')
    }else{
        if(req.session.user){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err)
                }
            })
        }
        res.end('Invalid Username or Password')
    }
})

//dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send('Unauthorized User')
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Err')
        }else{
            res.render('base',{title:'Logout',logout:'Successfully Logout'})
        }
    })
})

module.exports = router