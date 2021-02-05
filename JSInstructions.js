const { response } = require('express')
const express = require('express')
const request = require('request')

//how to config environment variables
const dotenv = require('dotenv')
dotenv.config

//syntax of express 
const app = express()

//Middlewares
/*
    Ask express.js to look for folder called views inside which we can have valid html/ejs
    consider ejs same as html 
*/
app.set("view engine", "ejs")

//To attach CSS file, we need to create folder named public inside which CSS folder is present, inside which CSS files are there
//syntax to use that public folder
app.use('/public',express.static('public'))


// app.get("/",(req,res)=>{
//     res.render("homepage.ejs")
// })

//we are making GET request at some-website localhost: port/ (here port is 3000)
//GET request has 2 arguments:- 
    //1st = path for getting request (here = "/") 
    //2nd = call back function with 2 argument -> request (req) and response (res)
//"/", "/class", "/cat".... are different routes
//"*" handles if server is accessed using any other non-existent path

// app.get("/",(req,res)=>{
//     res.send("Hello")
// })

//"/class/:id" handles all the routes like /class/(whatever text). for e.g. /class/maths
// ":id" is not necessary, we can write anything after colon. For e.g. :name, :subject -> these id,name,subject are known as parameters
// these paramters can be get from req.params command
//After this we can't access "/class" path, it will give error so we need to declare special route for that 
// app.get("/class/:id",(req,res)=>{
//     console.log(req.params)
//     res.send(`Your are in class of ${req.params.id} subject, Welcome!!`)
// })

// app.get("/class",(req,res)=>{
//     res.send("Your are in general class, Welcome!!")
// })


// app.get("/cat",(req,res)=>{
//     res.send("Meow Meow!!")
// })

app.get("/result",(req,res)=>{
    //req.query will print the input parameters like username and password in the console
    console.log(req.query.moviename)
    //how to call the API Key from env file is using string literal way using ${process.env.API_KEY}
    //process.env.API_KEY = this means look in my curent process for env variables in which look for API_KEY
    const url = `http://www.omdbapi.com/?apikey=ebf57b6d&s=${req.query.moviename}`
    request(url, function(error,response,body){
        if(!error && response.statusCode==200){
            const data = JSON.parse(body)
            console.log(data)
            // if(data.Response==='False'){
            //     res.send("Oops! Movie Not Found!!")
            // }
            res.render("result", {movieData:data})
        }else{
            res.send("Oops! Something went wrong!!")
        }
    })
})

app.get("/result/:id",(req,res)=>{
    //req.query will print the input parameters like username and password in the console
    // console.log(req.query.moviename)
    const url = `http://www.omdbapi.com/?apikey=ebf57b6d&i=${req.params.id}`
    request(url, function(error,response,body){
        if(!error && response.statusCode==200){
            const data = JSON.parse(body)
            console.log(data)
            // if(data.Response==='False'){
            //     res.send("Oops! Movie Not Found!!")
            // }
            // res.render("result", {movieData:data})
            res.send(data)
        }else{
            res.send("Oops! Something went wrong!!")
        }
    })
})


//here we are making route to display movies having name as "Don"
//request is package and to syntax of request takes 2 arguments
    //1. URL
    //2. Call back function which take 3 arguments:- 
        //A. error  
        //B. response - display response if there is no error and statuscode=200(success)
        //C. Body which contains data in JSON format, so parse JSON data into valid Javascript- we use JSON command
app.get("/",(req,res)=>{
    // const url = "http://www.omdbapi.com/?apikey=ebf57b6d&i=tt1285241"
    // request(url, function(error,response,body){
    //     if(!error && response.statusCode==200){
    //         const data = JSON.parse(body)
    //         console.log(data)
    //         // res.send(data)
    //         res.render("homepage.ejs", {movie: data})
    //     }else{
    //         res.send("Oops! Something went wrong!!")
    //     }
    // })
    res.render("homepage.ejs")
})

app.get("/aboutme",(req,res)=>{
    res.render("aboutme")
})

app.get("*",(req,res)=>{
    res.send("Uh oh! Something went wrong!")
})



//Creating Web-server -> application waiting for any request through port 3000
app.listen(3000,()=>{
    console.log("Server has Started!!")
})