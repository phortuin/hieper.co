const promisify = require('bluebird').promisify
const mkdir = promisify(require('mkdirp'))
const writeFile = promisify(require('fs').writeFile)

module.exports = destination => {
	return ({ slug, html }) => {
		let dir = slug === 'index' ? destination : `${destination}/${slug}`
		return mkdir(dir).then(() => writeFile(`${dir}/index.html`, html))
	}
}
