import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import analyzer from "rollup-plugin-analyzer";

export default {
  input: `src/index.ts`,
  output: [
    {file: "./dist/rest-utilities.umd.js", name: 'rest-utilities', format: 'umd', sourcemap: true},
    {file: "./dist/rest-utilities.es.js", format: 'es', sourcemap: true},
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    '@nestjs/common',
    '@nestjs/core',
    'crypto'
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    nodeResolve({
      browser: false
    }),
    json(),
    commonjs(),
    // Compile TypeScript files
    typescript(),
    analyzer({
      summaryOnly: true
    })
  ],
};



