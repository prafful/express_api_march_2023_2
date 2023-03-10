//import express
let express = require('express')
let mongoose = require('mongoose')
let song = require('./song')


//create express app
let app = express()

//enable express to work with JSON type request body
app.use(express.json())

let PORT = 8888

//setup connection string
let connectionstring = "mongodb+srv://usermongo:passwordmongo@cluster0.ubu6loq.mongodb.net/myyoutube"

mongoose.connect(connectionstring)
let db = mongoose.connection

//check if connection to mongodb database is success
db.once('open', ()=>{
    console.log("Connected to mongodb database in cloud!")
})


//create first api -> root end point -> /
//http://localhost:8888/
/*
GET -> just retrieve the data
PUT -> update data
POST -> add new data
DELETE -> delete data
*/

//GET Request handler for /
app.get("/", (request, response)=>{
    console.log("Request received")
    console.log("GET")
    console.log(request.url)
    response.send("<h1>Hello from Express API</h1>")
})

//POST Request handler for /
app.post("/", (request, response)=>{
    console.log("Request received")
    console.log("POST")
    console.log(request.url)
    response.send("<h1>Hello POST from Express API</h1>")
})

//GET Request handler for /welcome
app.get("/welcome", (request, response)=>{
    console.log("Request received")
    console.log("GET")
    console.log(request.url)
    response.send("<h1>Welcome to Express API</h1>")
})

//PUT Request handler for /welcome
app.put("/welcome", (request, response)=>{
    console.log("Request received")
    console.log("PUT")
    console.log(request.url)
    response.send("<h1>Welcome PUT to Express API</h1>")
})

//POST Request handler for /add/friend
app.post("/add/song", (request, response)=>{
    console.log("Request received")
    console.log(request.url)
    //read the request body (received along with request)
    console.log(request.body)
    let newSong = new song()
    console.log(newSong)
    //transfer values from request.body to newSong instance
    newSong.videoid = request.body.videoid
    newSong.likes = request.body.likes
    newSong.views = request.body.views
    console.log(newSong)
    //save the newSong in mongodb database
    newSong.save()
            .then((data)=>{
                response.json({
                    "status":"success",
                    "saved":data
                })
            })
            .catch((error)=>{
                console.log(error)
                response.json(error)
            })
    
 
})

//connect to mongodb and receive the list of documents from songs collection
app.get("/get/songs", (request, response)=>{
    console.log("Request received GET");
    console.log(request.url)
    //connect to mongodb to get all documents
    song.find({})
        .then((data)=>{
            response.json(data)
        })
        .catch((error)=>{
            response.json(error)
        })

})

//get song by id
app.get("/get/song/:myid", (request, response)=>{
    console.log(request.params)
    console.log(request.params.myid)
    song.findById(request.params.myid)
        .then((data)=>{
            response.json(data)
        })
        .catch((error)=>{
            response.json(error)
        })
})



app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT)
})