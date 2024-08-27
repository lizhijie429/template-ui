import fs from "node:fs";
import path from "node:path";

/**
 * 删除分布目录下的所有文件和子目录
 * @param distPath - 待清空的分布目录路径如果该目录不存在，则不会执行任何操作
 */
export default async function deleteDirectory(distPath: string) {
  if (!fs.existsSync(distPath)) {
    return;
  }

  const files = fs.readdirSync(distPath);

  // 使用 Promise.all 来等待所有文件/目录的删除完成
  await Promise.all(
    files.map(async (file) => {
      const curPath = path.resolve(distPath, file);
      try {
        const isDirectory = fs.statSync(curPath).isDirectory();
        isDirectory ? await deleteDirectory(curPath) : fs.unlinkSync(curPath);
      } catch (error) {
        console.error(`Error deleting ${curPath}:`, error);
      }
    })
  );

  fs.rmdirSync(distPath);
}
