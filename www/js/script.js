
$(document).ready(function () {



    // vars
    var sectionIndex,
        sectionNum,
        scrollDuration = 1200,
        scrolling = false,
        scrollHeight,
        sectionColor,
        iconColor,
        scrollDirection,
        lockScroll = false,
        activeServiceSection = 0,
        servicesCount = $('.services__row').length - 1,
        lockScrollUp = false,
        lockScrollDown = false;


    function getActiveSectionIndex() {
        $('.section').each(function (index, elem) {
            if ($(elem).hasClass('active')) {
                sectionIndex = index
            }
        })

    }
    // check section num
    function checkSectionNum() {
        $('.section').each(function (i, elem) {
            sectionNum = 1;
            sectionNum = sectionNum + i
        })
    }

    //change active section function
    function changeActiveSection() {
        $('.section').removeClass('active')
        $('.section').each(function (i, elem) {
            if (i === sectionIndex) {
                $(elem).addClass('active')
            }

        })
    }
    //arrow aniamtion
    function arrowAniamtion() {
        $('.arrows-vertical').removeClass('white-animation-arrow')
        $('.arrows-vertical').removeClass('orange-animation-arrow')

        $('.arrows-vertical')
            .addClass('active')
        $('.menu-button').addClass('animate-icon')
        if (scrollDirection == "up") {
            $('.arrows-vertical').css('transform', 'rotateX(180deg)')
        } else if (scrollDirection == "down") {
            $('.arrows-vertical').css('transform', 'rotateX(0)')
        }


        if ($('.section.active').attr('data-animation-color') == "orange") {
            $('.arrows-vertical').addClass('orange-animation-arrow')
        } else if ($('.section.active').attr('data-animation-color') == "white") {
            $('.arrows-vertical').addClass('white-animation-arrow')
        }

        setTimeout(function () {
            $('.arrows-vertical')
                .removeClass('active')
            $('.menu-button').removeClass('animate-icon')
        }, 1000)
    }
    // change bg function
    function chgangeBg() {
        sectionColor = $('.section.active').not('#services').attr('data-color-bg');
        if ($('#services').hasClass('active')) {
            sectionColor = $('#services').find('.services__row.active').attr('data-color-bg')
        }
        $('body').css('background-color', sectionColor)
    }
    // change bg service function
    function chgangeBgService() {
        sectionColor = $('.services__row.active').attr('data-color-bg');
        $('body').css('background-color', sectionColor)
    }

    // check menu icon color function
    function menuIconColor() {
        iconColor = $('.section.active').attr('data-color-icon');
        $('.menu-button .menuSvg__circle2, .menu-button .menuSvg__circle,  .menu-button .menuSvg__circle3 ').css('stroke', iconColor)
        $('.menu-button .line, .menu-button .line .afterLine, .menu-button .line .beforeLine').css('background-color', iconColor)
    }
    // fade text function
    function fadeText() {
        var time = 0.7;

        $('.section.active .bounce-text').each(function (i, elem) {
            time += 0.2;
            gsap.from($(elem), 0.5, {
                ease: 'back',
                opacity: 0,
                y: -50,
                delay: time,
            })
        })
    }
    // show post text
    function showPostText() {
        $('.swiper-slide-active .swiper-slide-post__text').addClass('show')

        gsap.to(' .swiper-slide-active .swiper-slide-post__img', 0.2, {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        })
        gsap.to('.swiper-slide-active', {
            y: -30,
            ease: 'back'
        })
        gsap.fromTo('.swiper-slide-active .left-in-text', 1, {
            x: 200,
            opacity: 0,
        }, {
            x: 0,
            opacity: 1,
            ease: 'elastic.inOut(1, 1)',
            delay: 0.1,
            stagger: {
                each: 0.3,
                from: 'right'
            }
        });

    }
    // hide post text
    function hidePostText() {
        $('.swiper-slide-next .swiper-slide-post__text').removeClass('show')

        gsap.to('.swiper-slide-next .swiper-slide-post__img', 0.2, {
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
        })
        gsap.to('.swiper-slide-next', {
            y: 0,
        })
        gsap.to('.swiper-slide-next .left-in-text, .swiper-slide-prev .left-in-text', {
            x: 200,
            opacity: 0,
        })
    }
    // hide active post text
    function hideActivePostText() {
        $('.swiper-slide-active .swiper-slide-post__text').removeClass('show')
        gsap.to('.swiper-slide-active .swiper-slide-post__img', 0.2, {
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            delay: 0.5
        })

        gsap.to('.swiper-slide-active', {
            y: 0,
        })
        gsap.to('.swiper-slide-active .left-in-text', {
            x: 200,
            opacity: 0,
        })
    }

    // check section and do gsap
    function sectionGsap() {
        if ($('#main').hasClass('active')) {
            var time = 0.5;
            var scaleCss = 1;
            $('.header-menu-wrap .menu__link').each(function (i, elem) {
                time += 0.05;
                scaleCss -= 0.1;

                gsap.from($(elem), 1, {
                    scale: 0.1,
                    opacity: 0,
                    y: -500,
                    delay: time,
                    ease: 'elastic.out(1, 1)',
                })
            })

        } else if ($('#portfolio').hasClass('active')) {

        } else if ($('#posts').hasClass('active')) {
            hideActivePostText()

            var time = 0.5;
            var scaleCss = 1;
            $('.swiper-slide-post').each(function (i, elem) {
                time += 0.05;
                scaleCss -= 0.1;

                gsap.from($(elem), 1, {
                    scale: 0.1,
                    opacity: 0,
                    x: -500,
                    delay: time,
                    ease: 'elastic.out(1, 1)',
                })
            })

            setTimeout(function () {
                showPostText()
            }, 1500)


        } else if ($('#services').hasClass('active')) {
            lockScroll = true
        } else if ($('#reviews').hasClass('active')) {

        } else if ($('#partners').hasClass('active')) {

        } else if ($('#blog').hasClass('active')) {

        }

    }

    // scroll down function
    function scrollDown() {
        if (--sectionIndex < 0) {
            sectionIndex++;
            scrolling = false;
        } else if (lockScroll == false) {
            scrollDirection = 'up';
            scrollPage();
        }
    }

    // scroll up function
    function scrollUp() {
        if (++sectionIndex >= sectionNum) {
            sectionIndex--;
            scrolling = false;
        } else if (sectionIndex <= sectionNum && lockScroll == false) {
            scrollDirection = 'down';
            scrollPage();
        }
    }

    // scroll page function
    function scrollPage() {



        scrollHeight = $(window).height() * sectionIndex;


        hideActivePostText()

        $('#fullpage').css({
            'transition-duration': scrollDuration + 'ms',
            'transform': 'translate3d(0px,-' + scrollHeight + 'px,0px)'
        });


        waitScroll(scrollDuration)
        // change active section
        changeActiveSection();
        // change bg section
        chgangeBg();
        // change menu icon color
        menuIconColor();
        // arrow animation
        arrowAniamtion()
        // fade text
        fadeText()
        //od gsap section 
        sectionGsap()

    }

    // scroll services section
    function scrollServicesUp() {
        if (activeServiceSection < servicesCount) {
            activeServiceSection++
            scrollServicesSection()

        } else {
            activeServiceSection = servicesCount;

            waitScroll(200);
            lockScroll = false;
            // lockScrollUp = true;
        }
    }
    function scrollServicesDown() {
        if (activeServiceSection > 0) {
            activeServiceSection--
            scrollServicesSection()

        } else {
            activeServiceSection = 0;

            waitScroll(200);
            lockScroll = false;
            // lockScrollDown = true;
        }
    }
    function scrollServicesSection() {
        // lockScrollUp = false
        // lockScrollDown = false
        lockScroll = true;
        changeActiveTabService(activeServiceSection)
        chgangeBgService()
        waitScroll(500)
    }


    function changeActiveTabService(activeServiceSection) {
        $('.services__row').removeClass('active')
        $('.services__row').children('.services__icon')
            .css('transform', 'scale(0.35)')


        $('.services__row').each(function (i, elem) {
            if (i === activeServiceSection) {
                $(elem).addClass('active')
                $(elem).children('.services__icon')
                    .css('transform', 'scale(1)')
                $(elem).prev().children('.services__icon')
                    .css('transform', 'scale(.75)')
                $(elem).next().children('.services__icon')
                    .css('transform', 'scale(.75)')
                $(elem).prev().prev().children('.services__icon')
                    .css('transform', 'scale(0.5)')
                $(elem).next().next().children('.services__icon')
                    .css('transform', 'scale(0.5)')
            }
        })
    }
    changeActiveTabService(activeServiceSection)
    // event click on service
    $('.services__icon').click(function () {
        $('.services__row').removeClass('active');
        let activeRow = $(this).closest('.services__row');
        activeRow.addClass('active')
        $('.services__row').each(function (i, elem) {
            if ($(elem).hasClass('active')) {
                activeServiceSection = i
            }
        })
        scrollServicesSection(activeServiceSection);
    })

    function waitScroll(x) {
        setTimeout(function () {
            scrolling = false;
        }, x);
    }




    if (window.innerWidth > 767) {
        $('#fullpage').bind('mousewheel', function (event) {

            if (lockScroll == true) {

                if (scrolling) return;
                scrolling = true;

                if (event.originalEvent.wheelDelta < 0) {
                    scrollServicesUp();
                } else {
                    scrollServicesDown();
                }
            } else {
                if (scrolling) return;
                scrolling = true;

                if (event.originalEvent.wheelDelta < 0) {
                    scrollUp();
                } else {
                    scrollDown();
                }
            }

        });
    }



    $('.menu-button').on('click', function () {
        $(this).toggleClass('show')
        $('.menu-wrap').toggleClass('show')
        $('.layer').toggleClass('show')
    })


    // $('input[name='tel']').inputmask('+7(999)-99-99-999');







    // posts slider
    var mySwiper = new Swiper('.swiper-posts', {
        slidesPerView: 4,
        spaceBetween: 0,
        speed: 500,
        navigation: {
            nextEl: '.posts-prev',
            prevEl: '.posts-next',
        },

        on: {
            transitionEnd: function () {
                showPostText();
                hidePostText();
            }
        }
    })

    // services slider


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



    // close menu
    jQuery(function ($) {
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $('.menu-wrap.show, .menu-button.show, .layer.show'); // тут указываем ID элемента
            var div2 = $('.layer.show'); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                div.removeClass('show'); // скрываем его
                $('.menu-button').removeClass('show')
                $('.layer').removeClass('show')
            }
        });
    });



    getActiveSectionIndex();
    checkSectionNum();
    chgangeBg();
    menuIconColor();
    scrollPage();

});

