# Hieper.co

> Hieper.co: statically generated site from Markdown files stored on Dropbox

## Todo

- [ ] `dropbox-get-files` needs support for pagination
- [ ] `s3-empty-bucket` fix pagination for listObjectsV2 so that buckets of over 1000 files get emptied too
- [ ] Rewrite build-pages into command line tool w/ configurable site name
- [ ] Write tests

## Q

### Why not use an existing upload-to-s3 npm package
For simplicity, I simply upload all files in the build destination folder one by one into an empty S3 bucket. No support for content encoding or streams.

### Why not make use of Travis’s out of the box S3 deployment tools
- It’s slower than my solution
- It can’t empty a bucket beforehand, so I need some S3 implementation anyway, which is already half the work of doing a simple multiple file upload.
