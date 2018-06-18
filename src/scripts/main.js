/**
 * Created by User on 06.09.2017.
 */

$(function () {
    initHeader();
    initMobileSearchForm();
    initMobMenu();
    initFooter();
    initSubscribeForm();
    initBannerSlider();
    initInstafeed();
    initDeliveryTabs();
    initFAQ();
    initStudentForm();
    initProductPage();
    initAlsoLikeSection();
    initCart();
    initQTY();

    function initHeader() {
        var parrentClass = 'main-menu__item--active';
        var wrapperPushClass = 'submenu-wrapper__pushed';
        var headerLinks = $('.js-header-link');
        var submenuWrapper = $('#submenu-wrapper');

        headerLinks.mouseenter(function () {
            var parent = $(this).parent();
            headerLinks.parent().removeClass(parrentClass);
            $(this).parent().addClass(parrentClass);

            if (parent.index()) {
                submenuWrapper.addClass(wrapperPushClass);
            } else {
                submenuWrapper.removeClass(wrapperPushClass);

            }
        });

        var inspirationSection = $('#inspiration-header-section');
        var inspirationHoverTimer;

        inspirationSection.children().hover(function () {
            clearTimeout(inspirationHoverTimer);
        }, function () {
            inspirationHoverTimer = setTimeout(function () {
                inspirationHoverTimer = document.body.classList.remove('inspiration-opened');
                inspirationSection.fadeOut(300);
            }, 400);
        });

        $('#inspiration-link').hover(function () {
            document.body.classList.add('inspiration-opened');
            inspirationSection.fadeIn(300);
            clearTimeout(inspirationHoverTimer);
        }, function () {
            inspirationHoverTimer = setTimeout(function () {
                inspirationHoverTimer = document.body.classList.remove('inspiration-opened');
                inspirationSection.fadeOut(300);
            }, 400);
        })
    }

    function initMobileSearchForm() {
        var searchPopup = $('#search-form');
        var mobeleSearchOpenClass = 'search-open';
        $('#search-btn').click(function () {
            searchPopup.fadeIn();
            document.body.classList.add(mobeleSearchOpenClass);
            return false
        });
        searchPopup.find('.js-close-search').click(function () {
            searchPopup.fadeOut();
            document.body.classList.remove(mobeleSearchOpenClass);
            return false
        });
    }

    function initMobMenu() {
        var bodYClass = 'mob-menu-opened';
        var menuOpened = false;
        var tabsPushClass = 'mobile-menu__submenu-wrapper--pushed';
        var tabsWrapper = $('#tabs-wrapper');
        var parentActiveClass = 'mobile-menu-tabs__item--active';
        var mobileTabs = $('.js-mobile-tab');

        mobileTabs.click(function (e) {
            var parent = $(this).parent();
            e.preventDefault();

            if (!parent.hasClass(parentActiveClass)) {
                mobileTabs.parent().removeClass(parentActiveClass);
                parent.addClass(parentActiveClass);

                if (parent.index()) {
                    tabsWrapper.addClass(tabsPushClass);
                } else {
                    tabsWrapper.removeClass(tabsPushClass);

                }
                return false;
            }
        });

        $('#mobmenutoggler').click(function (e) {
            if (menuOpened) {
                closeMobMenu();
            } else {
                openMobMenu()
            }
            e.stopPropagation();
            e.preventDefault();
        });

        function closeMobMenu() {
            menuOpened = false;
            document.body.classList.remove(bodYClass);
            $(document).off('click', closeByBodyClick);
        }

        function openMobMenu() {
            menuOpened = true;
            document.body.classList.add(bodYClass);
            $(document).on('click', closeByBodyClick);
        }

        function closeByBodyClick(e) {
            if ($(e.target).closest('.mobile-menu').length === 0) {
                closeMobMenu();
            }
        }
    }

    function initFooter() {
        var toglerButtons = $('.js-toggler');
        var toglerContents = $('.js-toggler-content');

        toglerButtons.click(function () {
            var isActive = $(this).hasClass('active');
            closeAll();
            if (!isActive) {
                $(this).addClass('active').parents('.js-toggler-wrapper').find('.js-toggler-content').stop().slideDown(300);
            }
        });

        function closeAll() {
            toglerButtons.removeClass('active');
            toglerContents.stop().slideUp(300);
        }
    }

    function initSubscribeForm() {
        $('#subscribe-form').formchimp();
    }

    function initBannerSlider() {
        $('.js-banner-slider').each(function () {
            var $this = $(this);
            var autoplay = $this.data('autoplay');
            var speed = $this.data('anim-speed');
            var autoplaySpeed = $this.data('autoplay-speed');
            var animType = $this.data('animation-type');

            $this.slick({
                arrows: false,
                dots: true,
                autoplay: autoplay,
                speed: speed * 1000,
                autoplaySpeed: autoplaySpeed * 1000,
                fade: animType === 'fade'
            });
        });
    }


    function initInstafeed() {
        var feedSlider = $("#instafeed");
        if (feedSlider.length) {

            var token = feedSlider.data('token');
            var userId = feedSlider.data('userid');

            if (!token || !userId) {
                return
            }

            var slickConfig = {
                slidesToShow: 5,
                speed: 900,
                slidesToScroll: 5,
                infinite: false,
                prevArrow: '<button type="button" class="slider-btn slider-btn--prev"></button>',
                nextArrow: '<button type="button" class="slider-btn slider-btn--next"></button>',
                responsive: [{
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 4
                    }
                }, {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2
                    }
                }]
            };

            var feed = new Instafeed({
                    get: 'user',
                    userId: userId,
                    resolution: 'standard_resolution',
                    accessToken: token,
                    template: '<div class="instafeed-section__slide"><div class="instafeed-section__slide-inner-wrap"><a class="instafeed-section__slide-inner-img" href="{{link}}" style="background-image:url({{image}})"></a></div></div>',
                    after: function () {
                        feedSlider.slick(slickConfig);
                    }
                }
            );
            feed.run();
        }
    }

    function initDeliveryTabs() {
        var deliveryAndReturnsSection = $('#delivery-returns');
        if (!deliveryAndReturnsSection.length) {
            return false;
        }

        var tabBtns = deliveryAndReturnsSection.find('.js-tab-btn');
        var tabPanels = $('.js-tab-panel');

        tabBtns.click(function () {
            var tab = $($(this).data('tab'));

            tabBtns.removeClass('delivery-returns-tabs__item--active');
            $(this).addClass('delivery-returns-tabs__item--active');
            tabPanels.hide();
            tab.show();
        });
    }

    function initFAQ() {
        var faqAnchors = $('#faq-anchors');
        var faqAnchorsHtml = '';

        if (!faqAnchors.length) {
            return false;
        }

        $('.js-faq-title').each(function () {
            faqAnchorsHtml += '<li class="faq-anchors__item">' + $(this).text() + '</li>';
        });

        faqAnchors.append(faqAnchorsHtml);
        var stickyWasInit = false;

        initSticky();
        $(window).resize(initSticky);

        var allQuestions = $('.js-question');

        allQuestions.click(function () {
            if (!$(this).parent().hasClass('faq-item--active')) {
                allQuestions.each(function () {
                    $(this).parent().removeClass('faq-item--active');
                    $(this).next().slideUp('slow');
                });
                $(this).parent().addClass('faq-item--active');
                $(this).next().slideDown('slow');
            } else {
                $(this).parent().removeClass('faq-item--active');
                $(this).next().slideUp('slow');
            }
        });

        var faqSections = $('.faq-section');

        $('.faq-anchors__item').click(function () {
            $('html, body').animate({
                scrollTop: (faqSections.eq($(this).index()).offset().top - (window.innerWidth > 1199 ? 180 : 70 ))
            }, 1000);
        });

        function initSticky() {
            if (window.innerWidth > 991 && !stickyWasInit) {
                faqAnchors.parent().stick_in_parent({
                    parent: $('.faq__row'),
                    offset_top: 180,
                    sticky_class: 'faq__sidebar--sticky',
                });
                faqAnchors.parent().on("sticky_kit:bottom", function (e) {
                    $(this).addClass('faq__sidebar--bottomed')
                })
                    .on("sticky_kit:unbottom", function (e) {
                        $(this).removeClass('faq__sidebar--bottomed')
                    });
                stickyWasInit = true;
            } else if (window.innerWidth <= 991 && stickyWasInit) {
                faqAnchors.parent().trigger("sticky_kit:detach");
                stickyWasInit = false;
            }
        }
    }

    function validateForm(form) {
        var studentEmail = form.find('.js-student-email');
        var rull = /\.edu$/;
        if (rull.test(studentEmail.val())) {
            return true;
        } else {
            studentEmail.addClass('input--error');
            return false;
        }
    }



    function initStudentForm() {
        var studentForm = $('#student-form');
        var subscribed = false;

        var years = $('#years_of_end').find('.js-year');
        var yearinput = $('#years_of_end').find('.js-year-input');

        // mail success popup
        $('#closesuccess-popup').click(function () {
            $('.student-form-success').fadeOut(600);
        });

        $('.student-form-success').click(function (e) {
            console.log('111');
            console.log();
            if ($(e.target).hasClass('student-form-success')) {
                $('.student-form-success').fadeOut(600);
            }
        });

        years.click(function () {
            years.removeClass('years-line__year--active');
            $(this).addClass('years-line__year--active');
            yearinput.val($(this).text());
        });

        studentForm.children('form').submit(function (e) {
            var formData = new FormData();
            formData.append("email", "Groucho");
            var url = studentForm.data('chimp-url').replace('post', 'post-json');
            var needSubscribe = $('#agree-subscribe').prop('checked');
            if (validateForm(studentForm) && needSubscribe) {
                $.ajax({
                    type: 'POST',
                    url: url,
                    cache: false,
                    dataType: 'json',
                    data: 'EMAIL=' + studentForm.find('.js-email').val(),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        subscribed = true;
                        studentForm.children('form').submit();
                    },
                    error: function (err) {
                        subscribed = true;
                        studentForm.children('form').submit();
                    }
                });
            }

            if (!subscribed && needSubscribe) {
                return false;
            }

        });
    }

    function initCart(){
        $('.js-close').click(function(){
            var updates = {};
            updates[$(this).data('id')] = 0;
            $.post('/cart/update.js', {updates: updates});

            $(this).parents('tr').fadeOut(300, function(){
                var length =  $('.js-cart-row:visible').length;
                if(!length){
                    $('.js-full-cart').hide();
                    $('.js-empty-cart').show();
                }
            });
        });
    }

    function initProductPage(){
        if(!$('[data-section-id="product"]').length){
            return false;
        }

        $('#popup-iframe').magnificPopup({
            type: 'iframe'
        });

        $('#product-slider').slick({
            arrows:false,
            swipe:false
        });
    }

    function initAlsoLikeSection() {
        var slider = $('#also-like-slider');
        if (slider.length) {
            slider.slick({
                slidesToShow: 5,
                slidesToScroll: 5,
                speed: 800,
                infinite: false,
                prevArrow: '<button type="button" class="slider-btn slider-btn--prev"></button>',
                nextArrow: '<button type="button" class="slider-btn slider-btn--next"></button>',
                responsive: [
                    {
                        breakpoint: 1600,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            });
        }
    }


        $(".js-digin-input").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl/cmd+A
                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: Ctrl/cmd+C
                (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: Ctrl/cmd+X
                (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

    function initQTY(){
        $('.js-qty').each(function(){
            var minusBtn = $(this).find('.js-minus'),
            plusBtn = $(this).find('.js-plus'),
            inp = $(this).find('.js-inp');

            minusBtn.click(function(){
                var val = inp.val();
                if(!val){
                    val = 0;
                }
                --val;
                if(val<1){
                    val = 1;
                }
                inp.val(val);
            });

            plusBtn.click(function(){
                var val = inp.val();
                if(!val){
                    val = 0;
                }
                console.log(val);
                ++val;
                console.log(val);
                inp.val(val);
            });
        });
    }
});