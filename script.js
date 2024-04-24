// #region инициализация свайперов с брэйкпоинтами
new Swiper(".swiper", {
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
// const brandsSwiper = new Swiper(".swiper-brands", {
//     slidesPerView: "auto",
//     spaceBetween: 16,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     breakpoints: {
//         400: {
//             enabled: false,
//             spaceBetween:0
//         }
//     }
// });

// const devicesSwiper = new Swiper(".swiper-devices", {
//     slidesPerView: "auto",
//     spaceBetween: 16,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     breakpoints: {
//         540: {
//             enabled: false,
//             spaceBetween:0
//         }
//     }
// });

// const pricesSwiper = new Swiper(".swiper-services", {
//     slidesPerView: "auto",
//     spaceBetween: 16,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     breakpoints: {
//         560: {
//             enabled: false,
//             spaceBetween:0
//         }
//     }
// });
// #endregion

const btnBurger = document.querySelector('.round-button--burger');
const btnCloseAsideMenu = document.querySelector('.btn-close');
const asideMenu = document.querySelector('.aside-menu');
const bodyContainer = document.querySelector('.container');
const body = document.querySelector('.body');

let showMoreBtns = document.querySelectorAll('.show-more-button');
showMoreBtns.forEach(btn => btn.onclick = () => {
    
    btn.classList.toggle('show-more-button--rotated');

    const currentViewportWidth = window.visualViewport.width;
    const currentSection = btn.parentElement.parentElement; 
    const hiddenEls768px = currentSection.querySelectorAll(".hidden-768px");
    const hiddenEls1120px = currentSection.querySelectorAll(".hidden-1120px");
    // console.log(hiddenEls1120px, hiddenEls768px);
    hiddenEls768px.forEach(el => 
    {
        el.classList.toggle("hidden-768px");
    });

    if (currentViewportWidth < 1120) {

        hiddenEls1120px.forEach(el => {
            el.classList.toggle("hidden-1120px");
        });
    }

    btn.textContent = hiddenEls1120px[0]?.checkVisibility() ? "Скрыть" : "Показать все";
})

btnBurger.onclick = toggleAsideMenu;
btnCloseAsideMenu.onclick = toggleAsideMenu;

function toggleAsideMenu () {
    asideMenu.classList.toggle('hidden');
    bodyContainer.classList.toggle('container--transparent');
    body.classList.toggle('body--scroll-disabled');
}