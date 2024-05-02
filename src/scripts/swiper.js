// import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';

new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        600: {
            enabled: false,
            spaceBetween:0
        }
    }
});