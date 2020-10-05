'use strict';

// onload
window.onload = function () {
    var pageIntroAction = new TimelineMax({ paused: true }).to('.visual-intro__type-text', 1, { opacity: 1 }, 0.2).to('.visual-intro__illust', 1, { opacity: 1, x: 0, y: 0 }, 0.5).to('.visual-intro__type-text.before', 1, { opacity: 0 }, 1).to('.visual-intro__area--headline-first', 1, { opacity: 1, x: 0 }, 1).to('.visual-intro__area--headline-last', 1, { opacity: 1, x: 0 }, 1).to('.visual-intro__area--goToTest', 1.2, { opacity: 1 }, 1.5).to('.visual-intro__area--goToStory', 1.2, { opacity: 1 }, 1.8);
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
        isQuizAnimation = false,
        furstquizAreaFlag = false,
        quizAreaFlag = false,
        hoveHeroFlag = false,
        naviActiveNum = 1,
        assassinAreaKeyPressed = false;

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
                quizNextQuestion($i);
            }
        });
    };

    for (var $i = 1; $i <= 10; $i++) {
        _loop($i);
    }

    var quizNextQuestion = function quizNextQuestion(num) {
        if (!isQuizAnimation) {
            isQuizAnimation = true;
            //console.log('test ==== ' + num);
            gsap.to('.quiz-area__inner--question-step' + quizStep, 0.5, { opacity: 0, pointerEvents: 'none' });
            quizStep += 1;
            gsap.to('.quiz-area__inner--question-step' + quizStep, 0.5, { opacity: 1, pointerEvents: 'visible', delay: 0.4 });
            $('.progress__box:nth-of-type(' + quizStep + ') .chk').addClass('active');
            $('.progress__box:nth-of-type(' + quizStep + ') .this-quoetion').addClass('thisActive');
            setTimeout(function () {
                isQuizAnimation = false;
            }, 600);
        }
    };

    $('.quiz__btn--finish').click(function () {
        var quizResult = $('#quiz-area__form').serializeArray();
        //정답이랑 내가 체크한 값 비교하기
        var quizScore = 0;
        var quizCorrectResult = [1, 1, 2, 1, 1, 2, 2, 1, 1, 2]; // 1 : true, 2 : false
        for (var k = 0; k < quizCorrectResult.length; k++) {
            if (quizCorrectResult[k] == Number(quizResult[k].value)) {
                quizScore += 1;
                $('.explain__list-item.q' + (k + 1) + ' .answer-status--true').addClass('active');
            } else {
                $('.explain__list-item.q' + (k + 1) + ' .answer-status--false').addClass('active');
            }
            if (Number(quizResult[k].value) == 1) {
                $('.explain__list-item.q' + (k + 1) + ' .select_true').addClass('active');
            } else {
                $('.explain__list-item.q' + (k + 1) + ' .select_false').addClass('active');
            }
        }
        //해설지 ox표기
        quizResultPage(quizScore);
    });

    var quizResultPage = function quizResultPage(score) {
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
        } else {
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

    var tMechanismAnimation = new TimelineLite({ paused: true, repeat: -1 }).set('.t-question-mark', { scale: 0 }, 0).to('.t-cell-3', 1.4, { x: 150, ease: 'none' }, 0).to('.cancer-cell.tarea', 1.4, { x: -120, ease: 'none' }, 0).to('.cancer-cell.tarea', 0.4, { opacity: 0.8, ease: 'none' }, 0.3).to('.cancer-cell.tarea', 0.4, { opacity: 1, ease: 'none' }, 0.8).to('.t-cell-3', 1.4, { x: 0, ease: 'none' }, 1.4).to('.cancer-cell.tarea', 1.4, { x: 0, ease: 'none' }, 1.4).to('.cancer-cell.tarea', 0.4, { opacity: 0.8, ease: 'none' }, 1.7).to('.cancer-cell.tarea', 0.4, { opacity: 1, ease: 'none' }, 2.2).to('.t-question-mark', 0.7, { scale: 1, ease: Back.easeOut.config(3) }, 2.7);

    var nkMechanismAnimation = new TimelineLite({ paused: true, repeat: -1 }).set('.cancer-cell.nkarea', { opacity: 1 }, 0).to('.nk-weapon-1', 0.2, { scaleX: 0.45 }, 0).to('.nk-weapon-2', 0.2, { scaleX: 1 }, 0).to('.nk-weapon-1', 0.4, { scaleX: 1 }, 0.2).to('.nk-weapon-1', 0.4, { scaleX: 0.45 }, 0.6).to('.nk-weapon-2', 0.4, { scaleX: 2 }, 0.6).to('.nk-weapon-2', 0.4, { scaleX: 1 }, 1).to('.nk-weapon-1', 0.4, { scaleX: 1 }, 1).to('.nk-boom', 0.3, { scale: 1, ease: 'back.out(1.7)' }, 1.2).to('.nk-boom', 0.2, { scale: 0 }, 1.5).to('.cancer-cell.nkarea', 0.6, { opacity: 0, scale: 1.5 }, 1.5);

    var assassinContent = {
        hideContent: function hideContent() {
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
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent-typo', 1, { opacity: 1 });
            gsap.to('.assassin-info__visual--content--hero-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--origin', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent', 0.5, { opacity: 1, delay: 0.5 });
            gsap.to('.assassin-info__visual--content--hero', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--villain', 0.3, { opacity: 0 });
        },
        hero: function hero() {
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero-typo', 1, { opacity: 1 });
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--origin', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--talent', 0.3, { opacity: 0 });
            gsap.to('.assassin-info__visual--content--hero', 0.5, { opacity: 1, delay: 0.5 });
            gsap.to('.assassin-info__visual--content--villain', 0.3, { opacity: 0 });
        },
        heroAnimation: function heroAnimation() {
            var procedureAnimation = new TimelineLite({ paused: true }).set('.procedure-nk', { scale: 0 }, 0).set('.procedure-cancer', { scale: 0 }, 0).set('.procedure-etc1', { scale: 0 }, 0).set('.procedure-etc2', { scale: 0 }, 0).set('.procedure-etc3', { scale: 0 }, 0).set('.procedure-etc4', { scale: 0 }, 0).set('.procedure-etc5', { scale: 0 }, 0).set('.procedure-etc3 .procedure__inner-text', { opacity: 0 }, 0).set('.procedure-step1 .procedure-line', { scaleX: 0 }, 0).set('.procedure-step1 .procedure-arrow-text', { opacity: 0 }, 0).set('.procedure-step1 .procedure-arrow', { opacity: 0 }, 0).set('.procedure-step2 .procedure-line', { scaleX: 0, rotate: -45 }, 0).set('.procedure-step2 .procedure-arrow-text', { opacity: 0 }, 0).set('.procedure-step2 .procedure-arrow', { opacity: 0 }, 0).set('.procedure-step3 .procedure-line', { scaleX: 0 }, 0).set('.procedure-step3 .procedure-arrow-text', { opacity: 0 }, 0).set('.procedure-step3 .procedure-arrow', { opacity: 0 }, 0).set('.procedure-step4 .procedure-line', { rotate: -45, scaleX: 0 }, 0).set('.procedure-step4 .procedure-arrow-text', { opacity: 0 }, 0).set('.procedure-step4 .procedure-arrow', { opacity: 0 }, 0).to('.procedure-nk', 0.6, { scale: 1 }, 0.5).to('.procedure-cancer', 0.6, { scale: 1 }, 0.7).to('.procedure-step1 .procedure-line', 0.5, { scaleX: 1 }, 1.1).to('.procedure-step1 .procedure-arrow-text', 0.5, { opacity: 1 }, 1.1).to('.procedure-step1 .procedure-arrow', 0.4, { opacity: 1 }, 1.6).to('.procedure-etc1', 0.6, { scale: 1 }, 1.3).to('.procedure-etc2', 0.6, { scale: 1 }, 1.5).to('.procedure-step2 .procedure-line', 0.5, { scaleX: 1 }, 1.9).to('.procedure-step2 .procedure-arrow-text', 0.5, { opacity: 1 }, 1.9).to('.procedure-step2 .procedure-arrow', 0.4, { opacity: 1 }, 2.4).to('.procedure-etc3', 0.6, { scale: 1 }, 2.3).to('.procedure-etc4', 0.6, { scale: 1 }, 2.5).to('.procedure-etc5', 0.6, { scale: 1 }, 2.7).to('.procedure-etc3 .procedure__inner-text', 0.6, { opacity: 1 }, 2.3).to('.procedure-step3 .procedure-line', 0.5, { scaleX: 1 }, 2.9).to('.procedure-step3 .procedure-arrow-text', 0.5, { opacity: 1 }, 2.9).to('.procedure-step3 .procedure-arrow', 0.4, { opacity: 1 }, 3.4).to('.procedure-step4 .procedure-line', 0.5, { scaleX: 1 }, 3.5).to('.procedure-step4 .procedure-arrow-text', 0.5, { opacity: 1 }, 3.5).to('.procedure-step4 .procedure-arrow', 0.4, { opacity: 1 }, 4);

            procedureAnimation.restart();
        },
        villain: function villain() {
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
            gsap.to('.arrow-btn-left', 0.3, { opacity: 0, pointerEvents: 'none' });

            var listOriginAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-origin', { overflow: 'visible' }, 0).set('.assassin-info__visual--list-talent', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-hero', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-villain', { overflow: 'hidden' }, 0).to('.assassin-info__visual--character-origin', 1, { scale: 1.5, y: 0, x: 110 }, 0.7).to('.assassin-info__visual--bg-origin', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-talent', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-hero', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#F2F2F2' }, 0.5);

            $('.assassin-info__visual--list-origin').addClass('active');
            listActiveNum = 1;
            listOriginAction.restart();
            assassinContent.origin();
        },
        talent: function talent() {
            gsap.to('.arrow-btn-left', 0.3, { opacity: 1, pointerEvents: 'visible' });
            gsap.to('.arrow-btn-right', 0.3, { opacity: 1, pointerEvents: 'visible' });

            var listTalentAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-origin', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-talent', { overflow: 'visible' }, 0).set('.assassin-info__visual--list-hero', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-villain', { overflow: 'hidden' }, 0).to('.assassin-info__visual--character-talent', 0.8, { x: 0, scale: 1.2 }, 0.7).to('.assassin-info__visual--bg-talent', 1, { opacity: 0 }, 0).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-80%" }, 0.7).to('.assassin-info__visual--list-hero', 1, { x: "301%" }, 0).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#f2f2f2' }, 0.5);

            $('.assassin-info__visual--list-talent').addClass('active');
            listActiveNum = 2;
            listTalentAction.restart();
            assassinContent.talent();
            tMechanismAnimation.restart();
            nkMechanismAnimation.restart();
        },
        hero: function hero() {
            gsap.to('.arrow-btn-left', 0.3, { opacity: 1, pointerEvents: 'visible' });
            gsap.to('.arrow-btn-right', 0.3, { opacity: 1, pointerEvents: 'visible' });

            var listHeroAction = new TimelineLite({ paused: true }).to('.assassin-info__visual--character-hero', 1.2, { x: 400, y: 200 }, 0).set('.assassin-info__visual--list-origin', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-talent', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-hero', { overflow: 'visible' }, 0).set('.assassin-info__visual--list-villain', { overflow: 'hidden' }, 0).to('.assassin-info__visual--bg-hero', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-201%" }, 0).to('.assassin-info__visual--list-hero', 1.2, { x: "0%", y: "0%" }, 0.7).to('.assassin-info__visual--list-villain', 1, { x: "301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#f2f2f2' }, 0.5);

            $('.assassin-info__visual--list-hero').addClass('active');
            listActiveNum = 3;
            listHeroAction.restart();
            assassinContent.hero();
            assassinContent.heroAnimation();
        },
        villain: function villain() {
            gsap.to('.arrow-btn-right', 0.3, { opacity: 0, pointerEvents: 'none' });

            var listVillainAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-origin', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-talent', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-hero', { overflow: 'hidden' }, 0).set('.assassin-info__visual--list-villain', { overflow: 'visible' }, 0).to('.assassin-info__visual--bg-villain', 0.5, { opacity: 0 }, 0).to('.assassin-info__visual--list-origin', 1, { x: "-101%" }, 0).to('.assassin-info__visual--list-talent', 1, { x: "-201%" }, 0).to('.assassin-info__visual--list-hero', 1, { x: "-301%" }, 0).to('.assassin-info__visual', 0.5, { background: '#f2f2f2' }, 0.5);

            $('.assassin-info__visual--list-villain').addClass('active');
            listActiveNum = 4;
            listVillainAction.restart();
            assassinContent.villain();
        }
    };

    var navi = {
        home: function home() {
            isListAnimating = false;

            naviFlag = false;
            gsap.set('.assassin-info__visual--navigation-LeftRight', { opacity: 0, pointerEvents: 'none' });
            gsap.set('.assassin-info__visual--navigation', { pointerEvents: 'none', opacity: 0 });
            gsap.to('.assassin-info__visual--scene', 0.7, { opacity: 1 });
            $('.assassin-info__visual--navigation-btn').removeClass('active');
            $('.assassin-info__visual--navigation-btn .active-motion').removeClass('bounce');

            var naviHomeAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list', { opacity: 0 }, 0).to('.assassin-info__visual--character-origin', 0.4, { scale: 1.5, y: 0, x: 0 }, 0).to('.assassin-info__visual--character-talent', 0.4, { x: 40, scale: 1.6 }, 0).to('.assassin-info__visual--character-hero', 0.4, { x: 30, y: 0 }, 0).set('.assassin-info__visual--list-origin', { overflow: 'hidden' }, 0.3).set('.assassin-info__visual--list-talent', { overflow: 'hidden' }, 0.3).set('.assassin-info__visual--list-hero', { overflow: 'hidden' }, 0.3).set('.assassin-info__visual--list-villain', { overflow: 'hidden' }, 0.3).set('.assasin_bg', { opacity: 1 }, 0.4).set('.assassin-info__visual--list-villain', { x: '101%' }, 0).to('.assassin-info__visual', 1, { background: '#d00116' }, 0).to('.assassin-info__visual--list li', 0.5, { x: 0, y: 0, opacity: 1, filter: 'grayscale(100%)' }, 0.2).to('.assassin-info__visual--list', 0.4, { opacity: 1 }, 0.5);

            $('.assassin-info__visual--list li').removeClass('active');

            gsap.set('.assassin-info__visual--list', { pointerEvents: 'visible', delay: 0.8 });
            listActiveNum = 0;
            naviHomeAction.restart();
            assassinContent.hideContent();

            hoveHeroFlag = false;

            tMechanismAnimation.pause();
            nkMechanismAnimation.pause();
        },
        origin: function origin() {
            gsap.to('.arrow-btn-left', 0.3, { opacity: 0, pointerEvents: 'none' });

            var naviOriginAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-origin', { overflow: 'visible' }, 0.2).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-origin', { opacity: 0 }, 0).set('.assassin-info__visual--list-origin', { opacity: 0, x: 0, y: 0 }, 0.2).set('.assassin-info__visual--character-origin', { scale: 1.5, y: 0, x: 0 }, 0.2).to('.assassin-info__visual--list-origin', 0.8, { opacity: 1 }, 0.4).to('.assassin-info__visual--character-origin', 0.8, { y: 0, x: 110 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-origin').addClass('active');
                listActiveNum = 1;
                isListAnimating = false;
                //console.log('isListAnimating == ' + isListAnimating);
            }, 1400);

            naviOriginAction.restart();
            assassinContent.origin();

            tMechanismAnimation.pause();
            nkMechanismAnimation.pause();
        },
        talent: function talent() {
            gsap.to('.arrow-btn-left', 0.3, { opacity: 1, pointerEvents: 'visible' });
            gsap.to('.arrow-btn-right', 0.3, { opacity: 1, pointerEvents: 'visible' });

            var naviTalentAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-talent', { overflow: 'visible' }, 0.2).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-talent', { opacity: 0 }, 0).set('.assassin-info__visual--list-talent', { opacity: 0, x: "-50%" }, 0.2).set('.assassin-info__visual--character-talent', { scale: 1.2, x: 0 }, 0.2).to('.assassin-info__visual--list-talent', 0.8, { x: "-80%", opacity: 1 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-talent').addClass('active');
                listActiveNum = 2;
                isListAnimating = false;
                //console.log('isListAnimating == ' + isListAnimating);
            }, 1400);

            naviTalentAction.restart();
            assassinContent.talent();
            tMechanismAnimation.restart();
            nkMechanismAnimation.restart();
        },
        hero: function hero() {
            gsap.to('.arrow-btn-left', 0.3, { opacity: 1, pointerEvents: 'visible' });
            gsap.to('.arrow-btn-right', 0.3, { opacity: 1, pointerEvents: 'visible' });

            var naviHeroAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-hero', { overflow: 'visible', opacity: 0, x: '0%', y: '0%' }, 0.2).set('.assassin-info__visual--bg-hero', { opacity: 0 }, 0).set('.assassin-info__visual--character-hero', { x: 300, y: 200 }, 0.2).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).to('.assassin-info__visual--list-hero', 0.8, { opacity: 1 }, 0.4).to('.assassin-info__visual--character-hero', 0.8, { x: 400 }, 0.4);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-hero').addClass('active');
                listActiveNum = 3;
                isListAnimating = false;
                //console.log('isListAnimating == ' + isListAnimating);
            }, 3000);

            naviHeroAction.restart();

            assassinContent.hero();
            assassinContent.heroAnimation();

            tMechanismAnimation.pause();
            nkMechanismAnimation.pause();
        },
        villain: function villain() {
            gsap.to('.arrow-btn-right', 0.3, { opacity: 0, pointerEvents: 'none' });

            var naviVillainAction = new TimelineLite({ paused: true }).set('.assassin-info__visual--list-villain', { overflow: 'visible' }, 0.2).to('.assassin-info__visual--list li.active', 0.5, { opacity: 0 }).set('.assassin-info__visual--bg-villain', { opacity: 0 }, 0).set('.assassin-info__visual--list-villain', { opacity: 0, x: "0", y: "0" }, 0.2).to('.assassin-info__visual--list-villain', 0.8, { opacity: 1 }, 0.4).set('.assassin-info__visual--list .grayscale', { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)' }, 0.2).to('.assassin-info__visual--list .grayscale', 0.8, { '-webkit-filter': 'grayscale(0%)', filter: 'grayscale(0%)' }, 0.5);

            setTimeout(function () {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-villain').addClass('active');
                listActiveNum = 4;
                isListAnimating = false;
                //console.log('isListAnimating == ' + isListAnimating);
            }, 1400);

            naviVillainAction.restart();
            assassinContent.villain();

            tMechanismAnimation.pause();
            nkMechanismAnimation.pause();
        }
    };

    var assassinList = document.querySelector('.assassin-info__visual--list');
    assassinList.addEventListener("click", assassinListClick);
    function assassinListClick(e, secondVal) {
        var listValue = void 0;
        try {
            listValue = Number(e.target.getAttribute('data-value'));
        } catch (e) {
            listValue = secondVal;
        }

        if (listValue != 4) {
            gsap.to('.assassin-info__visual--list .grayscale', 0.4, { '-webkit-filter': 'grayscale(100%)', filter: 'grayscale(100%)', delay: 0.5 });
        }

        $('.assassin-info__visual--navigation-btn:nth-of-type(' + (listValue + 1) + ')').addClass('active');
        $('.assassin-info__visual--navigation-btn:nth-of-type(' + (listValue + 1) + ') .active-motion').addClass('bounce');
        gsap.set('.assassin-info__visual--list', { pointerEvents: 'none' });
        gsap.to('.assassin-info__visual--navigation', 0.5, { opacity: 1, pointerEvents: "visible", delay: 0.8 });
        gsap.to('.assassin-info__visual--scene', 0.7, { opacity: 0 });

        naviFlag = true;
        gsap.to('.assassin-info__visual--navigation-LeftRight', 0.5, { opacity: 1, pointerEvents: 'visible', delay: 0.3 });

        switch (listValue) {
            case 1:
                naviActiveNum = 2;
                visualList.origin();
                break;
            case 2:
                naviActiveNum = 3;
                visualList.talent();
                break;
            case 3:
                naviActiveNum = 4;
                hoverHeroAction.pause();
                hoveHeroFlag = true;
                visualList.hero();
                break;
            case 4:
                naviActiveNum = 5;
                visualList.villain();
                break;
        }
    };

    var assassinNavigation = document.querySelector('.assassin-info__visual--navigation');
    assassinNavigation.addEventListener("click", assassinNaviClick);

    function assassinNaviClick(e, secondVal) {
        var naviValue = void 0;
        try {
            naviValue = Number(e.target.getAttribute('data-value'));
        } catch (e) {
            naviValue = secondVal;
        }

        if (listActiveNum == naviValue) return false;
        if (!isListAnimating) {
            isListAnimating = true;
            $('.assassin-info__visual--navigation-btn').removeClass('active');
            $('.assassin-info__visual--navigation-btn .active-motion').removeClass('bounce');
            $('.assassin-info__visual--navigation-btn:nth-of-type(' + (naviValue + 1) + ')').addClass('active');
            $('.assassin-info__visual--navigation-btn:nth-of-type(' + (naviValue + 1) + ') .active-motion').addClass('bounce');

            switch (naviValue) {
                case 0:
                    naviActiveNum = 1;
                    navi.home();
                    break;
                case 1:
                    naviActiveNum = 2;
                    navi.origin();
                    break;
                case 2:
                    naviActiveNum = 3;
                    navi.talent();
                    break;
                case 3:
                    naviActiveNum = 4;
                    navi.hero();
                    break;
                case 4:
                    naviActiveNum = 5;
                    navi.villain();
                    break;
            }
        }
    }

    var naviKeyControls = function naviKeyControls(pressKey) {
        switch (naviActiveNum) {
            case 1:
                if (pressKey == keyCodes.LEFT) {
                    return false;
                } else if (pressKey == keyCodes.RIGHT) {
                    if (!isListAnimating) {
                        isListAnimating = true;
                        assassinListClick('', 1);
                        setTimeout(function () {
                            isListAnimating = false;
                        }, 1400);
                    }
                }
                break;
            case 2:
                if (pressKey == keyCodes.LEFT) {
                    assassinNaviClick('', 0);
                } else if (pressKey == keyCodes.RIGHT) {
                    assassinNaviClick('', 2);
                }
                break;
            case 3:
                if (pressKey == keyCodes.LEFT) {
                    assassinNaviClick('', 1);
                } else if (pressKey == keyCodes.RIGHT) {
                    assassinNaviClick('', 3);
                }
                break;
            case 4:
                if (pressKey == keyCodes.LEFT) {
                    assassinNaviClick('', 2);
                } else if (pressKey == keyCodes.RIGHT) {
                    assassinNaviClick('', 4);
                }
                break;
            case 5:
                if (pressKey == keyCodes.LEFT) {
                    assassinNaviClick('', 3);
                } else if (pressKey == keyCodes.RIGHT) {
                    return false;
                }
                break;
        }
    };

    $('.arrow-btn-left').click(function () {
        assassinNaviClick('', naviActiveNum - 2);
    });

    $('.arrow-btn-right').click(function () {
        assassinNaviClick('', naviActiveNum);
    });

    // assassin-info

    // outro
    $('.outro__inner--video-play').click(function () {
        gsap.to('.video__cover', 0.5, { opacity: 1, pointerEvents: 'visible', delay: 0.2 });
        setTimeout(function () {
            $(".outro__video--panel-in").get(0).play();
        }, 800);
    });

    $('.outro__inner--quiz').click(function () {
        quizAreaFlag = true;
        //console.log('★quizAreaFlag = true');
        gsap.set('.quiz-area', { zIndex: 10, y: "100vh", delay: 0 });
        gsap.to('.quiz-area', 1.2, { y: 0, ease: "power4.out" });
    });

    $('.video__cover').click(function () {
        gsap.to('.video__cover', 0.5, { opacity: 0, pointerEvents: 'none' });
        $(".outro__video--panel-in").get(0).pause();
    });
    // outro


    var naturalTypeOn = new TimelineLite({ paused: true }).to('.natural-killer-cell', 1, { background: '#A5001A' }, 0.2).to('.natural-killer-cell__type .deep', 1.4, { fill: '#900017', opacity: 0 }, 0.8).to('.natural-killer-cell__type .light', 1, { fill: '#ffffff' }, 0.8).to('.natural-killer-cell__type .text_n', 1, { x: 130 }, 1.8).to('.natural-killer-cell__type .text_k', 1, { x: -275 }, 1.8).to('.natural-killer-cell__type .text_cell', 1, { x: -520 }, 1.8);

    var naturalTypeOff = new TimelineLite({ paused: true }).to('.natural-killer-cell', 0.5, { background: '#F2F2F2' }, 0).set('.natural-killer-cell__type .deep.st0', { fill: '#BA0000', opacity: 1 }, 0).set('.natural-killer-cell__type .deep.st1', { fill: '#212121', opacity: 1 }, 0).set('.natural-killer-cell__type .light', { fill: '#BA0000' }, 0).set('.natural-killer-cell__type .text_n', { x: 0 }, 0).set('.natural-killer-cell__type .text_k', { x: 0 }, 0).set('.natural-killer-cell__type .text_cell', { x: 0 }, 0);

    var pageNextScene = {
        quiz: function quiz() {
            var visualPageScene = new TimelineLite({ paused: true }).set('.quiz-area__inner--headline', { opacity: 0, y: 40 }, 0).set('.quiz-area__inner--cover', { opacity: 0 }, 0).set('.start-explanatory', { opacity: 0, y: 40 }, 0).set('.start-btn', { opacity: 0 }, 0).to('.quiz-area__inner--headline', 0.8, { opacity: 1, y: 0 }, 0.4).to('.quiz-area__inner--cover', 0.8, { opacity: 1 }, 0.4).to('.start-explanatory', 0.8, { opacity: 1, y: 0 }, 0.7).to('.start-btn', 0.8, { opacity: 1 }, 0.8);
            visualPageScene.restart();
        },
        naturalKillerCell: function naturalKillerCell() {
            naturalTypeOn.restart();
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
            var epiloguePageScene = new TimelineLite({ paused: true }).set('.epilogue__background-illust', { opacity: 0 }, 0).set('.epilogue__background-rain1', { opacity: 0, y: -30 }, 0).set('.epilogue__background-rain2', { opacity: 0, y: -50, scale: 1.2 }, 0).set('.epilogue__background-rain3', { opacity: 0, scale: 1.2 }, 0).set('.epilogue__inner--area-headline', { opacity: 0, y: 40 }, 0).set('.epilogue__inner--area-explain', { opacity: 0, y: 40 }, 0).set('.outro__inner--video-play', { opacity: 0 }, 0).to('.epilogue__background-illust', 0.5, { opacity: 1 }, 0.5).to('.epilogue__background-rain2', 0.8, { opacity: 1, y: 0 }, 0.5).to('.epilogue__background-rain1', 1.2, { opacity: 1, y: 0 }, 1.3).to('.epilogue__inner--area-headline', 0.8, { opacity: 1, y: 0 }, 0.5).to('.epilogue__inner--area-explain', 0.8, { opacity: 1, y: 0 }, 0.9).to('.outro__inner--video-play', 0.5, { opacity: 1 }, 0.8);
            epiloguePageScene.restart();
        },
        outro: function outro() {

            var outroPageScene = new TimelineLite({ paused: true }).set('.outro__inner--headline', { opacity: 0, y: 40 }, 0).set('.outro__inner--text-first', { opacity: 0, y: 40 }, 0).set('.outro__inner--text-second', { opacity: 0, y: 40 }, 0).set('.outro__inner--homepage', { opacity: 0 }, 0).set('.outro__inner--quiz', { opacity: 0 }, 0).to('.outro__inner--headline', 0.8, { opacity: 1, y: 0 }, 0.5).to('.outro__inner--text-first', 0.8, { opacity: 1, y: 0 }, 0.8).to('.outro__inner--text-second', 0.8, { opacity: 1, y: 0 }, 1.1).to('.outro__inner--homepage', 1, { opacity: 1 }, 1.3).to('.outro__inner--quiz', 1, { opacity: 1 }, 1.5);

            outroPageScene.restart();
        }
    };

    //content swiper
    var verticalPageSwapNext = {
        naturalKillerCell: function naturalKillerCell() {
            gsap.to('.natural-killer-cell', 1.2, { y: 0, ease: "power4.out" });
            pageNextScene.naturalKillerCell();
        },
        natural: function natural() {
            gsap.to('.natural-killer', 1.2, { y: 0, ease: "power4.out" });
            pageNextScene.natural();
        },
        assassin: function assassin() {
            gsap.to('.assassin-info', 1.2, { y: 0, ease: "power4.out" });
        },
        epilogue: function epilogue() {
            gsap.to('.epilogue', 1.2, { y: 0, ease: "power4.out" });
            pageNextScene.epilogue();
        },
        outro: function outro() {
            gsap.to('.outro', 1.2, { y: 0, ease: "power4.out" });
            pageNextScene.outro();
        },
        copyright: function copyright() {
            gsap.to('.copyright', 1.2, { y: 0, ease: "power4.out" });
        }
    };

    var verticalPageSwapPrev = {
        quiz: function quiz() {
            gsap.to('.quiz-area', 1.2, { y: "100vh", ease: "power4.out" });
        },
        naturalKillerCell: function naturalKillerCell() {
            gsap.to('.natural-killer-cell', 1.2, { y: "100vh", ease: "power4.out" });
            naturalTypeOff.restart();
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
            $(".outro__video--panel-in").get(0).pause();
        },
        copyright: function copyright() {
            gsap.to('.copyright', 1.2, { y: 195, ease: "power4.out" });
        }
    };

    $('.visual-intro__area--goToStory').click(function () {
        pageNum = 0;
        goToNextSlide();
    });
    $('.visual-intro__area--goToTest').click(function () {
        gsap.to('.quiz-area', 1.2, { y: 0, ease: "power4.out" });
        furstquizAreaFlag = true;
    });

    //page controll
    var goToNextSlide = function goToNextSlide() {
        if (quizAreaFlag) {
            return false;
        }

        if (pageNum >= 6) return false; //index: 0 기준 false 처리
        if (!isAnimating) {
            isAnimating = true;
            pageNum += 1;
            //console.log('next page = ' + pageNum);
            switch (pageNum) {
                case 0:
                    break;
                case 1:
                    verticalPageSwapNext.naturalKillerCell();
                    break;
                case 2:
                    verticalPageSwapNext.natural();
                    break;
                case 3:
                    verticalPageSwapNext.assassin();
                    assassinAreaKeyPressed = true;
                    break;
                case 4:
                    verticalPageSwapNext.epilogue();
                    assassinAreaKeyPressed = false;
                    break;
                case 5:
                    verticalPageSwapNext.outro();
                    break;
                case 6:
                    $(".outro__video--panel-in").get(0).pause();
                    verticalPageSwapNext.copyright();
                    break;

            }
            setTimeout(function () {
                onSlideChangeEnd();
            }, 1200);
        }
    };
    var goToPrevSlide = function goToPrevSlide() {
        if (quizAreaFlag) {
            isAnimating = true;
            gsap.to('.quiz-area', 1, { y: "100vh", ease: "power4.out" });
            gsap.set('.quiz-area', { zIndex: 1, delay: 1 });
            quizAreaFlag = false;
            setTimeout(function () {
                onSlideChangeEnd();
            }, 1000);
            return false;
        }
        if (furstquizAreaFlag) {
            gsap.to('.quiz-area', 1.2, { y: "100vh", ease: "power4.out" });
            furstquizAreaFlag = false;
        }

        if (pageNum <= 0) return false; //총 페이지 수를 넘어가면 false처리
        if (!isAnimating) {
            isAnimating = true;
            pageNum -= 1;
            //console.log('prev page = ' + pageNum);
            switch (pageNum) {
                case 0:
                    gsap.set('.quiz-area', { y: "100vh" });
                    verticalPageSwapPrev.naturalKillerCell();
                    break;
                case 1:
                    verticalPageSwapPrev.natural();
                    break;
                case 2:
                    verticalPageSwapPrev.assassin();
                    assassinAreaKeyPressed = false;
                    break;
                case 3:
                    verticalPageSwapPrev.epilogue();
                    $(".outro__video--panel-in").get(0).pause();
                    assassinAreaKeyPressed = true;
                    break;
                case 4:
                    verticalPageSwapPrev.outro();
                    break;
                case 5:
                    verticalPageSwapPrev.copyright();
                    break;
            }
            setTimeout(function () {
                onSlideChangeEnd();
            }, 1200);
        }
    };
    var onSlideChangeEnd = function onSlideChangeEnd() {
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
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
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
        if (assassinAreaKeyPressed) {
            naviKeyControls(PRESSED_KEY);
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