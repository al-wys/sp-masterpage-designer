// template
// <div class="font-editor" target-selector="#sideNavBox"></div>

define([
    'require',
    'utility',
    'cssLogger',
    'jquery',
    'jquery.ui'
], function (_require, uti, cssLogger, $) {
    'use strict';

    // $('.font-resizer').spinner();
    let fontEditorHtml = `
        <label>Font size: (<span class="unit"></span>)</label>
        <div class="font-resizer">
            <input type="number" min="1" />
        </div>
    `;

    const fontEditors = $('.font-editor');
    fontEditors.html(fontEditorHtml);

    init();

    function init() {
        for (let i = 0; i < fontEditors.length; i++) {
            const fontEditor = fontEditors[i];
            const targetSelector = fontEditor.attributes['target-selector'];

            if (!targetSelector || !targetSelector.value) {
                console.error(`No "target-selector" was found in element ${fontEditor.id || '.font-editor'}.`);
            } else {
                const selector = targetSelector.value;
                const targetEle = $(selector);
                const fontEditorEle = $(fontEditor);

                // init font-resizer
                const fontSize = targetEle.css('font-size');
                const fontSizeNum = uti.getNumbersFromString(fontSize)[0];
                let fontUnit = fontSize.replace(fontSizeNum, '');

                fontEditorEle.find('label span.unit').text(fontUnit);
                fontEditorEle.find('.font-resizer input').val(fontSizeNum).spinner({
                    'spin': function (_event, ui) {
                        cssLogger.newOrModify(selector, 'font-size', ui.value + fontUnit);
                    }
                });
            }
        }
    }

    function destroy() {
        fontEditors.find('.font-resizer input').spinner("destroy");
    }

    // register function when cssLogger discard is called
    cssLogger.registerDiscard(() => {
        destroy();
        init();
    });
});