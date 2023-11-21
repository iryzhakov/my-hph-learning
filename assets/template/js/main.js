/* TODO для минификации JS установи по инструкции https://www.jetbrains.com/help/phpstorm/minifying-javascript.html */

$(function() {
    $('.menu-button-container').on('click', function () {
        $('.menu-button-container').toggleClass('open');
        $('.menu-header').toggleClass('open');
        $('body').toggleClass('open');

        $('.menu-circle').removeClass('open');
        $('.above-menu').removeClass('open');
    });

    $('.menu-circle').on('click', function () {
        $('.menu-circle').toggleClass('open');
        $('.above-menu').toggleClass('open');

        $('.menu-button-container').removeClass('open');
        $('.menu-header').removeClass('open');
        $('body').removeClass('open');
    });

    $('.menu-header svg').on('click', function () {
        let _this = $(this),
            parent = _this.parent('li');
        $(parent).toggleClass('open');
    });

    $('.get-modal').on('click', function () {
        $('.callback-form').modal('show');
    });

    //callback form disabled button
    $('form.ajax_form input[type=submit]').prop('disabled', true);
    //callback form change status button
    $('.agreement').change(function () {
        let _this = $(this),
            form = _this.closest('form'),
            submit = form.find('input[type=submit]');
        if (_this.prop('checked') === false) {
            submit.prop('disabled', true);
        } else {
            submit.prop('disabled', false);
        }
    });

    //activate recaptcha
    if($('.ajax_form').length) {
        $('.ajax_form input, .ajax_form select, .ajax_form textarea').click(function () {
            if($(this).closest('.ajax_form').find('.as_trigger').length) {
                $(this).closest('.ajax_form').find('.as_trigger').click();
            }
        });
    }

    $(document).on('af_complete', function (event, response) {
        let form = response.form;
        if (response.success) {
            if (form.attr('id') === 'form-callback') {
                $('.callback-form').modal('hide');
                $('.thank-you-page-modal').modal('show');
            } else {
                console.log(response)
            }
        } else {
            console.log('Error')
        }
    });

    $('.burger').on('click', function () {
        $('.menu').toggleClass('open');
        $('body').toggleClass('open');
    });

    $('.menu__close').on('click', function () {
        $('.menu').toggleClass('open');
        $('body').toggleClass('open');
    });

    /* Check mask number phone */
    let maskList = $.masksSort($.masksLoad("/assets/template/js/lib/phone-codes.json"), ['#'], /[0-9]|#/, "mask");
    let maskOpts = {
        inputmask: {
            definitions: {
                '#': {
                    validator: "[0-9]",
                    cardinality: 1
                }
            },
            showMaskOnHover: false,
            autoUnmask: true,
            clearMaskOnLostFocus: false
        },
        match: /[0-9]/,
        replace: '#',
        list: maskList,
        listKey: "mask",
    };
    $('.mask-phone-modal').inputmasks(maskOpts);
    $('.any-question-tel').inputmasks(maskOpts);
})
