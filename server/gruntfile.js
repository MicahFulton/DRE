module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-istanbul-coverage');
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.registerTask('default', ['jshint', 'express:dev', 'mochaTest']);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    grunt.initConfig({
        jshint: {
            files: ['./test/unit/*.js'], //['gruntFile.js', 'package.json', '*.js', './lib/*.js','./lib/**/*.js','./test/*.js', './test/**/*.js'],
            options: {
                browser: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: false,
                boss: true,
                eqnull: true,
                node: true,
                expr: true,
                globals: {
                    'xit': true,
                    'xdescribe': true,
                    'it': true,
                    'describe': true,
                    'before': true,
                    'after': true,
                    'done': true
                }
            }
        },
        express: {
            dev: {
                options: {
                    script: './server.js'
                }
            }
        },
        watch: {
            all: {
                files: ['./lib/**/index.js', 'config.js', 'gruntFile.js', './models/*.js'],
                tasks: ['default']
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: '10000'
                },
                src: ['test/unit/*.js', 'test/e2e/**/*.js', 'test/e2e/*.js']
            }
        },
        coveralls: {
            options: {
                // LCOV coverage file relevant to every target
                src: 'coverage/lcov.info',

                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            },
            //your_target: {
            // Target-specific LCOV coverage file
            //src: 'coverage-results/extra-results-*.info'
            //},
        },
        coverage: {
            options: {
                thresholds: {
                    'statements': 50,
                    'branches': 25,
                    'lines': 50,
                    'functions': 50
                },
                dir: 'coverage/',
                root: '.'
            }
        }
    });

};
