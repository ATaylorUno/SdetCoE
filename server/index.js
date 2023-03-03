const express = require('express')
const app = express()

app.get('/users', function (req, res) {
  res.send('Return all users')
})

app.post('/users', function (req, res) {
  res.send('Create a new user')
})

app.put('/user/:user_id(\\d+)', function (req, res) {
  res.send('Update a user by ID')
})

app.get('/user/:user_id(\\d+)', function (req, res) {
  res.send('Return the user for the given id')
})

app.get('/routines', function (req, res) {
  res.send('Return all routines')
})

app.get('/routines/:user_id(\\d+)', function (req, res) {
  res.send('Return all routines for a given user')
})

app.get('/routines/:routine_id(\\d+)/workouts/', function (req, res) {
  res.send('Get workouts assoicated with a routine')
})

app.get('/routines/:routine_id(\\d+)/exercises/', function (req, res) {
  res.send('Get exercises assoicated with a routine')
})

app.get('/exercises', function (req, res) {
  res.send('Return all exercises')
})

app.post('/exercises', function (req, res) {
  res.send('Create a new exercise')
})

app.put('/user/:exercise_id(\\d+)', function (req, res) {
  res.send('Update an exercise by ID')
})


app.get('/exercises/:body_part_id(\\d+)', function (req, res) {
  res.send('Return all exercises associated with a body part')
})

app.get('/workouts', function (req, res) {
  res.send('Return all workouts')
})

app.get('/workouts/:workout_id(\\d+)/exercises', function (req, res) {
  res.send('Return a list of exercises within a workout')
})


app.listen(3000)