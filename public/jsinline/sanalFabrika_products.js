$(document).ready(function () {

    window.i = 0;
    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });


    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'fillCompanyInfoEmployeesGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            
            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/EMGE/Logos/';
            window.logosrc = imageFolAddress + data[0].logo;
            $('#profileLogosrc').attr('src', window.logosrc);
        }
    });
    /*
     * Products categories and category products service
     *
     *
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'fillCompanyInfoProductsGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            
            var j;
            var dataSet = [];
            var properties = [];

            $('#sample_header').empty();

            for (j = 0; j < data.length; j++) {

                var product = data[j].product_name;
                var product_image = data[j].product_picture;
                var product_desc = data[j].product_description;
                var product_video = data[j].product_video_link;
//                var category = data[j].product_category;
                var category = null;
//                var customer = data[j].product_customer;
                var customer = null;
//                var finished_good = data[j].product_fin_g;
                var finished_good = null;
//                var price = data[j].product_price;
                var price = null;
                if (category === null) {
                    category = 'Registration Required!';
                }
                if (customer === null) {
                    customer = 'Registration Required!';
                }
                if (finished_good === null) {
                    finished_good = 'Registration Required!';
                }
                if (price === null) {
                    price = 'Only Available for System Members';
                }
                dataSet.push([product, category, customer, finished_good, price, "Order Now"]);
                properties.push([{key: 'name', value: product}, {key: 'image', value: product_image}, {key: 'desc', value: product_desc}, {key: 'video_link', value: product_video}]);
            }

            /*
             * Page header random sample product chooser
             */
            
            var colors = ["red", "yellow", "sea", "dark", "green", "blue", "purple"]
            var fir_sam_prod = properties[Math.floor(Math.random() * properties.length)];
            var second_sam_prod = properties[Math.floor(Math.random() * properties.length)];
            var sel_color_1 = colors[Math.floor(Math.random() * colors.length)];
            var sel_color_2 = colors[Math.floor(Math.random() * colors.length)];
            
            var app_sam_prod =
                    "<div class='col-sm-6 sm-margin-bottom-40'>"
                    + "<div class='funny-boxes funny-boxes-top-"
                    + sel_color_1
                    + "'>"
                    + "<div class='row'>"
                    + "<div class='col-md-5 funny-boxes-img'>"
                    + "<img class='img-responsive' src='"
                    + "https://"
                    + window.location.hostname
                    + "/onyuz/standard/assets/img/sfClients/EMGE/Products/"
                    + fir_sam_prod[1].value
                    + "' alt=''>"
                    + "</div>"
                    + "<div class='col-md-7'>"
                    + "<h2>"
                    + fir_sam_prod[0].value
                    + "</h2>"
                    + "</div>"
                    + "</div>"
                    + "<hr>"
                    + "<div class='row'>"
                    + "<p>"
                    + fir_sam_prod[2].value
                    + "</p>"
                    + "</div>"
                    + "</div>"
                    + "</div>"

                    + "<div class='col-sm-6 sm-margin-bottom-40'>"
                    + "<div class='funny-boxes funny-boxes-top-"
                    + sel_color_2
                    + "'>"
                    + "<div class='row'>"
                    + "<div class='col-md-5 funny-boxes-img'>"
                    + "<img class='img-responsive' src='"
                    + "https://"
                    + window.location.hostname
                    + "/onyuz/standard/assets/img/sfClients/EMGE/Products/"
                    + second_sam_prod[1].value
                    + "' alt=''>"
                    + "</div>"
                    + "<div class='col-md-7'>"
                    + "<h2>"
                    + second_sam_prod[0].value
                    + "</h2>"
                    + "</div>"
                    + "</div>"
                    + "<hr>"
                    + "<div class='row'>"
                    + "<p>"
                    + second_sam_prod[2].value
                    + "</p>"
                    + "</div>"
                    + "</div>"
                    + "</div>";

            $('#sample_header').append(app_sam_prod);


            /*
             * product table
             */

            $('#product_table').DataTable({
                data: dataSet,
                fixedColumns: true,
                scrollX: true,
                select: {
                    style: 'single'
                },
                columns: [
                    {title: "Product"},
                    {title: "Category"},
                    {title: "Customer"},
                    {title: "Finished Good"},
                    {title: "Price"},
                    {title: "Order"}
                ]
            });
            window.table = $('#product_table').DataTable();
            $('#product_table tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    window.table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }

                var selectedRowIndex = $(this)[0]._DT_RowIndex;
//                this.style.color = '#72c02c';
                var d = window.table.row(this).data();
                /*
                 * 
                 * @type type
                 * ajxa request to get product properties should be added here...
                 * for now a properties array is created...
                 */
//                
                if ($('#product_details_DIV').css('visibility') === 'hidden') {

                    $('#product_details_DIV').empty();
                    var appending =
                            "<h3>"
                            + window.lang.translate('Product Details')
                            + "</h3>"
                            + "<div class='col-md-4'>"
                            + "<a href='"
                            + "https://"
                            + window.location.hostname
                            + "/onyuz/standard/assets/img/sfClients/EMGE/Products/"
                            + properties[selectedRowIndex][1].value
                            + "' target='_newtab'>"
                            + "<img class='mach_sample' src='"
                            + "https://"
                            + window.location.hostname
                            + "/onyuz/standard/assets/img/sfClients/EMGE/Products/"
                            + properties[selectedRowIndex][1].value
                            + "' alt=''>"
                            + "</a>"
                            + "</div>"

                            + "<div class='col-md-8'>"
                            + "<div class='panel panel-profile no-bg'>"
                            + "<div class='panel-heading overflow-h'>"
                            + "<h2 class='panel-title heading-sm pull-left'>"
                            + "<i class='fa fa-pencil'></i>"
                            + window.lang.translate('Product Properties')
                            + "</h2>"
                            + "<a href='#'>"
                            + "<i class='fa fa-cog pull-right'></i>"
                            + "</a>"
                            + "</div>"
                            + "<div id='productPropertiesTable' class='panel-body no-padding mCustomScrollbar' data-mcs-theme='minimal-dark'>"

                            + "</div>"
                            + "</div>"
                            + "</div>";

                    $('#product_details_DIV').append(appending);
                    var properties_temp = properties[selectedRowIndex];
                    window.colors = ["color-one", "color-two", "color-three", "color-four", "color-five", "color-six", "color-seven"];

                    $.each(properties_temp, function (key, value) {

                        var picked_color = window.colors[Math.floor(Math.random() * window.colors.length)];

                        var appending2 =
                                "<div class='profile-post "
                                + picked_color
                                + "'>"
                                + "<span class='profile-post-numb'  style='width:150px;font-size:12px'>"
                                + properties_temp[key].key
                                + "</span>"
                                + "<div class='profile-post-in'>"
                                + "<h3 class='heading-xs'>"
                                + properties_temp[key].value
                                + "</h3>"
                                + "<p></p>"
                                + "</div>"
                                + "</div>";
                        $('#productPropertiesTable').append(appending2);
                    });
                    $('#product_details_DIV').css('visibility', 'visible');
                    $('#product_details_DIV').slideDown('slow');
                    $('#product_details_DIV').attr('lastIndex', selectedRowIndex);
                } else {
                    if ($('#product_details_DIV').attr('lastIndex').toString() === selectedRowIndex.toString()) {

                        $('#product_details_DIV').attr('lastIndex', selectedRowIndex);
                        $('#product_details_DIV').slideUp('Slow');
                        $('#product_details_DIV').css('visibility', 'hidden');
                    } else {

                        $('#product_details_DIV').attr('lastIndex', selectedRowIndex);
                        $('#product_details_DIV').slideUp('Slow');
                        $('#product_details_DIV').css('visibility', 'hidden');
                        $('#product_details_DIV').empty();
                        $('#product_details_DIV').empty();

                        var appending =
                                "<h3>"
                                + window.lang.translate('Product Details')
                                + "</h3>"
                                + "<div class='col-md-4'>"
                                + "<a href='"
                                + "https://"
                                + window.location.hostname
                                + "/onyuz/standard/assets/img/sfClients/EMGE/Products/"
                                + properties[selectedRowIndex][1].value
                                + "' target='_newtab'>"
                                + "<img class='mach_sample' src='"
                                + "https://"
                                + window.location.hostname
                                + "/onyuz/standard/assets/img/sfClients/EMGE/Products/"
                                + properties[selectedRowIndex][1].value
                                + "' alt=''>"
                                + "</a>"
                                + "</div>"

                                + "<div class='col-md-8'>"
                                + "<div class='panel panel-profile no-bg'>"
                                + "<div class='panel-heading overflow-h'>"
                                + "<h2 class='panel-title heading-sm pull-left'>"
                                + "<i class='fa fa-pencil'></i>"
                                + window.lang.translate('Product Properties')
                                + "</h2>"
                                + "<a href='#'>"
                                + "<i class='fa fa-cog pull-right'></i>"
                                + "</a>"
                                + "</div>"
                                + "<div id='productPropertiesTable' class='panel-body no-padding mCustomScrollbar' data-mcs-theme='minimal-dark'>"

                                + "</div>"
                                + "</div>"
                                + "</div>";

                        $('#product_details_DIV').append(appending);

                        var properties_temp = properties[selectedRowIndex];
                        window.colors = ["color-one", "color-two", "color-three", "color-four", "color-five", "color-six", "color-seven"];

                        $.each(properties_temp, function (key, value) {
                            var picked_color = window.colors[Math.floor(Math.random() * window.colors.length)];

                            var appending2 =
                                    "<div class='profile-post "
                                    + picked_color
                                    + "'>"
                                    + "<span class='profile-post-numb'  style='width:150px;font-size:12px'>"
                                    + properties_temp[key].key
                                    + "</span>"
                                    + "<div class='profile-post-in'>"
                                    + "<h3 class='heading-xs'>"
                                    + properties_temp[key].value
                                    + "</h3>"
                                    + "<p></p>"
                                    + "</div>"
                                    + "</div>";
                            $('#productPropertiesTable').append(appending2);
                        });
                        $('#product_details_DIV').css('visibility', 'visible');
                        $('#product_details_DIV').slideDown('slow');
                    }
                }

                if ($('#product_details_DIV').css('visibility') === 'visible') {
                    $('html, body').animate({
                        scrollTop: $("#product_details_DIV").offset().top
                    }, 1000);
                }

            });
        }

    });
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'fillCompanyInfoProductsGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            $('#filters-container').empty();
//            $('#grid-container').empty();

            $('#filters-container').append(
                    "<div data-filter='*' class='cbp-filter-item-active cbp-filter-item'>"
                    + window.lang.translate('All')
                    + "</div>");
            var categories = [];
            var appendings = '';
            for (var i = 0; i < data.length; i++) {

//                var production_type = data[i].production_type;
                var production_type = 'emge_products';
                var product_name = data[i].product_name;
                var product_image_name = data[i].product_picture;
                var image_url =
                        "https://"
                        + window.location.hostname
                        + "/onyuz/standard/assets/img/sfClients/"
                        + "EMGE/Products/"
                        + product_image_name;
                var appending =
                        "| <div data-filter='."
                        + production_type
                        + "' "
                        + "class='cbp-filter-item'>"
                        + window.lang.translate(production_type)
                        + "</div>";
                if ($.inArray(production_type, categories)) {

                    categories.push(production_type);
                    $('#filters-container').append(appending);
                }

                var appending2 =
                        "<div class='cbp-item "
                        + production_type
                        + "'>"
                        + "<div class='cbp-caption margin-bottom-20'>"
                        + "<div class='cbp-caption-defaultWrap'>"
                        + "<img src='"
                        + image_url
                        + "' alt=''>"
                        + "</div>"
                        + "<div class='cbp-caption-activeWrap'>"
                        + "<div class='cbp-l-caption-alignCenter'>"
                        + "<div class='cbp-l-caption-body'>"
                        + "<ul class='link-captions no-bottom-space'>"
                        + "<li>"
                        + "<a href='"
                        + image_url
                        + "' "
                        + " class='cbp-lightbox' data-title=''>"
                        + "<i class='rounded-x fa fa-search'></i>"
                        + "</a>"
                        + "</li>"
                        + "</ul>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "<div class='cbp-title-dark'>"
                        + " <div class='cbp-l-grid-agency-title'>"
                        + production_type + ' ' + i
                        + "</div>"
                        + "<div class='cbp-l-grid-agency-desc'>"
                        + product_name
                        + "</div>"
                        + "</div>"
                        + "</div>";
                appendings += appending2;
            }

            jQuery("#grid-container").cubeportfolio('appendItems', appendings);
        }
    });
    /*
     * Create list of products for each category service
     */

