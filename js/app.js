//contact form validation
$('#contact').isHappy({
    fields: {
        '#name': {
            required: true,
            message: "This field is required"
        },
        '#email': {
            required: true,
            test: function(mail) {
                //regular expression for email, avoiding polyfill intervention to validate html5 email type
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(mail);
            },
            message: "Invalid email format"
        },
        '#phone': {
            test: function(phone) {
                var re = /^(\d*)$/;
                return re.test(phone) && (phone.length < 12);
            },
            message: "Invalid phone number format"
        }
    }
});

$(document).ready(function () {
    //top carousel
    $('.carousel').bxSlider({
        pager: false,
        adaptiveHeight: true
    });

    //hide news section on click
    $('.news-button').click(function(e) {
        $.each($('.news div.row'), function(i, row) {
            if (i != 0) {
                $(row).toggle();
            }
        });

        $('.news-button').hide();
        $('.title-row').removeClass('up-arrow').addClass('down-arrow');
    });

    //show/hide news section on click
    $('.title-row').click(function(e){
        $.each($('.news div.row'), function(i, row) {
            if (i != 0) {
                $(row).toggle();
            }
        });

        if ($('.up-arrow').length > 0) {
            $('.news-button').hide();
            $('.title-row').removeClass('up-arrow').addClass('down-arrow');
        } else {
            $('.news-button').show();
            $('.title-row').removeClass('down-arrow').addClass('up-arrow');
        }
    })

    var slider;
    //array that is going to contain the images retrieved from the getjson call
    var fancyboxArray = [];

    //get json files for the one/two/three/four section and populate the div
    var apiCall = function(id, reload) {
        $.getJSON("data/"+id+".json", function(data) {
            $('ul.presentation-slider').html("");

            fancyboxArray = [];

            $.each(data.item.images, function(i, image) {
                $('ul.presentation-slider').append("<li><img src="+image+"></li>");
                fancyboxArray.push({href: image});
            });

            //show the images in overlay onclick
            $('ul.presentation-slider li img').click(function(e) {
                $.fancybox.open(fancyboxArray);
            });

            if (!reload) {
                slider = $('ul.presentation-slider').bxSlider({
                    pager: false
                });
            } else {
                slider.reloadSlider();
            }

            $('div.right-presentation').html("<div class='title'>"+data.item.name+"</div>");
            $('div.right-presentation').append("<div class='details'>"+data.item.details+"</div>");
            $('div.right-presentation').append("<div class='composition'>"+data.item.composition+"</div>");
            $('div.right-presentation').append("<div class='modelDetails'><ul></ul></div>");
            $.each(data.item.modelDetails, function(i, detail) {
                $('div.modelDetails ul').append("<li>"+detail+"</li>")
            });

        });
    };

    apiCall("one", false);

    //onclick handler for the one/two/three/four section
    $('ul.proposals').click(function(e) {
        $('ul.proposals li').removeClass("selected");
        var target = e.target;
        $(target).addClass("selected");

        apiCall($(target).attr("id"), true);
    });

});