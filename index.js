// implement your API here
const express = require('express')
const db = require('./data/db')



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


// run server
server.listen(4000, () => {
 console.log('server is running')
});