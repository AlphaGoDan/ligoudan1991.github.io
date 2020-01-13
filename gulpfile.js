let gulp = require('gulp');
let minimist = require('minimist');
let pipe = require('lazypipe');
let plumber = require('gulp-plumber');
let notify = require('gulp-notify');

let sourcemaps = require('gulp-sourcemaps');
let clean = require('gulp-clean');
let browserSync = require('browser-sync');
let reload = browserSync.reload;
let less = require('gulp-less');
let babel = require('gulp-babel');
let pug = require('gulp-pug');
let data = require('gulp-data');
let concat = require('gulp-concat');
let ts = require('gulp-typescript');
let testData = require('./gulp-pug-data');
let cached = require('gulp-cached');
let remember = require('gulp-remember');

let glob = require('glob');
let browserify = require('browserify');
let watchify = require('watchify');
let source = require('vinyl-source-stream');
let tsify = require('tsify');
let fancy_log = require('fancy-log');
let buffer = require('vinyl-buffer');

let options = minimist(process.argv.slice(2), {
    string: ['output', 'command', 'buildOutput'],
    default: {
        output: 'dist',
        command: 'pre'
    }
});

console.log(options);

let baseEnter = 'src';
let baseOutput = options.output;
let buildOutput = options.buildOutput;

let paths = {
    less: {
        enter: baseEnter + '/css/**/*.less',
        output: baseOutput + '/css',
        rev: 'rev/img/*.json'
    },
    css: {
        enter: baseEnter + '/css/**/*.css',
        output: baseOutput + '/css',
        rev: 'rev/img/*.json'
    },
    js: { enter: baseEnter + '/js/**/*.js', output: baseOutput + '/js' },
    es6: { enter: baseEnter + '/js/**/*.es6', output: baseOutput + '/js' },
    ts: { enter: baseEnter + '/js/*.ts', output: baseOutput + '/js' },
    libJs: { enter: baseEnter + '/lib/**/*.js', output: baseOutput + '/lib' },
    libmJs: { enter: baseEnter + '/lib-m/**/*.js', output: baseOutput + '/lib' },
    img: { enter: baseEnter + '/img/**/*.*', output: baseOutput + '/img' },
    html: {
        enter: baseEnter + '/page/**/*.html',
        output: baseOutput,
        rev: 'rev/**/*.json'
    },
    pug: {
        enter: baseEnter + '/template/**/*.pug',
        output: baseOutput,
        rev: 'rev/**/*.json'
    }
};

let enterPath = (key) => paths[key].enter;

let outputPaht = (key) => paths[key].output;

let src = (key) => gulp.src(enterPath(key));

let dest = (key) => gulp.dest(outputPaht(key));

let plumberErr = () =>
    plumber({
        errorHandler: notify.onError('错误信息: <%= error.message %>')
    });

let pugData = (file) => {
    file.data = testData.data[file.basename];
    return file;
};

let gTask1 = (type, pipe) => {
    gulp.task(type, () => {
        if (pipe) {
            return src(type)
                .pipe(pipe())
                .pipe(dest(type));
        }
        return src(type).pipe(dest(type));
    });
};

let gTask2 = (type, pipe) => {
    gulp.task(type, () => {
        if (pipe) {
            return src(type)
                .pipe(plumberErr())
                .pipe(sourcemaps.init())
                .pipe(pipe())
                .pipe(sourcemaps.write())
                .pipe(dest(type));
        }
        return src(type).pipe(dest(type));
    });
};

let browserReload = () => setTimeout(() => reload(), 700);

let gWatchA = (key) => {
    gulp.watch(enterPath(key), gulp.series(key)).on('change', browserReload);
};

let gWatchB = (key) => {
    if (key === 'html' || key === 'pug') {
        gulp.watch(enterPath(key), gulp.series(key));
    } else {
        gulp.watch(enterPath(key), gulp.series(key, 'html', 'pug'));
    }
};

gulp.task('clear', function() {
    return gulp.src(baseOutput + '/*', { read: false }).pipe(clean());
});

gTask1('css');

gTask2('less', pipe().pipe(less));

gTask1('img');

gTask1('libJs');

gTask1('libmJs', pipe().pipe(() => concat('lib.moudel.js')));

gTask1('js');

gTask2('es6', pipe().pipe(babel));

gTask2(
    'ts',
    pipe()
        .pipe(() => cached('ts'))
        .pipe(ts)
        .pipe(() => remember('ts'))
);

gTask1('html');

gTask1('pug', pipe(() => data((file) => pugData(file))).pipe(pug));

gulp.task('watch', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        port: 4000
    });
    gWatchA('less');
    gWatchA('css');
    gWatchA('img');
    gWatchA('js');
    gWatchA('es6');
    gWatchA('ts');
    gWatchA('libJs');
    gWatchA('libmJs');
    gWatchA('html');
    gWatchA('pug');
});

let tsWatch = watchify(
    browserify({
        debug: true,
        entries: glob.sync(paths.ts.enter), //解析出路径
        cache: {},
        packageCache: {}
    }).plugin(tsify)
);

let tsBundle = () => {
    let b = tsWatch
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.ts.output));
    browserReload();
    return b;
};

tsWatch.on('update', tsBundle);

tsWatch.on('log', fancy_log);

//gulp.task('ts', tsBundle);

gulp.task(
    'default',
    gulp.series(
        'clear',
        'css',
        'less',
        'libJs',
        'js',
        'es6',
        //'ts',
        'img',
        'html',
        'pug',
        'watch',
        (done) => {
            done();
        }
    )
);

/*
gulp.task('wTs', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        port: 4000
    });
    gulp.watch(paths.ts.enter, gulp.series('ts')).on('change', reload);
});

gulp.task(
    'default3',
    gulp.series(
        'clear',

        'ts',

        (done) => {
            done();
        }
    )
);
*/
