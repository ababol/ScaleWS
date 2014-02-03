module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/stylesheets/css/style.css': 'public/stylesheets/sass/style.scss'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'public/javascripts/bundle.js': "public/javascripts/main.js"
        }
      }
    },
    watch: {
      sass: {
        files: '/public/stylesheets/style/style.css',
        tasks: ['sass:dist']
      },
      browserify: {
        files: 'public/javascripts/bundle.js',
        tasks: ['browserify:dist']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass:dist', 'browserify:dist']);
}