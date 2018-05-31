define([
    'require',
    'jQuery',
    'css-logger'
], function (require, $, cssLogger) {
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

            // Reset width of previous element of this resizer
            let prevEle = resizer.prev();
            let currentWidth = prevEle.width();
            let distance = e.pageX - startX;
            currentWidth = currentWidth + distance;
            // ele.width(currentWidth);

            cssLogger.newOrModify('#' + prevEle[0].id, 'width', currentWidth + 'px');

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