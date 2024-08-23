/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import obfuscator from "rollup-plugin-obfuscator";

export default defineConfig({
  test: { environment: "happy-dom" },
  esbuild: { drop: ["console", "debugger"] },
  build: {
    outDir: "./dist",
    minify: "terser",
    sourcemap: false,
    rollupOptions: {
      // 忽略打包vue文件和.scss文件
      external: ["vue", "element-plus", /\.scss/],
      input: ["index.ts"],
      output: [
        {
          // 打包格式
          format: "es",
          // 打包后文件名
          entryFileNames: "[name].mjs",
          // 让打包目录和我们的组件库目录对应
          preserveModules: true,
          exports: "named",
          // 配置打包根目录
          dir: "./dist/es",
        },
        {
          // 打包格式
          format: "cjs",
          // 打包后文件名
          entryFileNames: "[name].js",
          // 让打包目录和我们的组件库目录对应
          preserveModules: true,
          exports: "named",
          // 配置打包根目录
          dir: "./dist/lib",
        },
      ],
    },
    lib: {
      entry: "./src/index.ts",
      name: "@template-ui/components",
    },
    terserOptions: {
      compress: { pure_funcs: ["console.log"], drop_debugger: true },
      output: { comments: false },
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "./src",
      outDir: resolve(__dirname, "./dist/types"),
      //指定使用的tsconfig.json为我们整个项目根目录下，如果不配置，你也可以在components下新建tsconfig.json
      tsconfigPath: "./tsconfig.json",
    }),
    obfuscator({ global: false, options: { compact: true, simplify: true } }),
    {
      name: "style",
      generateBundle(config, bundle) {
        // 这里可以这里可以获取打包后的文件目录以及代码code
        const keys = Object.keys(bundle);
        for (const key of keys) {
          const bundler: any = bundle[key as any];
          //rollup内置方法，将所有输出文件code中的.scss换成.css，因为我们当时没有打包scss文件
          this.emitFile({
            type: "asset",
            fileName: key, //文件名不变，
            source: bundler.code.replace(/\.scss/g, ".css"),
          });
        }
      },
    },
  ],
});
