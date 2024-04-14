const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        400: {
            enabled: false,
            spaceBetween:0
        }
    }
});

let hiddenEls768px = document.querySelectorAll('.hidden-768px');
let hiddenEls1120px = document.querySelectorAll('.hidden-1120px'); 

const showMoreBtn = document.querySelector('button.brands__show-more');
showMoreBtn.onclick = () => {

    const currentViewportWidth = window.visualViewport.width;

    showMoreBtn.classList.toggle('brands__show-more--rotated');

    hiddenEls1120px.forEach(el => el.classList.toggle('hidden-1120px'));

    if (currentViewportWidth < 1120) {
        hiddenEls768px.forEach(el => el.classList.toggle('hidden-768px'));
    }

    showMoreBtn.textContent = hiddenEls1120px[0].checkVisibility() ? "Скрыть" : "Показать все";
}