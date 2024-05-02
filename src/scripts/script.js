//#region Кнопки и модальные окна с боковым меню
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
        close : document.querySelector('.aside-menu .action-button--close')
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
function toggleModal () {
    const mainWrapper = document.querySelector('.main-wrapper');
    const page = document.querySelector('.page');
    return (element) => {
        element.classList.toggle('show');
        mainWrapper.classList.toggle('main-wrapper--transparent');
        page.classList.toggle('page--scroll-disabled');
    }
}

window.onclick = (event) => {
    const modals = document.querySelectorAll('.modal.show, .aside-menu.show');
    if (!modals.length || event.target === headerWrapper.btns.burger
    || event.target === headerWrapper.btns.call || event.target === headerWrapper.btns.chat) return;
    let currentOpenedModal = modals.item(0);
    const isClickInside = event.target.closest('.modal.show, .aside-menu.show') === currentOpenedModal;
    if (!isClickInside){
        toggleModalCaller(currentOpenedModal);
    }
}

[headerWrapper.btns.burger, asideMenuWrapper.btns.close].forEach(
    el => el.onclick = () => toggleModalCaller(asideMenuWrapper.obj)
);

[headerWrapper.btns.call, modalCallWrappper.btns.close].forEach(
    el => el.onclick = () => toggleModalCaller(modalCallWrappper.obj)
);

[headerWrapper.btns.chat, modalFeedbackWrappper.btns.close].forEach(
    el => el.onclick = () => toggleModalCaller(modalFeedbackWrappper.obj)
)


//#endregion

//#region Работа с кнопкой "Читать далее"
let currentViewportWidth = window.visualViewport.width;
const btnReadMore = document.querySelector('.hero .expand-button');
const [heroTxt768pxPart, heroTxt1120pxPart] =  document.querySelectorAll('.hero__1120-txt-part, .hero__768-txt-part');

function handleResize() {
    checkReadMoreBtnState();
    currentViewportWidth = window.visualViewport.width;
    //Чистим инлайн стили для корректной работы медиа запросов
    [heroTxt768pxPart, heroTxt1120pxPart].forEach(el => el.removeAttribute('style'));
}
window.addEventListener('resize', handleResize);

function toggleVisibility(el, newDisplayVal) {
    el.style.display = 
        el.style.display === '' || el.style.display === 'none' ? 
        newDisplayVal : 'none';
}

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

// Если теперь кнопка в состоянии Читать далее, вернуть true. 
// Если Скрыть, вернуть -- false
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

//#region Работа с секциями "Бренды" и "Устройства"
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

function toggleVisibilityPlates(e = PointerEvent) {

    let isBrandsSection = e.target === brandsSectionWrapper.btn;
    let currentSectionPlates = isBrandsSection ? brandsSectionWrapper.plates : devicesSectionWrapper.plates;

    let isNeedToHidePlates = toggleExpandBtn(e.target);
    let isPlateHidden1120px = false;
    let isPlateHidden768px = false
    let isToggleOnly1120pxPlates = currentViewportWidth > 1120;

    currentSectionPlates.forEach(el => {
        // isPlateVisible = el.checkVisibility();
        isPlateHidden1120px = el.classList.contains('hidden-1120px');
        isPlateHidden768px = !isPlateHidden1120px;

        if (isToggleOnly1120pxPlates && isPlateHidden768px) return;

        toggleVisibility(el, isNeedToHidePlates ? 'none' : 'flex');

    })

}
//#endregion