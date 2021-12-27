# REST_API

## Setup
```
npm i joi
```

## Boiletplate
### #1
```
const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.get('/api/courses', (req, res) =>{
    res.send([1, 2, 3])
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening on port ${port} ... `)
})
```

### #2
Pass Parameter
Take note is req.params.id, not just id.
```
app.get('/api/courses/:id', (req, res) =>{
    res.send(`couses id is ${req.params.id}`)
})

```

### #3
Pass multiple Parameters
```
app.get('/api/post/:year/:month', (req, res) =>{
    res.send(`year is ${req.params.year}, month is ${req.params.month}`)
})
```

### #4
Query
```
http://localhost:3000/api/student/1?sortBy=name
```

```
app.get('/api/student/:id', (req, res) =>{
    res.send(req.query)
})
```

### #5
Simple Data processing
```
app.get('/api/courses/:id', (req, res) =>{
let course = courses.find(c => c.id === parseInt(req.params.id))
if(! course) res.status(404).send('The course does not exist.')
res.send(course)
```

### #6
POST
```
app.use(express.json())

app.post('/api/courses', (req, res) =>{
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
})
```

### #7
Check the input
```
app.post('/api/courses', (req, res) =>{
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('Name is required and should be mim 3 characters')
        return
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
})
```

### #8
Check the input using Joi
```
app.post('/api/courses', (req, res) =>{
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema)
    console.log(result)

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
```

### #9
PUT
```
app.put('api/courses/:id', (req, res)=>{
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if(! course) res.status(404).send('The course does not exist.')
    
    const {error} = validateCourse(req.body)

    if(error){
        res.status(400).send(result.error.details[0].message)
        return
    }

    course.name = req.body.name;
    res.send(course)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}
```