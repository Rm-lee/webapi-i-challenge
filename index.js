// implement your API here
const express = require('express')
const db = require('./data/db')
const server = express()

server.use(express.json())

// Get users
server.get('/api/users',(req,res) => {
 db.find()
 .then(hubs => {
  res.json(hubs)
 })
 .catch(err => {
  res.status(500).json({
   error: "The users information could not be retrieved."
  })
 })
})  

//post newUser
server.post('/api/users', (req,res) => {
 const newUser = req.body
 if(newUser.name && newUser.bio){
   db.insert(newUser)
   
   .then(id => {
    res.status(201).json(id)   
 })
   .catch(err => {
    res.status(404).json({
     error:"There was an error while saving the user to the database"
    })
   })
}
 else{ 
  res.status(400).json({
   errorMessage: "Please provide name and bio for the user"
  })
 }
})

//GET user/id
server.get('/api/users/:id', (req,res) => {
 const {id} = req.params
 db.findById(id)
 .then(hub => {
  if(hub){
   res.json(hub)
  }
  else {
   res.status(404).json({
    message: "The user with the specified ID does not exist"
   })
  }
 })
 .catch(err => {
  res.status(500).json({
   message: "The user information could not be retrieved"
  })
 })
})


//DELETE user
server.delete('/api/users/:id',(req,res) => {
 const {id} = req.params
 db.remove(id)
 .then(deletedUser => {
  if (deletedUser){
   res.json(deletedUser)
  }
  else{
   res.status(404).json({
    message: "The user with the specified ID does not exist."
   })
  }
 })
 .catch(err => {
  res.status(500).json({
   error: "THe user could not be removed"
  })
 })
})
// run server
server.listen(4000, () => {
 console.log('server is running')
});