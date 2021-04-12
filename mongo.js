const mongoose = require('mongoose')

if (process.argv.length < 3) {
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

const person = new Person({ name, number })
person._id instanceof mongoose.Types.ObjectId


Person.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(person => {

    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})

person.save().then(response => {
  console.log(`added ${response.name} number ${response.number} to phonebook`)
  mongoose.connection.close()
})