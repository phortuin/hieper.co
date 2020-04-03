#!/usr/bin/env node

require('dotenv-safe').config()
const dmssg = require('dropbox-markdown-ssg')
const argv = require('yargs')
	.alias('d', 'dest')
	.argv

dmssg(process.env.DROPBOX_ACCESS_TOKEN, { buildFolder: argv.dest, template: 'src/templates/page.html' })
	.catch(console.error)
