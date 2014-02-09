module.exports = function(grunt) {
  ['grunt-browserify',
    'grunt-contrib-jshint',
    'grunt-contrib-sass',
    'grunt-contrib-uglify',
    'grunt-contrib-watch',
    'grunt-express-server',
    'grunt-concurrent'].forEach(grunt.loadNpmTasks);

  var open = true;

  grunt.initConfig({
    jshint: {
      files: '**/*.js',
      options: { jshintrc: '.jshintrc' }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'client/styles',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },
    browserify: {
      dist: {
        files: {
          'public/js/bundle.js': "client/scripts/main.js"
        }
      }
    },
    watch: {
      scriptsClient: {
        files: ['client/**/*.js'],
        tasks: 'browserify'
      },
      scriptsApp: {
        files: ['app/**/*.js'],
        tasks: 'express',
        options: {
          spawn: false // Without this option specified express won't be reloaded
        }
      },
      styles: {
        files: '**/*.scss',
        tasks: 'sass'
      }
    },
    express: {
      options: {
        port: 3000,
        background: false
      },
      dev: {
        options: {
          script: 'app.js'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/js/bundle.js': "public/js/bundle.js"
        }
      }
    },
    concurrent: {
      target: {
        tasks: ['express', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('validate', ['jshint']);
  grunt.registerTask('dev', ['sass', 'browserify', 'concurrent']);
  grunt.registerTask('release', ['sass', 'browserify', 'uglify', 'express']);
}