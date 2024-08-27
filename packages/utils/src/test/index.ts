/**
 * 构建函数
 *
 * 此函数用于输出指定版本信息
 * 主要用于在构建过程中记录当前版本，以便于开发人员了解代码库的当前状态
 * @param version - 版本号字符串，表示软件或项目的版本
 */
export const build = (version: string) => {
  // 输出版本信息到控制台
  console.log("version :>> ", version);
};
