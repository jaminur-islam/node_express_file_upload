// make directory

/* const dir = "./temp";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, {
    recursive: true,
  });
} */

// fs.open(`${__dirname}/${dir}/${file}.json`, "r+", (err, fileDescriptor) => {});

/* fs.open("mynewfile2.txt", "r+", function (err, fileDescriptor) {
  if (!err && fileDescriptor) {
    fs.write(
      fileDescriptor,
      JSON.stringify([{ name: "sagor", age: 20 }]),
      (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              console.log("successful");
            }
          });
        }
      }
    );
  }
}); */
// https://www.tutorialkart.com/nodejs/create-file-in-nodejs-using-node-fs-module/

/* fs.writeFile("index23.js", "Learn Node FS module", function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});
 */

// writeFile function with filename, content and callback function
fs.writeFile("newfile.js", "Learn Node FS module", function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});
