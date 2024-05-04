import '../styles/style.scss';
import Swiper from '../../node_modules/swiper/swiper-bundle.min.mjs';

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

//#region Buttons and modals
const headerWrapper = {
    obj  : document.querySelector('.header'),
    btns : {
        burger : document.querySelector('.header .action-button--burger'),
        call : document.querySelector('.header .action-button--call'),
        chat : document.querySelector('.header .action-button--chat')
    }
}

const asideMenuWrapper = {
    obj  : document.querySelector('.aside-menu'),
    btns : {
        close : document.querySelector('.aside-menu .action-button--close'),
        call : document.querySelector('.aside-menu .action-button--call'),
        chat : document.querySelector('.aside-menu .action-button--chat')
    }
}

const modalCallWrappper = {
    obj  : document.querySelector('.modal--call'),
    btns : {
        close : document.querySelector('.modal--call .action-button--close')
    }
}

const modalFeedbackWrappper = {
    obj  : document.querySelector('.modal--feedback'),
    btns : {
        close : document.querySelector('.modal--feedback .action-button--close')
    }
}

let toggleModalCaller = toggleModal();

/**
 * Toggles the modal's visibility.
 *
 * @param {Element} element - The element representing the modal to be toggled.
 * @return {void} This function does not return anything.
 */
function toggleModal () {
    const mainWrapper = document.querySelector('.main-wrapper');
    const page = document.querySelector('.page');

    return (evt, element) => {
        evt.preventDefault();

        const isClickFromModalAsideMenu = evt.target.closest('.aside-menu.show') !== null;

        element.classList.toggle('show');

        if (isClickFromModalAsideMenu){
            if(evt.target.closest('.action-button--close')){
                mainWrapper.classList.toggle('transparent');
                page.classList.toggle('scroll-disabled');    
            }
            else {
                asideMenuWrapper.obj.classList.toggle('show');
            }
        }
        else {
            mainWrapper.classList.toggle('transparent');
            page.classList.toggle('scroll-disabled');

            if (currentViewportWidth >= 1423)
            {
                asideMenuWrapper.obj.classList.toggle('transparent');
                asideMenuWrapper.obj.classList.toggle('scroll-disabled');
            }
        }
        evt.stopPropagation();
    }
}

/**
 * Handles the click event on the window to close a modal when the user clicks outside of it.
 * @param {MouseEvent} event - The click event object.
 */
window.onclick = (event) => {
    const modals = document.querySelectorAll('.modal.show, .aside-menu.show');
    if (!modals.length || event.target === headerWrapper.btns.burger
    || event.target === headerWrapper.btns.call || event.target === headerWrapper.btns.chat) return;
    let currentOpenedModal = modals.item(0);
    const isClickInside = event.target.closest('.modal.show, .aside-menu.show') === currentOpenedModal;
    if (!isClickInside){
        toggleModalCaller(event, currentOpenedModal);
    }
}

[headerWrapper.btns.burger, asideMenuWrapper.btns.close].forEach(
    el => el.onclick = (evt) => toggleModalCaller(evt, asideMenuWrapper.obj)
);

[headerWrapper.btns.call, asideMenuWrapper.btns.call, modalCallWrappper.btns.close].forEach(
    el => el.onclick = (evt) => toggleModalCaller(evt, modalCallWrappper.obj)
);

[headerWrapper.btns.chat, asideMenuWrapper.btns.chat, modalFeedbackWrappper.btns.close].forEach(
    el => el.onclick = (evt) => toggleModalCaller(evt, modalFeedbackWrappper.obj)
)


//#endregion

//#region Read more button
let currentViewportWidth = window.visualViewport.width;

const btnReadMore = document.querySelector('.hero .expand-button');

const [heroTxt768pxPart, heroTxt1120pxPart] =  document.querySelectorAll('.hero__1120-txt-part, .hero__768-txt-part');

/**
 * Handles the resize event and updates the state of the "Read More" button.
 *
 * @return {void} This function does not return anything.
 */
function handleResize() {
    checkReadMoreBtnState();
    currentViewportWidth = window.visualViewport.width;
    
    // Remove the 'style' attribute from text parts to media queries works fine
    [heroTxt768pxPart, heroTxt1120pxPart].forEach(el => el.removeAttribute('style'));
}
window.addEventListener('resize', handleResize);

