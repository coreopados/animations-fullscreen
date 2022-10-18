
$(document).ready(function () {



    // vars
    var sectionIndex = 0,
        sectionNum,
        scrollDuration = 1200,
        scrolling = false,
        scrollHeight,
        sectionColor,
        iconColor,
        scrollDirection,
        lockScroll = false;

    // check section num
    function checkSectionNum() {
        $('.section').each(function (i, elem) {
            sectionNum = 1;
            sectionNum = sectionNum + i
        })
    }

    //change active section function
    function changeActive() {
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
        }, 1000)
    }
    // change bg function
    function chgangeBg() {
        sectionColor = $('.section.active').attr('data-color-bg');
        $('body').css('background-color', sectionColor)
    }

    // check menu icon color function
    function menuIconColor() {
        iconColor = $('.section.active').attr('data-color-icon');
        $('.menu-button .beforeButton, .menu-button .beforeButton , .menu-button .beforeButton, .menu-button .afterButton ').css('border-color', iconColor)
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
            // lockScroll = true
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

        setTimeout(function () {
            scrolling = false;
        }, scrollDuration);

        // change active section
        changeActive();
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



    if (window.innerWidth > 767) {
        $('#fullpage').bind('mousewheel', function (event) {

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
    var servicesImg = $('.pagination-img');

    // console.log(servicesImg)
    var mySwiper2 = new Swiper('.swiper-services', {
        direction: 'vertical',
        slidesPerView: 1,
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
        },
        pagination: {
            el: '.services-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class=' + className + '><img src=' + servicesImg[index].src + '></span>';
            },
        },

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


    // $('a[data-link]').click(function (e) {
    //     e.stopPropagation();
    //     $('.menu-button,.menu-wrap').removeClass('show')
    //     $('.section').removeClass('active')

    //     var linkid = $(this).attr('href');
    //     var section = $('' + linkid + '');
    //     var possection = $('' + linkid + '').position().top;

    //     if (window.innerWidth > 767) {

    //         var numSection = $('' + linkid + '').attr('data-num');

    //         if (numSection < sectionIndex) {
    //             scrollDirection = 'up';
    //         } else {
    //             scrollDirection = 'down';
    //         }

    //         sectionIndex = +numSection
    //         scrollHeight = $(window).height() * sectionIndex;
    //         $('#fullpage').css({
    //             'transition-duration': scrollDuration + 'ms',
    //             'transform': 'translate3d(0px,-' + scrollHeight + 'px,0px)'
    //         });

    //     } else {
    //         $('html, body').animate({ scrollTop: possection }, 'slow');
    //     }

    //     section.addClass('active');
    //     sectionGsap()
    //     menuIconColor();
    //     chgangeBg();
    //     arrowAniamtion()


    //     return false;
    // });



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

    checkSectionNum()
    chgangeBg();
    menuIconColor();

});

