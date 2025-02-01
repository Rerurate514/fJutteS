import terser from '@rollup/plugin-terser';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.mjs',
      format: 'es'
    }
  ],
  plugins: [
    terser({
      compress: {
        dead_code: true,
        conditionals: true,
        collapse_vars: true
      },
      mangle: {
        keep_classnames: true,
        keep_fnames: true
      },
      format: {
        comments: false,
        beautify: false
      },
      ecma: 2015
    })
  ]
};
