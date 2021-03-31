const fs = require('fs')
const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use(express.urlencoded({extended: false}))

//development process
app.use('/static', express.static('public'))

const db = './data/quotes.json'

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/add', (req, res) => {
	res.render('add')
})

app.post('/add', (req, res)=> {

	const title = req.body.title
	const description = req.body.description

	if (title.trim() === '' && desc.trim() === '') {
		res.render('add', {error: true})
	} else {
		fs.readFile(db, (err, data) => {
		if(err) throw err

		const quotes = JSON.parse(data)

		const newQuote = {
			id: id(),
			title: title,
			description: description
		}

		notes.push(newQuote)

		fs.writeFile(db, JSON.stringify(quotes), err => {
			if (err) throw err

			res.render('add', { success: true })
		})
	})

	} 
})

app.get('/quotes', (req, res) => {

	fs.readFile(db, (err, data) => {
		const quotes = JSON.parse(data)

		res.render('quotes', { quoteList: quotes })
	})
})

app.get('/quotes/:id', (req, res) => {
	const id = req.params.id

	fs.readFile(db, (err, data) => {
		if(err) throw err 

		const quotes = JSON.parse(data)

		const quote = quotes.filter(quote => quote.id == id)[0]

		res.render('detail', { quote: quote })
	})
})

app.get('/quotes/:id/delete', (req, res) => {
	const id = req.params.id

	fs.readFile(db, (err, data) => {
		if (err) throw err

		const quotes = JSON.parse(data)

		const filteredQuotes = quotes.filter(quote => quote.id != id)

		fs.writeFile(db, JSON.stringify(filteredQuotes), err => {
			if (err) throw err

			res.render('quotes', { id: id, notes: filteredQuotes })
		})
	})
})

//rest api
app.get('/api/v1/quotes', (req, res) => {

	fs.readFile('./data/quotes.json', (err, data) => {
		if (err) throw err

		const quotes = JSON.parse(data)

		res.json(quotes)
	})
})

app.listen(8000, err  => {
	if (err) throw err

	console.log('App is running...')
})


//generate unique id
function id () {
  return '_' + Math.random().toString(36).substr(2, 9);
}