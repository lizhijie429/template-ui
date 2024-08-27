import fs from "node:fs";
import path from "node:path";

/**
 * 将指定src目录下的所有文件剪切到指定目标dest目录下
 * @param src 源目录
 * @param dest 目标目录
 */
export default async function copyDirectory(src: string, dest: string) {
  const files = fs.readdirSync(src);
  files.forEach((item) => {
    const itemPath = path.join(src, item);
    const itemStat = fs.statSync(itemPath); // 获取文件信息
    const savedPath = path.join(dest, itemPath.replace(src, ""));
    const savedDir = savedPath.substring(0, savedPath.lastIndexOf("\\"));
    if (itemStat.isFile()) {
      // 如果目录不存在则进行创建
      if (!fs.existsSync(savedDir)) {
        fs.mkdirSync(savedDir, { recursive: true });
      }
      // 写入到新目录下
      const data = fs.readFileSync(itemPath);
      fs.writeFileSync(savedPath, data);
      // 并且删除原文件
      fs.unlinkSync(itemPath);
    } else if (itemStat.isDirectory()) {
      copyDirectory(itemPath, path.join(savedDir, item));
    }
  });
  // 并且删除原目录
  fs.rmdirSync(src);
}
