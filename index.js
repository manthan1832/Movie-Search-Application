const express = require('express')
const request = require('request')

const app = express()

const dotenv = require('dotenv')
dotenv.config()

app.set("view engine", "ejs")

app.use('/public',express.static('public'))

app.get("/result",(req,res)=>{
    // console.log(req.query.moviename)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.moviename}`
    request(url, function(error,response,body){
        if(!error && response.statusCode==200){
            const data = JSON.parse(body)
            console.log(data)
            res.render("result", {movieData:data})
        }else{
            res.send("Oops! Something went wrong!!")
        }
    })
})

app.get("/result/:id",(req,res)=>{
    console.log(process.env.API_KEY)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function(error,response,body){
        if(!error && response.statusCode==200){
            const data = JSON.parse(body)
            console.log(data)
            res.render("aboutmovie",{movieinfo:data})
        }else{
            res.send("Oops! Something went wrong!!")
        }
    })
})

app.get("/",(req,res)=>{
    console.log(process.env.API_KEY)
    res.render("homepage.ejs")
})

app.get("/aboutme",(req,res)=>{
    res.render("aboutme")
})

app.get("*",(req,res)=>{
    res.send("Uh oh! Something went wrong!")
})

app.listen(process.env.PORT,()=>{
    console.log("Server has Started!!")
})