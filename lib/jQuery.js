// Use this module to remove all jQuery objects from object Window

define([
    'require',
    'jquery'
], function(require, $) {
    'use strict';
    return $.noConflict(true);
});