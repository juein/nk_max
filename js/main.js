'use strict';

// 스크립트 시작

//global
//const pageIntroAction;

// onload
window.onload = function () {}
//console.log('onload');

// onload

;window.addEventListener('DOMContentLoaded', function () {

    var pageNum = 0,
        isAnimating = false,
        isListAnimating = false,
        naviFlag = false,
        hoverItem = void 0,
        listActiveNum = 0,
        quizAnimation = false,
        quizNum = 1,
        quizMyChk = [];

    //리로드시 최상단으로
    //window.onbeforeunload = function () {
    //    //window.scrollTo(0, 0);
    //    //console.clear(); 
    //}

    var ctrl = new ScrollMagic.Controller();

    // default setting
    var defaultSet = function defaultSet() {
        gsap.set('.assassin-info__visual--list .grayscale', { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)' });
        gsap.set('.assassin-info__visual--character-villain', { backgroundSize: '200%', backgroundPosition: 'center 100%' });
    };

    // assassin-info
    $(".assassin-info .grayscale").hover(function () {
        hoverItem = $(this).attr('class').replace('grayscale', '');
        gsap.to('.' + hoverItem, 1, { '-webkit-filter': 'grayscale(0%)', filter: 'grayscale(0%)' });
    }, function () {
        if (listActiveNum == 0) {
            gsap.to('.' + hoverItem, 1, { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)' });
        }
    });

    var assassinContent = {
        hideContent: function hideContent() {
            //컨텐츠 display none
            gsap.to('.assassin-info__visual--explain--origin', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--explain--talent', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--explain--hero', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--explain--villain', 0.3, { opacity: 0 });
        },
        origin: function origin() {
            console.log('origin content!!');
            gsap.to('.assassin-info__visual--explain--origin', 1, { opacity: 1 });
            //$('.assassin-info__visual--explain--origin')
        },
        talent: function talent() {
            console.log('talent content!!');
        },
        hero: function hero() {
            console.log('hero content!!');
        },
        villain: function villain() {
            console.log('villain content!!');
        }
    };

    var visualList = {
        origin: function origin() {
            var listOriginAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list-origin', 1.2, { y: "10%" }, 0.7)
            //.to('.assassin-info__visual--list-origin .assasin_character', 1.2, {y: "10%"}, 0.7)
            .to('.assassin-info__visual--bg-origin', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-talent', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-hero', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#F2F2F2' }, 1);

            $('.assassin-info__visual--list-origin').addClass('active');
            listActiveNum = 1;
            listOriginAction.restart();
            assassinContent.origin();
        },
        talent: function talent() {
            var listTalentAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--bg-talent', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1.2, { x: "-80%" }, 0.7).to('.assassin-info__visual--list-hero', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#ddd' }, 1);

            $('.assassin-info__visual--list-talent').addClass('active');
            listActiveNum = 2;
            listTalentAction.restart();
        },
        hero: function hero() {
            var listHeroAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--bg-hero', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-201%" }, 0).to('.assassin-info__visual--list-hero', 1.2, { x: "90%", y: "20%" }, 0.7).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#ddd' }, 1);

            $('.assassin-info__visual--list-hero').addClass('active');
            listActiveNum = 3;
            listHeroAction.restart();
        },
        villain: function villain() {
            var listVillainAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--bg-villain', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-201%" }, 0).to('.assassin-info__visual--list-hero', 1, { x: "-301%" }, 0)
            //.to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual', 0.5, { background: '#ddd' }, 1).to('.assassin-info__visual--character-villain', 1, { backgroundSize: '140%', backgroundPosition: 'center 10%' }, 1);

            $('.assassin-info__visual--list-villain').addClass('active');
            listActiveNum = 4;
            listVillainAction.restart();
        }
    };

    var navigationShow = function navigationShow(flag) {
        if (flag == true) {
            gsap.to('.assassin-info__visual--navigation', 1, { opacity: 1, pointerEvents: "visible", delay: 1.2 });
        } else {
            gsap.to('.assassin-info__visual--navigation', 0.5, { opacity: 0, pointerEvents: "none" });
        }
    };

    var navi = {
        home: function home() {
            var naviHomeAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--character-villain', 0.5, { backgroundSize: '200%', backgroundPosition: 'center 100%' }, 0).set('.assasin_bg', { opacity: 1 }, 0.4).set('.assassin-info__visual--list-villain', { x: '101%' }, 0).to('.assassin-info__visual', 1, { background: '#d00116' }, 0).to('.assassin-info__visual--list li', 0.5, { x: 0, y: 0, opacity: 1, filter: 'grayscale(100%)' }, 0.2);

            $('.assassin-info__visual--list li').removeClass('active');
            listActiveNum = 0;
            naviHomeAction.restart();
            assassinContent.hideContent();

            setTimeout(function () {
                isListAnimating = false;
            }, 1200);

            if (naviFlag) {
                naviFlag = false;
                navigationShow(naviFlag); //네비 비활성화
            }
        },
        origin: function origin() {
            var naviOriginAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-origin', { opacity: 0 }, 0).set('.assassin-info__visual--list-origin', { opacity: 0, x: 0, y: 0 }, 0.2).to('.assassin-info__visual--list-origin', 0.8, { y: "10%", opacity: 1 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-origin').addClass('active');
                listActiveNum = 1;
                isListAnimating = false;
            }, 1200);

            naviOriginAction.restart();
            assassinContent.origin();
        },
        talent: function talent() {
            var naviTalentAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-talent', { opacity: 0 }, 0).set('.assassin-info__visual--list-talent', { opacity: 0, x: "-50%" }, 0.2).to('.assassin-info__visual--list-talent', 0.8, { x: "-80%", opacity: 1 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-talent').addClass('active');
                listActiveNum = 2;
                isListAnimating = false;
            }, 1200);

            naviTalentAction.restart();
        },
        hero: function hero() {
            var naviHeroAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-hero', { opacity: 0 }, 0).set('.assassin-info__visual--list-hero', { opacity: 0, x: "70%", y: "10%" }, 0.2).to('.assassin-info__visual--list-hero', 0.8, { x: "90%", y: "20%", opacity: 1 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-hero').addClass('active');
                listActiveNum = 3;
                isListAnimating = false;
            }, 1200);

            naviHeroAction.restart();
        },
        villain: function villain() {
            var naviVillainAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-villain', { opacity: 0 }, 0).set('.assassin-info__visual--character-villain', { backgroundSize: '140%', backgroundPosition: 'center 10%' }, 0).set('.assassin-info__visual--list-villain', { opacity: 0, x: "0", y: "0" }, 0.2).to('.assassin-info__visual--list-villain', 0.8, { opacity: 1 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-villain').addClass('active');
                listActiveNum = 4;
                isListAnimating = false;
            }, 1200);

            naviVillainAction.restart();
        }
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
                visualList.origin();
                break;
            case 2:
                visualList.talent();
                break;
            case 3:
                visualList.hero();
                break;
            case 4:
                visualList.villain();
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
                    navi.home();
                    break;
                case 1:
                    navi.origin();
                    break;
                case 2:
                    navi.talent();
                    break;
                case 3:
                    navi.hero();
                    break;
                case 4:
                    navi.villain();
                    break;
            }
        }
    }
    // assassin-info


    // quiz-area
    var quizCorrectResult = [2, 1, 2, 2, 1, 2, 2, 2, 1, 2];

    var quizSecChange = function quizSecChange() {
        setTimeout(function () {
            //console.log('quizNum222 = ' + quizNum);
            $('.quiz-area__inner--question-sec.active').addClass('before').removeClass('active');
            quizNum++;
        }, 500);

        setTimeout(function () {
            $('.quiz-area__inner--question-sec:nth-of-type(' + quizNum + ')').addClass('active');
            $('.quiz-area__inner--progress .mark .radius:nth-of-type(' + quizNum + ')').addClass('active');
        }, 600);
    };
    var quizFormScroll = function quizFormScroll(h) {
        gsap.to("#quiz-area__form", 1, { y: h, delay: 0.5 });
    };
    var quizProgress = function quizProgress(xs) {
        gsap.to(".quiz-area__inner--progress .line .active-line", 1, { x: xs });
    };

    $('.quiz-area__inner--result').click(function () {
        var quizResult = $('#quiz-area__form').serializeArray();
        //console.log('선택한 ox답');
        //console.log(quizResult);

        gsap.to('.quiz-area__inner--headline', 0.5, { opacity: 0 });
        gsap.to('.quiz-area__inner--result', 0.5, { opacity: 0 });
        gsap.to('.quiz-area__inner--progress', 0.5, { opacity: 0 });
        gsap.to('.quiz-area__inner--question', 1, { height: 760, marginTop: -110 });
        gsap.to('#quiz-area__form', 1, { y: 0 });
        gsap.to('.explain__gloup', 1, { opacity: 1, delay: 0.8, pointerEvents: 'visible' });

        //정답이랑 내가 체크한 값 비교하기
        var quizScore = 0;

        //const quizCorrectResult = [ 2, 1, 2, 2, 1, 2, 2, 2, 1, 2 ];

        for (var k = 0; k < quizCorrectResult.length; k++) {

            if (quizCorrectResult[k] == Number(quizResult[k].value)) {
                //맞은 개수
                quizScore += 1;

                if (quizCorrectResult[k] == 1) {
                    // true가 정답일때의 css
                    $("#quiz-area__form .quiz-area__inner--question-sec:nth-of-type(" + (k + 1) + ") .quix-form__button input[type='radio']:checked + label.true").addClass('correct');
                } else {
                    $("#quiz-area__form .quiz-area__inner--question-sec:nth-of-type(" + (k + 1) + ") .quix-form__button input[type='radio']:checked + label.false").addClass('correct');
                }
            } else {

                if (quizCorrectResult[k] == 1) {
                    // true가 정답일때의 css
                    $("#quiz-area__form .quiz-area__inner--question-sec:nth-of-type(" + (k + 1) + ") .quix-form__button input[type='radio'] + label.true").addClass('correct');
                } else {
                    //false가 정답일때의 css
                    $("#quiz-area__form .quiz-area__inner--question-sec:nth-of-type(" + (k + 1) + ") .quix-form__button input[type='radio'] + label.false").addClass('correct');
                }
            }
        }

        console.log('quizScore = ' + quizScore);
    });

    $('.quix-form__button label').click(function () {
        //console.log('quizNum = ' + quizNum);
        if (!quizAnimation) {
            quizAnimation = true;

            quizSecChange();

            switch (quizNum) {
                case 1:
                    quizProgress(-600);
                    break;
                case 2:
                    quizFormScroll(-64);
                    quizProgress(-530);
                    break;
                case 3:
                    quizFormScroll(-124);
                    quizProgress(-450);
                    break;
                case 4:
                    quizFormScroll(-184);
                    quizProgress(-380);
                    break;
                case 5:
                    quizFormScroll(-246);
                    quizProgress(-300);
                    break;
                case 6:
                    quizFormScroll(-308);
                    quizProgress(-230);
                    break;
                case 7:
                    quizFormScroll(-368);
                    quizProgress(-155);
                    break;
                case 8:
                    quizFormScroll(-430);
                    quizProgress(-85);
                    break;
                case 9:
                    quizProgress(-5);
                    break;
                case 10:
                    gsap.to('.quiz-area__inner--result', 0.8, { opacity: 1, pointerEvents: 'visible', delay: 0.5 });
                    break;
            }

            setTimeout(function () {
                quizAnimation = false;
            }, 600); //모션 끝나는 타이밍에
        }
    });
    // quiz-area


    //content swiper
    var verticalPageSwapNext = {
        visual: function visual() {
            gsap.to('.quiz-area', 1.2, { y: 0, ease: "power4.out" });
        },
        quiz: function quiz() {
            gsap.to('.immunity-relation', 1.2, { y: 0, ease: "power4.out" });
        },
        immunity: function immunity() {
            gsap.to('.natural-killer', 1.2, { y: 0, ease: "power4.out" });
        },
        natural: function natural() {
            gsap.to('.assassin-info', 1.2, { y: 0, ease: "power4.out" });
        },
        assassin: function assassin() {
            gsap.to('.epilogue', 1.2, { y: 0, ease: "power4.out" });
        },
        epilogue: function epilogue() {
            gsap.to('.outro', 1.2, { y: 0, ease: "power4.out" });
        },
        outro: function outro() {}
    };

    var verticalPageSwapPrev = {
        quiz: function quiz() {
            gsap.to('.quiz-area', 1.2, { y: "100vh", ease: "power4.out" });
        },
        immunity: function immunity() {
            gsap.to('.immunity-relation', 1.2, { y: "100vh", ease: "power4.out" });
        },
        natural: function natural() {
            gsap.to('.natural-killer', 1.2, { y: "100vh", ease: "power4.out" });
        },
        assassin: function assassin() {
            gsap.to('.assassin-info', 1.2, { y: "100vh", ease: "power4.out" });
        },
        epilogue: function epilogue() {
            gsap.to('.epilogue', 1.2, { y: "100vh", ease: "power4.out" });
        },
        outro: function outro() {
            gsap.to('.outro', 1.2, { y: "100vh", ease: "power4.out" });
        }
    };

    var horizontalEvent = function horizontalEvent(htEvent) {
        console.log('horizontalEvent');
        if (htEvent == 1) {
            gsap.to('.natural-killer__type', 1, { opacity: 1 });
            gsap.to('.natural-killer__explain', 0.5, { opacity: 0 });
        } else {
            gsap.to('.natural-killer__type', 0.5, { opacity: 0 });
            gsap.to('.natural-killer__explain', 1, { opacity: 1 });
        }
        setTimeout(function () {
            onSlideChangeEnd();
        }, 1200);
    };

    //page controll
    var goToNextSlide = function goToNextSlide() {
        if (pageNum >= 7) return false; //index: 0 기준 false 처리

        if (!isAnimating) {
            isAnimating = true;
            pageNum += 1;

            console.log('next page = ' + pageNum);

            switch (pageNum) {
                case 0:
                    break;
                case 1:
                    verticalPageSwapNext.visual();
                    break;
                case 2:
                    verticalPageSwapNext.quiz();
                    break;
                case 3:
                    verticalPageSwapNext.immunity();
                    break;
                case 4:
                    horizontalEvent(1);
                    break;
                case 5:
                    verticalPageSwapNext.natural();
                    break;
                case 6:
                    verticalPageSwapNext.assassin();
                    break;
                case 7:
                    verticalPageSwapNext.epilogue();
                    break;
            }

            setTimeout(function () {
                onSlideChangeEnd();
            }, 1200);
        }
    };
    var goToPrevSlide = function goToPrevSlide() {
        if (pageNum <= 0) return false; //총 페이지 수를 넘어가면 false처리

        if (!isAnimating) {
            isAnimating = true;
            pageNum -= 1;

            console.log('prev page = ' + pageNum);

            switch (pageNum) {
                case 0:
                    verticalPageSwapPrev.quiz();
                    break;
                case 1:
                    verticalPageSwapPrev.immunity();
                    break;
                case 2:
                    verticalPageSwapPrev.natural();
                    break;
                case 3:
                    horizontalEvent(2);
                    break;
                case 4:
                    verticalPageSwapPrev.assassin();
                    break;
                case 5:
                    verticalPageSwapPrev.epilogue();
                    break;
                case 6:
                    verticalPageSwapPrev.outro();
                    break;
            }

            setTimeout(function () {
                onSlideChangeEnd();
            }, 1200);
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
            goToNextSlide();
        } else {
            //up
            goToPrevSlide();
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
            goToNextSlide();
            event.preventDefault();
        } else if (PRESSED_KEY == keyCodes.UP) {
            goToPrevSlide();
            event.preventDefault();
        }
    });

    defaultSet(); // 기본 셋팅 실행
});

var explainBtnActive;
var explainBtn = function explainBtn(flag, num) {
    if (flag == 'show') {
        $('.quiz-area__inner--question-sec .quiz-area__inner--explain').removeClass('active');
        gsap.to('.quiz-area__inner--explainBtn .quiz-area__inner--explainBtn-hide', 0.3, { opacity: 0, pointerEvents: 'none' });
        gsap.to('.quiz-area__inner--explainBtn.q' + num + ' .quiz-area__inner--explainBtn-hide', 0.3, { opacity: 1, pointerEvents: 'visible' });
        $('.quiz-area__inner--question-sec:nth-of-type(' + num + ') .quiz-area__inner--explain').addClass('active');
        explainBtnActive = num;
    } else {
        gsap.to('.quiz-area__inner--explainBtn.q' + num + ' .quiz-area__inner--explainBtn-hide', 0.3, { opacity: 0, pointerEvents: 'none' });
        if (explainBtnActive == num) {
            $('.quiz-area__inner--question-sec:nth-of-type(' + num + ') .quiz-area__inner--explain').removeClass('active');
        }
    }
};