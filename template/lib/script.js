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

            BURGER_BTN.addEventListener('click', () => {
                BURGER_BTN.classList.toggle('active')
                BURGER_BLOCK.classList.toggle('opened')
                document.documentElement.classList.toggle('overflow-hidden')
            });
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


            const blocks = document.querySelectorAll(".congress-block__gallery-item, .block-title, .citys-pearl__text, .interiors-block__left-slider, .interiors-block__left-text, .interiors-block__left-bigText, .interiors-block__right-slider, .interiors-block__right-text");
            blocks.forEach((block) => {
                gsap.set(block, { opacity: 0, y: 100 });

                ScrollTrigger.create({
                    trigger: block,
                    start: "top 95%",
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
                let parallaxElements2 = document.querySelectorAll('.citys-pearl .medium-pearl img');
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
            });
        },
        // BLOCK ANIMATIONS END
    }
}())