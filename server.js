const ghost = require("ghost");
const express = require("express");
const urlService = require("./node_modules/ghost/core/frontend/services/url");
const parentApp = express();

// Run a single Ghost process
ghost()
  .then(function(ghostServer) {
    // for making subdir work
    parentApp.use(urlService.utils.getSubdir(), ghostServer.rootApp);
    ghostServer.start(parentApp);
  })
  .catch(error => {
    console.error(`Ghost server error: ${error.message} ${error.stack}`);
    process.exit(1);
  });