const fs = require('fs')
const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use(express.urlencoded({extended: false}))

//development process
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/add', (req, res) => {
	res.render('add')
})

app.post('/add', (req, res)=> {

	const title = req.body.title
	const desc = req.body.desc

	if (title.trim() !== '' && desc.trim() !== ''){

		fs.readFile('./data/quotes.json', (err, data) => {
		if(err) throw err

		const quotes = JSON.parse(data)

		quotes.push({
			id: id(),
			title: title,
			description: desc
		})

		fs.writeFile('./data/quotes.json', JSON.stringify(quotes), err => {
			if (err) throw err

			res.render('add', { success: true })
		})
	})

	} else {
			res.render('add', {error: true})
	}
})

app.get('/quotes', (req, res) => {

	fs.readFile('./data/quotes.json', (err, data) => {
		const quotes = JSON.parse(data)

		res.render('quotes', { quoteList: ['Faith', 'Second note'] })
	})
})

app.get('/quotes/detail', (req, res) => {
	res.render('detail')
})

app.listen(8000, err  => {
	if (err) throw err

	console.log('App is running...')
})


//generate unique id
function id () {
  return '_' + Math.random().toString(36).substr(2, 9);
}