import { spawn } from "child_process";

export default async (command: string, path: string) => {
  // 验证命令和参数
  const validateCommand = (cmd: string) => {
    const validCommands = ["pnpm"];
    return validCommands.includes(cmd);
  };
  //cmd表示命令，args代表参数，如 rm -rf  rm就是命令，-rf就为参数
  const [cmd, ...args] = command.split(" ");

  if (!validateCommand(cmd)) {
    throw new Error(`Invalid command: ${cmd}`);
  }

  return new Promise((resolve, reject) => {
    try {
      const app = spawn(cmd, args, {
        cwd: path, // 执行命令的路径
        stdio: "inherit", // 输出共享给父进程
        shell: process.platform === "win32", // 根据平台决定是否启用shell模式
      });

      // 监听错误事件
      app.on("error", (err) => {
        reject(err);
      });

      // 执行完毕关闭并resolve
      app.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Command failed with code ${code}`));
        } else {
          resolve(null);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
