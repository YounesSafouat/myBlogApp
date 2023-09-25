const express = require("express");
const { alreadyAuth, requireAuth } = require("../middleware/authMiddleware");
const { index, create,store, update, destroy, find } = require("../controllers/PostController");
const multer = require('multer');
const path = require('path');

const moment = require("moment");

const currentTime = moment().format("YYYY-MM-DD HH:mm:ss").replace(' ','').replace('-','').replace(':','');
const storage = multer.diskStorage({
     destination : (req,file,cb)=>{
       cb(null,'public/pictures')
     },
     filename : (req,file,cb)=>{
       console.log(file);
       cb(null,currentTime.toString() +Math.floor(Math.random() * 10) + 1+ path.extname(file.originalname))
     }
   })
   const upload = multer({storage:storage})
const router = express.Router();
router.get("/all",requireAuth,index);
router.get("/",requireAuth,create);
router.post("/",requireAuth,upload.single('image'),store);
router.post("/update/:id",requireAuth,update);
router.post("/delete/:id",requireAuth,destroy);
// router.get("/tags/:name", find);

module.exports = router;
