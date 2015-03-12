var autoprefixer = require( 'gulp-autoprefixer' ),
	browserify = require( 'browserify' ),
	buffer = require( 'vinyl-buffer' ),
	gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	notify = require( 'gulp-notify' ),
	reactify = require( 'reactify' ),
	sass = require('gulp-ruby-sass'),
	source = require( 'vinyl-source-stream' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	uglify = require( 'gulp-uglify' ),
	watchify = require( 'watchify' ),
	watch = require( 'gulp-watch' ),
	rename = require("gulp-rename");

// gulp.task( 'react', function() {
// 	return gulp.src( 'components/picard.jsx' )
// 		.pipe( react() )
// 		.pipe( gulp.dest( 'js' ) );
// });


gulp.task( 'js', function() {

	var bundler = browserify();
	bundler.transform( reactify );
	bundler.add('./components/picard.jsx');


	return bundler.bundle()
		// .on( 'error', gutil.log.bind( gutil, 'Browserify Error' ) )
		.pipe( source( './components/picard.jsx' ) )
			// .pipe( buffer() )
			// .pipe( sourcemaps.init( { loadMaps: true } ) )
			// .pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( './js' ) );
} );
// bundler.on( 'update', bundle );

gulp.task('jsx', ['js'], function() {
	return gulp.src('./js/components/picard.jsx')
		.pipe(rename('picard.js'))
		.pipe(gulp.dest('./'));
});




gulp.task('sass', function () {
	return gulp.src('scss/style.scss')
	.pipe( sass( {
		sourcemap: true,
		sourcemapPath: '../scss',
		style: 'expanded'
	} ) )
	.on( 'error', function (err) { console.log(err.message); } )
	.pipe( gulp.dest( '' ) );
});

gulp.task( 'autoprefixer', function () {
	return gulp.src( 'style.css' )
	.pipe(sourcemaps.init( { loadMaps: true} ) )
	.pipe( autoprefixer( {
		browsers: [ 'last 2 versions' ]
	} ) )
	.pipe( sourcemaps.write() )
	.pipe(gulp.dest( '' ) );
});

// Styles
gulp.task('styles', function() {
  return gulp.src('components/style.scss')
	.pipe( sass() )
	.pipe( autoprefixer( 'last 3 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )
	// .pipe( minifycss() )
	.pipe( gulp.dest( './' ) )
	.pipe( notify( { message: 'Styles task complete' } ) );
});

// Watcher
gulp.task( 'watch', function() {
	// Watch .scss files
	gulp.watch('components/**/*.scss', ['styles']);
	gulp.watch('components/**/*.jsx', ['js']);
});