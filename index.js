const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
// single file upload er jonno [upload.single("avatar")]
// multiple file uploading er jonno [upload.array("avatar" , 3)] (max 3 file upload korte parbe tar theke beshi dile error dibe)
// multiple fields uploading er jonno [upload.fields([{name: "avatar" , maxCount: 1}])] eivabe zoto eccha dite parbo
// multer form data pawyar jonno [upload.non()] call korte hoy ebong form er data gula sob req.body er moddhe thake
// storage re sob kichu set kore deya zey [multer.diskStorage({ destination: (req , file , cb) {cb(null , [folderName])}})]
// 1000 kilobite * 1000 bite ==- 1mb

// customize file name [multer.diskStorage];
const uploadFolder = "./uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("-") + Date.now();
    cb(null, filename + fileExt);
  },
});

// img uploading with multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000 * 1000, // 1mb
  },
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg . jpeg .png format allowed"));
      }
    } else {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only pdf format allow"));
      }
    }
  },
});

app.post(
  "/",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "doc", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send("Hello Would");
  }
);

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was a upload Error");
    }
    res.status(500).send(err.message);
  } else {
    res.send("success");
  }
}

app.listen(3000, () => {
  console.log("app listing at port 3000");
});
