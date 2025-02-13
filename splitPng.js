const sharp = require("sharp");
const fs = require("fs");

// 替换合图文件路径
const atlasImagePath = "origin.png";

// 小图参数
const smallImagesData = [
  //将merged.json中的数据复制到这里
];

// 输出目录
const outputDir1 = "output1";
const outputDir2 = "output2";

async function splitTextureAtlas(atlasImagePath, smallImagesData, outputDir) {
  try {
    // 创建输出目录
    if (!fs.existsSync(`output1`)) {
      fs.mkdirSync(`output1`, { recursive: true });
    }
    // 创建输出目录
    if (!fs.existsSync(`output2`)) {
      fs.mkdirSync(`output2`, { recursive: true });
    }

    // 读取大图
    const image = sharp(atlasImagePath);

    // 处理每个小图
    for (const imgData of smallImagesData) {
      const { name, rect, offset, originalSize, rotated } = imgData;

      // 解析 rect 参数
      let [x1, y1, x2, y2] = rect;
      let width = x2;
      let height = y2;

      // 处理旋转
      let extractWidth = width;
      let extractHeight = height;
      if (rotated) {
        [extractWidth, extractHeight] = [height, width];
      }

      // 提取小图
      let outputPath = `${outputDir1}/${name}.png`;
      if (rotated) {
        outputPath = `${outputDir2}/${name}.png`;
      }
      await image
        .clone()
        .extract({
          left: x1,
          top: y1,
          width: extractWidth,
          height: extractHeight,
        })
        .resize(originalSize[0], originalSize[1], {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // 透明背景
        })
        .toFile(outputPath);

      console.log(`已生成: ${outputPath}`);
    }

    console.log("合图拆解完成");
  } catch (err) {
    console.error("拆解过程中发生错误:", err);
  }
}

// 执行拆解
splitTextureAtlas(atlasImagePath, smallImagesData, outputDir1);
