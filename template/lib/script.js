const myObj = {
    queue: [],
    init: function () {
        let queue = this.queue;

        for (key in queue) {
            let f = queue[key];
            if (typeof f == 'function') {
                f();
            }
        }
    }
};
document.addEventListener('DOMContentLoaded', function () {
    myObj.init();
});

(function () {
    let IsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        site_scroll;
    myObj.queue = {
        // HEADER BEGIN
        headerFunctions: function () {
            const HEADER_WR = document.querySelector('.site-header');
            const BURGER_BLOCK = document.querySelector('.burger-block');
            const BURGER_BTN = document.querySelector('.site-header__burger-btn span');
            const TAXI_BTN = document.querySelector('.site-header__taxi-btn span');
            const VIDEO_BTN = document.querySelector('.main-first__video-btn');
            const ROUTE_BTN = document.querySelector('.main-first__right-title');
            const LANG_BTN = document.querySelector('.site-header__langs-btn');

            /*site_scroll = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true
            });*/

            const lenis = new Lenis({
                // параметры настройки
                lerp: 0.1, // коэффициент сглаживания (0 - 1)
                smooth: true, // включить плавный скролл
                direction: 'vertical', // направление скролла (vertical or horizontal)
                smoothWheel: true, // плавный скролл колесом мыши
                smoothTouch: false, // плавный скролл при касании (mobile)
                infinite: false // бесконечный скролл
            })
              
            // запуск анимации скролла
            function raf(time) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }
              
            requestAnimationFrame(raf);

            if (IsMobile) {
                LANG_BTN.addEventListener('click', (e) => {
                    e.target.classList.toggle('active')
                    document.querySelector('.site-header__langs-list').classList.toggle('opened')
                })
                if (window.outerWidth <= 767) {
                    document.querySelector('.main-first__mobile-wr').append(document.querySelector('.main-first__video-btn'))
                    document.querySelector('.main-first__mobile-wr').append(document.querySelector('.main-first__right-title'))
                    document.querySelector('.interiors-block__body').append(document.querySelector('.interiors-block__left-bigText'))
                }
            }

            document.querySelector('.first-letter').style.width = document.querySelector('.first-letter_in').getBoundingClientRect().width;
            document.querySelector('.v-letter').style.width = document.querySelector('.v-letter_in').getBoundingClientRect().width;
            document.querySelector('.v-letter').style.left = document.querySelector('.v-letter_in').getBoundingClientRect().width + document.querySelector('.second-letter_in').getBoundingClientRect().width + 10;
            document.querySelector('.last-word').style.width = document.querySelector('.main_svg_last_word').getBoundingClientRect().width;

            window.addEventListener('resize', () => {
                document.querySelector('.first-letter').style.width = document.querySelector('.first-letter_in').getBoundingClientRect().width;
                document.querySelector('.v-letter').style.width = document.querySelector('.v-letter_in').getBoundingClientRect().width;
                document.querySelector('.v-letter').style.left = document.querySelector('.v-letter_in').getBoundingClientRect().width + document.querySelector('.second-letter_in').getBoundingClientRect().width + 10;
                document.querySelector('.last-word').style.width = document.querySelector('.main_svg_last_word').getBoundingClientRect().width;
            });

            document.addEventListener('scroll', () => {
                if (window.scrollY > 0) {
                    HEADER_WR.classList.add('fixed')
                    document.querySelector('.site-header__langs-list').classList.remove('active');
                } else {
                    HEADER_WR.classList.remove('fixed')
                }
            });
            if (window.scrollY > 0) {
                HEADER_WR.classList.add('fixed')
                document.querySelector('.site-header__langs-list').classList.remove('active');
            } else {
                HEADER_WR.classList.remove('fixed')
            }

            document.querySelector('.main-first__image').classList.add('active');
            document.querySelector('.main-first__title').classList.add('active');

            BURGER_BTN.addEventListener('click', () => {
                BURGER_BTN.classList.toggle('active')
                BURGER_BLOCK.classList.toggle('opened')
                document.documentElement.classList.toggle('overflow-hidden')
            });

            TAXI_BTN.addEventListener('click', (e) => {
                e.target.classList.toggle('active')
                document.querySelector('.popup-form').classList.toggle('opened')
                document.documentElement.classList.add('overflow-hidden')
            });

            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('popup-form') || e.target.classList.contains('popup-form__closer')) {
                    document.querySelector('.popup-form').classList.remove('opened');
                    document.documentElement.classList.remove('overflow-hidden')
                }
            })

            if (document.querySelector('.fixed-btns__popup-btn')) {
                document.querySelector('.fixed-btns__popup-btn span').addEventListener('click', (e) => {
                    e.target.classList.toggle('active')
                    document.querySelector('.fixed-btns__list').classList.toggle('active')
                });
            }

            let phoneInputs = document.querySelectorAll('.phone_field');
            let maskOptions = {
                mask: '+{7} (000) 000-00-00'
            };
            phoneInputs.forEach(function (phoneInput) {
                IMask(phoneInput, maskOptions);
            });

            VIDEO_BTN.addEventListener('click', () => {
                document.querySelector('.main-first__video').classList.add('active')
                setTimeout(function () {
                    document.querySelector('.main-first__video video').play()
                }, 500)
            });

            let videoContainer = document.querySelector('.main-first__video');
            document.querySelector('.main-first__video video').addEventListener('ended', function () {
                videoContainer.classList.remove('active');
            });

            ROUTE_BTN.addEventListener('click', () => {
                document.querySelector('.popup-map').classList.add('opened')
                document.documentElement.classList.add('overflow-hidden')
            });
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('popup-map') || e.target.classList.contains('popup-map__closer')) {
                    document.querySelector('.popup-map').classList.remove('opened');
                    document.documentElement.classList.remove('overflow-hidden')
                }
            })

            if (!IsMobile) {
                document.querySelectorAll('.burger-block__menu ul li a').forEach((item) => {
                    item.addEventListener('mouseenter', () => {
                        if (item.dataset.img) {
                            document.querySelector('.burger-block__image').classList.add('v_hidden');
                            setTimeout(() => {
                                document.querySelector('.burger-block__image img').setAttribute('src', item.dataset.img)
                                document.querySelector('.burger-block__image').classList.remove('v_hidden')
                            }, 300)
                        } else {
                            document.querySelector('.burger-block__image').classList.add('v_hidden')
                        }
                    })
                })
            }
        },
        // HEADER END

        // INTERIORS BLOCK BEGIN
        interiorsBlockFunctions: function () {
            document.querySelector('.interiors-block__left-slider').style.height = document.querySelector('.interiors-block__left-slider .swiper-wrapper').height;
            

            const INTER_LEFT = new Swiper('.interiors-block__left-slider .swiper', {
                slidesPerView: 1,
                loop: false,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.interiors-block__left-slider .swiper-button-next',
                    prevEl: '.interiors-block__left-slider .swiper-button-prev',
                }
            });
            lightGallery(document.querySelector('.interiors-block__left-slider'), {
                download: false,
                counter: true,
                selector: 'a.slider-item__image'
            });

            const INTER_RIGHT = new Swiper('.interiors-block__right-slider .swiper', {
                slidesPerView: 1,
                loop: false,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.interiors-block__right-slider .swiper-button-next',
                    prevEl: '.interiors-block__right-slider .swiper-button-prev',
                }
            });
        },
        // INTERIORS BLOCK END

        // ANNOUNCES BLOCK BEGIN
        announcesBlockFunctions: function () {
            const ANNOUNCES_SLIDER = new Swiper('.announces-block__slider .swiper', {
                slidesPerView: 2,
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.announces-block .swiper-button-next',
                    prevEl: '.announces-block .swiper-button-prev',
                },
                breakpoints: {
                    550: {
                        spaceBetween: 10
                    },
                    1024: {
                        spaceBetween: 20
                    },
                    1025: {
                        spaceBetween: 0
                    }
                }
            });

            function setEqualHeight() {
                var items = document.querySelectorAll('.announces-block__slider-item .item-title');
                items.forEach(function (item) {
                    item.style.height = 'auto';
                });
                var maxHeight = 0;
                items.forEach(function (item) {
                    if (item.offsetHeight > maxHeight) {
                        maxHeight = item.offsetHeight;
                    }
                });
                items.forEach(function (item) {
                    item.style.height = maxHeight + 'px';
                });
            }

            window.addEventListener('load', setEqualHeight);
            window.addEventListener('resize', setEqualHeight);
        },
        // ANNOUNCES BLOCK END

        // RESTAURANTS BLOCK BEGIN
        restaurantsBlockFunctions: function () {
            const RESTAURANT_SLIDER = new Swiper('.restaurants-block__bottom-slider .swiper', {
                slidesPerView: 1,
                loop: false,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.restaurants-block__slider-nav .swiper-button-next',
                    prevEl: '.restaurants-block__slider-nav .swiper-button-prev',
                }
            });
        },
        // RESTAURANTS BLOCK END

        // CONGRESS BLOCK BEGIN
        congressBlockFunctions: function () {
            lightGallery(document.querySelector('.congress-block__gallery'), {
                download: false,
                counter: true,
                selector: 'a'
            });
        },
        // CONGRESS BLOCK END

        // BLOCK ANIMATIONS BEGIN
        blockAnimations: function () {
            gsap.registerPlugin(ScrollTrigger/*, SplitText*/);

            const imageItems = document.querySelectorAll('.image-item-wr, .restaurants-block__bottom-slider, .interiors-block__left-slider, .interiors-block__right-slider, .announces-block__slider');

            const observerOptions = {
                root: null, // viewport
                rootMargin: '80px',
                threshold: 0.5 // процент видимости элемента (0.1 = 10%)
            };
            
            const observerCallback = (entries, observer) => {
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
            
                visibleEntries.forEach((entry, index) => {
                  // Убираем наблюдение, чтобы избежать повторных вызовов
                  observer.unobserve(entry.target);
            
                  // Используем setTimeout для добавления класса с задержкой
                  setTimeout(() => {
                    entry.target.classList.add('showed');
                  }, index * 1000); // задержка 200мс между добавлением классов
                });
            };
            
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            
            imageItems.forEach(item => {
                observer.observe(item);
            });

            // Выбираем все элементы с классом 'citys-pearl__item'
            const items = document.querySelectorAll('.citys-pearl__item');

            // Настраиваем анимацию для каждого элемента
            items.forEach((item, index) => {
                gsap.fromTo(item,
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: item,
                            //scroller: "[data-scroll-container]",
                            start: "top 80%", // Настраиваем когда запускать анимацию
                            toggleActions: "play", // Настраиваем когда запускать и останавливать анимацию
                            stagger: 0.2 // Задержка между анимацией элементов
                        },
                        duration: 1, // Длительность анимации
                        delay: (index % 4) * 0.25 // Задержка между элементами в ряду по 4
                    }
                );
            });

            const items2 = document.querySelectorAll('.site-footer__menu nav > ul > li');

            // Настраиваем анимацию для каждого элемента
            items2.forEach((item, index) => {
                gsap.fromTo(item,
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: item,
                            //scroller: "[data-scroll-container]",
                            start: "top 80%", // Настраиваем когда запускать анимацию
                            toggleActions: "play", // Настраиваем когда запускать и останавливать анимацию
                            stagger: 0.1 // Задержка между анимацией элементов
                        },
                        duration: 0.5, // Длительность анимации
                        delay: (index % 5) * 0.25 // Задержка между элементами в ряду по 5
                    }
                );
            });


            const blocks = document.querySelectorAll(".congress-block__text p, .map-block__text, .restaurants-block__bottom-slider, .restaurants-block__bottom-right .text p, .restaurants-block__bottom-right .title, .restaurants-block__middle-body > div, .restaurants-block__middle-image, .restaurants-block__body .image-item-wr, .restaurants-block__top-right > .title, .announces-block__slider-item .item-header, .announces-block__slider-item .item-title, .announces-block__slider-item .item-body, .citys-pearl__text, .interiors-block__left-text, .interiors-block__left-bigText, .interiors-block__right-text");
            blocks.forEach((block) => {
                gsap.set(block, { opacity: 0, y: 150 });

                ScrollTrigger.create({
                    trigger: block,
                    //scroller: "[data-scroll-container]",
                    start: "top 99%",
                    stagger: 0.7, // Задержка между анимацией элементов
                    toggleActions: "play reverse play reverse",
                    onEnter: () => {
                        gsap.to(block, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
                    }
                });
            });

            document.querySelectorAll('.congress-block__gallery-item').forEach((blockItem, index) => {
                let content = blockItem;
                let contentHeight = content.offsetHeight;
                
                gsap.fromTo(blockItem, 
                    {
                        height: 0
                    }, 
                    {
                        height: contentHeight,
                        scrollTrigger: {
                            trigger: blockItem,
                            //scroller: "[data-scroll-container]",
                            start: "top 50%",
                            end: "bottom top",
                            scrub: false,
                            markers: true,
                            toggleActions: 'play'
                        },
                        duration: 1,
                        ease: "power2.out",
                        delay: index * 0.2,
                        //onComplete: () => site_scroll.update()
                    }
                );
    
                gsap.to(content, {
                    opacity: 1,
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: blockItem,
                        start: "top 50%",
                        end: "bottom top",
                        scrub: false,
                        markers: true,
                        toggleActions: 'play'
                    },
                    duration: 1,
                    ease: "power2.out",
                    delay: index * 0.2,
                    //onComplete: () => site_scroll.update()
                });
            });

            let wordAnimate = document.querySelectorAll(".block-title"),
                text,
                wordSpan,
                letterSpan;

            wordAnimate.forEach((item) => {
                text = item.textContent;
                item.innerHTML = "";

                // Разделите текст на слова и оберните каждое слово в <span> с классом "word"
                text.split(" ").forEach(word => {
                    wordSpan = document.createElement("span");
                    wordSpan.classList.add("word");

                    // Разделите каждое слово на буквы и оберните каждую букву в <span>
                    word.split("").forEach(letter => {
                        letterSpan = document.createElement("span");
                        letterSpan.textContent = letter;
                        wordSpan.appendChild(letterSpan);
                    });

                    // Добавьте слово в контейнер
                    item.appendChild(wordSpan);
                    // Добавьте пробел между словами
                    item.appendChild(document.createTextNode(" "));
                });

                // Получите все span элементы с классом word
                const letterSpans = item.querySelectorAll(".word span");

                // Запустите анимацию
                gsap.fromTo(letterSpans, {
                    opacity: 0,
                    y: 20, // Начальная позиция смещена вниз
                }, {
                    duration: 1,
                    opacity: 1,
                    y: 0, // Конечная позиция
                    stagger: 0.05, // Задержка между анимациями букв
                    ease: "power1.out",
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: item,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play',
                    }
                });
            })

            let interiors_images = document.querySelectorAll('.interiors-block img');

            interiors_images.forEach(image => {
                gsap.fromTo(image,
                    { y: '-10%' },
                    {
                        y: '10%',
                        scrollTrigger: {
                            //scroller: "[data-scroll-container]",
                            trigger: '.interiors-block',
                            start: 'top 40%',
                            end: 'bottom top',
                            scrub: true,
                            stagger: 0.5,
                            duration: 1
                        }
                    }
                );
            });

            let restautants_images = document.querySelectorAll('.image-item-wr img');

            restautants_images.forEach(image => {
                gsap.fromTo(image,
                    { y: '-10%' },
                    {
                        y: '10%',
                        scrollTrigger: {
                            //scroller: "[data-scroll-container]",
                            trigger: image.closest('.image-item-wr'),
                            start: 'top 40%',
                            end: 'bottom top',
                            scrub: true,
                            stagger: 0.5,
                            duration: 1
                        }
                    }
                );
            });

            let restautants_slider_images = document.querySelectorAll('.restaurants-block__bottom-slider img');

            restautants_slider_images.forEach(image => {
                gsap.fromTo(image,
                    { y: '-10%' },
                    {
                        y: '10%',
                        scrollTrigger: {
                            //scroller: "[data-scroll-container]",
                            trigger: '.restaurants-block__bottom-slider',
                            start: 'top 40%',
                            end: 'bottom top',
                            scrub: true,
                            stagger: 0.5,
                            duration: 1
                        }
                    }
                );
            });

            gsap.fromTo(document.querySelector('.citys-pearl .small-pearl img'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.citys-pearl',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.citys-pearl__top-image .medium-pearl'),
                { y: '40%' },
                {
                    y: '-40%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.citys-pearl',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.citys-pearl .big-pearl img'),
                { y: '20%' },
                {
                    y: '-20%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.citys-pearl',
                        start: 'bottom 80%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.congress-block .congress-block__top-pearl'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.congress-block',
                        start: 'top 80%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.congress-block__bottom-pearls .big'),
                { y: '20%' },
                {
                    y: '-20%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.congress-block',
                        start: 'bottom 70%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );
            gsap.fromTo(document.querySelector('.congress-block__bottom-pearls .medium'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.congress-block',
                        start: 'bottom 70%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.congress-block__bottom-pearls .small'),
                { y: '105%' },
                {
                    y: '-205%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.congress-block',
                        start: 'bottom 70%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.restaurants-block__pearl'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.restaurants-block',
                        start: 'top 40%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.map-block__pearl'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.map-block',
                        start: 'top 40%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.interiors-block__pearl img'),
                { y: '100%' },
                {
                    y: '-100%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.interiors-block__left',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.restaurants-block__mobile-pearls .small'),
                { y: '100%' },
                {
                    y: '-100%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.restaurants-block__middle',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.restaurants-block__mobile-pearls .big'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.restaurants-block__middle',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            let congress_images = document.querySelectorAll('.congress-block__gallery-item img');

            congress_images.forEach(image => {
                gsap.fromTo(image,
                    { y: '-10%' },
                    {
                        y: '10%',
                        scrollTrigger: {
                            //scroller: "[data-scroll-container]",
                            trigger: '.congress-block',
                            start: 'top 40%',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                );
            });
            //site_scroll.update()
        },
        // BLOCK ANIMATIONS END

        // FOOTER SCRIPTS BEGIN
        footerScripts: function () {
            document.querySelectorAll('.site-footer__menu ul li.hasChild > a .arrow').forEach((item) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.target.classList.toggle('active')
                    e.target.closest('li').querySelector('ul').classList.toggle('opened')
                });
            })
        }
        // FOOTER SCRIPTS END
    }
}())