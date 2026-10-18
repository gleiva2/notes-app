const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    // The API (api/server.js, PORT 3002) is same-origin in development: the dev server proxies /notes
    // to it, so the app also works when opened from another device (a phone).
    proxy: {
      "/notes": { target: "http://localhost:3002" },
    },
  },
});
