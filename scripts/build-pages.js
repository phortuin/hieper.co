#!/usr/bin/env node

require('dotenv-safe').config()
const dmssg = require('dropbox-markdown-ssg')
const argv = require('yargs')
	.alias('d', 'dest')
	.argv

dmssg(process.env.DROPBOX_ACCESS_TOKEN, { target: argv.dest, template: 'src/templates/page.html' })
	.then(console.log)
	.catch(console.error)
