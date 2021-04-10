const cors = require('cors')
require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

// ..

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let morgan = require('morgan')
morgan.token('type', function (req, res) {
    return req.headers['content-type']
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('person', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan('tiny'))

const time = new Date().toLocaleString()

app.get('/api/persons', (req, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})


/*app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} persons</p> <p>${time}</p>`)
})*/

app.get('/api/persons/:id', (request, response) => {
    /*if (!person) {
        return response.status(404).json({
            error: 'contact does not exist'
        })
    }*/
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })

})

app.delete('/api/persons/:id', (request, response) => {
    Person.deleteOne(request.params.id).then(person => {
        response.json(person)
    })

    response.status(204).end()
})

/*
const isNotUnique = (name) => {
    return !!persons.find(person => {
        return person.name === name
    })
}*/

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"))
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    /*
    if (isNotUnique(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }*/

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})




