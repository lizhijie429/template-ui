/// <reference types="vitest" />
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import obfuscator from "rollup-plugin-obfuscator";

const __filenameNew = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenameNew);

// eslint-disable-next-line no-used-vars
export default defineConfig(({ command, mode }) => {
  console.log("command, mode :>> ", command, mode);
  return {
    test: { environment: "happy-dom" },
    esbuild: { drop: ["console", "debugger"] },
    build: {
      outDir: "../dist",
      minify: false,
      sourcemap: false,
      rollupOptions: {
        // 忽略打包vue文件和.scss文件
        external: ["vue", "element-plus", /\.scss/],
        input: ["index.ts"],
        output: [
          {
            format: "es",
            entryFileNames: "[name].mjs",
            preserveModules: true,
            exports: "named",
            dir: "../dist/es",
          },
          {
            format: "cjs",
            entryFileNames: "[name].js",
            preserveModules: true,
            exports: "named",
            dir: "../dist/lib",
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
        outDir: path.resolve(__dirname, "../dist/types"),
        //指定使用的tsconfig.json为我们整个项目根目录下，如果不配置，你也可以在components下新建tsconfig.json
        tsconfigPath: "./tsconfig.json",
      }),
      obfuscator({ global: false, options: { compact: true, simplify: true } }),
      {
        name: "vite-plugin-style-inject",
        apply: "build", // 应用模式
        enforce: "post", // 作用阶段
        generateBundle(options, bundle) {
          const keys = Object.keys(bundle);
          for (const key of keys) {
            const bundler: any = bundle[key as string];
            if (
              bundler.type === "chunk" &&
              bundler.code.includes("vue&type=style&index=")
            ) {
              const matchReg = new RegExp(
                `[a-zA-Z]:[/\\\\](?:[^/\\\\]+[/\\\\])*[^/\\\\]+\\.scss`,
                "g"
              );
              this.emitFile({
                type: "asset",
                fileName: key, //文件名不变，
                source: bundler.code.replace(matchReg, "./style/index.css"),
              });
            }
          }
        },
      },
    ],
  };
});
