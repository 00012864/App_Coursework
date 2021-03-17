const express = require('express')
const app = express()

app.set('view engine', 'pug')

//development process
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/add-quote', (req, res) => {
	res.render('add')
})

app.get('/quotes', (req, res)=> {
	res.render('quotes', { quoteList: ['Faith', 'Second note'] })
})

app.get('/quotes/detail', (req, res)=> {
	res.render('detail')
})

app.listen(8000, err  => {
	if (err) throw err

	console.log('App is running...')
})