//    var dataSet = [
//        ["Product A", "Category A", "Customer A", "Yes", "$ 250.00", "Order Now"],
//        ["Product B", "Category A", "Customer B", "No", "$ 420.00", "Order Now"],
//        ["Product C", "Category B", "Customer E", "Yes", "Contact Company", "Order Now"],
//        ["Product D", "Category C", "Customer G", "No", "$ 1035.00", "Order Now"],
//        ["Product E", "Category A", "Customer A", "No", "$ 270.00", "Order Now"],
//        ["Product F", "Category A", "Customer B", "No", "$ 200.00", "Order Now"],
//        ["Product G", "Category B", "Customer E", "Yes", "Contact Company", "Order Now"],
//        ["Product H", "Category C", "Customer G", "No", "$ 1543.00", "Order Now"],
//        ["Product I", "Category A", "Customer Y", "Yes", "$ 250.00", "Order Now"],
//        ["Product J", "Category A", "Customer A", "No", "$ 420.00", "Order Now"],
//        ["Product K", "Category B", "Customer X", "Yes", "Contact Company", "Order Now"],
//        ["Product L", "Category C", "Customer Q", "No", "$ 1035.00", "Order Now"],
//        ["Product M", "Category A", "Customer T", "No", "$ 270.00", "Order Now"],
//        ["Product N", "Category A", "Customer B", "No", "$ 200.00", "Order Now"],
//        ["Product O", "Category B", "Customer E", "Yes", "Contact Company", "Order Now"],
//        ["Product P", "Category C", "Customer G", "No", "$ 1543.00", "Order Now"]
//    ];


});
/*
 * fixed first column js call
 * 
 */

