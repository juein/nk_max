'use strict';

// 스크립트 시작

//global
//const pageIntroAction;


// onload
window.onload = function () {
    //console.log('onload');
    var pageIntroAction = new TimelineMax({ paused: true }).to('.visual-intro__type-text', 0.8, { opacity: 1 }, 0.2).to('.visual-intro__illust', 0.6, { opacity: 1, x: 0, y: 0 }, 0.4).to('.visual-intro__type-text.before', 0.8, { opacity: 0 }, 0.8).to('.visual-intro__area--headline-first', 0.6, { opacity: 1, x: 0 }, 0.8).to('.visual-intro__area--headline-last', 0.6, { opacity: 1, x: 0 }, 0.8);

    pageIntroAction.play();
};

// onload

window.addEventListener('DOMContentLoaded', function () {

    var pageNum = 0,
        isAnimating = false,
        isListAnimating = false,
        naviFlag = false,
        hoverItem = void 0,
        hoverAction = void 0,
        listActiveNum = 0,
        quizStep = 1,
        hoveHeroFlag = false;

    //리로드
    //window.onbeforeunload = function () {
    //    //window.scrollTo(0, 0);
    //    //console.clear(); 
    //}

    var ctrl = new ScrollMagic.Controller();

    // default setting
    var defaultSet = function defaultSet() {
        gsap.set('.assassin-info__visual--list .grayscale', { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)' });
        gsap.set('.quiz-area__inner--question-step1', { opacity: 1, pointerEvents: 'visible' });
    };

    // quiz-area
    $('.start-btn').click(function () {
        gsap.to('.quiz-area__inner--start', 0.6, { opacity: 0, pointerEvents: 'none' });
        gsap.to('.start-btn', 0.6, { opacity: 0, pointerEvents: 'none' });
        gsap.to('.quiz-area__inner--question', 0.5, { opacity: 1, pointerEvents: 'visible', delay: 0.4 });
    });

    var _loop = function _loop($i) {
        $('input:radio[name=q' + $i + ']').click(function () {
            if ($i == 10) {
                gsap.to('.quiz__btn--finish', 0.5, { opacity: 1, pointerEvents: 'visible' });
            } else {
                gsap.to('.quiz__btn--next', 0.5, { opacity: 1, pointerEvents: 'visible' });
            }
        });
    };

    for (var $i = 1; $i <= 10; $i++) {
        _loop($i);
    }

    $('.quiz__btn--next').click(function () {
        $('.this-quoetion').removeClass('thisActive');
        gsap.to('.quiz-area__inner--question-step' + quizStep, 0.5, { opacity: 0, pointerEvents: 'none' });
        gsap.to('.quiz__btn--next', 0.5, { opacity: 0, pointerEvents: 'none' });
        quizStep += 1;
        gsap.to('.quiz-area__inner--question-step' + quizStep, 0.5, { opacity: 1, pointerEvents: 'visible', delay: 0.4 });
        $('.progress__box:nth-of-type(' + quizStep + ') .chk').addClass('active');
        $('.progress__box:nth-of-type(' + quizStep + ') .this-quoetion').addClass('thisActive');
    });

    $('.quiz__btn--finish').click(function () {
        var quizResult = $('#quiz-area__form').serializeArray();
        //console.log(quizResult);
        //정답이랑 내가 체크한 값 비교하기
        var quizScore = 0;
        var quizCorrectResult = [2, 1, 2, 2, 1, 2, 2, 2, 1, 2];
        for (var k = 0; k < quizCorrectResult.length; k++) {
            if (quizCorrectResult[k] == Number(quizResult[k].value)) {
                quizScore += 1;
                //console.log((k + 1) +' = 정답 ');
                $('.explain__list-item.q' + (k + 1) + ' .answer-status--true').addClass('active');
            } else {
                //console.log((k + 1) +' = 틀림 ');
                $('.explain__list-item.q' + (k + 1) + ' .answer-status--false').addClass('active');
            }

            if (Number(quizResult[k].value) == 1) {
                $('.explain__list-item.q' + (k + 1) + ' .select_true').addClass('active');
            } else {
                $('.explain__list-item.q' + (k + 1) + ' .select_false').addClass('active');
            }
        }
        //console.log('quizScore = ' + quizScore);
        //해설지 ox표기
        quizResultPage(quizScore);
    });

    var quizResultPage = function quizResultPage(score) {
        // score graph 표기
        for (var $j = 1; $j <= score; $j++) {
            $('.number-graph path:nth-of-type(' + $j + ')').addClass('active');
        }
        $('.number-text-strong .sc-num').html(score * 10);
        $('.number-text-default .sc-num').html(score);

        // grade 표기
        var gradeTitle = void 0,
            gradeEtc = void 0;
        if (score == 0) {
            gradeTitle = '당신은 면역 상식이 전혀 없습니다.';
            gradeEtc = '아직 면역에 대해 모르시네요. <br>NK세포와 함께 더 알아가는 건 어떨까요?';
        } else if (score <= 3) {
            gradeTitle = '당신은 면역 상식 어린이 수준입니다.';
            gradeEtc = '아직 면역에 대해 잘 모르시네요. <br>NK세포와 함께 더 알아가는 건 어떨까요?';
        } else if (score <= 7) {
            gradeTitle = '당신은 면역 상식은 학생수준 입니다.';
            gradeEtc = '어느 정도 더 관심을 기울인다면, <br>곧 면역 상식왕이 되겠습니다!';
        } else if (score <= 8) {
            gradeTitle = '당신은 면역 상식 박사입니다.';
            gradeEtc = '혹시 면역학 공부를 따로 하셨나요? <br>면역 상식으론 따라 잡을 이가 없네요.';
        }
        $('.grade-title').html(gradeTitle);
        $('.grade-etc').html(gradeEtc);

        gsap.to('.quiz-area__inner--question', 0.5, { opacity: 0, pointerEvents: 'none' });
        gsap.to('.quiz-area__inner--result', 0.5, { opacity: 1, pointerEvents: 'visible' });
    };

    $('.quiz-explain-btn').click(function () {
        gsap.to('.quiz-area__inner', 0.5, { opacity: 0, pointerEvents: 'none' });
        gsap.to('.quiz-area__explain', 0.8, { opacity: 1, pointerEvents: 'visible' });
    });
    // quiz-area


    // immunity-relation
    MorphSVGPlugin.convertToPath("circle, rect, polygon");

    var immunityChart = {
        mothion: function mothion() {
            //const immunityMorph = new TimelineLite({paused: true, repeat: -1})
            var immunityMorph = new TimelineLite({ paused: true }).set(".bar-graph-active", { width: '10%' }, 0).set(".cell-bar-graph-pointer", { left: 50 }, 0).add(function () {
                immunityMorph.play();
            }, 0).to(".scene_one_from_1", { duration: 0.8, morphSVG: ".scene_one_to_1", fill: "#3B5AC3" }, 0).to(".scene_one_from_9", { duration: 0.5, morphSVG: ".scene_one_to_9", fill: "#3B5AC3" }, 0.2).to(".scene_one_from_3", { duration: 0.8, morphSVG: ".scene_one_to_3", fill: "#3B5AC3" }, 0.3).to(".scene_one_from_4", { duration: 0.5, morphSVG: ".scene_one_to_4", fill: "#3B5AC3" }, 0.6).to(".scene_one_from_6", { duration: 0.8, morphSVG: ".scene_one_to_6", fill: "#3B5AC3" }, 0.8).to(".scene_one_from_7", { duration: 0.5, morphSVG: ".scene_one_to_7", fill: "#3B5AC3" }, 1.2).to(".scene_one_from_2", { duration: 0.8, morphSVG: ".scene_one_to_2", fill: "#3B5AC3" }, 1.4).to(".scene_one_from_5", { duration: 0.5, morphSVG: ".scene_one_to_5", fill: "#3B5AC3" }, 1.7).to(".scene_one_from_8", { duration: 0.8, morphSVG: ".scene_one_to_8", fill: "#3B5AC3" }, 1.9).to(".scene_two_from_1", { duration: 0.8, morphSVG: ".scene_two_to_1", fill: "#3B5AC3" }, 2.1).to(".scene_two_from_3", { duration: 0.5, morphSVG: ".scene_two_to_3", fill: "#3B5AC3" }, 2.4).to(".scene_two_from_5", { duration: 0.8, morphSVG: ".scene_two_to_5", fill: "#3B5AC3", x: 10, y: -10 }, 2.7).to(".scene_two_from_4", { duration: 0.5, morphSVG: ".scene_two_to_4", fill: "#3B5AC3", x: -10 }, 3).to(".scene_two_from_2", { duration: 0.8, morphSVG: ".scene_two_to_2", fill: "#3B5AC3", y: -10 }, 3.2).to(".bar-graph-active", 2, { width: '49%', ease: 'none' }, 0).to(".cell-bar-graph-pointer", 2, { left: 290, ease: 'none' }, 0).to(".bar-graph-active", 2, { width: '83%', ease: 'none' }, 2).to(".cell-bar-graph-pointer", 2, { left: 500, ease: 'none' }, 2).add(function () {
                immunityMorph.reverse();
            }, 4);

            immunityMorph.play();
            // 정지 immunityMorph.pause();
        }
    };
    // immunity-relation

    var hoverOriginAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--character-origin', 2, { x: -80 }, 0);

    var hoverTalentAction = new TimelineLite({ paused: true }).set('.talent__object-1', { opacity: 0, x: -20 }, 0).set('.talent__object-2', { opacity: 0, x: 100, y: -40 }, 0).set('.talent__object-3', { opacity: 0, x: 150, y: -50 }, 0).set('.talent__object-4', { opacity: 0, x: 200, y: -60 }, 0).to('.talent__object-1', 0.4, { opacity: 1, x: 0 }, 0.2).to('.talent__object-2', 0.4, { opacity: 1, x: 0, y: 0 }, 0.4).to('.talent__object-3', 0.3, { opacity: 1, x: 0, y: 0 }, 0.6).to('.talent__object-4', 0.5, { opacity: 1, x: 0, y: 0 }, 0.7);

    var hoverHeroAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--character-hero', 0.7, { x: 0, y: 0 }, 0).to('.assassin-info__visual--bg-hero.assasin_bg', 0.7, { scale: 1.5 }, 0);

    var hoverVillainAction = new TimelineLite({ paused: true }).set('.villain__object-1', { opacity: 0, y: -350 }, 0).to('.villain__object-1', 1, { opacity: 1, y: -250 }, 0.2);

    var assasinHoverControl = {
        originPlay: function originPlay() {
            hoverOriginAction.restart();
        },
        originReverse: function originReverse() {
            hoverOriginAction.reverse();
        },
        talentPlay: function talentPlay() {
            gsap.to('.assassin-info__visual--character-talent', 1, { x: 0 });
            hoverTalentAction.restart();
        },
        talentReverse: function talentReverse() {
            hoverTalentAction.seek(0);
            hoverTalentAction.pause(0);
            gsap.to('.assassin-info__visual--character-talent', 1, { x: 40 });
        },
        heroPlay: function heroPlay() {
            hoverHeroAction.restart();
        },
        heroReverse: function heroReverse() {
            //hoverHeroAction.reverse();
            if (!hoveHeroFlag) {
                hoverHeroAction.reverse();
            }
        },
        villainPlay: function villainPlay() {
            hoverVillainAction.restart();
        },
        villainReverse: function villainReverse() {
            hoverVillainAction.seek(0);
            hoverVillainAction.pause(0);
        }
    };

    // assassin-info
    $(".assassin-info .grayscale").hover(function () {
        hoverItem = $(this).attr('class').replace('grayscale', '');
        gsap.to('.' + hoverItem, 1, { '-webkit-filter': 'grayscale(0%)', filter: 'grayscale(0%)' });
        hoverAction = String(hoverItem.replace('assassin-info__visual--list-', '').trim());

        if (hoverAction == 'origin') {
            assasinHoverControl.originPlay();
        } else if (hoverAction == 'talent') {
            assasinHoverControl.talentPlay();
        } else if (hoverAction == 'hero') {
            assasinHoverControl.heroPlay();
        } else if (hoverAction == 'villain') {
            assasinHoverControl.villainPlay();
        }
    }, function () {
        if (listActiveNum == 0) {
            gsap.to('.' + hoverItem, 1, { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)' });
        }

        if (hoverAction == 'origin') {
            assasinHoverControl.originReverse();
        } else if (hoverAction == 'talent') {
            assasinHoverControl.talentReverse();
        } else if (hoverAction == 'hero') {
            assasinHoverControl.heroReverse();
        } else if (hoverAction == 'villain') {
            assasinHoverControl.villainReverse();
        }
    });

    var assassinContent = {
        hideContent: function hideContent() {
            //컨텐츠 display none
            gsap.to('.assassin-info__visual--content--origin', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, { opacity: 0 });
        },
        origin: function origin() {
            console.log('origin content!!');
            gsap.to('.assassin-info__visual--content--origin-typo', 1, { opacity: 1 });
            gsap.to('.assassin-info__visual--content--talent-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, { opacity: 0 });

            gsap.to('.assassin-info__visual--content--origin', 0.5, { opacity: 1, delay: 0.5 });
            gsap.to('.assassin-info__visual--content--talent', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain', 0.3, { opacity: 0 });
        },
        talent: function talent() {
            console.log('talent content!!');
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent-typo', 1, { opacity: 1 });
            gsap.to('.assassin-info__visual--content--hero-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, { opacity: 0 });

            gsap.to('.assassin-info__visual--content--origin', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent', 0.5, { opacity: 1, delay: 0.5 });
            gsap.to('.assassin-info__visual--content--hero', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain', 0.3, { opacity: 0 });
        },
        talentAnimation: function talentAnimation() {
            //console.log('talentAnimation');
            var tMechanismAnimation = new TimelineLite({ paused: true, repeat: -1 }).to('.t-cell-1', 1.4, { x: 170, ease: 'none' }, 0).to('.t-cell-2', 1.4, { x: 140, ease: 'none' }, 0).to('.t-cell-3', 1.4, { x: 150, ease: 'none' }, 0).to('.cancer-cell.tarea', 1.4, { x: -180, ease: 'none' }, 0).to('.cancer-cell.tarea', 0.4, { opacity: 0.8, ease: 'none' }, 0.3).to('.cancer-cell.tarea', 0.4, { opacity: 1, ease: 'none' }, 0.8).to('.t-cell-1', 1.4, { x: 0, ease: 'none' }, 1.4).to('.t-cell-2', 1.4, { x: 0, ease: 'none' }, 1.4).to('.t-cell-3', 1.4, { x: 0, ease: 'none' }, 1.4).to('.cancer-cell.tarea', 1.4, { x: 0, ease: 'none' }, 1.4).to('.cancer-cell.tarea', 0.4, { opacity: 0.8, ease: 'none' }, 1.7).to('.cancer-cell.tarea', 0.4, { opacity: 1, ease: 'none' }, 2.2);

            var nkMechanismAnimation = new TimelineLite({ paused: true, repeat: -1 }).to('.nk-weapon-1', 0.2, { scaleX: 0.45 }, 0).to('.nk-weapon-2', 0.2, { scaleX: 1 }, 0).to('.nk-cell-1', 1, { x: 20, ease: 'none' }, 0).to('.nk-cell-2', 0.8, { x: 30, ease: 'none' }, 0).to('.nk-weapon-1', 0.4, { scaleX: 1 }, 0.2).to('.nk-weapon-1', 0.4, { scaleX: 0.45 }, 0.6).to('.nk-weapon-2', 0.4, { scaleX: 2 }, 0.6).to('.nk-weapon-2', 0.4, { scaleX: 1 }, 1).to('.nk-weapon-1', 0.4, { scaleX: 1 }, 1).to('.nk-cell-1', 1, { x: 0, ease: 'none' }, 1.1).to('.nk-cell-2', 1.1, { x: 0, ease: 'none' }, 0.8).to('.nk-boom', 0.3, { scale: 1, ease: 'back.out(1.7)' }, 1.2).to('.nk-boom', 0.2, { scale: 0 }, 1.5).to('.cancer-cell.nkarea', 0.6, { opacity: 0, scale: 1.5 }, 1.5);

            tMechanismAnimation.restart();
            nkMechanismAnimation.restart();
        },
        hero: function hero() {
            console.log('hero content!!');
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero-typo', 1, { opacity: 1 });
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, { opacity: 0 });

            gsap.to('.assassin-info__visual--content--origin', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero', 0.5, { opacity: 1, delay: 0.5 });
            gsap.to('.assassin-info__visual--content--villain', 0.3, { opacity: 0 });
        },
        villain: function villain() {
            console.log('villain content!!');
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain-typo', 1, { opacity: 1 });

            gsap.to('.assassin-info__visual--content--origin', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain', 0.5, { opacity: 1, delay: 0.5 });
        }
    };

    var visualList = {
        origin: function origin() {
            var listOriginAction = new TimelineLite({ paused: true })
            //assassin-info__visual--character-origin
            // scale(1.3) translateX(40px)
            .set('.assassin-info__visual--list-origin', { overflow: 'visible' }, 0).set('.assassin-info__visual--list-talent', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-hero', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-villain', { overflow: 'hidden' }, 0)

            //.to('.assassin-info__visual--list-origin', 1.2, {y: "10%"}, 0.7)
            .to('.assassin-info__visual--character-origin', 1, { scale: 1.2, y: 100, x: 80 }, 0.7).to('.assassin-info__visual--bg-origin', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-talent', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-hero', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#F2F2F2' }, 0.5);

            $('.assassin-info__visual--list-origin').addClass('active');
            listActiveNum = 1;
            listOriginAction.restart();
            assassinContent.origin();
        },
        talent: function talent() {
            var listTalentAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-origin', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-talent', { overflow: 'visible' }, 0).set('.assassin-info__visual--list-hero', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-villain', { overflow: 'hidden' }, 0).to('.assassin-info__visual--character-talent', 0.8, { x: 0, scale: 1.2 }, 0.7).to('.assassin-info__visual--bg-talent', 1, { opacity: 0 }, 0).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-80%" }, 0.7).to('.assassin-info__visual--list-hero', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#f2f2f2' }, 0.5);

            $('.assassin-info__visual--list-talent').addClass('active');
            listActiveNum = 2;
            listTalentAction.restart();
            assassinContent.talent();
            assassinContent.talentAnimation();
        },
        hero: function hero() {
            var listHeroAction = new TimelineLite({ paused: true })
            //.to('.assassin-info__visual--character-hero', 0.8, {x: 0, y: 0}, 0)
            //.set('.assassin-info__visual--character-hero', {x: 0, y: 0}, 0)
            .to('.assassin-info__visual--character-hero', 1.2, { x: 400, y: 200 }, 0).set('.assassin-info__visual--list-origin', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-talent', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-hero', { overflow: 'visible' }, 0).set('.assassin-info__visual--list-villain', { overflow: 'hidden' }, 0).to('.assassin-info__visual--bg-hero', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-201%" }, 0)
            //.to('.assassin-info__visual--list-hero', 1.2, {x: "90%", y: "20%"}, 0.7)
            .to('.assassin-info__visual--list-hero', 1.2, { x: "0%", y: "0%" }, 0.7).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#f2f2f2' }, 0.5);

            $('.assassin-info__visual--list-hero').addClass('active');
            listActiveNum = 3;
            listHeroAction.restart();
            assassinContent.hero();
        },
        villain: function villain() {
            var listVillainAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-origin', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-talent', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-hero', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-villain', { overflow: 'visible' }, 0).to('.assassin-info__visual--bg-villain', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-201%" }, 0).to('.assassin-info__visual--list-hero', 1, { x: "-301%" }, 0)
            //.to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual', 0.5, { background: '#f2f2f2' }, 0.5);
            //.to('.assassin-info__visual--character-villain', 1, {backgroundSize: '140%', backgroundPosition: 'center 10%'}, 1)

            $('.assassin-info__visual--list-villain').addClass('active');
            listActiveNum = 4;
            listVillainAction.restart();
            assassinContent.villain();
        }
    };

    //const navigationShow = (flag) => {
    //    if(flag == true){
    //        gsap.set('.assassin-info__visual--list', {pointerEvents: 'none'});
    //        gsap.to('.assassin-info__visual--navigation', 0.5, {opacity: 1, pointerEvents: "visible", delay: 0.8});
    //        gsap.to('.assassin-info__visual--scene', 0.7, {opacity: 0});
    //    }else {
    //        gsap.set('.assassin-info__visual--list', {pointerEvents: 'visible'});
    //        gsap.to('.assassin-info__visual--navigation', 0.5, {opacity: 0, pointerEvents: "none"});
    //        gsap.to('.assassin-info__visual--scene', 0.7, {opacity: 1});
    //        $('.assassin-info__visual--navigation-btn').removeClass('active');
    //    }
    //}

    var navi = {
        home: function home() {
            isListAnimating = false;
            console.log('isListAnimating == ' + isListAnimating);

            // 네비 비활성화
            //gsap.set('.assassin-info__visual--list', {pointerEvents: 'visible'});
            gsap.set('.assassin-info__visual--navigation', { pointerEvents: 'none', opacity: 0 });
            //gsap.to('.assassin-info__visual--navigation', 0.5, {opacity: 0});
            gsap.to('.assassin-info__visual--scene', 0.7, { opacity: 1 });
            $('.assassin-info__visual--navigation-btn').removeClass('active');

            //gsap.set('.assassin-info__visual--navigation', {pointerEvents: 'none'});

            var naviHomeAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list', { opacity: 0 }, 0).to('.assassin-info__visual--character-origin', 0.4, { scale: 1.5, y: 0, x: 0 }, 0).to('.assassin-info__visual--character-talent', 0.4, { x: 40, scale: 1.6 }, 0).to('.assassin-info__visual--character-hero', 0.4, { x: 30, y: 0 }, 0)

            //.to('.assassin-info__visual--character-villain', 0.5, {backgroundSize: '200%', backgroundPosition: 'center 100%'}, 0)
            .set('.assassin-info__visual--list-origin', { overflow: 'hidden' }, 0.3).set('.assassin-info__visual--list-talent', { overflow: 'hidden' }, 0.3).set('.assassin-info__visual--list-hero', { overflow: 'hidden' }, 0.3).set('.assassin-info__visual--list-villain', { overflow: 'hidden' }, 0.3).set('.assasin_bg', { opacity: 1 }, 0.4).set('.assassin-info__visual--list-villain', { x: '101%' }, 0).to('.assassin-info__visual', 1, { background: '#d00116' }, 0).to('.assassin-info__visual--list li', 0.5, { x: 0, y: 0, opacity: 1, filter: 'grayscale(100%)' }, 0.2).to('.assassin-info__visual--list', 0.4, { opacity: 1 }, 0.5);

            $('.assassin-info__visual--list li').removeClass('active');

            gsap.set('.assassin-info__visual--list', { pointerEvents: 'visible', delay: 0.8 });
            listActiveNum = 0;
            naviHomeAction.restart();
            assassinContent.hideContent();
            //tMechanismAnimation.paused();
            //nkMechanismAnimation.paused();

            hoveHeroFlag = false;

            //setTimeout(() => {
            //isListAnimating = false;
            //naviFlag = false;
            //navigationShow(false); //네비 비활성화
            //gsap.set('.assassin-info__visual--navigation', {opacity: 0, pointerEvents: 'none'});
            //}, 1400);

            //if(naviFlag){
            //    naviFlag = false;
            //    navigationShow(false); //네비 비활성화
            //}

        },
        origin: function origin() {
            var naviOriginAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-origin', { overflow: 'visible' }, 0.2).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-origin', { opacity: 0 }, 0).set('.assassin-info__visual--list-origin', { opacity: 0, x: 0, y: 0 }, 0.2).set('.assassin-info__visual--character-origin', { scale: 1.2, y: 0, x: 0 }, 0.2).to('.assassin-info__visual--list-origin', 0.8, { opacity: 1 }, 0.4).to('.assassin-info__visual--character-origin', 0.8, { y: 100, x: 80 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-origin').addClass('active');
                listActiveNum = 1;
                isListAnimating = false;
                console.log('isListAnimating == ' + isListAnimating);
            }, 1400);

            naviOriginAction.restart();
            assassinContent.origin();
        },
        talent: function talent() {
            var naviTalentAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-talent', { overflow: 'visible' }, 0.2).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-talent', { opacity: 0 }, 0).set('.assassin-info__visual--list-talent', { opacity: 0, x: "-50%" }, 0.2).set('.assassin-info__visual--character-talent', { scale: 1.2, x: 0 }, 0.2).to('.assassin-info__visual--list-talent', 0.8, { x: "-80%", opacity: 1 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-talent').addClass('active');
                listActiveNum = 2;
                isListAnimating = false;
                console.log('isListAnimating == ' + isListAnimating);
            }, 1400);

            naviTalentAction.restart();
            assassinContent.talent();
            assassinContent.talentAnimation();
        },
        hero: function hero() {
            var naviHeroAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-hero', { overflow: 'visible', opacity: 0, x: '0%', y: '0%' }, 0.2).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-hero', { opacity: 0 }, 0).to('.assassin-info__visual--list-hero', 0.8, { opacity: 1 }, 0.4).set('.assassin-info__visual--character-hero', { x: 300, y: 200 }, 0.2).to('.assassin-info__visual--character-hero', 0.8, { x: 400 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-hero').addClass('active');
                listActiveNum = 3;
                isListAnimating = false;
                console.log('isListAnimating == ' + isListAnimating);
            }, 1400);

            naviHeroAction.restart();
            assassinContent.hero();
        },
        villain: function villain() {
            var naviVillainAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-villain', { overflow: 'visible' }, 0.2).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-villain', { opacity: 0 }, 0)
            //.set('.assassin-info__visual--character-villain',  {backgroundSize: '140%', backgroundPosition: 'center 10%'}, 0)
            .set('.assassin-info__visual--list-villain', { opacity: 0, x: "0", y: "0" }, 0.2).to('.assassin-info__visual--list-villain', 0.8, { opacity: 1 }, 0.4)
            //.to('assassin-info__visual--list-villain', 0.5, {filter: 'grayscale(0%)'}, 0.4)
            //gsap.to('.assassin-info__visual--list .grayscale', 0.4, {'-webkit-filter':'grayscale(100%)', filter: 'grayscale(100%)', delay: 0.5 });
            .set('.assassin-info__visual--list .grayscale', { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)' }, 0.2).to('.assassin-info__visual--list .grayscale', 0.8, { '-webkit-filter': 'grayscale(0%)', filter: 'grayscale(0%)' }, 0.5);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-villain').addClass('active');
                listActiveNum = 4;
                isListAnimating = false;
                console.log('isListAnimating == ' + isListAnimating);
            }, 1400);

            naviVillainAction.restart();
            assassinContent.villain();
        }
    };

    var assassinList = document.querySelector('.assassin-info__visual--list');
    assassinList.addEventListener("click", assassinListClick);
    function assassinListClick(e) {
        var listValue = Number(e.target.getAttribute('data-value'));
        //console.log('!!!! listValue = ' + listValue);
        if (listValue != 4) {
            gsap.to('.assassin-info__visual--list .grayscale', 0.4, { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)', delay: 0.5 });
        }

        $('.assassin-info__visual--navigation-btn:nth-of-type(' + (listValue + 1) + ')').addClass('active');
        //console.log(e.target);
        //if(!naviFlag){
        //    naviFlag = true;
        //    navigationShow(true);
        //}
        gsap.set('.assassin-info__visual--list', { pointerEvents: 'none' });
        gsap.to('.assassin-info__visual--navigation', 0.5, { opacity: 1, pointerEvents: "visible", delay: 0.8 });
        gsap.to('.assassin-info__visual--scene', 0.7, { opacity: 0 });

        switch (listValue) {
            case 1:
                visualList.origin();
                break;
            case 2:
                visualList.talent();
                break;
            case 3:
                hoverHeroAction.pause();
                console.log('hoverHeroAction 중지!');
                hoveHeroFlag = true;
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
        console.log('isListAnimating == ' + isListAnimating);

        var naviValue = Number(e.target.getAttribute('data-value'));
        if (listActiveNum == naviValue) return false;
        if (!isListAnimating) {
            isListAnimating = true;
            console.log('isListAnimating == ' + isListAnimating);
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
            $('.assassin-info__visual--navigation-btn').removeClass('active');
            $('.assassin-info__visual--navigation-btn:nth-of-type(' + (naviValue + 1) + ')').addClass('active');
        }
    }
    // assassin-info


    // outro
    $('.outro__inner--video-play').click(function () {
        gsap.to('.outro', 1, { background: '#212121' });
        gsap.to('.outro__inner', 0.5, { opacity: 0 });
        gsap.to('.outro__video', 0.8, { opacity: 1, pointerEvents: 'visible', delay: 0.2 });
        gsap.to('.outro__background', 0.5, { opacity: 0 });
        setTimeout(function () {
            $(".outro__video--panel-in").get(0).play();
        }, 800);
    });
    // outro


    var pageNextScene = {
        quiz: function quiz() {
            var visualPageScene = new TimelineLite({ paused: true }).set('.quiz-area__inner--headline', { opacity: 0, y: 40 }, 0).set('.quiz-area__inner--cover', { opacity: 0 }, 0).set('.start-explanatory', { opacity: 0, y: 40 }, 0).set('.start-btn', { opacity: 0 }, 0).to('.quiz-area__inner--headline', 0.8, { opacity: 1, y: 0 }, 0.4).to('.quiz-area__inner--cover', 0.8, { opacity: 1 }, 0.4).to('.start-explanatory', 0.8, { opacity: 1, y: 0 }, 0.7).to('.start-btn', 0.8, { opacity: 1 }, 0.8);
            visualPageScene.restart();
        },
        immunity: function immunity() {
            var quizPageScene = new TimelineLite({ paused: true }).set('.immunity-relation__inner--headline', { opacity: 0, y: 40 }, 0).set('.immunity-relation__inner--chart', { opacity: 0 }, 0).to('.immunity-relation__inner--headline', 0.8, { opacity: 1, y: 0 }, 0.4).to('.immunity-relation__inner--chart', 0.8, { opacity: 1 }, 0.5);
            quizPageScene.restart();
        },
        natural: function natural() {
            var naturalPageScene = new TimelineLite({ paused: true }).set('.natural-killer__explain--headline', { opacity: 0, y: 40 }, 0).set('.natural-killer__explain--text-box-mg', { opacity: 0, y: 40 }, 0).to('.natural-killer__explain--headline', 0.8, { opacity: 1, y: 0 }, 0.6).to('.natural-killer__explain--text-box-mg:nth-of-type(1)', 0.8, { opacity: 1, y: 0 }, 0.6).to('.natural-killer__explain--text-box-mg:nth-of-type(2)', 0.8, { opacity: 1, y: 0 }, 0.8).to('.natural-killer__explain--text-box-mg:nth-of-type(3)', 0.8, { opacity: 1, y: 0 }, 1);
            naturalPageScene.restart();
        },
        epilogue: function epilogue() {
            var epiloguePageScene = new TimelineLite({ paused: true }).set('.epilogue__background-illust', { opacity: 0 }, 0).set('.epilogue__background-rain1', { opacity: 0, y: -30 }, 0).set('.epilogue__background-rain2', { opacity: 0, y: -50, scale: 1.2 }, 0).set('.epilogue__background-rain3', { opacity: 0, y: -100, scale: 1.2 }, 0).set('.epilogue__inner--area-headline', { opacity: 0, y: 40 }, 0).set('.epilogue__inner--area-explain', { opacity: 0, y: 40 }, 0).to('.epilogue__background-illust', 0.5, { opacity: 1 }, 0.5).to('.epilogue__background-rain2', 0.8, { opacity: 1, y: 0 }, 0.5).to('.epilogue__background-rain3', 1.5, { opacity: 1, y: 0 }, 1.3).to('.epilogue__background-rain1', 1.2, { opacity: 1, y: 0 }, 1.3).to('.epilogue__inner--area-headline', 0.8, { opacity: 1, y: 0 }, 0.5).to('.epilogue__inner--area-explain', 0.8, { opacity: 1, y: 0 }, 0.9);
            epiloguePageScene.restart();
        },
        outro: function outro() {
            var outroPageScene = new TimelineLite({ paused: true }).set('.outro__background', { y: -200, scaleY: 1.5 }, 0).set('.outro__inner--headline', { opacity: 0, y: 40 }, 0).set('.outro__inner--text-first', { opacity: 0, y: 40 }, 0).set('.outro__inner--text-second', { opacity: 0, y: 40 }, 0).set('.outro__inner--video-play', { opacity: 0 }, 0).to('.outro__background', 3, { y: 0, scaleY: 1.5 }, 0.2).to('.outro__inner--headline', 0.8, { opacity: 1, y: 0 }, 0.5).to('.outro__inner--text-first', 0.8, { opacity: 1, y: 0 }, 0.8).to('.outro__inner--text-second', 0.8, { opacity: 1, y: 0 }, 1.1).to('.outro__inner--video-play', 1, { opacity: 1 }, 1.3);
            outroPageScene.restart();
        }
    };

    //content swiper
    var verticalPageSwapNext = {
        visual: function visual() {
            gsap.to('.quiz-area', 1.2, { y: 0, ease: "power4.out" });
            pageNextScene.quiz();
        },
        quiz: function quiz() {
            gsap.to('.immunity-relation', 1.2, { y: 0, ease: "power4.out" });
            pageNextScene.immunity();
            immunityChart.mothion();
        },
        immunity: function immunity() {
            gsap.to('.natural-killer', 1.2, { y: 0, ease: "power4.out" });
            pageNextScene.natural();
        },
        natural: function natural() {
            gsap.to('.assassin-info', 1.2, { y: 0, ease: "power4.out" });
        },
        assassin: function assassin() {
            gsap.to('.epilogue', 1.2, { y: 0, ease: "power4.out" });
            pageNextScene.epilogue();
        },
        epilogue: function epilogue() {
            gsap.to('.outro', 1.2, { y: 0, ease: "power4.out" });
            pageNextScene.outro();
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
            var naturalTypeOn = new TimelineLite({ paused: true }).to('.natural-killer__type', 1, { opacity: 1 }, 0).to('.natural-killer__explain', 0.5, { opacity: 0 }, 0).to('.natural-killer', 1, { background: '#A5001A' }, 0.2).to('.natural-killer__type .deep', 1.4, { fill: '#900017', opacity: 0 }, 0.8).to('.natural-killer__type .light', 1, { fill: '#ffffff' }, 0.8).to('.natural-killer__type .text_n', 1, { x: 130 }, 1.8).to('.natural-killer__type .text_k', 1, { x: -275 }, 1.8).to('.natural-killer__type .text_cell', 1, { x: -520 }, 1.8);
            naturalTypeOn.restart();
        } else {
            var naturalTypeOff = new TimelineLite({ paused: true }).to('.natural-killer', 0.5, { background: '#F2F2F2' }, 0).to('.natural-killer__type', 0.5, { opacity: 0 }, 0).to('.natural-killer__explain', 1, { opacity: 1 }, 0).set('.natural-killer__type .deep.st0', { fill: '#BA0000', opacity: 1 }, 1.1).set('.natural-killer__type .deep.st1', { fill: '#212121', opacity: 1 }, 1.1).set('.natural-killer__type .light', { fill: '#BA0000' }, 1.1).set('.natural-killer__type .text_n', { x: 0 }, 1.1).set('.natural-killer__type .text_k', { x: 0 }, 1.1).set('.natural-killer__type .text_cell', { x: 0 }, 1.1);
            naturalTypeOff.restart();
        }
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
                    $(".outro__video--panel-in").get(0).pause();
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
var explainBtn = function explainBtn(num) {
    if (explainBtnActive == num) {
        $('.explain__list-more.q' + num).removeClass('view');
        if (num == 9 || num == 10) {
            gsap.to('.explain__list', 0.5, { top: 40 });
        }
        explainBtnActive = 0;
    } else {
        if (num == 9) {
            gsap.to('.explain__list', 0.5, { top: -90 });
        } else if (num == 10) {
            gsap.to('.explain__list', 0.5, { top: -30 });
        } else {
            gsap.to('.explain__list', 0.5, { top: 40 });
        }
        $('.explain__list-more').removeClass('view');
        $('.explain__list-more.q' + num).addClass('view');
        explainBtnActive = num;
    }
};