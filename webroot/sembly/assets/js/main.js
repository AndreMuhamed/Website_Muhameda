(function($) {
    ("use strict");
    // Page loading
    $(window).on("load", function () {
        $("#preloader-active").fadeOut("slow");
    });
    /*-----------------
        Menu Stick
    -----------------*/
    var header = $(".sticky-bar");
    var win = $(window);
    win.on("scroll", function () {
        var scroll = win.scrollTop();
        if (scroll < 200) {
            header.removeClass("stick");
            header.removeClass("bg-gray-850");
        } else {
            header.addClass("stick");
            header.addClass("bg-gray-850");
        }
    });

    /*------ Wow Active ----*/
    new WOW().init();
    //sidebar sticky
    if ($(".sticky-sidebar").length) {
        $(".sticky-sidebar").theiaStickySidebar();
    }

    /*====== Sidebar menu Active ======*/
    function mobileHeaderActive() {
        var navbarTrigger = $(".burger-icon"),
            endTrigger = $(".mobile-menu-close"),
            container = $(".mobile-header-active"),
            wrapper4 = $("body");
        wrapper4.prepend('<div class="body-overlay-1"></div>');
        navbarTrigger.on("click", function (e) {
            navbarTrigger.toggleClass("burger-close");
            e.preventDefault();
            container.toggleClass("sidebar-visible");
            wrapper4.toggleClass("mobile-menu-active");
        });
        endTrigger.on("click", function () {
            container.removeClass("sidebar-visible");
            wrapper4.removeClass("mobile-menu-active");
        });
        $(".body-overlay-1").on("click", function () {
            container.removeClass("sidebar-visible");
            wrapper4.removeClass("mobile-menu-active");
            navbarTrigger.removeClass("burger-close");
        });
    }
    mobileHeaderActive();
    /*---------------------
        Mobile menu active
    ------------------------ */
    var $offCanvasNav = $(".mobile-menu"),
        $offCanvasNavSubMenu = $offCanvasNav.find(".sub-menu");
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fi-rr-caret-down"></i></span>');
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on("click", "li a, li .menu-expand", function (e) {
        var $this = $(this);
        if (
            $this
                .parent()
                .attr("class")
                .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
            ($this.attr("href") === "#" || $this.hasClass("menu-expand"))
        ) {
            e.preventDefault();
            if ($this.siblings("ul:visible").length) {
                $this.parent("li").removeClass("active");
                $this.siblings("ul").slideUp();
            } else {
                $this.parent("li").addClass("active");
                $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                $this.closest("li").siblings("li").find("ul:visible").slideUp();
                $this.siblings("ul").slideDown();
            }
        }
    });

    /* --- SwiperJS --- */
    $(".swiper-group-6").each(function () {
        var swiper_5_items = new Swiper(this, {
            spaceBetween: 16,
            slidesPerView: 6,
            slidesPerGroup: 1,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next-style-2",
                prevEl: ".swiper-button-prev-style-2"
            },

            autoplay: {
                delay: 10000
            },
            breakpoints: {
                1299: {
                    slidesPerView: 6
                },
                1150: {
                    slidesPerView: 4
                },
                750: {
                    slidesPerView: 3
                },
                600: {
                    slidesPerView: 2
                },
                550: {
                    slidesPerView: 1
                },
                300: {
                    slidesPerView: 1
                },
                200: {
                    slidesPerView: 1
                }
            }
        });
    });

    $(".swiper-group-5").each(function () {
        var swiper_5_items = new Swiper(this, {
            spaceBetween: 20,
            slidesPerView: 5,
            slidesPerGroup: 1,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next-style-1",
                prevEl: ".swiper-button-prev-style-1"
            },

            autoplay: {
                delay: 3000
            },
            breakpoints: {
                1299: {
                    slidesPerView: 5
                },
                1150: {
                    slidesPerView: 4
                },
                750: {
                    slidesPerView: 3
                },
                600: {
                    slidesPerView: 2
                },
                550: {
                    slidesPerView: 1
                },
                300: {
                    slidesPerView: 1
                },
                200: {
                    slidesPerView: 1
                }
            }
        });
    });
    $(".swiper-group-3").each(function () {
        var swiper_5_items = new Swiper(this, {
            spaceBetween: 20,
            slidesPerView: 3,
            slidesPerGroup: 1,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next-style-3",
                prevEl: ".swiper-button-prev-style-3"
            },

            autoplay: {
                delay: 10000
            },
            breakpoints: {
                1299: {
                    slidesPerView: 3
                },
                1150: {
                    slidesPerView: 3
                },
                750: {
                    slidesPerView: 2
                },
                600: {
                    slidesPerView: 2
                },
                550: {
                    slidesPerView: 1
                },
                300: {
                    slidesPerView: 1
                },
                200: {
                    slidesPerView: 1
                }
            }
        });
    });

    $(".swiper-group-1").each(function () {
        var swiper_1_items = new Swiper(this, {
            spaceBetween: 20,
            slidesPerView: 5,
            slidesPerGroup: 1,
            loop: true,
            autoplay: {
                delay: 2000
            },
            breakpoints: {
                1299: {
                    slidesPerView: 5
                },
                1150: {
                    slidesPerView: 5
                },
                750: {
                    slidesPerView: 3
                },
                600: {
                    slidesPerView: 2
                },
                550: {
                    slidesPerView: 1
                },
                300: {
                    slidesPerView: 1
                },
                200: {
                    slidesPerView: 1
                }
            }
        });
    });

    $(".swiper-group-2").each(function () {
        var swiper_1_items = new Swiper(this, {
            slidesPerView: 1,
            slidesPerGroup: 1,
            loop: true,
            autoplay: {
                delay: 2000
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
        });
    });

    //Mobile left sideba
    function mobileLeftSidebar() {
        var width = $(window).width();
        if (width < 992) {
            $(".menu-texts li.has-children > a").removeAttr("href");
            $(".menu-texts li.has-children > a").on("click", function (e) {
                $(this).parent().toggleClass("submenu-open");
                $(this).parent().siblings().removeClass("submenu-open");
            });
        }
    }
    mobileLeftSidebar();

    $(document).on('click', function(event) {
        var menu_text = $(".menu-texts");
        var btnOpen = $(".btn-search");
        var formSearch = $(".form-search");
        if (!menu_text.is(event.target) && menu_text.has(event.target).length === 0) {
            menu_text.addClass("menu-close");
            menu_text.css("style", "");
        }
        if (!formSearch.is(event.target) && formSearch.has(event.target).length === 0 && !btnOpen.is(event.target) && btnOpen.has(event.target).length === 0) {
            $(".form-search").slideUp();
        }
    });

    // DARK / LIGHT MODE
    const toggleSwitch = document.querySelector('#flexSwitchCheckChecked');
    const currentTheme = localStorage.getItem('theme');
    let currentSection = localStorage.getItem('section');

    if (currentTheme) {
    document.documentElement.classList.add(`theme-${currentTheme}`);
    toggleSwitch.checked = currentTheme === 'night';
    }

    if (currentSection) {
    showSection(currentSection);
    }

    function switchTheme(e) {
    const isDarkMode = e.target.checked;
    document.documentElement.classList.toggle('theme-night', isDarkMode);
    document.documentElement.classList.toggle('theme-day', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'night' : 'day');
    }

    function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        if (section.id === sectionId) {
        section.style.display = 'block';
        } else {
        section.style.display = 'none';
        }
    });
    localStorage.setItem('section', sectionId);
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = e.target.getAttribute('href').slice(1);
        showSection(sectionId);
    });
    });






    // tab event show
    $('a[data-bs-toggle="tab"]').on("shown.bs.tab", function (e) {
    });

    // btn search
    $(".btn-search").on('click', function(e){
        e.preventDefault();
        var _form_search = $(".form-search");
        if (_form_search.css('display') == 'none') {
            _form_search.slideDown();
        } else {
            _form_search.slideUp();
        }
    });
    $(".viewpass").on("click", function () {
        var _password = $(".password");
        if (_password.attr('type') == 'password') {
            _password.attr("type","text");
        } else {
            _password.attr("type", "password");

        }
    });
    // Go top
    $(".progressCounter").progressScroll();

    $(".progressCounter").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    /*Data Fillter*/
    $(".btn-filter").on("click", (e) => {
        const dataFilter = $(e.target).attr("data-filter");
        const filter = dataFilter.split(" ");
        const items = $(".item-content").parent();

        for (item of items) {
            const dataCategories = $(item).attr("data-category");
            const dataArray = dataCategories.split(" ");
            if (filter == "") {
                $(item).addClass("animate__animated animate__fadeIn");
                $(item).parent().addClass("animate__animated animate__fadeIn");
                $(item).removeClass("d-none");
                $(item).parent().removeClass("d-none");
            } else if (dataArray.includes(filter[0])) {
                $(item).addClass("animate__animated animate__fadeIn");
                $(item).parent().addClass("animate__animated animate__fadeIn");
                $(item).removeClass("d-none");
                $(item).parent().removeClass("d-none");
            } else {
                $(item).addClass("d-none");
                $(item).parent().addClass("d-none");
                $(item).removeClass("animate__animated animate__fadeIn");
                $(item).parent().removeClass("animate__animated animate__fadeIn");
            }
        }
    });

    $(".btn-filter").on("click", function () {
        $(".btn-filter").removeClass("active")
        $(this).addClass("active");
    });

})(jQuery);