//    $("#product_table").tableHeadFixer({"head": false, "left": 2});


function listOfCertificates() {
    
    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {
        window.i++;
        $("#qualityDetailsInsideDIV").append('Certificates ' + i + ' , ');
        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }

}

function qualityHistory() {

    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {
        window.i++;
        $("#qualityDetailsInsideDIV").append('history ' + i + ' , ');
        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }
}



function qualityPerformances() {

    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {

        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }

}


function performanceDetails() {

    if ($("#pastPerformanceDetailsDIV").hasClass('active')) {
        $("#pastPerformanceDetailsDIV").removeClass('active');
        $("#pastPerformanceDetailsDIV").slideUp('Slow');
        $("#pastPerformanceDetailsInsideDIV").empty();
    } else {

        $("#pastPerformanceDetailsDIV").addClass("active");
        $("#pastPerformanceDetailsDIV").slideDown("slow");
    }

}

function customerDetails() {

    if ($("#customerDetailsDIV").hasClass('active')) {
        $("#customerDetailsDIV").removeClass('active');
        $("#customerDetailsDIV").slideUp('Slow');
        $("#customerDetailsInsideDIV").empty();
    } else {

        $("#customerDetailsInsideDIV").append();
        $("#customerDetailsDIV").addClass("active");
        $("#customerDetailsDIV").slideDown("slow");
    }

}
