#!/usr/bin/env node

require('dotenv-safe').config()
const aws = require('aws-sdk')
const s3 = new aws.S3()
const globby = require('globby')
const emptyBucket = require('../lib/s3-empty-bucket')
const getFileBodyAndMimetype = require('../lib/file-get-body-and-mimetype')
const argv = require('yargs')
	.alias('s', 'source')
	.alias('b', 'bucket')
	.argv

const targetBucket = argv.bucket
const sourceDirectory = argv.source

function getLocalFiles(folder) {
	return globby(`${folder}/**/*`)
}

function convertFilesToS3Objects(files) {
	return files.map(async file => {
		try {
			const { body, mimeType } = await getFileBodyAndMimetype(file)
			const filename = file.replace(`${sourceDirectory}/`, '')
			return {
				Bucket: targetBucket,
				Key: filename,
				ContentType: mimeType,
				Body: body
			}
		} catch(error) {
			return Promise.reject(error)
		}
	})
}

function uploadObjects(objects) {
	return Promise.all(
		objects.map(async object => {
			return s3.putObject(await object).promise()
		})
	)
}

emptyBucket(targetBucket)
	.then(() => getLocalFiles(sourceDirectory))
	.then(convertFilesToS3Objects)
	.then(uploadObjects)
	.catch(console.error)
