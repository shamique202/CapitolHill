const Post = require("../models/post");
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
    create,
    index,
    deletePost
};

async function deletePost(req, res) {
    try {     
        const post = await Post.findByIdAndDelete(req.params.id);
        res.json({data: 'post is removed'})
    } catch(err){ 
        console.log(err, "<- catch error for deletepost")
        res.status(400).json({err})
    }
  }
    
  function create(req, res) {
      console.log(req.body, "<--- req.body", req.file, "req.file", req.user, "req.user"); // now uploads files to AWS
      const filePath = `${uuidv4()}/${req.file.originalname}`;
      const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };
      console.log(filePath, "<---- filePath", params, "params")
      s3.upload(params, async function (err, data) {
        console.log(err, " <--- shows error from aws in postcreate");
    
        try {
          const post = await Post.create({
            description: req.body.description,
            photoUrl: data.Location,
            user: req.user
          });
          console.log(post, "<-- success")
          res.status(201).json({ post: post });
        } catch (err) {
          res.status(400).json({ err });
        }
      });
  }
  
  async function index(req, res) {
      try {
       //clients information is shown here
        const posts = await Post.find({}).populate("user").exec();
        res.status(200).json({ posts: posts });
      } catch (err) {
        res.status(400).json({ err });
      }
  }
