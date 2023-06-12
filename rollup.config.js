import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/type-master.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/type-master.iife.js',
      format: 'iife',
      name: 'typeMaster'
    },
    {
      file: 'dist/type-master.cjs.js',
      format: 'cjs'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
      babelHelpers: false,
    })
  ]
};
