const fs = require("fs");
const path = require("path");

//修改对应的json文件根目录
const directoryPath = path.join(__dirname, "import");
//导出所有小图文件
const outputFilePath = path.join(directoryPath, "merged.json");

let mergedData = [];

// directoryPath 是个根目录 ，需要遍历目录中的文件夹内的文件
// 遍历目录中的文件夹内的文件
// 读取目录中的文件
// 读取文件中的内容
// 将文件中的内容合并到 mergedData 中
// 将合并后的数据写入到 outputFilePath 中
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        files.forEach((file) => {
          const filePath1 = path.join(filePath, file);
          fs.readFile(filePath1, "utf8", (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return;
            }
            // console.log(`filePath1`, filePath1);
            const jsonData = JSON.parse(data);
            if (jsonData[1] && jsonData[1][0] == "1bd1c2c98") {
              mergedData.push(jsonData[5][0]);
              console.log(`mergedData.lengtjh`, mergedData.length);
            }
          });
        });
      });
    }
  });

  // 等待所有文件读取完成后再将合并后的数据写入到 outputFilePath 中
  setTimeout(() => {
    fs.writeFile(outputFilePath, JSON.stringify(mergedData, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("Merged data written to merged.json");
    });
  }, 5000);
});
