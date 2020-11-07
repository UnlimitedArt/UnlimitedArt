const { connection } = require("../../Data-Base/database");

exports.index = function (req, res) {
  message = "";
  if (req.method == "POST") {
    var client = 2;
    console.log("i'm heeere");
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    console.log("file data => ", req.files.file.data);
    console.log("file mimetype => ", req.files.file.mimetype);
    console.log("file name =>", req.files.file);
    console.log("req files =>", req.files);
    var file = req.files.file;
    var img_name = file.name;
    if (file.mimetype == "image/gif" ||file.mimetype == "image/jpeg" || file.mimetype == "image/png" ) {
      file.mv("client/dist/uploadedImages/" + file.name, function (err) {
            console.log("====>",img_name)
      });
    } else {
      message =
        "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.send({ message: message });
    }
  } else {
    message = "error";
    res.send({ message: message });
  }
};