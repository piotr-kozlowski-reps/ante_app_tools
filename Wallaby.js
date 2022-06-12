module.exports = function () {
  return {
    debug: true,

    files: ["src/**/*.js"],

    tests: ["src/**/*test.js"],

    // compilers: {
    //   "**/*.ts?(x)": wallaby.compilers.typeScript({
    //     module: "commonjs", // jscs:ignore
    //     jsx: "React",
    //   }),
    // },

    env: {
      type: "node",
    },

    setup: function () {
      var jsdom = require("jsdom");
      global.document = jsdom.jsdom(
        "<!doctype html><html><body></body></html>"
      );
      global.window = document.defaultView;
      global.navigator = global.window.navigator;
    },
  };
};
