const promisify = require('bluebird').promisify
const readFile = promisify(require('fs').readFile)
const mime = require('mime')

module.exports = filePath => {
	return readFile(filePath, 'utf8')
		.then(body => ({
			body,
			mimeType: mime.getType(filePath) || 'application/octet-stream'
		}))
}

