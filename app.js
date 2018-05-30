requirejs.config({
    'baseUrl': 'lib',
    'map': {
        '*': {
            'css': 'css.min'
        }
    },
    'paths': {
        'jquery': 'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min'
    },
    'shim': {
        'resizer': ['css!resizer']
    }
});

requirejs(['jQuery'], function ($) {
    let editModeWasLoaded = false;

    $('#btn-edit').click(function () {
        requirejs(['resizer']);

        $('.editor').show();
        $('.end-edit').show();
        $('.go-edit').hide();

        if (!editModeWasLoaded) {
            editModeWasLoaded = true;
            requirejs(['css-logger'], function (cssLogger) {
                $('#btn-save').click(function () {
                    cssLogger.save();
                });

                $('#btn-discard').click(function () {
                    cssLogger.discard();
                });

                $('#btn-code').click(function () {
                    alert(cssLogger.showSavedCode());
                });

                $('#btn-preview').click(function () {
                    if (cssLogger.hasChange()) {
                        alert('You have unsaved changes.');
                    } else {
                        $('.editor').hide();
                        $('.end-edit').hide();
                        $('.go-edit').show();
                    }
                });
            });
        }
    });
});