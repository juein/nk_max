'use strict';

// 스크립트 시작

//global
//const pageIntroAction;

// onload
//window.onload = function(){
//    console.log('onload');
//}

// onload

window.addEventListener('DOMContentLoaded', function () {

    var pageNum = 0;
    var isAnimating = false;
    var verticallSwiper = void 0;

    //리로드시 최상단으로
    //window.onbeforeunload = function () {
    //    //window.scrollTo(0, 0);
    //    //console.clear(); 
    //}

    var ctrl = new ScrollMagic.Controller();

    // assassin-info
    gsap.set('.assassin-info__visual--list .grayscale', { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)' });

    var test = document.querySelector('.assassin-info__visual--list');
    test.addEventListener("mouseover", areaEnter);
    //test.addEventListener("mouseleave", areaLeave);
    test.addEventListener("click", areaClick);

    function areaEnter(e) {
        console.log('enter' + e.target.getAttribute('data-value'));
        //console.log(e.target.className);
        var targetClassName = e.target.className;
        gsap.fromTo(e.target, 1, { opacity: 1 }, { opacity: 0 });
    }
    //function areaLeave(e){
    //    console.log('leave' + e.target.getAttribute('data-value'));
    //}
    function areaClick(e) {
        console.log('click' + e.target.getAttribute('data-value'));
    }

    // assassin-info


    //swiper 제어
    //verticallSwiper.slideTo(0, 500);
    //verticallSwiper.slideNext();
    //goToSlide(0);

    //content swiper
    verticallSwiper = new Swiper('.content__container', {
        on: {
            slideChangeTransitionStart: function slideChangeTransitionStart() {
                var idx = this.realIndex;
                console.log('vertical idx : ' + idx);
            }
        },
        direction: 'vertical',
        autoplay: false,
        speed: 800,
        simulateTouch: false
    });

    //page controll
    var goToContentSlide = function goToContentSlide(ctr) {
        if (ctr == 'next' && pageNum >= 6) {
            //index: 0 기준 false 처리
            return false;
        } else if (ctr == 'prev' && pageNum <= 0) {
            //총 페이지 수를 넘어가면 false처리
            return false;
        }

        if (!isAnimating) {
            isAnimating = true;
            if (ctr == 'next' ? pageNum += 1 : pageNum -= 1) ;

            console.log('this page = ' + pageNum);
            verticallSwiper.slideTo(pageNum, 500);

            setTimeout(function () {
                onSlideChangeEnd();
            }, 800);
        }
    };

    var onSlideChangeEnd = function onSlideChangeEnd() {
        console.log('isAnimating == false');
        isAnimating = false;
    };

    // scroll controll
    window.addEventListener("wheel", function (event) {
        var delta = Math.sign(event.deltaY);

        if (delta > 0) {
            //down
            goToContentSlide('next');
        } else {
            //up
            goToContentSlide('prev');
        }
    });

    // key controll
    var keyCodes = {
        UP: 38,
        DOWN: 40
    };
    window.addEventListener("keydown", function (event) {
        var PRESSED_KEY = event.keyCode;
        if (PRESSED_KEY == keyCodes.DOWN) {
            goToContentSlide('next');
            event.preventDefault();
        } else if (PRESSED_KEY == keyCodes.UP) {
            goToContentSlide('prev');
            event.preventDefault();
        }
    });
});