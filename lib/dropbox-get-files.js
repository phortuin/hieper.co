require('dotenv-safe').config()

const Dropbox = require('dropbox').Dropbox
const fetch = require('node-fetch')
fetch.Promise = require('bluebird')

const options = {
	fetch,
	accessToken: process.env.DROPBOX_ACCESS_TOKEN
}

const dropboxApi = new Dropbox(options)

module.exports = (path = '') => {
	return dropboxApi.filesListFolder({ path })
		.then(response => response.entries)
		.map(file => dropboxApi.filesDownload({ path: file.path_lower }))
}
