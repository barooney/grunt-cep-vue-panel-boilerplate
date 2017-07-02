/**
 * Copyright 2017 Daniel Baron
 * All rights reserved.
 */

"use strict";

module.exports = function (grunt)
{
	grunt.initConfig({

		browserify: {
			dist: {
				options: {
					transform: ['vueify', ['babelify', {presets: ['es2015', 'stage-3']}]]
				},
				files: { 'src/js/app.js': ['src/js/boilerplate.js', 'components/**/*.vue'] }
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'src/css/**.css',
						'src/js/**.js',
						'src/*.html'
					]
				},
				options: {
					server: "./src",
					open: false,
					watchTask: true,
					livereload: true
				}
			}
		},

		// Extension debug and packaging
		cep: {
			options: require('./bundle/cep-config.js'),

			debug: {
				options: {
					profile: 'launch',
				},
			},

			release: {
				options: {
					profile: 'package',
				},
			},
		},

		copy: {
			main: {
				files: [
					// includes files within path and its sub-directories
					{expand: true, cwd: 'node_modules/topcoat/font', src: '**', dest: 'src/fonts/'},
					{expand: true, cwd: 'node_modules/font-awesome/fonts', src: '**', dest: 'src/fonts/'},
					{src: 'src/boilerplate.html', dest: 'src/index.html'}

				],
			},
			redirect: {
				files: [
					{
						src: 'src/redirect.html',
						dest: 'src/index.html',
					}
				]
			}
		},

		sass: {
			options: {
				sourceMap: false,
			},
			dist: {
				files: {
					'src/css/style.css': 'sass/style.scss'
				}
			}
		},

		watch: {
			styles: {
				files: 'sass/style.scss',
				tasks: ['sass'],
				options: {
					spawn: false,
				}
			},
			scripts: {
				files: ['src/js/boilerplate.js', 'components/**/*.vue', 'components/**/*.js', 'mixins/**/*.js', 'plugins/**/*.js'],
				tasks: ['browserify'],
				options: {
					spawn: false,
				}
			},
			extendscript: {
				files: ['src/extendscript/**/*'],
				tasks: ['cep:debug'],
				options: {
					spawn: false,
				}
			}
			
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-vueify');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Load grunt-cep tasks
	grunt.loadNpmTasks("grunt-cep");

	grunt.registerTask('build', ['sass', 'browserify', 'copy:main']);
	grunt.registerTask('debug', ['sass', 'browserify', 'copy:main', 'copy:redirect', 'cep:debug', 'browserSync', 'watch']);
	grunt.registerTask('default', ['build', 'cep:debug']);
};