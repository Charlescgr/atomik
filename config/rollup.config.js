import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import glob from 'glob';
import path from 'path';
import json from '@rollup/plugin-json';
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';

const createIndex = () => ({
  name: 'create-index',
  generateBundle() {
    ['atoms', 'molecules', 'organisms', 'widgets'].map((type) => {
      glob.sync(path.resolve(process.cwd(), `./src/components/${type}/**/index.js`)).map((str) => {
        let name = str.match('index.js')
          ? str.match(/\/(.+)\/index.js/)[0]
          : str.match(/\/(.+).js/)[0];

        name = name.split('/')[name.split('/').length - 2];

        const targDir = path.dirname(`./dist/${type}/${name}/index.js`);
        if (!fs.existsSync(targDir)) {
          fs.mkdirSync(targDir, { recursive: true });
        }

        fs.writeFileSync(`./dist/${type}/${name}/index.js`, `module.exports = require('./${name}.js');`);
      });
    });
  }
});

const components = {
  input: 'src/index.js',
  external: (id) => /^react|styled-jsx|next|chroma-js|prop-types|polished|object.omit|@iconify/.test(id),
  context: 'null',
  moduleContext: 'null',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: false,
      preserveModules: true,
      preserveModulesRoot: 'src/components',
      exports: 'auto'
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'runtime',
      babelrc: false,
      inputSourceMap: true,
      sourceMaps: 'both',
      presets: [
        ['@babel/env', { modules: false }],
        ['@babel/react'],
      ],
      plugins: [
        ['@babel/plugin-proposal-export-default-from'],
        ['@babel/plugin-transform-runtime', { useESModules: true }],
        ['styled-jsx/babel'],
      ],
      exclude: ['node_modules/**'],
    }),
    commonjs(),
    nodeResolve({
      preferBuiltins: false
    }),
    createIndex(),
    terser(),
    json(),
    // sizeSnapshot({ snapshotPath: 'dist/size-snapshot.json' }),
  ],
  watch: {
    clearScreen: true,
  },
};

export default [
  components
];
