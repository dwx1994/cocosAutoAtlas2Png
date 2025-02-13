# cocosAutoAtlas2Png
cocos 打包自动合图 拆成小图


1. 首先找到合图png 和对应的小图json文件，将他们放在同一个文件夹下
2. 执行transformData 脚本，从json文件获取小图对应的坐标信息
3. 执行slpitPng 脚本 将merged.json数组拷贝到执行slpitPng中的smallImagesData数组中，然后执行slpitPng脚本，将小图拆分出来，并保存到output1 output2文件夹中
4. 执行Rotate 脚本 将output2中的文件旋转90度，并保存到output1文件夹中
