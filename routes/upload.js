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
  let { username } = ctx.header;
  path = ctx.origin + "" + path.replace("public", "");
  deleteImg(username)
  await Users.updateOne({ username }, { $set: { portrait: path } })
    .then((res) => {
      if (res) {
        console.log(res);
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
  const { portrait } = await Users.findOne({ username });
  console.log(portrait);
  if (portrait) {
    let path = portrait.match(/uploads\\(\d{6})\\(.*)/);
    console.log(path);
    let url = "public/" + path[0];
    let dir = path[1];
    let fileName = path[2];
    let files = [];
    if (fs.existsSync(url)) {
      //判断给定的路径是否存在
      fs.unlinkSync(url);
      console.log("删除图片成功");
    }
  }
};
module.exports = router;
