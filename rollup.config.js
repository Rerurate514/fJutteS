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
    removeComments()
  ]
};

function removeComments() {
  return {
    name: 'remove-comments',
    transform(code) {
      code = code.replace(/\/\/.*/g, '');
      code = code.replace(/\/\*[\s\S]*?\*\//g, '');
      code = code.replace(/^\s*[\r\n]/gm, '');
      
      return {
        code,
        map: null
      };
    }
  };
}
