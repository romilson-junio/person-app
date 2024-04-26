module.exports = configGrunt;

function configGrunt(grunt) {
    var buildDir = 'dist';
    var srcDir = './app';
    var vendorDir = 'dist/vendor'

    grunt.initConfig({
        copy: {
            dist: {
                src: ['**/**.html'],
                cwd: srcDir,
                dest: buildDir,
                expand: true
            },
            all: {
                src: ['**/**.*'],
                cwd: srcDir,
                dest: buildDir,
                expand: true
            },
            vendor: {
                expand: true,
                cwd: './node_modules',
                src: [
                    /** JS */
                    'angular/angular.js',
                    'angular-route/angular-route.js',
                    'jquery/dist/jquery.slim.min.js',
                    'bootstrap/dist/js/bootstrap.min.js',
                    'popper.js/dist/popper.min.js',
                    'angularjs-toast/angularjs-toast.min.js',
                    'angular-sanitize/angular-sanitize.min.js',
                    'angular-animate/angular-animate.min.js',
                    

                    /** CSS */
                    'bootstrap/dist/css/bootstrap.min.css',
                    'angularjs-toast/angularjs-toast.min.css'
                ],
                dest: vendorDir
            }
        },
        clean: {
            dist: {
                src: ['dist']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        cssmin: {
            dist: {
                expand: true,
                cwd: srcDir,
                src: ['**/*.css'],
                dest: buildDir,
                ext: '.min.css',
                extDot: 'last'
            }
        },
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: srcDir,
                    src: ['**/*.js'],
                    dest: buildDir,
                    ext: '.min.js',
                    extDot: 'last'
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: buildDir
                }
            }
        },
        watch: {
            dev: {
                files: ['app/**/**.*'],
                tasks: ['dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask(
        'default',
        'Padrão...',
        ['dev', 'connect', 'watch']
    );

    grunt.registerTask(
        'dev',
        'Tarefas apenas para desenvolvimento',
        ['clean', 'copy:all', 'copy:vendor']
    );

    grunt.registerTask(
        'build',
        'Builda o projeto...',
        ['clean', 'copy:dist', 'copy:vendor', 'cssmin', 'uglify']
    );
}