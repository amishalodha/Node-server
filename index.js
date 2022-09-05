const express = require('express')

const students = require('./students')

const app = express()
app.use(express.json())


app.listen(3000, () => {
    console.log('Listening on port 3000');

})


app.get('/', (req, res) => {
    res.json({ message: "Api is working" })

})


app.get('/api/students', (req, res) => {
    res.json(students)

})

app.post('/api/students', (req, res) => {

    if (!req.body.Name) {
        res.status(404)
        return res.json({ error: "Name is required" })
    }
    const user = {
        id: students.length + 1,

        Name: req.body.Name,
        age: req.body.age,
        classess: req.body.classess,
        gender: req.body.gender
    }
    students.push(user)
    res.json(user)

})

app.put('/api/students/:id', (req, res) => {
    let id = req.params.id
    let Name = req.body.Name
    let age = req.body.age
    let classess = req.body.classess
    let gender = req.body.gender


    let index = students.findIndex((student) => {
        return (student.id == Number.parseInt(id))
    })

    console.log(id, req.body, index);

    if (index >= 0) {
        let stu = students[index]
        stu.Name = Name
        stu.age = age
        stu.classess = classess
        stu.gender = gender
        res.json(stu)

    }
    else {
        res.status(404)
        res.end()
    }




})

app.delete('/api/students/:id', (req, res) => {
    let id = req.params.id;

    let index = students.findIndex((student) => {
        return (student.id == Number.parseInt(id))
    })
    if (index >= 0) {
        let stu = students[index]
        students.splice(index, 1)
        res.json(stu)

    } else {
        res.status(404)
    }
})

