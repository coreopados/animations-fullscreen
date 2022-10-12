
$(document).ready(function () {


    AOS.init();
    var sectionIndex = 0,
        sectionNum,
        scrollDuration = 1200,
        scrolling = false,
        scrollHeight;
    //change active section
    function changeActive() {
        $('.section').removeClass('active')
        $(".section").each(function (i, elem) {
            if (i === sectionIndex) {
                $(elem).addClass('active')
            }
        })
    }
    // change bg
    function chgangeBg() {
        if (sectionIndex == 0) {
            $('body').css('background-color', '#000')
        } else if (sectionIndex == 1) {
            $('body').css('background-color', '#000')
        } else if (sectionIndex == 2) {
            $('body').css('background-color', '#FF5F10')
        } else if (sectionIndex == 3) {
            $('body').css('background-color', '#FF5F10')
        } else if (sectionIndex == 4) {
            $('body').css('background-color', '#0070D8')
        } else if (sectionIndex == 5) {
            $('body').css('background-color', '#000')
        }
    }
    chgangeBg()

    // check menu icon color
    function menuIconColor(sectionIndex) {
        $(".section").each(function (i, elem) {
            sectionNum = 1;
            sectionNum = sectionNum + i
            if (i === sectionIndex) {
                if ($(elem).hasClass('orange-menu')) {
                    $('.menu-button').addClass('orange-icon')
                    $('.menu-button').removeClass('white-icon')
                } else if ($(elem).hasClass('white-menu')) {
                    $('.menu-button').addClass('white-icon')
                    $('.menu-button').removeClass('orange-icon')
                }
            }
        })
    }
    menuIconColor(sectionIndex);

    // scroll down
    function scrollDown() {
        if (--sectionIndex < 0) {
            sectionIndex++;
            scrolling = false;
            menuIconColor(sectionIndex)
        } else {
            scrollPage();
        }
    }

    // scroll up
    function scrollUp() {
        if (++sectionIndex >= sectionNum) {
            sectionIndex--;


            scrolling = false;
            menuIconColor(sectionIndex)
        } else if (sectionIndex <= sectionNum) {
            scrollPage();
        }
    }

    // scroll page
    function scrollPage() {
        scrollHeight = $(window).height() * sectionIndex;

        $("#fullpage").css({
            "transition-duration": scrollDuration + "ms",
            "transform": "translate3d(0px,-" + scrollHeight + "px,0px)"
        });

        setTimeout(function () {
            scrolling = false;
        }, scrollDuration);

        chgangeBg();
        changeActive();
        menuIconColor(sectionIndex);


        gsap.from(' .section.active h2', { duration: 1, opacity: 0, y: -200, ease: "back.inOut", delay: 0.4 });

        if ($('.section.active').attr('data-num') == 0) {

        } else if ($('.section.active').attr('data-num') == 1) {
            gsap.from('.swiper-slide-post', 1, {
                scale: 0.1,

                x: 60,
                ease: "elastic.inOut",
                delay: 0.5,
                stagger: {
                    opacity: 0,
                    amount: 0.8,
                    grid: "auto",
                    from: "left",
                }
            });

        } else if ($('.section.active').attr('data-num') == 2) {

        } else if ($('.section.active').attr('data-num') == 3) {

        } else if ($('.section.active').attr('data-num') == 4) {

        } else if ($('.section.active').attr('data-num') == 5) {

        }

    }


    if (window.innerWidth > 767) {
        $("#fullpage").bind("mousewheel", function (event) {

            if (scrolling) return;
            scrolling = true;

            if (event.originalEvent.wheelDelta < 0) {
                scrollUp();
            } else {
                scrollDown();
            }
        });
    }



    $('.menu-button').on('click', function () {
        $(this).toggleClass('show')
        $('.menu').toggleClass('show')
    })


    $('input[name="tel"]').inputmask("+7(999)-99-99-999");

    // posts slider
    var mySwiper = new Swiper('.swiper-posts', {
        slidesPerView: 4,
        spaceBetween: 0,
        navigation: {
            nextEl: '.posts-next',
            prevEl: '.posts-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            576: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            1440: {
                slidesPerView: 2,
                spaceBetween: 50
            }
        }
    })

    // services slider
    var mySwiper2 = new Swiper('.swiper-services', {
        direction: "vertical",
        slidesPerView: 1,
        mousewheel: true,
        pagination: {
            el: ".services-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            576: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            1440: {
                slidesPerView: 2,
                spaceBetween: 50
            }
        }
    })

    // reviews slider
    var mySwiper3 = new Swiper('.swiper-reviews', {
        slidesPerView: 4,
        spaceBetween: 0,
        navigation: {
            nextEl: '.reviews-next',
            prevEl: '.reviews-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            576: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            1440: {
                slidesPerView: 2,
                spaceBetween: 50
            }
        }
    })


    $("a[data-link]").click(function (e) {
        e.stopPropagation();

        $('.section').removeClass('active')

        var linkid = $(this).attr('href');
        var section = $('' + linkid + '');
        var possection = $('' + linkid + '').position().top;



        if (window.innerWidth > 767) {
            var numSection = $('' + linkid + '').attr('data-num');
            sectionIndex = +numSection
            scrollHeight = $(window).height() * sectionIndex;
            $("#fullpage").css({
                "transition-duration": scrollDuration + "ms",
                "transform": "translate3d(0px,-" + scrollHeight + "px,0px)"
            });

        } else {

            $("html, body").animate({ scrollTop: possection }, "slow");

        }



        section.addClass('active');
        menuIconColor(sectionIndex);
        chgangeBg()
        $('.menu-button,.menu').removeClass('show')

        return false;
    });




    jQuery(function ($) {
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $(".menu.show, .menu-button.show"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                div.removeClass('show'); // скрываем его
                $('.menu-button').removeClass('show')
            }
        });
    });


});


