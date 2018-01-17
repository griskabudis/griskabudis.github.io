$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
MBTIntegration = {};
MBTIntegration.navigatePlayer = function (playerId, seasonId)
{
    window.location = window.domain+"/widgetPlayer/" + playerId;
}

MBTIntegration.navigateTeam = function (teamId, seasonId)
{
}

MBTIntegration.navigateGame = function (gameId, seasonId)
{
    return window.domain+"/widgetGame/" + gameId;
}
MBTIntegration.navigateLiveGame = function (gameId)
{
    return window.domain+"/widgetGame/" + gameId;
}
jQuery(document).ready(function ($) {
    var safari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    $('.search').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('opened')) {
            $('.header-holder').height($('.header-holder').height() + 64);
            $('nav').addClass('opened-search');
            $('.search-bar input').focus();
            $(this).addClass('opened');
        } else {
            $('.header-holder').height($('.header-holder').height() - 64);
            $('nav').removeClass('opened-search');
            $(this).removeClass('opened');
        }
    });

    $('ul.main > li > a').click(function (e) {
        e.preventDefault();
        $('ul.main .active').removeClass('active');
        $('ul.main .current').removeClass('current');
        $(this).parent().addClass('current');
        $(this).parent().find('ul').addClass('active');
    });

    if(window.popupsEnabled) {
        var timestamp = new Date().getTime();
        jQuery.post('/checkPopup', {'ts':timestamp}, function(response) {
            if(response.status == "active") {
                $('#popup-ad a').attr('href', response.url);
                $('#popup-ad img').attr('src', response.image);
                $('#popup-ad').modal('show');
            }
        }, "json");
    }

    $(".players-listing .slider").slick({
        arrows: true,
        speed: 400,
        centerMode: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerMode: false,
                    variableWidth: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });

    $('#cookie_button').click(function () {
        jQuery.get("/acceptCookies?1", function (response) {
            $('#cookies-consent').fadeOut();
        }, "html")
    });

    $('.sponsors-links .align-self-center').each(function () {
        $(this).find('img').width($(this).width());
    });

    $('.alpera').width('125px');

    $('[data-toggle="tooltip"]').tooltip()

    $(".tv-cat .slider").slick({
        arrows: true,
        speed: 400,
        centerMode: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerMode: false,
                    variableWidth: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $(this).find('.item .tvcat-item').css('background', '#f5f5f5');
        $(this).find('.slick-active .tvcat-item').css('background', '#' + $(this).data('bgcl'));
    }).on('setPosition', function (slick) {
        $(this).find('.item .tvcat-item').css('background', '#f5f5f5');
        $(this).find('.slick-active .tvcat-item').css('background', '#' + $(this).data('bgcl'));
    });


    $(".tv-listing .slides").slick({
        arrows: false,
        autoplay: true,
        variableWidth: true,
        autoplaySpeed: 2000,
    });

    $('.tv-slider-left').click(function (e) {
        e.preventDefault();
        $(".tv-listing .slides").slick("slickPrev");
    });

    $('.tv-slider-right').click(function (e) {
        e.preventDefault();
        $(".tv-listing .slides").slick("slickNext");
    });

    $(".head-stats .slides").slick({
        dots: false,
        speed: 800,
        slidesToShow: 8,
        slidesToScroll: 8,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 374,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });

    $(".live-steam .slider").slick({
        dots: false,
        speed: 800,
        slidesToShow: 4,
        initialSlide: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });
    $(".winners-listing .slider").slick({
        dots: false,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.team-tab-controller a').click(function (e) {
        e.preventDefault();
        window.location.hash = $(this).attr('href');
        $('.team-tab-controller .current').removeClass('current');
        $(this).parent().addClass('current');
        $('.team-tab.active').removeClass('active');
        $($(this).attr('href')).addClass('active');
    });
    
    setTimeout(function() {
    if(window.location.hash.length > 0 && $('.team-tab-controller').length) {
        $('a[href="' + window.location.hash + '"]').trigger('click');
    }}, 500);

    $('.player-tab-controller a').click(function (e) {
        e.preventDefault();
        $('.player-tab-controller .current').removeClass('current');
        $(this).parent().addClass('current');
        $('.player-tab.active').removeClass('active');
        $($(this).attr('href')).addClass('active');
    });

    $(".images-slider .slides").slick({
        fade: true,
        dots: false,
        arrows: false,
    });

    $(".partner-slider").slick({
        fade: true,
        dots: false,
        arrows: false,
        autoplaySpeed: 2000,
        autoplay: true,
    });

    $(".player-history .slides").slick({
        fade: true,
        dots: true,
        arrows: false,
        autoplay: true,
        infinite: false,
        autoplaySpeed: 5000,
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $(".images-slider .slides").slick('slickGoTo', nextSlide);
    });


    $(".history-slider.v2 .images").slick({
        dots: false,
        arrows: true,
        autoplay: false,
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $(".history-slider.v2 .slider").slick('slickGoTo', nextSlide);
    });

    $(".history-slider.v2 .slider").slick({
        fade: true,
        dots: true,
        arrows: false,
        autoplay: false,
        infinite: false,
        autoplaySpeed: 5000,
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $(".history-slider.v2 .images").slick('slickGoTo', nextSlide);
    });

    function is_touch_device() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    ;
    function mobileCheck() {
        var winWidth = $(window).width();
        if (winWidth < 1024) {
            if (!$("body").hasClass("mobile-v")) {
                $(".convert-to-slider").slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToShow: 1,
                    adaptiveHeight: true,
                });
                $("body").addClass("mobile-v");
            }
            ;
        } else {
            if ($(".convert-to-slider").hasClass("slick-initialized")) {
                $(".convert-to-slider").slick('unslick');
                $("body").removeClass("mobile-v");
            }
        }
        if (safari) {
            $('.wrapper').imagesLoaded().done(function (instance) {
                $(".min-height").height("auto").each(function () {
                    var cur = $(this).parent().outerHeight();
                    if(cur > 0) {
                        $(this).outerHeight(cur);
                    }
                });
            });
        }
        $(".header-holder").height("auto");
        $(".header-holder").height(+$(".header-sticky").outerHeight() + parseInt($(".nav").css("marginBottom").replace('px', '')));
    }

    function scrollNav() {
        if ($(window).width() < 768) {
            if ((+$(".header-holder").offset().top) < $(window).scrollTop()) {
                $("body").addClass("moved-header");
            } else {
                $("body").removeClass("moved-header");
            }
        } else {
            if ((+$(".header-holder").offset().top + $(".header").height()) < $(window).scrollTop()) {
                $("body").addClass("moved-header");
            } else {
                $("body").removeClass("moved-header");
            }
        }
    }

    if (is_touch_device()) {
        $("body").addClass("touch-events");
    } else {
        $("body").addClass("hover-events");
    }
    ;

    $(".menu-trigger").click(function () {
        if ($("body").hasClass("active-menu")) {
            $("body").removeClass("active-menu");
            $('html, body').stop().animate({
                scrollTop: $(".header").offset().top
            }, 0);
        } else {
            $("body").addClass("active-menu");
        }
    });

    $(".nav .main > li > a").click(function () {
        if ($(window).width() < 768) {
            $(".nav .main > li ul").removeClass("active");
            $(".nav .main > li").removeClass("current");
            $(this).parent().addClass("current");
            $(this).next().addClass("active");
            return false;
        }
    });
    $(window).resize(mobileCheck);
    $(window).resize(function () {
        window.setTimeout(function () {
            $(".header-holder").height("auto");
            $(".header-holder").height(+$(".header-sticky").outerHeight() + parseInt($(".nav").css("marginBottom").replace('px', '')));
        }, 10);
    });
    $(window).scroll(scrollNav);
    setTimeout(mobileCheck(), 300);

    $(document).on('touchmove', scrollNav());
    setTimeout(function () {
        $('.widget-match-results .result .float-right').each(function () {
            if ($(this).html().length == 12) {
                $(this).html('-');
            }
        });
    }, 700);
});