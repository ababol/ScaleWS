module.exports = function(grunt) {
  ['grunt-contrib-jshint',
    'grunt-contrib-sass',
    'grunt-contrib-watch',
    'grunt-express-server'].forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      files: '**/*.js',
      options: { jshintrc: '.jshintrc' }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/styles',
          src: ['*.scss'],
          dest: 'public/styles',
          ext: '.css'
        }]
      }
    },
    watch: {
      scriptsApp: {
        files: ['*.js', 'app/**/*.js', '!gruntFile.js'],
        tasks:  ['express:dev'],
        options: {
          spawn: false // Without this option specified express won't be reloaded
        }
      },
      styles: {
        files: 'public/styles/**/*.scss',
        tasks: ['sass:dist']
      }
    },
    express: {
      options: {
        port: 1337
      },
      dev: {
        options: {
          script: 'app.js'
        }
      },
      release: {
        options: {
          script: 'app.js',
          background: true
        }
      }
    }
  });

  grunt.registerTask('validate', ['jshint']);
  grunt.registerTask('dev', ['sass', 'express:dev', 'watch']);
};
