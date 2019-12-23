module.exports = function(grunt) {
    grunt.initConfig({
          sass: {
            dev: {
              files: {
                'public/css/main.css': 'public/css/scss/main.scss'
              }
            }
          },
          nodemon: {
            dev: {
              script: 'server.js'
            }
          },
          watch: {
            sass: {
              files: '**/*.scss',
              tasks: ['sass']
            }
          },
          concurrent: {
            dev: {
              tasks: ['nodemon', 'watch'],
              options: {
                logConcurrentOutput: true
              }
            }
          }
    });

    grunt.registerTask('default', ['concurrent']);

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

};