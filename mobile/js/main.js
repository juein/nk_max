'use strict';

// onload
window.onload = function () {
    var pageIntroAction = new TimelineMax({ paused: true }).to('.visual-intro__type-text', 1, { opacity: 1 }, 0.2).to('.visual-intro__illust', 1, { opacity: 1, x: 0, y: 0 }, 0.5).to('.visual-intro__type-text.before', 1, { opacity: 0 }, 1).to('.visual-intro__area--headline-first', 1, { opacity: 1, x: 0 }, 1).to('.visual-intro__area--headline-last', 1, { opacity: 1, x: 0 }, 1).to('.visual-intro__area--goToTest', 1.2, { opacity: 1 }, 1.5).to('.visual-intro__area--goToStory', 1.2, { opacity: 1 }, 1.8);
    pageIntroAction.play();
};
// onload


window.addEventListener('DOMContentLoaded', function () {

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    var ctrl = new ScrollMagic.Controller();

    var quizCoverWidth = void 0,
        quizCoverHeight = void 0,
        quizResultWidth = void 0,
        quizResultHeight = void 0,
        quizStep = 1,
        startCover = false,
        isQuizAnimation = false;
    //listContentSize;

    // default setting
    var defaultSet = function defaultSet() {
        gsap.set('.quiz-area__question--progress .process', { scaleX: 0.1 });
    };

    var newSize = function newSize() {

        quizCoverWidth = $('.quiz-area__start--cover').width();
        quizCoverHeight = $('.quiz-area__start--cover').height();
        if (!startCover) {
            gsap.set('.quiz-area__start--cover', { clip: 'rect(' + quizCoverHeight + 'px, ' + quizCoverWidth + 'px, ' + quizCoverHeight + 'px, 0px)' });
        } else {
            gsap.set('.quiz-area__start--cover', { clip: 'rect(0px, ' + quizCoverWidth + 'px, ' + (quizCoverHeight + 100) + 'px, 0px)' });
        }
    };

    newSize();
    window.addEventListener("resize", newSize);

    // intro
    $('.visual-intro__area--goToStory').click(function () {
        gsap.to(window, { duration: 1, scrollTo: { y: ".natural-killer-cell", offsetY: 50 }, ease: "circ.out" });
    });

    var goTotest = function goTotest() {
        gsap.to('.visual-intro', 0.3, { opacity: 0 });
        gsap.to(window, { duration: 0.5, scrollTo: { y: ".quiz__container", offsetY: 50 }, ease: "circ.out" });
        gsap.set('.quiz__container', { pointerEvents: 'visible' });
        gsap.to('.quiz-area', 0.8, { y: 0 });
        gsap.to('.quiz-area__start--cover', 1, { clip: 'rect(0px, ' + quizCoverWidth + 'px, ' + quizCoverHeight + 'px, 0px)', delay: 0.7 });
        startCover = true;
    };
    $('.visual-intro__area--goToTest').click(function () {
        goTotest();
    });
    // intro

    // quiz-area
    $('.start-btn').click(function () {
        gsap.to('.start-btn', 0.3, { background: '#BA0000', color: '#fff' });
        gsap.to('.quiz-area__question', 0.6, { x: 0, delay: 0.3, pointerEvents: 'visible' });
    });

    $('.quiz-skip').click(function () {
        gsap.to('.visual-intro', 0.3, { opacity: 1 });
        gsap.set('.quiz__container', { pointerEvents: 'none' });
        gsap.to('.quiz-area', 0.8, { y: '-100vh' });
        gsap.to(window, { duration: 1, scrollTo: { y: ".natural-killer-cell", offsetY: 50 }, ease: "circ.out", delay: 0.5 });
    });

    var _loop = function _loop($i) {
        $('input:radio[name=q' + $i + ']').click(function () {
            if ($i == 10) {
                gsap.to('.quiz-area__question--finish', 0.5, { opacity: 0.9, pointerEvents: 'visible' });
            } else {
                quizNextQuestion($i);
            }
        });
    };

    for (var $i = 1; $i <= 10; $i++) {
        _loop($i);
    }

    $('.question__input .true').click(function () {
        gsap.to('.quiz-area__question .question__input input[type=radio] + label.true', 0.5, { background: '#C22C2C' });
        gsap.to('.quiz-area__question .question__input input[type=radio] + label.true', 0.5, { background: '#BA0000', delay: 0.5 });
    });

    $('.question__input .false').click(function () {
        gsap.to('.quiz-area__question .question__input input[type=radio] + label.false', 0.5, { background: '#8F0101' });
        gsap.to('.quiz-area__question .question__input input[type=radio] + label.false', 0.5, { background: '#B10000', delay: 0.5 });
    });

    var quizNextQuestion = function quizNextQuestion() {
        if (!isQuizAnimation) {
            isQuizAnimation = true;
            gsap.to('.quiz-area__question-step' + quizStep + ' .question--text', 0.5, { x: '-100vw', ease: 'none' });
            gsap.set('.quiz-area__question-step' + quizStep, { visibility: 'hidden', pointerEvents: 'none', delay: 0.5 });
            quizStep += 1;

            var processScale = quizStep * 0.1;
            gsap.to('.quiz-area__question--progress .process', 0.5, { scaleX: processScale, ease: 'none' });
            gsap.set('.quiz-area__question-step' + quizStep, { visibility: 'visible', pointerEvents: 'visible', delay: 0.5 });
            gsap.to('.quiz-area__question-step' + quizStep + ' .question--text', 0.5, { x: 0, ease: 'none', delay: 0.5 });

            setTimeout(function () {
                isQuizAnimation = false;
            }, 600);
        }
    };

    $('.show-result').click(function () {
        gsap.to('.quiz-area__result', 0.5, { opacity: 1, pointerEvents: 'visible' });
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
            gradeTitle = '당신은 면역 상식이 <br>전혀 없습니다.';
            gradeEtc = '아직 면역에 대해 모르시네요. <br>NK세포와 함께 더 알아가는 건 어떨까요?';
        } else if (score <= 3) {
            gradeTitle = '당신은 면역 상식 <br>어린이 수준입니다.';
            gradeEtc = '아직 면역에 대해 잘 모르시네요. <br>NK세포와 함께 더 알아가는 건 어떨까요?';
        } else if (score <= 7) {
            gradeTitle = '당신은 면역 상식은 <br>학생수준 입니다.';
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
    };

    $('.quiz-explain-btn').click(function () {
        gsap.to('.quiz-area__explain', 0.5, { opacity: 1, pointerEvents: 'visible' });
        gsap.set('.quiz__container', { position: 'absolute', overflow: 'visible' });
        gsap.set('.quiz-area', { overflow: 'visible' });
        gsap.set('.natural-killer-cell', { top: '14vw' });
        gsap.set('.visual-intro', { height: '190vw' });
    });
    // quiz-area

    // natural-killer-cell
    var naturalKillerCellAction = new TimelineLite().to('.natural-killer-cell', 2, { background: '#A5001A' }, 0).to('.natural-killer-cell__type .deep', 1, { fill: '#900017' }, 0).to('.natural-killer-cell__type .light', 1, { fill: '#ffffff' }, 0);

    var naturalKillerCellScene = new ScrollMagic.Scene({
        triggerElement: ".natural-killer-cell",
        triggerHook: 0.1
    }).setTween(naturalKillerCellAction).addTo(ctrl);
    // natural-killer-cell


    // natural-killer
    var naturalKillerAction = new TimelineLite().to('.natural-killer__explain--headline', 0.8, { opacity: 1, y: 0 }, 0).to('.natural-killer__explain--text-box-mg:nth-of-type(1)', 0.8, { opacity: 1, y: 0 }, 0.4).to('.natural-killer__explain--text-box-mg:nth-of-type(2)', 0.8, { opacity: 1, y: 0 }, 0.6).to('.natural-killer__explain--text-box-mg:nth-of-type(3)', 0.8, { opacity: 1, y: 0 }, 0.8);

    var naturalKillerScene = new ScrollMagic.Scene({
        triggerElement: ".natural-killer",
        triggerHook: 0.7
    }).setTween(naturalKillerAction).addTo(ctrl);
    // natural-killer


    // assassin-info
    var assasinInfoOriginAction = new TimelineLite().set('.assassin-info--origin--visual .illust', { opacity: 0, x: '15vw' }, 0).to('.assassin-info--origin--visual', 1, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }, 0.2).to('.assassin-info--origin--visual .illust', 1, { opacity: 1, x: 0 }, 0.2).to('.assassin-info--origin--visual .typo', 0.8, { opacity: 1 }, 0.6).to('.assassin-info--origin--content', 1, { opacity: 1, y: 0 }, 0.8);

    var assasinInfoOriginScene = new ScrollMagic.Scene({
        triggerElement: ".assassin-info--origin",
        triggerHook: 0.7
    }).setTween(assasinInfoOriginAction).addTo(ctrl);

    var assasinInfoTalentAction = new TimelineLite().set('.assassin-info--talent--visual .illust', { opacity: 0, x: '10vw' }, 0).to('.assassin-info--talent--visual', 1, { clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0% 100%)' }, 0.2).to('.assassin-info--talent--visual .illust', 1, { opacity: 1, x: 0 }, 0.2).to('.assassin-info--talent--visual .talent-obj1', 0.6, { opacity: 1, x: 0 }, 0.5).to('.assassin-info--talent--visual .talent-obj2', 0.6, { opacity: 1, x: 0 }, 0.7).to('.assassin-info--talent--visual .talent-obj3', 0.6, { opacity: 1, x: 0 }, 0.9).to('.assassin-info--talent--visual .talent-obj4', 0.6, { opacity: 1, x: 0 }, 1.1).to('.assassin-info--talent--visual .typo', 0.8, { opacity: 1 }, 0.6).to('.assassin-info--talent--content', 1, { opacity: 1, y: 0 }, 0.8);

    var tMechanismAnimation = new TimelineLite({ paused: true, repeat: -1 }).set('.t-question-mark', { scale: 0 }, 0).to('.t-cell-3', 1.4, { x: 150, ease: 'none' }, 0).to('.cancer-cell.tarea', 1.4, { x: -120, ease: 'none' }, 0).to('.cancer-cell.tarea', 0.4, { opacity: 0.8, ease: 'none' }, 0.3).to('.cancer-cell.tarea', 0.4, { opacity: 1, ease: 'none' }, 0.8).to('.t-cell-3', 1.4, { x: 0, ease: 'none' }, 1.4).to('.cancer-cell.tarea', 1.4, { x: 0, ease: 'none' }, 1.4).to('.cancer-cell.tarea', 0.4, { opacity: 0.8, ease: 'none' }, 1.7).to('.cancer-cell.tarea', 0.4, { opacity: 1, ease: 'none' }, 2.2).to('.t-question-mark', 0.7, { scale: 1, ease: Back.easeOut.config(3) }, 2.7);

    var nkMechanismAnimation = new TimelineLite({ paused: true, repeat: -1 }).set('.cancer-cell.nkarea', { opacity: 1 }, 0).to('.nk-weapon-1', 0.2, { scaleX: 0.45 }, 0).to('.nk-weapon-2', 0.2, { scaleX: 1 }, 0).to('.nk-weapon-1', 0.4, { scaleX: 1 }, 0.2).to('.nk-weapon-1', 0.4, { scaleX: 0.45 }, 0.6).to('.nk-weapon-2', 0.4, { scaleX: 2 }, 0.6).to('.nk-weapon-2', 0.4, { scaleX: 1 }, 1).to('.nk-weapon-1', 0.4, { scaleX: 1 }, 1).to('.nk-boom', 0.3, { scale: 1, ease: 'back.out(1.7)' }, 1.2).to('.nk-boom', 0.2, { scale: 0 }, 1.5).to('.cancer-cell.nkarea', 0.6, { opacity: 0, scale: 1.5 }, 1.5);

    var assasinInfoTalentScene = new ScrollMagic.Scene({
        triggerElement: ".assassin-info--talent",
        triggerHook: 0.7
    }).setTween(assasinInfoTalentAction).addTo(ctrl).on("enter leave", function (e) {
        if (e.state == 'DURING') {
            tMechanismAnimation.restart();
            nkMechanismAnimation.restart();
        } else {
            tMechanismAnimation.paused();
            nkMechanismAnimation.paused();
        }
    });

    var assasinInfoHeroAction = new TimelineLite().set('.assassin-info--hero--visual .illust', { opacity: 0, x: '10vw' }, 0).to('.assassin-info--hero--visual .illust', 1, { opacity: 1, x: 0 }, 0.2).to('.assassin-info--hero--visual .background', 1.4, { scale: 1.4 }, 0.2).to('.assassin-info--hero--visual .typo', 0.8, { opacity: 1 }, 0.6).to('.assassin-info--hero--content', 1, { opacity: 1, y: 0 }, 0.8);

    var procedureAnimation = new TimelineLite().set('.procedure-nk', { scale: 0 }, 0).set('.procedure-cancer', { scale: 0 }, 0).set('.procedure-etc1', { scale: 0 }, 0).set('.procedure-etc2', { scale: 0 }, 0).set('.procedure-etc3', { scale: 0 }, 0).set('.procedure-etc3 .procedure__inner-text', { opacity: 0 }, 0).set('.procedure-step1 .procedure-line', { scaleX: 0 }, 0).set('.procedure-step1 .procedure-arrow-text', { opacity: 0 }, 0).set('.procedure-step1 .procedure-arrow', { opacity: 0 }, 0).set('.procedure-step2 .procedure-line', { scaleX: 0 }, 0).set('.procedure-step2 .procedure-arrow-text', { opacity: 0 }, 0).set('.procedure-step2 .procedure-arrow', { opacity: 0 }, 0).set('.procedure-step3 .procedure-line', { scaleX: 0 }, 0).set('.procedure-step3 .procedure-arrow-text', { opacity: 0 }, 0).set('.procedure-step3 .procedure-arrow', { opacity: 0 }, 0).set('.procedure-step4 .procedure-line', { scaleX: 0 }, 0).set('.procedure-step4 .procedure-arrow-text', { opacity: 0 }, 0).set('.procedure-step4 .procedure-arrow', { opacity: 0 }, 0).to('.procedure__cover', 0.3, { opacity: 1 }, 0.2).to('.procedure-nk', 0.6, { scale: 1 }, 0.5).to('.procedure-cancer', 0.6, { scale: 1 }, 0.7).to('.procedure-step1 .procedure-line', 0.5, { scaleX: 1 }, 1.1).to('.procedure-step1 .procedure-arrow-text', 0.5, { opacity: 1 }, 1.1).to('.procedure-step1 .procedure-arrow', 0.4, { opacity: 1 }, 1.6).to('.procedure-etc1', 0.6, { scale: 1 }, 1.3).to('.procedure-etc2', 0.6, { scale: 1 }, 1.5).to('.procedure-step2 .procedure-line', 0.5, { scaleX: 1 }, 1.9).to('.procedure-step2 .procedure-arrow-text', 0.5, { opacity: 1 }, 1.9).to('.procedure-step2 .procedure-arrow', 0.4, { opacity: 1 }, 2.4).to('.procedure-etc3', 0.6, { scale: 1 }, 2.3).to('.procedure-etc3 .procedure__inner-text', 0.6, { opacity: 1 }, 2.3).to('.procedure-step3 .procedure-line', 0.5, { scaleX: 1 }, 2.9).to('.procedure-step3 .procedure-arrow-text', 0.5, { opacity: 1 }, 2.9).to('.procedure-step3 .procedure-arrow', 0.4, { opacity: 1 }, 3.4).to('.procedure-step4 .procedure-line', 0.5, { scaleX: 1 }, 3.5).to('.procedure-step4 .procedure-arrow-text', 0.5, { opacity: 1 }, 3.5).to('.procedure-step4 .procedure-arrow', 0.4, { opacity: 1 }, 4);

    var assasinInfoHeroScene = new ScrollMagic.Scene({
        triggerElement: ".assassin-info--hero",
        triggerHook: 0.7
    }).setTween(assasinInfoHeroAction).addTo(ctrl);

    var procedureScene = new ScrollMagic.Scene({
        triggerElement: ".procedure",
        triggerHook: 0.6
    }).setTween(procedureAnimation).addTo(ctrl);

    var assasinInfoVillainAction = new TimelineLite().set('.assassin-info--villain--visual .illust', { opacity: 0, y: '-10vw' }, 0).to('.assassin-info--villain--visual .background', 0.8, { opacity: 1 }, 0.2).to('.assassin-info--villain--visual .illust', 1, { opacity: 1, y: 0 }, 0.2).to('.assassin-info--villain--visual .typo', 0.8, { opacity: 1 }, 0.6).to('.assassin-info--villain--content .title', 0.8, { opacity: 1, y: 0 }, 0.8).to('.assassin-info--villain--content .list-area__block--item:nth-of-type(1)', 0.8, { opacity: 1, y: 0 }, 1).to('.assassin-info--villain--content .list-area__block--item:nth-of-type(2)', 0.8, { opacity: 1, y: 0 }, 1.4).to('.assassin-info--villain--content .list-area__block--item:nth-of-type(3)', 0.8, { opacity: 1, y: 0 }, 1.8);

    var assasinInfoVillainScene = new ScrollMagic.Scene({
        triggerElement: ".assassin-info--villain",
        triggerHook: 0.7
    }).setTween(assasinInfoVillainAction).addTo(ctrl);
    // assassin-info


    // epilogue
    var epiloguePageScene = new TimelineLite().to('.epilogue__background-illust', 1.2, { opacity: 1 }, 0.5).to('.epilogue__background-rain2', 1, { opacity: 1, y: 0 }, 0.5).to('.epilogue__background-rain1', 1.2, { opacity: 1, y: 0 }, 1.3).to('.epilogue__inner--area-headline', 0.8, { opacity: 1, y: 0 }, 0.5).to('.epilogue__inner--area-explain', 0.8, { opacity: 1, y: 0 }, 0.9);

    var epilogueScene = new ScrollMagic.Scene({
        triggerElement: ".epilogue",
        triggerHook: 0.7
    }).setTween(epiloguePageScene).addTo(ctrl);

    var videoScene = new ScrollMagic.Scene({
        triggerElement: ".video-area",
        triggerHook: 0.6
    }).addTo(ctrl).on("enter leave", function (e) {
        if (e.state == 'DURING') {
            $(".outro__video--panel-in").get(0).play();
        } else {
            $(".outro__video--panel-in").get(0).pause();
        }
    });
    // epilogue

    // outro
    var outroPageScene = new TimelineLite().to('.outro__inner--headline', 0.8, { opacity: 1, y: 0 }, 0.5).to('.outro__inner--text-first', 0.8, { opacity: 1, y: 0 }, 0.8).to('.outro__inner--text-second', 0.8, { opacity: 1, y: 0 }, 1.1).to('.outro__inner--homepage', 1, { opacity: 1 }, 1.3).to('.outro__inner--quiz', 1, { opacity: 1 }, 1.5);

    var outroScene = new ScrollMagic.Scene({
        triggerElement: ".outro",
        triggerHook: 0.7
    }).setTween(outroPageScene).addTo(ctrl);

    $('.outro__inner--quiz').click(function () {
        gsap.to(window, { duration: 1, scrollTo: { y: ".visual-intro", offsetY: 50 }, ease: "circ.out" });
        setTimeout(function () {
            goTotest();
        }, 800);
    });
    // outro

    defaultSet(); // 기본 셋팅 실행
});

var explainBtnActive = void 0;

var explainBtn = function explainBtn(num) {
    if (explainBtnActive == num) {
        $('.explain__list-more.q' + num).removeClass('view');
        if (num == 9 || num == 10) {
            gsap.to('.explain__list', 0.5, { top: 40 });
        }
        explainBtnActive = 0;
        gsap.to('.quiz-area__explain', 0.5, { height: '190vw' });
        gsap.to('.natural-killer-cell', 0.5, { marginTop: '0vw' });
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
        if ($('.explain__list-more.q' + num).hasClass('long')) {
            gsap.to('.quiz-area__explain', 0.5, { height: '250vw' });
            gsap.to('.natural-killer-cell', 0.5, { marginTop: '60vw' });
        } else if ($('.explain__list-more.q' + num).hasClass('md2')) {
            gsap.to('.quiz-area__explain', 0.5, { height: '240vw' });
            gsap.to('.natural-killer-cell', 0.5, { marginTop: '50vw' });
        } else if ($('.explain__list-more.q' + num).hasClass('md1')) {
            gsap.to('.quiz-area__explain', 0.5, { height: '232vw' });
            gsap.to('.natural-killer-cell', 0.5, { marginTop: '42vw' });
        } else {
            gsap.to('.quiz-area__explain', 0.5, { height: '226vw' });
            gsap.to('.natural-killer-cell', 0.5, { marginTop: '36vw' });
        }
    }
};