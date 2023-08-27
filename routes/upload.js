/*
 * @Author: xiangyue_li
 * @Date: 2023-08-27 15:07:17
 * @LastEditors: xiangyue_li
 */
const Users = require("../model/users");
const multer = require("koa-multer");
const fs = require("fs");
const path = require("path");
const router = require("koa-router")();
router.prefix("/upload");

let storage = multer.diskStorage({
  //设置文件的存储位置
  destination: function (req, file, cb) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dir = "public/uploads/" + year + month;
    console.log(dir);
    //判断目录是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    //设置上传文件的名称
    let fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

let upload = multer({ storage });
//上传图片的接口
router.post("/portrait", upload.single("imgFile"), async (ctx) => {
  let path = ctx.req.file.path;
  console.log(ctx.header);
  let { username } = ctx.header;
  username = decodeURIComponent(username)
  console.log(username);
  path = ctx.origin + "" + path.replace("public", "");
  deleteImg(username)
  await Users.updateOne({ username }, { $set: { portrait: path } })
    .then((res) => {
      if (res) {
        ctx.body = {
          url: path,
          code: 200,
          msg: "更换头像成功",
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "更换头像失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "服务端错误",
        err,
      };
    });
});
//删除图片
const deleteImg = async (username) => {
  const res = await Users.findOne({ username }); //第一次上传时没图片的bug
  if (res.portrait) {
    let path = portrait.match(/uploads\\(\d{6})\\(.*)/);
    let url = "public/" + path[0];
    if (fs.existsSync(url)) {
      //判断给定的路径是否存在
      fs.unlinkSync(url);
      console.log("删除图片成功");
    }
  }
};
module.exports = router;
