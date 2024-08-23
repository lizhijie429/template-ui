import run from "./run";
import { series } from "gulp";
import minimist from "minimist";

export const publishComponent = async () => {
  // major（主版本号）、minor（次版本号）、patch（修订号）
  // const options = minimist(process.argv.slice(2));
  run(`release-it`, `../`);
};
export default series(async () => publishComponent());
