module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: ['test/**/*.js', 'index.js'],
      options: {
        jshintrc: true
      }
    },
    shell: {
      bower: {
        command: './node_modules/.bin/bower install'
      },
      cc: {
        command: [
          'java -jar vendor/closure-compiler/closure-compiler.jar',
          '--compilation_level ADVANCED_OPTIMIZATIONS',
          '--externs ./vendor/angular.externs.js',
          '--externs ./vendor/jquery.externs.js',
          '--js ./dist/angular-confirm.js',
          '--js_output_file ./dist/angular-confirm.min.js'
        ].join(' ')
      }
    },
    copy: {
      dist: {
        src: './index.js',
        dest: './dist/angular-confirm.js',
      },
    },
    clean: {
      dist: [
        './dist/angular-confirm.js',
        './dist/angular-confirm.min.js'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('generate-dist', ['jshint', 'copy:dist', 'shell:cc']);
  grunt.registerTask('install', ['shell:bower']);
};