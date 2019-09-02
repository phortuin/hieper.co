#!/usr/bin/env node

const getDropboxFiles = require('../lib/dropbox-get-files')
const dropboxFileToHTML = require('../lib/dropbox-file-to-html')
const writeToDestination = require('../lib/file-write-to-destination')
const argv = require('yargs')
	.alias('d', 'dest')
	.argv

getDropboxFiles()
	.map(dropboxFileToHTML)
	.map(writeToDestination(argv.dest))
	.catch(console.error)
