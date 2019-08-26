const aws = require('aws-sdk')
const s3 = new aws.S3()

const Bucket = process.env.AWS_BUCKET

// listObjectsV2 returns max 1000 objects, should be enough for a while
module.exports = async () => {
	const objects = await s3.listObjectsV2({ Bucket }).promise()
	return Promise.all(objects.Contents.map(object => s3.deleteObject({ Bucket, Key: object.Key }).promise()))
}
