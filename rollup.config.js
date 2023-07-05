import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/type-master.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/type-master.esm.min.js', 
      format: 'esm',
      plugins: [terser()],
      sourcemap: true
    },    
    {
      file: 'dist/type-master.iife.js',
      format: 'iife',
      name: 'typeMaster'
    },
    {
      file: 'dist/type-master.iife.min.js',
      format: 'iife',
      name: 'typeMaster',
      plugins: [terser()],
      sourcemap: true
    },    
    {
      file: 'dist/type-master.cjs',
      format: 'cjs'
    },
    {
      file: 'dist/type-master.cjs.min',
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
