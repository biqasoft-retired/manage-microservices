// Should already be required, here for clarity
require('static/bower_components/angular/angular');

// Load Angular and dependent libs
require('static/bower_components/angular-animate/angular-animate');
require('static/bower_components/angular-aria/angular-aria');

// Now load Angular Material
require('./angular-material');

// Export namespace
module.exports = 'ngMaterial';
