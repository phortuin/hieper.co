#!/usr/bin/env node

const getDropboxFiles = require('../lib/dropbox-get-files')
const dropboxFileToHTML = require('../lib/dropbox-file-to-html')
const writeToDest = require('../lib/write-to-dest')
const argv = require('yargs')
	.alias('d', 'dest')
	.argv

getDropboxFiles()
	.map(dropboxFileToHTML)
	.map(writeToDest(argv.dest))
	.catch(console.error)
