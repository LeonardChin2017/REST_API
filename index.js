const Joi = require('joi')
const express = require('express')
const app = express()
app.use(express.json())

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

app.put('/api/courses/:id', (req, res)=>{
    console.log("Testing")
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
        return res.status(404).send('The course does not exist.....')
    }
    
    const {error} = validateCourse(req.body)

    if(error){
        res.status(400).send(result.error.details[0].message)
        return
    }

    course.name = req.body.name;
    res.send(course)
})

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.get('/api/courses', (req, res) =>{
    res.send(courses)
})

app.post('/api/courses', (req, res) =>{
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema)

    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
})

app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(! course) return res.status(404).send('The course does not exist.')
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course does not exist.')
    
    const index = courses.indexOf(course);
    courses.splice(index, 1)
    res.send(course)
})

app.get('/api/post/:year/:month', (req, res) =>{
    res.send(`year is ${req.params.year}, month is ${req.params.month}`)
})

app.get('/api/student/:id', (req, res) =>{
    res.send(req.query)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}



const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening on port ${port} ... `)
})