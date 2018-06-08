// template
// <div class="resizer"></div>
// <div class="resizer" next="next"></div>

define([
    'require',
    'jquery',
    'cssLogger'
], function (_require, $, cssLogger) {
    'use strict';

    let startX = 0;

    $('.resizer').mousedown(function () {
        let jThis = $(this);

        jThis.addClass('isResizing');

        // Reset X value for coming moving
        startX = jThis.offset().left;

        $('body').css('cursor', 'ew-resize');
    }).mouseenter(function () {
        $(this).css('opacity', '100');
    }).mouseout(function () {
        $(this).css('opacity', '0');
    });

    $(document).mousemove(function (e) {
        let resizer = $('.isResizing');
        if (!!resizer.length) {
            resizer.css('opacity', '100');

            let isTargetedNext = resizer.attr('next') !== undefined; // This resizer element has attribute 'next'

            // Reset width of target element of this resizer
            let targetEle = isTargetedNext ? resizer.next() : resizer.prev();
            let currentWidth = targetEle.width();
            let distance = e.pageX - startX;
            // ele.width(currentWidth);

            if (!isTargetedNext) {
                // This resizer is resizing previous element, so may the next element's margin or padding needs modification too

                currentWidth = currentWidth + distance;

                let nextEle = resizer.next();
                let marginValue = nextEle.css('margin-left');
                if (marginValue !== '0px') {
                    // the value is not 0
                    marginValue = Number(marginValue.replace('px', '')) + distance + 'px';
                    cssLogger.newOrModify('#' + nextEle[0].id, 'margin-left', marginValue);
                } else {
                    // 'marginValue' should be padding value now 
                    marginValue = nextEle.css('padding-left');
                    if (marginValue !== '0px') {
                        marginValue = Number(marginValue.replace('px', '')) + distance + 'px';
                        cssLogger.newOrModify('#' + nextEle[0].id, 'padding-left', marginValue);
                    }
                }
            } else {
                currentWidth = currentWidth - distance;
            }

            cssLogger.newOrModify('#' + targetEle[0].id, 'width', currentWidth + 'px');

            // Reset X value for next moving
            startX = e.pageX;
        }
    }).mouseup(function () {
        let resizer = $('.isResizing');
        if (resizer.length > 0) {
            resizer.css('opacity', '0');

            $('body').css('cursor', 'auto');
            resizer.removeClass('isResizing');
        }
    });
});