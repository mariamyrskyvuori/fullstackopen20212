const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://fullstack2021:${password}@cluster0.ezdss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})


const Person = mongoose.model('Person', personSchema)


let morgan = require('morgan')
morgan.token('type', function (req, res) {
    return req.headers['content-type']
})
const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('person', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan('tiny'))


const time = new Date().toLocaleString()





app.get('/api/persons', (req, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} persons</p> <p>${time}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (!person) {
        return response.status(404).json({
            error: 'contact does not exist'
        })
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

const isNotUnique = (name) => {
    return !!persons.find(person => {
        return person.name === name
    })
}

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"))
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    if (isNotUnique(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


