import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/type-analyser.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/type-analyser.esm.min.js', 
      format: 'esm',
      plugins: [terser()],
      sourcemap: true
    },    
    {
      file: 'dist/type-analyser.iife.js',
      format: 'iife',
      name: 'typeAnalyser'
    },
    {
      file: 'dist/type-analyser.iife.min.js',
      format: 'iife',
      name: 'typeAnalyser',
      plugins: [terser()],
      sourcemap: true
    },    
    {
      file: 'dist/type-analyser.cjs',
      format: 'cjs'
    },
    {
      file: 'dist/type-analyser.cjs.min',
      format: 'cjs',
      plugins: [terser()],
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      "targets": {
        "esmodules": true
      },
      babelHelpers: 'bundled',
    })
  ]
};
