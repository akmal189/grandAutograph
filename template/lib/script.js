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
    let IsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    myObj.queue = {
        // HEADER BEGIN
        headerFunctions: function() {
            const HEADER_WR = document.querySelector('.site-header');
            const BURGER_BLOCK = document.querySelector('.burger-block');
            const BURGER_BTN = document.querySelector('.site-header__burger-btn span');
            const TAXI_BTN = document.querySelector('.site-header__taxi-btn span');
            const VIDEO_BTN = document.querySelector('.main-first__video-btn');
            const ROUTE_BTN = document.querySelector('.main-first__right-title');
            const LANG_BTN = document.querySelector('.site-header__langs-btn');

            if(IsMobile) {
                LANG_BTN.addEventListener('click', (e) => {
                    e.target.classList.toggle('active')
                    document.querySelector('.site-header__langs-list').classList.toggle('opened')
                })
                if(window.outerWidth <= 767) {
                    document.querySelector('.main-first__mobile-wr').append(document.querySelector('.main-first__video-btn'))
                    document.querySelector('.main-first__mobile-wr').append(document.querySelector('.main-first__right-title'))
                    document.querySelector('.interiors-block__body').append(document.querySelector('.interiors-block__left-bigText'))
                }
            }

            document.querySelector('.first-letter').style.width = document.querySelector('.first-letter_in').getBoundingClientRect().width;
            document.querySelector('.v-letter').style.width = document.querySelector('.v-letter_in').getBoundingClientRect().width;
            document.querySelector('.v-letter').style.left = document.querySelector('.v-letter_in').getBoundingClientRect().width+document.querySelector('.second-letter_in').getBoundingClientRect().width+10;

            window.addEventListener('resize', () => {
                document.querySelector('.first-letter').style.width = document.querySelector('.first-letter_in').getBoundingClientRect().width;
                document.querySelector('.v-letter').style.width = document.querySelector('.v-letter_in').getBoundingClientRect().width;
                document.querySelector('.v-letter').style.left = document.querySelector('.v-letter_in').getBoundingClientRect().width+document.querySelector('.second-letter_in').getBoundingClientRect().width+10;
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
                if(e.target.classList.contains('popup-form') || e.target.classList.contains('popup-form__closer')) {
                    document.querySelector('.popup-form').classList.remove('opened');
                    document.documentElement.classList.remove('overflow-hidden')
                }
            })

            if(document.querySelector('.fixed-btns__popup-btn')) {
                document.querySelector('.fixed-btns__popup-btn span').addEventListener('click', (e) => {
                    e.target.classList.toggle('active')
                    document.querySelector('.fixed-btns__list').classList.toggle('active')
                });
            }

            let phoneInputs = document.querySelectorAll('.phone_field');
            let maskOptions = {
                mask: '+{7} (000) 000-00-00'
            };
            phoneInputs.forEach(function(phoneInput) {
                IMask(phoneInput, maskOptions);
            });

            VIDEO_BTN.addEventListener('click', () => {
                document.querySelector('.main-first__video').classList.add('active')
                setTimeout(function(){
                    document.querySelector('.main-first__video video').play()
                }, 500)
            });

            let videoContainer = document.querySelector('.main-first__video');
            document.querySelector('.main-first__video video').addEventListener('ended', function() {
                videoContainer.classList.remove('active');
            });

            ROUTE_BTN.addEventListener('click', () => {
                document.querySelector('.popup-map').classList.add('opened')
                document.documentElement.classList.add('overflow-hidden')
            });
            document.addEventListener('click', (e) => {
                if(e.target.classList.contains('popup-map') || e.target.classList.contains('popup-map__closer')) {
                    document.querySelector('.popup-map').classList.remove('opened');
                    document.documentElement.classList.remove('overflow-hidden')
                }
            })
        },
        // HEADER END

        // INTERIORS BLOCK BEGIN
        interiorsBlockFunctions: function() {
            const INTER_LEFT = new Swiper('.interiors-block__left-slider .swiper', {
                slidesPerView: 1,
                loop: true,
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
                selector: 'a'
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
        announcesBlockFunctions: function() {
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
                items.forEach(function(item) {
                    item.style.height = 'auto';
                });
                var maxHeight = 0;
                items.forEach(function(item) {
                    if (item.offsetHeight > maxHeight) {
                        maxHeight = item.offsetHeight;
                    }
                });
                items.forEach(function(item) {
                    item.style.height = maxHeight + 'px';
                });
            }
    
            window.addEventListener('load', setEqualHeight);
            window.addEventListener('resize', setEqualHeight);
        },
        // ANNOUNCES BLOCK END

        // RESTAURANTS BLOCK BEGIN
        restaurantsBlockFunctions: function() {
            const RESTAURANT_SLIDER = new Swiper('.restaurants-block__bottom-slider .swiper', {
                slidesPerView: 1,
                loop: true,
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
        congressBlockFunctions: function() {
            lightGallery(document.querySelector('.congress-block__gallery'), {
                download: false,
                counter: true,
                selector: 'a'
            });  
        },
        // CONGRESS BLOCK END

        // BLOCK ANIMATIONS BEGIN
        blockAnimations: function () {
            gsap.registerPlugin(ScrollTrigger);

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
                            start: "top 80%", // Настраиваем когда запускать анимацию
                            toggleActions: "play reverse play reverse", // Настраиваем когда запускать и останавливать анимацию
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
                            start: "top 80%", // Настраиваем когда запускать анимацию
                            toggleActions: "play reverse play reverse", // Настраиваем когда запускать и останавливать анимацию
                            stagger: 0.2 // Задержка между анимацией элементов
                        },
                        duration: 1, // Длительность анимации
                        delay: (index % 5) * 0.25 // Задержка между элементами в ряду по 4
                    }
                );
            });


            const blocks = document.querySelectorAll(".congress-block__text p, .map-block__text, .restaurants-block__bottom-slider, .restaurants-block__bottom-right .text p, .restaurants-block__bottom-right .title, .restaurants-block__middle-body > div, .restaurants-block__middle-image, .restaurants-block__body .image-item-wr, .restaurants-block__top-right > .title, .announces-block__slider-item .item-header, .announces-block__slider-item .item-title, .announces-block__slider-item .item-body, .congress-block__gallery-item, .block-title, .citys-pearl__text, .interiors-block__left-slider, .interiors-block__left-text, .interiors-block__left-bigText, .interiors-block__right-slider, .interiors-block__right-text");
            blocks.forEach((block) => {
                gsap.set(block, { opacity: 0, y: 100 });

                ScrollTrigger.create({
                    trigger: block,
                    start: "top 99%",
                    stagger: 0.2, // Задержка между анимацией элементов
                    toggleActions: "play reverse play reverse",
                    onEnter: () => {
                        gsap.to(block, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
                    }
                });
            });

            window.addEventListener('scroll', () => {
                // Параллакс эффект при прокрутке страницы
                let parallaxElements = document.querySelectorAll('.citys-pearl .small-pearl img');
                for (var i = 0; i < parallaxElements.length; i++) {
                    var speed = 4; // Скорость параллакса. Можно изменить по своему усмотрению.
                    var yOffset = document.querySelector('.citys-pearl').getBoundingClientRect().y / speed;
                    parallaxElements[i].style.transform = 'translateY(' + yOffset + 'px)';
                }
                let parallaxElements2 = document.querySelectorAll('.citys-pearl .medium-pearl');
                for (let i = 0; i < parallaxElements2.length; i++) {
                    let speed2 = 2.5; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset2 = document.querySelector('.citys-pearl').getBoundingClientRect().y / speed2;
                    parallaxElements2[i].style.transform = 'translateY(' + yOffset2 + 'px)';
                }
                let parallaxElements3 = document.querySelectorAll('.citys-pearl .big-pearl img');
                for (let i = 0; i < parallaxElements3.length; i++) {
                    let speed3 = 3; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset3 = document.querySelector('.citys-pearl').getBoundingClientRect().y / speed3 + 250;
                    parallaxElements3[i].style.transform = 'translateY(' + yOffset3 + 'px)';
                }
                let parallaxElements4 = document.querySelectorAll('.congress-block .congress-block__top-pearl');
                for (let i = 0; i < parallaxElements4.length; i++) {
                    let speed4 = 3; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset4 = document.querySelector('.congress-block').getBoundingClientRect().y / speed4 - 100;
                    parallaxElements4[i].style.transform = 'translateY(' + yOffset4 + 'px)';
                }
                let parallaxElements5 = document.querySelectorAll('.congress-block__bottom-pearls .big');
                for (let i = 0; i < parallaxElements5.length; i++) {
                    let speed5 = 3; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset5 = document.querySelector('.congress-block').getBoundingClientRect().y / speed5;
                    parallaxElements5[i].style.transform = 'translateY(' + yOffset5 + 'px)';
                }
                let parallaxElements6 = document.querySelectorAll('.congress-block__bottom-pearls .medium');
                for (let i = 0; i < parallaxElements6.length; i++) {
                    let speed6 = 2.5; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset6 = document.querySelector('.congress-block').getBoundingClientRect().y / speed6 ;
                    parallaxElements6[i].style.transform = 'translateY(' + yOffset6 + 'px)';
                }
                let parallaxElements7 = document.querySelectorAll('.congress-block__bottom-pearls .small');
                for (let i = 0; i < parallaxElements7.length; i++) {
                    let speed7 = 1.5; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset7 = document.querySelector('.congress-block').getBoundingClientRect().y / speed7 - 100;
                    parallaxElements7[i].style.transform = 'translateY(' + yOffset7 + 'px)';
                }
                let parallaxElements8 = document.querySelectorAll('.restaurants-block__pearl');
                for (let i = 0; i < parallaxElements8.length; i++) {
                    let speed8 = 3; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset8 = document.querySelector('.restaurants-block').getBoundingClientRect().y / speed8 - 100;
                    parallaxElements8[i].style.transform = 'translateY(' + yOffset8 + 'px)';
                }
                let parallaxElements9 = document.querySelectorAll('.map-block__pearl');
                for (let i = 0; i < parallaxElements9.length; i++) {
                    let speed9 = 3; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset9 = document.querySelector('.map-block').getBoundingClientRect().y / speed9 - 100;
                    parallaxElements9[i].style.transform = 'translateY(' + yOffset9 + 'px)';
                }
                let parallaxElements10 = document.querySelectorAll('.interiors-block__pearl img');
                for (let i = 0; i < parallaxElements10.length; i++) {
                    let speed10 = 4; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset10 = document.querySelector('.interiors-block').getBoundingClientRect().y / speed10;
                    parallaxElements10[i].style.transform = 'translateY(' + yOffset10 + 'px)';
                }
                let parallaxElements11 = document.querySelectorAll('.restaurants-block__mobile-pearls .small');
                for (let i = 0; i < parallaxElements11.length; i++) {
                    let speed11 = 2; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset11 = document.querySelector('.restaurants-block__middle').getBoundingClientRect().y / speed11;
                    parallaxElements11[i].style.transform = 'translateY(' + yOffset11 + 'px)';
                }
                let parallaxElements12 = document.querySelectorAll('.restaurants-block__mobile-pearls .big');
                for (let i = 0; i < parallaxElements12.length; i++) {
                    let speed12 = 4; // Скорость параллакса. Можно изменить по своему усмотрению.
                    let yOffset12 = document.querySelector('.restaurants-block__middle').getBoundingClientRect().y / speed12;
                    parallaxElements12[i].style.transform = 'translateY(' + yOffset12 + 'px)';
                }
            });
        },
        // BLOCK ANIMATIONS END

        // FOOTER SCRIPTS BEGIN
        footerScripts: function() {
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