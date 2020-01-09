import $ from 'jquery';
import { onLoadHtmlSuccess } from '../core/includes';

const duration = 600;

function filterByCity(city) {
    $('[wm-filter]').each(function (i, e) {
        const isTarget = $(this).attr('wm-filter') === city || city === null;

        if (isTarget) {
            $(this).parent().removeClass('d-none');
            $(this).fadeIn(duration);
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none');
            });
        }
    });
}

$.fn.cityButtons = function () {
    const cities = new Set;
    $('[wm-filter]').each(function (i, e) {
        cities.add($(e).attr('wm-filter'));
    });

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active'])
        .html('Todas as fotos')
        .click(e => {
            filterByCity(null);

            btnAll.addClass('active');
            btnActive.removeClass('active');
            btnActive = btnAll;
        });

    let btnActive = btnAll;

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info'])
            .html(city)
            .click(e => {
                filterByCity(city);

                btn.addClass('active');
                btnActive.removeClass('active');
                btnActive = btn;
            });

        return btn;
    });
    btns.push(btnAll);

    const btnGroup = $('<div>').addClass('btn-group');
    btnGroup.append(btns);

    $(this).html(btnGroup);

    return this;
};

onLoadHtmlSuccess(function() {
    $('[wm-filter-buttons]').cityButtons();
});