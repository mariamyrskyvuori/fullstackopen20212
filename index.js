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
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    /*Person.find({}).then(person => {
        response.json(person)
    })*/
    res.send(`<p>Phonebook has info for ${Person.count()} persons</p> <p>${time}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end()
    })
        .catch(error => next(error))
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

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)




