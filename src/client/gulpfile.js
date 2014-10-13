var gulp = require('gulp');

// Import common task definitions.
require('./tasks');

/**
 * Default task.
 *
 * 1. Cleans out all build artifacts.
 * 2. Compiles LESS files.
 * 3. Compiles Javascript files.
 * 4. Copies over static assets.
 * 5. Copies over static HTML and adds cache-breaking as is appropriate.
 */
gulp.task('default', [ 'clean', 'less', 'js', 'assets', 'html' ]);
