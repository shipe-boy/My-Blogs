layui.use(['jquery', 'layer', 'util'], function () {
    var $ = layui.jquery,
        layer = layui.layer,
        util = layui.util;
    util.fixbar();
    //导航控制
    master.start($);
});

master.start = function ($) {
    $('.phone-menu').on('click', function () {
        $('#nav').toggle(500);
    });


}

