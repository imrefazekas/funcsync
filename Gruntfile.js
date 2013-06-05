module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		jshint: {
			options: {
				force: true
			},
			all: [ './funcsync.js' ]
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'./funcsync.min.js': ['./funcsync.js']
				}
			}
		}
	});

	grunt.registerTask('default', 'jshint', 'uglify');
};