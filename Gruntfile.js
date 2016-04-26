module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	concat: {
		options: {
			separator: ';',
		},
		dist: {
			src: ['assets/js/material.min.js', 'assets/js/dragula.min.js', 'assets/js/sanitizer.js', 'assets/lib/config.js', 'assets/lib/firebase.js', 'assets/lib/utils.js', 'assets/lib/sticky.js', 'assets/lib/init.js'],
			dest: 'assets/js/sticky.js',
		},
	},
    uglify: {
    	options: {
        	banner: '/*! ttf.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      	},
      	build: {
        	src: 'assets/js/sticky.js',
        	dest: 'assets/js/sticky.min.js'
     	}
    },
	less: {
		dist: {
			options: {
				paths: ["css"]
			},
			files: {
				"assets/css/style.css": "assets/css/styles.less"
			}
		},
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  // task(s).
  grunt.registerTask('build', ['concat:dist', 'uglify', 'less:dist']);
  grunt.registerTask('devel', ['concat:dist', 'less:dist']);
  grunt.registerTask('default', ['build']);
};
