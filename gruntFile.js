module.exports = function(grunt) {
  ['grunt-contrib-jshint',
    'grunt-contrib-sass',
    'grunt-contrib-uglify',
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
        port: 80
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
    },
    uglify: {
      options: {
        compress: true,
        report: 'gzip'
      },
      my_target: {
        files: {
          'public/js/bundle.js': "public/js/bundle.js"
        }
      }
    }
  });

  grunt.registerTask('validate', ['jshint']);
  grunt.registerTask('dev', ['sass', 'express:dev', 'watch']);
  grunt.registerTask('release', ['sass', 'uglify', 'express:release']);
};
