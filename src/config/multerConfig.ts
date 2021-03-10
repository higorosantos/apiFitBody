import multer, { Options } from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import path from 'path';
import Crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const storageOptions = {
    local:
        multer.diskStorage({
            destination:(req,file,cb)=>{ cb(null,path.resolve(__dirname,'src','temp','uploads')) },
            filename: (req,file,cb)=>{
                Crypto.randomBytes(16,(err,hash)=>{
                     if(err){
                         return cb(err,"");
                     }
                     const filename = `${hash.toString('hex')}_${file.originalname}`;
                     return cb(null,filename)
                })
            }
     
        }),
    s3:multerS3({
        s3: new aws.S3(),
        contentType: multerS3.AUTO_CONTENT_TYPE,
        bucket: `${process.env.BUCKET_NAME}`,
        acl:  "public-read",
        key:(req,file,cb)=>{
            Crypto.randomBytes(16,(err,hash)=>{
                 if(err){
                     return cb(err,"");
                 }
                 const filename = `${hash.toString('hex')}_${file.originalname}`;
                 return cb(null,filename)
            })
        }
    })
}

export const multerOptions:Options = {
   limits:{
       fieldSize: 2 * 1024 * 1024

   },
   storage: storageOptions.s3,
   fileFilter:(req,file,cb)=>{
        const allowedFiles = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/gif"
        ];
        if(allowedFiles.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error("Invalid Type."));
        }
   },
   

}