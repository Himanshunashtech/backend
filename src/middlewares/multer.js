import multer from "multer";
    
// const AWS=require ("aws-sdk")
// const s3= new AWS.S3();



// s3.client.putObject({
//     Bucket: bucketName,
//     Key: 'Folder/image.jpg',
//     Body: data
// }, function (res) {
//         console.log('Successfully uploaded file.');
//     })




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return   cb(null, "./public/temp"); 
    },
    filename: function (req, file, cb) {
     return  cb(null, file.originalname); 
    }
});

export const upload = multer({ storage: storage });
