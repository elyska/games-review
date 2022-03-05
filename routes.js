
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
// import { upload } from 'https://cdn.deno.land/oak_upload_middleware/versions/v2/raw/mod.ts'
// import { parse } from 'https://deno.land/std/flags/mod.ts'

import { login, register } from './modules/accounts.js'

const handle = new Handlebars()

const router = new Router()

// the routes defined here
router.get('/', async context => {
	const authorised = context.cookies.get('authorised')
	const data = { authorised, title: "Home" }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

router.get('/add-game', async context => {
	const authorised = context.cookies.get('authorised')
	if (authorised === undefined) context.response.redirect('/login')


	const data = { authorised, title: "Add Game", gameForm: true, currentYear: 2022 }
	const body = await handle.renderView('game-form', data)
	context.response.body = body
})

router.get('/login', async context => {
	const data = { noNav: true, logReg: true, title: "Log In" }
	const body = await handle.renderView('login', data)
	context.response.body = body
})

router.get('/register', async context => {
	const data = { noNav: true, logReg: true, title: "Register" }
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

export default router
