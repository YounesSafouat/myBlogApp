
const cookieParser = require("cookie-parser");
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const logger = require("./config/logger");
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
mongoose
  .connect("mongodb://127.0.0.1:27017/product")
  .then(() => {
    logger.info("connected to MongoDB");
    app.listen(PORT,() =>{
      logger.info('on port '+ PORT);
      logger.info(`your starting route is : http://localhost:${PORT}`);
    })
  })
  .catch((err) => console.log(err));
app.use("/pictures", express.static(__dirname + "/public"));
app.use("/cssfile", express.static(__dirname + "/public"));
app.use("/jsfile", express.static(__dirname + "/public"));

const PORT = process.env.PORT || 4000;
const productRouter = require('./routes/web')
const userRouter = require('./routes/webAuth')
const postsRouter = require('./routes/webPosts')
const tagsRouter = require('./routes/webTags');



app.use('/',productRouter)
app.use('/user',userRouter)
app.use('/posts',postsRouter)
app.use('/tags',tagsRouter)

