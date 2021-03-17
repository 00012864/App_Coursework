const express = require('express')
const app = express()

app.set('view engine', 'pug')

//development process
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/create-note', (req, res) => {
	res.render('create')
})

app.get('/notes', (req, res)=> {
	res.render('notes', { noteList: ['First note', 'Second note'] })
})

app.get('/notes/detail', (req, res)=> {
	res.render('detail')
})

app.listen(8000, err  => {
	if (err) throw err

	console.log('App is running...')
})