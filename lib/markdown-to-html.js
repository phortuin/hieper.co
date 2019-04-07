const markdownTitle = require('markdown-title')
const markdownDescription = require('markdown-description')
const nunjucksRenderer = require('./nunjucks-renderer')

module.exports = (slug, markdown) => {
	let title = markdownTitle(markdown)
	let description = markdownDescription(markdown, { concatLines: true })
	return nunjucksRenderer.render('page.html', {
		slug,
		markdown,
		title,
		description
	})
}
