import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import obfuscator from "rollup-plugin-obfuscator";

export default defineConfig({
  build: {
    outDir: "../dist",
    minify: "terser",
    sourcemap: false,
    rollupOptions: {
      input: ["./src/index.ts"],
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
    dts({
      entryRoot: "./src",
      outDir: resolve(__dirname, "../dist/types"),
      tsconfigPath: "./tsconfig.json",
    }),
    obfuscator({ global: false, options: { compact: true, simplify: true } }),
  ],
});
