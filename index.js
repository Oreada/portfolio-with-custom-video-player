"use strict";

console.log("1) Вёрстка +10\n2) Кнопка Play/Pause на панели управления +10\n3) Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10\n4) При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10\n5) При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10\n6) Кнопка Play/Pause в центре видео +10\n7) дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n");
console.log("Total score: 70");


//!  ---------- Импорт для задания "Перевод страницы на два языка" ------------------------------

import i18Obj from './translate.js';


//! -------- меню Бургер -------------------------------------------------------------------------

const iconMenu = document.querySelector(".menu__icon");
const bodyMenu = document.querySelector(".menu__body");

if (iconMenu) {
	iconMenu.addEventListener("click", function (event) {

		document.body.classList.toggle("_lock"); //! добавляем класс "_lock" в SCSS для запрета прокрутки при активном меню-бургере
		iconMenu.classList.toggle("_active");
		bodyMenu.classList.toggle("_active");

	});
};

let itemsMenuArray;

if (bodyMenu) {
	bodyMenu.addEventListener("click", function (event) {

		if (event.target.className === "menu__link" && bodyMenu.classList.contains("_active")) {
			document.body.classList.remove("_lock");
			iconMenu.classList.remove("_active");
			bodyMenu.classList.remove("_active");
		};

	});
};


//!  ------------ Смена изображений в секции Portfolio ---------------------------------------------

//* Кеширование изображений

const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadImages() {

	seasons.forEach(function (seasonStr) {

		for (let i = 1; i <= 6; i++) {
			const img = new Image();
			img.src = `assets/img/${seasonStr}-${i}.jpg`;
		};

		// console.log(seasonStr);
	});
};

preloadImages();

//* Смена изображений

const portfolioButtons = document.querySelector(".portfolio__buttons");
// const buttonOne = document.querySelector(".portfolio__button");
const buttonsArray = document.querySelectorAll(".portfolio__button");

const portfolioImages = document.querySelectorAll(".portfolio__image");

function changeImage(event) {

	if (event.target.classList.contains("portfolio__button")) {

		buttonsArray.forEach((btn) => btn.classList.remove("button_fill"));  //! Подсветка активной кнопки
		event.target.classList.add("button_fill");  //! Подсветка активной кнопки

		portfolioImages.forEach((image, index) => image.src = `assets/img/${event.target.dataset.season}-${index + 1}.jpg`);
	};
};

portfolioButtons.addEventListener("click", changeImage);


//!  ------------ Перевод страницы на два языка ---------------------------------------------

const langPanel = document.querySelector(".lang");
const langEnSpan = document.querySelector(".lang__en");
const langRuSpan = document.querySelector(".lang__ru");

function getTranslate(language) {

	const elementsToTranslate = document.querySelectorAll("[data-i18]");  //! находим все элементы, содержащие data-атрибут [data-i18]

	elementsToTranslate.forEach(function (elem) {

		let valueAttr = elem.dataset.i18;

		if (i18Obj[language][valueAttr]) {
			elem.textContent = i18Obj[language][valueAttr];
		};

		if (elem.placeholder) {
			elem.placeholder = i18Obj[language][valueAttr];
			elem.textContent = '';
		};
	});

	if (language === "en") {
		langEnSpan.style.color = "#bdae82";
		langRuSpan.style.color = "#ffffff";
	};
	if (language === "ru") {
		langRuSpan.style.color = "#bdae82";
		langEnSpan.style.color = "#ffffff";
	};
};

langPanel.addEventListener("click", function (event) {

	if (event.target.classList.contains("lang__en")) {
		langGlobal = "en";
		getTranslate("en");
	} else if (event.target.classList.contains("lang__ru")) {
		langGlobal = "ru";
		getTranslate("ru");
	} else {
		return;
	};
});


//!  ------------ Переключение светлой и тёмной темы ---------------------------------------------

const classesSections = [".main__skills", ".main__portfolio", ".main__video", ".main__price"];
const elementsSections = classesSections.map((cl) => document.querySelector(`${cl}`));
const elementsTitles = document.querySelectorAll(".section-title");
const stripes = document.querySelectorAll(".wrapper-title");
const buttonsPortfolio = document.querySelectorAll(".portfolio__button");
const buttonsPrice = document.querySelectorAll(".item-price__button");
const burgerOpen = document.querySelector(".menu__body");
const burgerIcon = document.querySelector(".menu__icon");

const themeIcon = document.querySelector(".header__theme");

