import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import obfuscator from "rollup-plugin-obfuscator";

export default defineConfig({
  build: {
    outDir: "./dist",
    minify: "terser",
    sourcemap: false,
    rollupOptions: {
      input: ["./src/index.ts"],
      output: [
        {
          format: "es",
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: resolve(__dirname, "./dist/es"),
        },
        {
          format: "cjs",
          //不用打包成.mjs
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: resolve(__dirname, "./dist/lib"),
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
    dts({
      entryRoot: "./src",
      outDir: resolve(__dirname, "./dist/types"),
      tsconfigPath: "./tsconfig.json",
    }),
    obfuscator({ global: false, options: { compact: true, simplify: true } }),
  ],
});
