#!/usr/bin/env node

require('dotenv-safe').config()
const uploadFolder = require('s3-folder-upload')
const emptyBucket = require('../lib/s3-empty-bucket')
const argv = require('yargs')
	.alias('s', 'source')
	.argv

const credentials = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
	bucket: process.env.AWS_BUCKET,
}

const options = {
	useFoldersForFileTypes: false
}

emptyBucket()
	.then(() => uploadFolder(argv.source, credentials, options))
	.catch(console.error)