/**
 * Toggles the visibility of an element by changing its display property
 * via inline styles.
 *
 * @param {Element} el - The element to toggle visibility for.
 * @param {string} newDisplayVal - The new display value to set.
 * @return {void} This function does not return anything.
 */
function toggleVisibility(el, newDisplayVal) {
    el.style.display = 
        el.style.display === '' || el.style.display === 'none' ? 
        newDisplayVal : 'none';
}

/**
 * Checks the state of the "Read More" button, rotates its pseudo-element and updates text content.
 *
 * @return {void} This function does not return anything.
 */
function checkReadMoreBtnState() {
    const isAllTxtInHeroIsVisible = heroTxt1120pxPart.checkVisibility();
    if (isAllTxtInHeroIsVisible) {
        btnReadMore.classList.add('expand-button--rotated');
        btnReadMore.textContent = 'Скрыть';
    } else {
        btnReadMore.classList.remove('expand-button--rotated');
        btnReadMore.textContent = 'Читать далее';
    }
}

/**
 * Toggles the expand button state and updates its text content.
 *
 * @param {HTMLElement} button - The expand button element.
 * @return {boolean} Returns true if the button is now in the collapsed state, false otherwise.
 */
function toggleExpandBtn(button) {
    let isFromHeroSection = button.classList.contains('hero__expand-button');
    if (button.classList.toggle('expand-button--rotated')){
        button.textContent = 'Скрыть';
        return false;
    }
    else {
        button.textContent = isFromHeroSection ? 'Читать далее' : 'Показать все';
        return true;
    }
}

//Check initial state of the button 'Read more' when the page is loaded
checkReadMoreBtnState();


btnReadMore.onclick = () => {
    if (toggleExpandBtn(btnReadMore)){
        // Скрыть в любом случае фрагмент для 1120px
        toggleVisibility(heroTxt1120pxPart, 'none');

        if (currentViewportWidth < 768){
            //Скрыть и фрагмент для 768px
            toggleVisibility(heroTxt768pxPart, 'none');
        }
    } else {
        // Показать все
        [heroTxt768pxPart, heroTxt1120pxPart].forEach(el => {
            if (!el.checkVisibility())
            {
                toggleVisibility(el, 'inline');
            }
        }
        );
    };
};


//#endregion

//#region  Sections with swiper
const brandsSectionWrapper = {
    obj: document.querySelector('.brands'),
    plates : document.querySelectorAll('.swiper-slide--brands.hidden-768px, .swiper-slide--brands.hidden-1120px'),
    btn: document.querySelector('.brands .expand-button'),
}

const devicesSectionWrapper = {
    obj: document.querySelector('.devices'),
    plates : document.querySelectorAll('.swiper-slide--devices.hidden-768px, .swiper-slide--devices.hidden-1120px'),
    btn: document.querySelector('.devices .expand-button'),
}

brandsSectionWrapper.btn.onclick = (evt) => toggleVisibilityPlates(evt);
devicesSectionWrapper.btn.onclick = (evt) => toggleVisibilityPlates(evt);

/**
 * Toggles the visibility of plates based on the given event.
 *
 * @param {PointerEvent} [e=PointerEvent] - The event that triggered the function.
 * @return {undefined} This function does not return a value.
 */
function toggleVisibilityPlates(e = PointerEvent) {

    let isBrandsSection = e.target === brandsSectionWrapper.btn;
    let currentSectionPlates = isBrandsSection ? brandsSectionWrapper.plates : devicesSectionWrapper.plates;

    let isNeedToHidePlates = toggleExpandBtn(e.target);
    let isPlateHidden1120px = false;
    let isPlateHidden768px = false
    let isToggleOnly1120pxPlates = currentViewportWidth > 1120;

    currentSectionPlates.forEach(el => {    
        isPlateHidden1120px = el.classList.contains('hidden-1120px');
        isPlateHidden768px = !isPlateHidden1120px;

        if (isToggleOnly1120pxPlates && isPlateHidden768px) return;

        toggleVisibility(el, isNeedToHidePlates ? 'none' : 'flex');

    })
}
//#endregion