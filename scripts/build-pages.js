#!/usr/bin/env node

const getDropboxFiles = require('../lib/dropbox-get-files')
const fileToHTML = require('../lib/file-to-html')
const writeToDest = require('../lib/write-to-dest')
const argv = require('yargs')
	.alias('d', 'dest')
	.argv

getDropboxFiles()
	.map(fileToHTML)
	.map(writeToDest(argv.dest))
	.catch(console.error)
