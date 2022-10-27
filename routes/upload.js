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
    let day = date.getDate();
    let dir = "public/uploads/" + year + month + day;
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
    let fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

let upload = multer({ storage });
//上传图片的接口
router.post("/portrait", upload.single("imgFile"), async (ctx) => {
  let path = ctx.req.file.path;
  let { username } = ctx.header;
  path = ctx.origin + "" + path.replace("public", "");
  console.log(typeof path);
  console.log(username);
  const test = await Users.find({username})
  console.log(test);
  await Users.updateOne({ username }, { $set: { portrait: path }})
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

module.exports = router;
