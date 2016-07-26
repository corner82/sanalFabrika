(function ($) {

//    $.fn.onyuzLeftMenuFunction = function (data) {
//       alert($("#pk").val());
//      console.log('publicKey is ' + $("#pk").val());
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            parent: 0,
            pk: $("#pk").val(),
            url: 'pkGetLeftMenu_leftnavigation',
            language_code: $("#langCode").val(),
//            menu_types_id:2
        },
        method: "GET",
        async: false,
        dataType: "json",
        success: function (data) {
            /*
             * Bu değişkenler url kontrol için kullanılmaktadır.
             */
            console.log(data);
            if (data.lenth !== null) {
                $('#sidebar-nav-1').empty();


//            var langIndex = currentPathArray.indexOf($("#langCode").val());
//            var urlArraySize = currentPathArray.length;

                // Ana menü değişkenleri

                var len = data.length;
                var i = 0;
                for (i; i < len; i++) {

                    if (data[i].collapse === 0) {

                        var appending_html = "<li id='" +
                                data[i].id + "' class='list-group-item' onclick=activateLink(this)><a href='" +
                                data[i].url + "' style='cursor: pointer; '>" + 
//                                "<i class='fa " +
//                                data[i].icon_class + "'>" + 
                                "<span>" +
                                data[i].menu_name + "</span></a></li>";

                        var newappend = $(appending_html);

                    } else {

                        var appending_html = "<li id='" + "" +
                                data[i].id + "' tot_mach_count='' class='list-group-item list-toggle' onclick=getSubmenu(this)> \n\
                                                <a id='" +
                                data[i].id + "_a' class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#sidebar-nav' \n\
                                                href='" +
                                data[i].url + "' aria-expanded='false'>" + 
//                                "<i class='fa " +
//                                data[i].icon_class + "'></i>" + 
                                "<span>" +
                                data[i].menu_name + "</span>\n\
                                                     </a><ul id='" + 
                                data[i].id + "_ul' class='collapse'>\n\
                                                     </ul></li>";

                        var newappend = $(appending_html);
                    }

                    $(newappend).appendTo($("#sidebar-nav-1"));

                    /*
                     * Bu bölüm ana menü url kontrolunu yapmaktadır. 
                     * url menu iteminin url ile eşleşiyorsa o şıkkı 
                     * açacaktır ve sayfa yüklendiğinde açık 
                     * gözükecektir.
                     */
//                        for (var c = 4; c < currentPathArray.length; c++) {
//
//                            var currentPath = window.location.hostname
//                                    + $("#requestUriRegulated").val()
//                                    .replace('--dil--', $("#langCode").val());
//
//                            var currentPathArray = currentPath.split('/');
//                            var clickedLinkURLArray = data[i].url.split('/');
//
//                            if (currentPathArray[c] === 'sanalfabrika') {
//                                for (var d = 4; d < clickedLinkURLArray.length; d++) {
//                                    if (clickedLinkURLArray[d] === 'sanalfabrika') {
//                                        currentPathArray[c + 1].replace(clickedLinkURLArray[d + 1]);
//                                    }
//                                }
//                            }
//                        }

                    /*
                     * Click fonksiyonu yeni append edilen şıkka eklenir
                     */

//                        $(newappend).on("click", function (event) {
//                    console.log(event);
                    //alert(event.target);
                    //alert(this);
//                            $.AdminLTE.dynamicTree(this);
//                        });
                    // bir sonraki ekleme için append boşaltılır...
                    newappend = null;
                }
            }
        }
    });
//    };
}(jQuery));

function activateLink(clicked) {

    $('#' + clicked.id).siblings().removeClass('active');
    $('#' + clicked.id).addClass('active');
}

