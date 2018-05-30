define([
    'require',
    'jquery'
], function (require, $) {
    'use strict';

    const customStyle = {}; // all saved custom styles
    let draftStyleId = ''; // current draft style id in this page
    let draftStyle = {}; // all draft styles

    function converToCss(obj) {
        let css = '';

        for (let selector in obj) {
            if (obj.hasOwnProperty(selector)) {
                let style = obj[selector];

                css += selector + '{';

                for (let cssName in style) {
                    if (style.hasOwnProperty(cssName)) {
                        let value = style[cssName];
                        css += cssName + ':' + value + ';';
                    }
                }

                css += '}';
            }
        }

        return css;
    }

    function appendStyle(style) {
        let css = converToCss(style || draftStyle);

        if (!draftStyleId) {
            draftStyleId = 'logger' + new Date().getTime();
            let sEle = document.createElement('style');
            sEle.id = draftStyleId;
            sEle.innerHTML = css;
            document.head.appendChild(sEle);
        } else {
            $('#' + draftStyleId).html(css);
        }
    }

    function mergeObj(source, target) {
        for (const selector in source) {
            if (source.hasOwnProperty(selector)) {
                const styleObj = source[selector];

                if (!target.hasOwnProperty(selector)) {
                    target[selector] = styleObj;
                } else {
                    let prevStyle = target[selector];
                    for (const key in styleObj) {
                        if (styleObj.hasOwnProperty(key)) {
                            const cssV = styleObj[key];
                            prevStyle[key] = cssV;
                        }
                    }
                }
            }
        }
    }

    return {
        'hasChange': function () {
            return !!draftStyleId;
        },
        'newOrModify': function (selector, styleObjOrCssName, cssValue) {
            if (typeof styleObjOrCssName === 'string') {
                draftStyle[selector] = {
                    [styleObjOrCssName]: cssValue
                };
            } else if (typeof styleObjOrCssName === 'object') {
                mergeObj({ [selector]: styleObjOrCssName }, draftStyle);
            }

            appendStyle();
        },
        'save': function () {
            if (this.hasChange()) {
                // todo: loading dialog
                mergeObj(draftStyle, customStyle);
                draftStyleId = '';
                draftStyle = {};
            }
        },
        'discard': function () {
            if (this.hasChange()) {
                // todo: loading dialog
                $('#' + draftStyleId).remove();
                draftStyle = {};
                draftStyleId = '';
            }
        },
        'showSavedCode': function () {
            // let styles = $('style[id^="logger"]');
            // let code = '';

            // for (let i = 0; i < styles.length; i++) {
            //     const style = styles[i];
            //     code += style.innerHTML;
            // }

            // return code;

            return converToCss(customStyle);
        },
        'remove': function (selector, cssNameOrArray) {
            if (!!cssNameOrArray) {
                if (typeof cssNameOrArray == 'string') {

                } else if (cssNameOrArray instanceof Array) {

                }
            }
        }
    };
});