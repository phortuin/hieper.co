const aws = require('aws-sdk')
const s3 = new aws.S3()

const Bucket = process.env.AWS_BUCKET

/**
 * Empty S3 bucket by deleting all keys one by one
 * Note: listObjectsV2 returns max 1000 objects, no pagination implemented yet
 *
 * @return {Promise}
 */
module.exports = async () => {
	try {
		const objects = await s3.listObjectsV2({ Bucket }).promise()
		return Promise.all(objects.Contents.map(deleteS3Object))
	} catch(error) {
		return Promise.reject(error)
	}
}

function deleteS3Object(object) {
	return s3.deleteObject({
		Bucket,
		Key: object.Key
	}).promise()
}
