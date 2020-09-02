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

    var pageNum = 0,
        isAnimating = false,
        isListAnimating = false,
        naviFlag = false,
        verticallSwiper = void 0,
        hoverItem = void 0,
        listActiveNum = 0;

    //리로드시 최상단으로
    //window.onbeforeunload = function () {
    //    //window.scrollTo(0, 0);
    //    //console.clear(); 
    //}

    var ctrl = new ScrollMagic.Controller();

    // default setting
    var defaultSet = function defaultSet() {
        gsap.set('.assassin-info__visual--list .grayscale', { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)' });
    };

    // assassin-info
    $(".assassin-info .grayscale").hover(function () {
        hoverItem = $(this).attr('class').replace('grayscale', '');
        gsap.to('.' + hoverItem, 1, { '-webkit-filter': 'grayscale(0%)', filter: 'grayscale(0%)' });
    }, function () {
        gsap.to('.' + hoverItem, 1, { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)' });
    });

    var listOrigin = function listOrigin() {
        var listOriginAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list-origin', 1.2, { x: "301%" }, 0.7).to('.assassin-info__visual--list-talent', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-hero', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#ddd' }, 1);

        $('.assassin-info__visual--list-origin').addClass('active');
        listActiveNum = 1;
        listOriginAction.restart();
    };
    var listTalent = function listTalent() {
        var listTalentAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1.2, { x: "200%" }, 0.7).to('.assassin-info__visual--list-hero', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#ddd' }, 1);

        $('.assassin-info__visual--list-talent').addClass('active');
        listActiveNum = 2;
        listTalentAction.restart();
    };
    var listHero = function listHero() {
        var listHeroAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-201%" }, 0).to('.assassin-info__visual--list-hero', 1.2, { x: "100%" }, 0.7).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#ddd' }, 1);

        $('.assassin-info__visual--list-hero').addClass('active');
        listActiveNum = 3;
        listHeroAction.restart();
    };
    var listVillain = function listVillain() {
        var listVillainAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-201%" }, 0).to('.assassin-info__visual--list-hero', 1, { x: "-301%" }, 0)
        //.to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
        .to('.assassin-info__visual', 0.5, { background: '#ddd' }, 1);

        $('.assassin-info__visual--list-villain').addClass('active');
        listActiveNum = 4;
        listVillainAction.restart();
    };

    var navigationShow = function navigationShow(flag) {
        if (flag == true) {
            gsap.to('.assassin-info__visual--navigation', 1, { opacity: 1, pointerEvents: "visible", delay: 1.2 });
        } else {
            gsap.to('.assassin-info__visual--navigation', 0.5, { opacity: 0, pointerEvents: "none" });
        }
    };

    var naviHome = function naviHome() {
        var naviHomeAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-villain', { x: '101%' }, 0)
        //.set('.assassin-info__visual--list li', {x: '500%'}, 0)
        .to('.assassin-info__visual', 1, { background: '#d00116' }, 0).to('.assassin-info__visual--list li', 0.5, { x: 0, opacity: 1 }, 0.2);

        $('.assassin-info__visual--list li').removeClass('active');
        listActiveNum = 0;
        naviHomeAction.restart();

        setTimeout(function () {
            isListAnimating = false;
        }, 1000);

        if (naviFlag) {
            naviFlag = false;
            //네비 비활성화
            navigationShow(naviFlag);
        }
    };
    var naviOrigin = function naviOrigin() {
        var naviOriginAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--list-origin', { x: '250%', opacity: 0 }, 0.2).to('.assassin-info__visual--list-origin', 1, { opacity: 1, x: '300%' }, 0.5);

        setTimeout(function () {
            $('.assassin-info__visual--list li').removeClass('active');
            $('.assassin-info__visual--list-origin').addClass('active');
            listActiveNum = 1;
            isListAnimating = false;
        }, 1000);

        naviOriginAction.restart();
    };
    var naviTalent = function naviTalent() {
        var naviTalentAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--list-talent', { x: '150%', opacity: 0 }, 0.2).to('.assassin-info__visual--list-talent', 1, { opacity: 1, x: '200%' }, 0.5);

        setTimeout(function () {
            $('.assassin-info__visual--list li').removeClass('active');
            $('.assassin-info__visual--list-talent').addClass('active');
            listActiveNum = 2;
            isListAnimating = false;
        }, 1000);

        naviTalentAction.restart();
    };
    var naviHero = function naviHero() {
        var naviHeroAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--list-hero', { x: '50%', opacity: 0 }, 0.2).to('.assassin-info__visual--list-hero', 1, { opacity: 1, x: '100%' }, 0.5);

        setTimeout(function () {
            $('.assassin-info__visual--list li').removeClass('active');
            $('.assassin-info__visual--list-hero').addClass('active');
            listActiveNum = 3;
            isListAnimating = false;
        }, 1000);

        naviHeroAction.restart();
    };
    var naviVillain = function naviVillain() {
        var naviVillainAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--list-villain', { x: '-50%', opacity: 0 }, 0.2).to('.assassin-info__visual--list-villain', 1, { opacity: 1, x: '0%' }, 0.5);

        setTimeout(function () {
            $('.assassin-info__visual--list li').removeClass('active');
            $('.assassin-info__visual--list-villain').addClass('active');
            listActiveNum = 4;
            isListAnimating = false;
        }, 1000);

        naviVillainAction.restart();
    };

    var assassinList = document.querySelector('.assassin-info__visual--list');
    assassinList.addEventListener("click", assassinListClick);
    function assassinListClick(e) {
        var listValue = Number(e.target.getAttribute('data-value'));
        //console.log(e.target);

        if (!naviFlag) {
            naviFlag = true;
            navigationShow(naviFlag);
        }
        switch (listValue) {
            case 1:
                listOrigin();
                break;
            case 2:
                listTalent();
                break;
            case 3:
                listHero();
                break;
            case 4:
                listVillain();
                break;
        }
    };

    var assassinNavigation = document.querySelector('.assassin-info__visual--navigation');
    assassinNavigation.addEventListener("click", assassinNaviClick);

    function assassinNaviClick(e) {
        var naviValue = Number(e.target.getAttribute('data-value'));

        if (listActiveNum == naviValue) return false;
        if (!isListAnimating) {
            isListAnimating = true;
            switch (naviValue) {
                case 0:
                    naviHome();
                    break;
                case 1:
                    naviOrigin();
                    break;
                case 2:
                    naviTalent();
                    break;
                case 3:
                    naviHero();
                    break;
                case 4:
                    naviVillain();
                    break;
            }
        }
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

    var horizontalEvent = function horizontalEvent(htEvent) {
        console.log('horizontalEvent');
        if (htEvent == 1) {
            pageNum = 5;
            gsap.to('.natural-killer__type', 1, { opacity: 1 });
            gsap.to('.natural-killer__explain', 0.5, { opacity: 0 });
        } else {
            pageNum = 3;
            gsap.to('.natural-killer__type', 0.5, { opacity: 0 });
            gsap.to('.natural-killer__explain', 1, { opacity: 1 });
        }
        setTimeout(function () {
            onSlideChangeEnd();
        }, 800);
    };

    //page controll
    var goToContentSlide = function goToContentSlide(ctr) {
        if (ctr == 'next' && pageNum >= 8) {
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

            //예외, hrogental 이벤트
            if (pageNum == 4) {
                console.log('!!!!!');
                var htEvent = void 0;
                if (ctr == 'next' ? htEvent = 1 : htEvent = 2) ;
                horizontalEvent(htEvent);
                return false;
            }

            if (pageNum >= 5) {
                verticallSwiper.slideTo(pageNum - 2, 500);
            } else {
                verticallSwiper.slideTo(pageNum, 500);
            }

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

    defaultSet(); // 기본 셋팅 실행
});