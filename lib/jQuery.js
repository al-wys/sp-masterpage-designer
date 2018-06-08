// Use this module to remove jQuery's object $ from object Window

define([
    'require',
    'jquery'
], function (require, $) {
    'use strict';
    return $.noConflict(false);
});