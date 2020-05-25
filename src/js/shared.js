var matchMobile = window.matchMedia("(max-width:749px)");

var toTop = document.querySelector('.wrapper__span-to-top');
document.addEventListener('scroll', () => {
    var scrollPos = -50;
    if (document.body.getBoundingClientRect().top < scrollPos) {
        toTop.style.opacity = 0.75;
        toTop.style.pointerEvents = "auto";

    }
    else {
        toTop.style.opacity = 0;
        toTop.style.pointerEvents = "none";
    }
});
