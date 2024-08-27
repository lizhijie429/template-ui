import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { Command } from "commander";

import run from "./run";
import deleteDirectory from "./delete";
import copyDirectory from "./copy";
import buildComponents from "./build";

const accessAsync = promisify(fs.access);
const __filenameNew = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenameNew);
const program = new Command();

const buildActions = async (script: any, options: any) => {
  const pathStr = `../../${script}`;
  const componentPath = path.resolve(__dirname, pathStr);
  const distPath = path.resolve(__dirname, "../../");

  try {
    await accessAsync(componentPath, fs.constants.F_OK);
  } catch (error) {
    throw new Error(`The path does not exist: >> ${componentPath}`);
  }

  // 清除dist目录
  if (options.clean) {
    console.info("正在清理dist目录……");
    await deleteDirectory(`${distPath}/dist`);
    await deleteDirectory(`${componentPath}/dist`);
  }
  // 打包utils
  if (script === "utils") {
    console.info("正在编译中……");
    await run(`pnpm run build`, componentPath);
    await copyDirectory(`${distPath}\\dist`, `${componentPath}\\dist`);
  }
  // 打包components
  if (script === "components") {
    console.info("正在编译中……");
    await buildComponents(componentPath, distPath);
    await copyDirectory(`${distPath}\\dist`, `${componentPath}\\dist`);
  }
  // 发布到npm
  if (options.publish) {
    console.info("即将修改版本号并推送到npm镜像。");
    await run(`pnpm run release ${options.publish}`, componentPath);
  }
};

program
  .command("build <script>")
  .description("Package Components Business Component Library")
  .option("-p, --publish <level>", "Publish to npm")
  .option("-c, --clean", "Clear the build directory")
  .action(buildActions);

program.parse();
