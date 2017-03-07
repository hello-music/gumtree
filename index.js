/**
 * Created by kylekan on 15/12/15.
 */
$(document).ready(function () {
    var currentId = 0,
        upClass = 'up',
        downClass = 'down';

    $.getJSON("content.json", function (data) {

        var maxId = data.content.length - 1;

        //initial setup
        $(".gm-title-bar .content").html(safeString(data.title));
        updateContent(0);

        //show/hide button
        var arrow = $('.gm-title-bar .arrow');
        $(".gm-title-bar").click(function () {

            if (arrow.hasClass(upClass)) {
                $('.gm-body').hide();
                arrow.removeClass(upClass).addClass(downClass);
            }
            else {
                $('.gm-body').show();
                arrow.removeClass(downClass).addClass(upClass);
            }
        });

        //left button click
        $(".gm-footer-bar .left").click(function () {

            currentId = currentId == 0 ? maxId : currentId - 1;

            updateContent(currentId);
        });

        //right button click
        $(".gm-footer-bar .right").click(function () {

            currentId = currentId == maxId ? 0 : currentId + 1;

            updateContent(currentId);
        });

        function updateContent(id) {
            $(".gm-content p").html(safeString(data.content[id].description));
            $(".gm-footer-bar .question").html(safeString(data.content[id].title));
            $(".gm-content img").attr('src', safeString(data.content[id].thumbnail || ''));
        }

    })
        .fail(function (error) {
            alert('File is not valid: '+error.statusText+"\nCheck browser console to see errors in detail");
        });

});

function safeString(string) {
    return string ? string.replace(/\uFFFD/g, '') : '';
}