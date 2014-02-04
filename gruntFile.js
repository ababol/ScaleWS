module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/css/style.css': 'client/styles/style.scss'
        }
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
      sass: {
        files: '/client/styles/style.css',
        tasks: ['sass:dist']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass:dist', 'browserify:dist']);
}