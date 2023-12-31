
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
import { Base64 } from 'https://deno.land/x/bb64@1.1.0/mod.ts'
import { resize } from 'https://deno.land/x/deno_image@v0.0.3/mod.ts'

import { login, register } from './modules/accounts.js'
import { addGame, allGames, getGame } from './modules/games.js'
import { addReview, allReviews } from './modules/reviews.js'

const handle = new Handlebars()

const router = new Router()

// the routes defined here
router.get('/', async context => {
	const authorised = context.cookies.get('authorised')
	const accepted = context.cookies.get('accepted')
	const games = await allGames()
	const data = { authorised, title: "Home", games, home: true, accepted }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

router.get('/add-game', async context => {
	const authorised = context.cookies.get('authorised')
	const accepted = context.cookies.get('accepted')
	if (authorised === undefined) context.response.redirect('/')

	// get current year
	const today = new Date()
	const currentYear = today.getFullYear()

	const data = { authorised, title: "Add Game", gameForm: true, currentYear, accepted }
	const body = await handle.renderView('game-form', data)
	context.response.body = body
})

router.post('/add', async context => {
	console.log('POST /add')
	const authorised = context.cookies.get('authorised')
	const body = context.request.body({ type: 'form-data' })
	const value = await body.value.read()
	const fields = value.fields
	const image = value.files[0]
	
	// convert image to base64
	try {
		if (image.originalName !== "") {
			const resized = await resize(Deno.readFileSync(image.filename), { width: 100, height: 100 })
			Deno.writeFileSync(image.filename, resized)
			fields.image = Base64.fromFile(image.filename).toStringWithMime()
		}
		else {
			fields.image = "images/placeholder.png"
		}
		console.log(fields)

		await addGame(fields, authorised)

		context.response.redirect('/')
	}
	catch(err) {
		console.log(err)
		context.response.redirect('/add-game')
	}
})


router.get('/login', async context => {
	const accepted = context.cookies.get('accepted')
	const data = { noNav: true, logReg: true, title: "Log In", accepted }
	const body = await handle.renderView('login', data)
	context.response.body = body
})

router.get('/register', async context => {
	const accepted = context.cookies.get('accepted')
	const data = { noNav: true, logReg: true, title: "Register", accepted }
	const body = await handle.renderView('register', data)
	context.response.body = body
})

router.post('/register', async context => {
	console.log('POST /register')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	await register(obj)
	context.response.redirect('/login')
})

router.get('/logout', context => {
  	// context.cookies.set('authorised', null) // this does the same
  	context.cookies.delete('authorised')
  	context.response.redirect('/')
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const username = await login(obj)
		context.cookies.set('authorised', username)
		context.response.redirect('/')
	} catch(err) {
		console.log(err)
		context.response.redirect('/login')
	}
})

router.get('/games/:id', async context => {
	const authorised = context.cookies.get('authorised')
	const accepted = context.cookies.get('accepted')
	const id = context.params.id
	try {
		const game = await getGame(id)
		const reviews = await allReviews(id)
		console.log(reviews)
		const data = { authorised, title: game.name, gameDetail: true, game, reviews, accepted }
		const body = await handle.renderView('game-detail', data)
		context.response.body = body
	}
	catch (err) {
		console.log(err.message)
		const data = { title: "404"}
		const body = await handle.renderView('404', data)
		context.response.body = body
	}
})

router.post('/add-review', async context => {
	console.log('POST /add-review')
	const authorised = context.cookies.get('authorised')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)

	await addReview(obj, authorised)

	context.response.redirect(`/games/${obj.gameId}`)
})

router.get('/cookie-policy', async context => {
	const authorised = context.cookies.get('authorised')
	const data = { authorised, title: "Cookie Policy", accepted: true }
	const body = await handle.renderView('cookies', data)
	context.response.body = body
})

router.get('/terms-of-use', async context => {
	const authorised = context.cookies.get('authorised')
	const data = { authorised, title: "Terms of Use", accepted: true }
	const body = await handle.renderView('terms', data)
	context.response.body = body
})
router.post('/accept-cookies', context => {
	console.log("POST /accept-cookies")
	context.cookies.set('accepted', true)
	context.response.redirect('/')
})

export default router