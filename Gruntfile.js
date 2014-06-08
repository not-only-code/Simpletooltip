module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            banner:
                '/**\n' +
                ' * <%= pkg.description %>\n' +
                ' * v<%= pkg.version %>\n' +
                ' *\n' +
                ' * <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * Distributed under <%= pkg.license %> license\n' +
                ' *\n' +
                ' * <%= pkg.homepage %>\n' +
                ' */\n\n'
        },
        less: {
            dev: {
                options: { cleancss: false },
                files: { 'dist/css/stylesheet.css': 'src/css/simpletooltip.less' }
            },
            production: {
                options: { cleancss: true },
                files: { 'dist/css/stylesheet.min.css': 'src/css/stylesheet.less' }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: ['Gruntfile.js', 'src/js/simpletooltip.js', 'test/**/*.js']
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>',
            },
            bundle: {
                options: {
                    beautify: true,
                    compress: false
                },
                files: {
                    'dist/js/simpletooltip.js': ['src/js/simpletooltip.js']
                }
            },
            min: {
                files: {
                    'dist/js/simpletooltip.min.js': ['src/js/simpletooltip.js']
                }
            }
        },
        watch: {
            gruntfile: {
                files: ['Gruntfile.js', 'src/js/simpletooltip.js'],
                tasks: ['jshint', 'uglify']
            },
            css: {
                files: ['src/css/*.less'],
                tasks: ['less']
            }
        }
    });

    /*grunt.loadNpmTasks('grunt-contrib-less');*/
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //grunt.registerTask('default', ['less', 'jshint', 'uglify', 'watch']);
    grunt.registerTask('default', [ 'jshint', 'uglify', 'watch']);
};