function changeTheme(theme) {
	if (theme === "light") {
		elementsSections.forEach((element) => element.classList.add("_light-theme-sections"));
		elementsTitles.forEach((element) => element.classList.add("_light-theme-sections"));
		stripes.forEach((stripe) => stripe.classList.add("_light-theme-titles"));
		buttonsPortfolio.forEach((btn) => btn.classList.add("_light-theme-buttons-portfolio"));
		buttonsPrice.forEach((btn) => btn.classList.add("_light-theme-buttons-price"));
		burgerOpen.classList.add("_light-theme-burger-open");
		burgerIcon.classList.add("_light-theme-cross");
		themeIcon.classList.add("_light-theme-icon");
	};

	if (theme === "dark") {
		elementsSections.forEach((element) => element.classList.remove("_light-theme-sections"));
		elementsTitles.forEach((element) => element.classList.remove("_light-theme-sections"));
		stripes.forEach((stripe) => stripe.classList.remove("_light-theme-titles"));
		buttonsPortfolio.forEach((btn) => btn.classList.remove("_light-theme-buttons-portfolio"));
		buttonsPrice.forEach((btn) => btn.classList.remove("_light-theme-buttons-price"));
		burgerOpen.classList.remove("_light-theme-burger-open");
		burgerIcon.classList.remove("_light-theme-cross");
		themeIcon.classList.remove("_light-theme-icon");
	};
};

themeIcon.addEventListener("click", function (event) {
	if (themeIcon.classList.contains("_light-theme-icon")) {
		themeGlobal = "dark";
	} else {
		themeGlobal = "light";
	};

	changeTheme(themeGlobal);
});

// themeIcon.addEventListener("click", function (event) {

// 	elementsSections.forEach((element) => element.classList.toggle("_light-theme-sections"));
// 	elementsTitles.forEach((element) => element.classList.toggle("_light-theme-sections"));
// 	stripes.forEach((stripe) => stripe.classList.toggle("_light-theme-titles"));
// 	buttonsPortfolio.forEach((btn) => btn.classList.toggle("_light-theme-buttons-portfolio"));
// 	buttonsPrice.forEach((btn) => btn.classList.toggle("_light-theme-buttons-price"));

// 	themeIcon.classList.toggle("_light-theme-icon");

// 	if (themeIcon.classList.contains("_light-theme-icon")) {
// 		themeGlobal = "light";
// 	} else {
// 		themeGlobal = "dark";
// 	};
// });


//!  ------------ Дополнительный функционал: данные хранятся в local storage ---------------------------------------------

let langGlobal = "en";
let themeGlobal = "light";

function setLocalStorage() {

	localStorage.setItem('lang', langGlobal);
	localStorage.setItem('theme', themeGlobal);
};
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {

	if (localStorage.getItem('lang')) {
		langGlobal = localStorage.getItem('lang');
	};
	getTranslate(langGlobal);

	if (localStorage.getItem('theme')) {
		themeGlobal = localStorage.getItem('theme');
	};
	changeTheme(themeGlobal);
};
window.addEventListener('load', getLocalStorage);


//!  ------------ Дополнительный функционал: сложные эффекты для кнопок ---------------------------------------------

let animateButton = function (e) {

	e.preventDefault;
	//reset animation
	e.target.classList.remove('animate');

	e.target.classList.add('animate');
	setTimeout(function () {
		e.target.classList.remove('animate');
	}, 700);
};

let bubblyButtons = document.getElementsByClassName("button");

for (let i = 0; i < bubblyButtons.length; i++) {
	bubblyButtons[i].addEventListener('click', animateButton, false);
};


//! -------- Кастомный видеоплеер -------------------------------------------------------------------------

//! Получаю элементы

const player = document.querySelector(".player");  //! родитель всего блока: содержит и видео, и панель управления
const video = document.querySelector(".viewer");  //! .player__video
const progress = player.querySelector(".progress");  //! полоса прогресса видео
const progressBar = player.querySelector(".progress__filled");  //! полоса прогресса видео - закрашенная
const togglePlayButton = player.querySelector(".toggle"); //! .player__playButton
const skipButtons = player.querySelectorAll("[data-skip]"); //! обе кнопки перемотки (« 10s, 10s »)
const rangeVolume = player.querySelector(".volume"); //! слайдер звука
const rangeRate = player.querySelector(".playbackRate"); //! слайдер скорости/темпа
const toggleVolumeButton = player.querySelector(".player__volumeButton");  //! кнопка включения/выключения звука
const coverPlayButton = player.querySelector(".player__playBtn-svg");  //! кнопка play с svg-бэкграундом - большая, нависает над видео

