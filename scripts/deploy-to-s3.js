#!/usr/bin/env node

require('dotenv-safe').config()
const s3uf = require('s3-upload-folder')
const argv = require('yargs')
	.alias('s', 'source')
	.alias('b', 'bucket')
	.argv

s3uf(argv.source, argv.bucket)
	.catch(console.error)
