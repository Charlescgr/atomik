// styled-jsx/css in tests
// When using styled-jsx/babel-test, styled-jsx/css throws the following error:
// styled-jsx/css: if you are getting this error it means that your `css` tagged template literals were not transpiled.
// to solve this issue you need to mock styled-jsx/css. You can find a guide at the following link https://kevinjalbert.com/jest-snapshots-reducing-styled-jsx-noise/

module.exports = {
  global: () => (''),
  resolve: () => (''),
};