//! Создаю функции

function togglePlay() {
	if (video.paused) {  //! paused - свойство video; нет свойства playing
		video.play();
	} else {
		video.pause();
		coverPlayButton.style.display = "";
	};

	// const method = video.paused ? 'play' : 'pause';
	// video[method]();
};

function updatePlayerButton() {
	togglePlayButton.classList.toggle("pause");
};

function skip() {
	let path = this.dataset.skip; //! вернёт строку, поэтому ниже применим parseFloat
	video.currentTime += parseFloat(path);
};

function handleProgress() {
	//! функция для закрашивания полосы прогресса видео в соотв. с длительностью проигрывания
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
};

function volumeRangeUpdate() {
	video.volume = rangeVolume.value;  //! теперь звук воспроизведения будет меняться в соотв. с ползунком
};

function rateRangeUpdate() {
	video.playbackRate = rangeRate.value;  //! теперь скорость/темп воспроизведения будет меняться в соотв. с ползунком
};

function rewind(event) {
	// console.log(event);  //! событие имеет параметр offsetX
	// console.log(event.offsetX);  //! показывает, на сколько пикселей по оси Х мы ткнули - изменяется
	// console.log(progress.offsetWidth);  //! общая длина линии прогресса - неизменяема
	// console.log(video.duration);  //! общая продолжительность видео - неизменяема

	const rewindTime = (event.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = rewindTime;
};

//! Навешиваю слушатели событий

video.addEventListener("click", togglePlay);
togglePlayButton.addEventListener("click", togglePlay);

video.addEventListener("play", updatePlayerButton);
video.addEventListener("pause", updatePlayerButton);

skipButtons.forEach((button) => button.addEventListener("click", skip));

video.addEventListener("timeupdate", handleProgress);

rangeVolume.addEventListener("change", volumeRangeUpdate);

let mousedownSliderVolume = false;
rangeVolume.addEventListener("mousemove", function () {
	if (mousedownSliderVolume) {
		volumeRangeUpdate();
	};
});
rangeVolume.addEventListener("mousedown", () => mousedownSliderVolume = true);
rangeVolume.addEventListener("mouseup", () => mousedownSliderVolume = false);

rangeRate.addEventListener("change", rateRangeUpdate);

let mousedownSliderRate = false;
rangeRate.addEventListener("mousemove", function () {
	if (mousedownSliderRate) {
		rateRangeUpdate();
	};
});
rangeRate.addEventListener("mousedown", () => mousedownSliderRate = true);
rangeRate.addEventListener("mouseup", () => mousedownSliderRate = false);

//! события мыши - для того чтобы можно было "тянуть" прогресс мышью
let mousedown = false;
progress.addEventListener("click", rewind);  //! возможность менять прогресс просто по клику
progress.addEventListener("mousemove", function (event) {
	if (mousedown) {
		rewind(event);
	};
});
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

//! закрашиваю слайдеры
rangeVolume.addEventListener("input", function () {
	const valueFill = this.value;
	this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${valueFill * 100}%, #c8c8c8 ${valueFill * 100}%, #c8c8c8 100%)`;
});

rangeRate.addEventListener("input", function () {
	const valueFill = this.value;
	this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${((valueFill - 0.5) / 1.5) * 100}%, #c8c8c8 ${((valueFill - 0.5) / 1.5) * 100}%, #c8c8c8 100%)`;
});

//! кнопка включения/выключения звука
toggleVolumeButton.addEventListener("click", function (event) {
	if (event.target.classList.contains("player__volumeButton")) {
		toggleVolumeButton.classList.toggle("mute");
	};

	if (toggleVolumeButton.classList.contains("mute")) {
		video.volume = 0;
	} else {
		video.volume = rangeVolume.value;
	};
});

video.addEventListener("volumechange", function () {
	if ((video.volume !== 0) && (toggleVolumeButton.classList.contains("mute"))) {
		toggleVolumeButton.classList.remove("mute");
	};
	if ((video.volume === 0) && (!toggleVolumeButton.classList.contains("mute"))) {
		toggleVolumeButton.classList.add("mute");
	};
});

//! кнопка play, нависающая над видео
coverPlayButton.addEventListener("click", function () {
	video.play();
});

video.addEventListener("play", function () {
	coverPlayButton.style.display = "none";
});

