'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//Define paths
		js_dist_path:'public/assets/js',
		css_dist_path:'public/assets/css',
		app_build_path:'public/app/',
		components_build_path:'public/app/components/',
		shared_build_path:'public/app/shared/',
		

	  traceur: {
      options: {
        traceurRuntime: 'node_modules/traceur/bin/traceur-runtime.js',
        traceurCommand: 'node_modules/traceur/src/node/command.js',
        //includeRuntime: true, will be added to the build file
        sourceMaps: true,
        experimental: true,

      },
      all: {
        files: {
          'public/assets/build/app.transpiled.module.js': ['public/app/app.module.js']
        }
      }
    },

	  less: {
	  	build: {
	  		files:[{
	  			expand: true,
	  			cwd: '<%=app_build_path%>',
	  			src: ['**/*.less'],
	  			dest: '<%=css_dist_path%>',
	  			ext: '.css',
	  			flatten: true
	  		}]
	  	}
	  },


	  concat:{
			css:{
				files:[{
					src:['<%=css_dist_path%>/*.css','!<%=css_dist_path%>/*.concat.css','!<%=css_dist_path%>/*.concat.min.css'],
					dest:'<%=css_dist_path%>/the-one-roomStyle.concat.css'
				}]
			}
		},

		autoprefixer: {
			dist: {
				options: {
					browsers: ['last 2 versions', 'ie 8', 'ie 9']
				},
				files: {
					'<%=css_dist_path%>/the-one-roomStyle.concat.css': '<%=css_dist_path%>/the-one-roomStyle.concat.css'
				}
			}
		},

		cssmin:{
			all:{
				files:[{
					expand: true,
					cwd: '<%=css_dist_path%>',
					src: ['*.concat.css'],
					dest: '<%=css_dist_path%>',
					ext: '.min.css',
					extDot: 'last',
					flatten: true
				}]
			}
		},

		watch: {
			css: {
				files: ['<%=components_build_path%>/**/*.less','<%=shared_build_path%>/**/*.less'],
				tasks: ['less','concat:css','autoprefixer','cssmin']
			},
			js:{
				files: ['<%=app_build_path%>/**/*.js'],
				tasks: ['traceur']
			}
		},

		nodemon: {
			dev: {
				script: 'init.js'
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		}

  });

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-cssmin');	
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-concurrent');
grunt.loadNpmTasks('grunt-traceur-simple');

grunt.registerTask('default', ['less', 'traceur', 'concat:css', 'autoprefixer', 'cssmin', 'concurrent']);
};