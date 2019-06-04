module.exports = function(grunt) {
  require("jit-grunt")(grunt);
  require("./node_modules/jsql-node-plugin/src/jsql-node-plugin");

  var path = require("path");
  var openPath = path.resolve() + "\\dist\\index.html";

  grunt.initConfig({
    clean: ["./dist/"],

    concat: {
      options: {
        separator: ""
      },
      dist: {
        src: ["src/cases.js"],
        dest: "dist/cases.js"
      }
    },

    copy: {
      src: {
        files: [
          {
            expand: true,
            cwd: "./src",
            src: ["index.html"],
            dest: "./dist"
          }
        ]
      }
    },

    watch: {
      src: {
        files: ["src/*.js", "src/*.html"],
        tasks: ["buildLocal"],
        options: {
          nospawn: true
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      watches: {
        tasks: ["watch:src"]
      }
    },

    open: {
      dist: {
        path: openPath,
        app: "chrome.exe"
      }
    }
  });

  grunt.registerTask("buildDist", ["clean", "copy:src", "concat:dist"]);
  grunt.registerTask("buildLocal", ["clean", "copy:src", "concat:dist"]);

  grunt.registerTask("dev", function() {
    grunt.task.run("buildLocal");
    grunt.task.run("open:dist");
    grunt.task.run("concurrent:watches");
  });

  grunt.registerTask("default", function() {
    grunt.task.run("buildDist");
    grunt.task.run("open:dist");
  });
};

