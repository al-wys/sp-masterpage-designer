requirejs.config({
    'baseUrl': 'lib',
    'map': {
        '*': {
            'css': 'css.min',
            'jquery': 'jQuery'
        },
        'jQuery': {
            'jquery': 'jquery'
        }
    },
    'paths': {
        'jquery': 'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min',
        'jquery.ui': 'https://code.jquery.com/ui/1.12.1/jquery-ui.min'
    },
    'shim': {
        'resizer': ['css!resizer'],
        'fontEditor': ['css!fontEditor.css'],
        'jquery.ui': ['jquery', 'css!https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css']
    }
});

requirejs(['jquery'], function ($) {
    let editModeWasLoaded = false;

    $('#btnEdit').click(function () {
        requirejs(['resizer', 'fontEditor']);

        $('.editor').show();
        $('.end-edit').show();
        $('.go-edit').hide();

        if (!editModeWasLoaded) {
            editModeWasLoaded = true;
            requirejs(['cssLogger'], function (cssLogger) {
                $('#btnSave').click(function () {
                    cssLogger.save();
                });

                $('#btnDiscard').click(function () {
                    cssLogger.discard();
                });

                $('#btnCode').click(function () {
                    alert(cssLogger.showSavedCode());
                });

                $('#btnPreview').click(function () {
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