function getSubmenu(clicked) {
    if ($('#' + clicked.id).hasClass('active')) {
//        alert('aktif dir');
//        $('#' + clicked.id).removeClass('active');
        $('#' + clicked.id + '_a').attr('class', '');
        $('#' + clicked.id + '_a').removeClass('collapse in');
        $('#' + clicked.id + '_a').addClass('collapsed');
        $('#' + clicked.id + '_a').attr('aria-expanded', false);
        $('#' + clicked.id + '_ul').removeClass('collapse in');
        $('#' + clicked.id + '_ul').addClass('collapse');
    } else {
//        alert('aktif degil');
//        $('#' + clicked.id).addClass('active');
        $('#' + clicked.id + '_a').attr('class', 'active');
        $('#' + clicked.id + '_a').removeClass('collapsed');
        $('#' + clicked.id + '_a').addClass('collapse in');
        $('#' + clicked.id + '_a').attr('aria-expanded', true);
        $('#' + clicked.id + '_ul').removeClass('collapse');
        $('#' + clicked.id + '_ul').addClass('collapse in');
    }
    
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            parent: clicked.id,
            pk: $("#pk").val(),
            url: 'pkGetLeftMenu_leftnavigation',
            language_code: $("#langCode").val(),
//            menu_types_id:2
        },
        method: "GET",
        async: false,
        dataType: "json",
        success: function (data) {
//            console.log(data);
            if (data.lenth !== null) {
                $('#' + clicked.id + '_ul').empty();

                // Ana menü değişkenleri

                var len = data.length;
                var i = 0;
                for (i; i < len; i++) {

                    if (data[i].collapse === 0) {

                        var appending_html = "<li id='" +
                                data[i].id + "' class='list-group-item' onclick=activateLink(this)><a href='" +
                                data[i].url + "' style='cursor: pointer;'>" + 
//                                "<i class='fa " +
//                                data[i].icon_class + "'>" + 
                                "<span>" +
                                data[i].menu_name + "</span></a></li>";

                        var newappend = $(appending_html);

                    } else {

                        var appending_html = "<li id='" + "" +
                                data[i].id + "' tot_mach_count='' class='list-group-item list-toggle' onclick=getSubmenu(this)> \n\
                                                <a id='" +
                                data[i].id + "_a' class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#sidebar-nav' \n\
                                                href='" +
                                data[i].url + "' aria-expanded='false'>" + 
//                                "<i class='fa " +
//                                data[i].icon_class + "'></i>" + 
                                "<span>" +
                                data[i].menu_name + "</span>\n\
                                                     </a><ul id='" + 
                                data[i].id + "_ul' class='collapse'>\n\
                                                     </ul></li>";

                        var newappend = $(appending_html);
                    }

                    $(newappend).appendTo($('#' + clicked.id + '_ul'));

                    /*
                     * Bu bölüm ana menü url kontrolunu yapmaktadır. 
                     * url menu iteminin url ile eşleşiyorsa o şıkkı 
                     * açacaktır ve sayfa yüklendiğinde açık 
                     * gözükecektir.
                     */
//                        for (var c = 4; c < currentPathArray.length; c++) {
//
//                            var currentPath = window.location.hostname
//                                    + $("#requestUriRegulated").val()
//                                    .replace('--dil--', $("#langCode").val());
//
//                            var currentPathArray = currentPath.split('/');
//                            var clickedLinkURLArray = data[i].url.split('/');
//
//                            if (currentPathArray[c] === 'sanalfabrika') {
//                                for (var d = 4; d < clickedLinkURLArray.length; d++) {
//                                    if (clickedLinkURLArray[d] === 'sanalfabrika') {
//                                        currentPathArray[c + 1].replace(clickedLinkURLArray[d + 1]);
//                                    }
//                                }
//                            }
//                        }

                    /*
                     * Click fonksiyonu yeni append edilen şıkka eklenir
                     */

//                        $(newappend).on("click", function (event) {
//                    console.log(event);
                    //alert(event.target);
                    //alert(this);
//                            $.AdminLTE.dynamicTree(this);
//                        });
                    // bir sonraki ekleme için append boşaltılır...
                    newappend = null;
                }
            }
        }
    });
    
    
}