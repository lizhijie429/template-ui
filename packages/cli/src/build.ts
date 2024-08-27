import fs from "node:fs";
import { src, dest } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";

import run from "./run";

const sass = gulpSass(dartSass);

/**
 * 错误捕获函数，用于在控制台输出错误信息
 * @param err
 */
const captureError = (err: any) => {
  console.error(err);
};

/**
 * 捕获构建结果
 * @param message
 */
const captureResult = (message: string) => {
  console.log(message);
};

/**
 * 构建样式（vite打包时没有构建css样式）
 * @param componentPath
 * @param distPath
 * @returns
 */
const buildStyle = async (componentPath: string, distPath: string) => {
  try {
    return src(`${componentPath}/src/**/style/**.scss`)
      .pipe(sass().on("error", captureError))
      .on("error", captureError)
      .pipe(autoprefixer())
      .pipe(dest(`${distPath}/dist/lib/src`))
      .pipe(dest(`${distPath}/dist/es/src`))
      .on("finish", () => captureResult("Build style finished."))
      .on("error", captureError);
  } catch (err) {
    console.error("An unexpected error occurred:", err);
  }
};

/**
 * 打包组件（执行的时vite打包）
 * @param componentPath
 */
const buildComponent = async (componentPath: string) => {
  try {
    await run("pnpm run build", componentPath);
  } catch (err) {
    console.error("Build component failed:", err);
  }
};

/**
 * 构建组件库
 * @param componentPath
 * @param distPath
 */
export default async (componentPath: string, distPath: string) => {
  if (!fs.existsSync(componentPath)) {
    throw new Error(`The path does not exist: >> ${componentPath}`);
  }
  try {
    await buildStyle(componentPath, distPath);
    await buildComponent(componentPath);
  } catch (err) {
    console.error("Builder error:", err);
  }
};
