define([
    'require'
], function (_require) {
    'use strict';

    return {
        'getNumbersFromString': function (str) {
            return str.match(/[+-]?\d+(?:\.\d+)?/g).map(Number);
        }
    }
});