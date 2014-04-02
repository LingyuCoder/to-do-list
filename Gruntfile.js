module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        autoprefixer: {
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'src/todo/css/*.css',
                dest: 'static/todo/css'
            },
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/todo/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'static/todo/css/',
                ext: '.css'
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['require', '$scope', 'exports','']
                }
            },
            my_target: {
                files: {
                    'static/todo/js/main.min.js': ['src/todo/js/main.js']
                }
            }
        },
    });
    grunt.registerTask('default', ['autoprefixer', 'cssmin', 'uglify']);
};