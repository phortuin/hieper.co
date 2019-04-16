import dotenv from 'dotenv'
import got from 'got' // netlify-lambda will throw warnings => https://github.com/sindresorhus/got/issues/742

dotenv.config()

exports.handler = async (event, context)  => {
	let method = event.httpMethod.toLowerCase()
	if (method === 'get') {
		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'text/plain',
				'X-Content-Type-Options': 'nosniff'
			},
			body: event.queryStringParameters.challenge,
		}
	} else {
		try {
			let response = await got.post(`https://api.netlify.com/build_hooks/${process.env.NETLIFY_BUILDHOOK_KEY}`)
		} catch(error) {
			let statusCode = 500
			if (error.hasOwnProperty('statusCode')) {
				statusCode = error.statusCode
			}
			return {
				statusCode,
				body: 'error'
			}
		}
		return {
			statusCode: 200,
			body: 'ok'
		}
	}

}
