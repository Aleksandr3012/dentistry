const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы
	inputMask() { 
		var input = document.querySelectorAll('[type="tel"]');
		input.forEach(function (element) { 
			window.intlTelInput(element, {
				preferredCountries: ["ua", "by","ru"], 
				// any initialisation options go here
			}); 
		}); 
},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").prepend('<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear(); 
		}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.ifie();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = '05.jpg';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect


	function whenResize() {
 

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	let sSlider = new Swiper('.sSlider .slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		loop: true,

		//nav
		navigation: {
			nextEl: '.sSlider .slider-next',
			prevEl: '.sSlider .slider-prev',
		},
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},
	});

	let specialistSlider = new Swiper('.sSpecialist .specialistSlider-js', {
		slidesPerView: 1,
		spaceBetween: 0,
		//nav
		navigation: {
			nextEl: '.sSpecialist .specialistSlider-next',
			prevEl: '.sSpecialist .specialistSlider-prev',
		},
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},
	});
	

	let sQualification = new Swiper('.sQualification-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		loop: true,
		loop: true,
		loopedSlides: 6,

		// thumbs: {
		// 	swiper: qualificationThumb,
		// },
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3,
		},
	});

	let qualificationThumb = new Swiper('.qualification-thumb-js', {
		// mySwiper.thumbs.swiper	
		// on: {
		// 	click: function () {
				
		// 		sQualification.slideTo(this.thumbs.swiper);
		// 		console.log(this);
		// 	},
		// },
		// slideChange
		slidesPerView: 1,
		spaceBetween: 5,
		loop: true,
		freeMode: true,
		loopedSlides: 6,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,

			},
			992: {
				spaceBetween: 20,
				slidesPerView: 5,
			},

		},
		//nav
		navigation: {
			nextEl: '.qualification-thumb-next',
			prevEl: '.qualification-thumb-prev',
		},

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6,
		},
	});

	$('.qualification-thumb-js').on('click', '.swiper-slide',function(){
		let index = $(this).data('swiper-slide-index');
		sQualification.slideTo(index);
	})

	// ="0"
	let sQualificationText = new Swiper('.sQualification-text-slider-js', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		loop: true,
		loopedSlides: 6,
		thumbs: {
			swiper: qualificationThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
		},
	});
	// modal window

	// typed
	
	// let options = {
	// 	strings: ['вы невероятны!', 'жизнь прекрасна!', 'вы офигенны!'],
	// 	typeSpeed: 70,
	// 	loop: true,
	// 	backSpeed: 50
	// };
	// let typed = new Typed('.typed-js', options);
	
	if($('*').is('.typed-js')){
		let options = {
			strings: ['вы невероятны!', 'жизнь прекрасна!', 'вы офигенны!'],
			typeSpeed: 70,
			loop: true,
			backSpeed: 50
		};
		let typed = new Typed('.typed-js', options);
	}


	var swiper4 = new Swiper('.examplesSlider-js', {
		// slidesPerView: 5,
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		// effect: "fade",
		loadPrevNext: true,
		shortSwipes: false,
		preloadImages: false,
		// Enable lazy loading
		// lazy: {
		// 	loadPrevNext: true,
		// 	loadPrevNextAmount: 1,
		// },
		navigation: {
			nextEl: '.examples-next',
			prevEl: '.examples-prev',
		},
		// on: {
		// 	init: function () {
		// 		console.log('swiper initialized');
		// 		$('.ba-slider').each(function () {
		// 			$(this).beforeAfter();
		// 		})
		// 	},
		// },
	});

		$('.ba-slider').each(function () {
			$(this).beforeAfter();
		})
	$(".sGuarantees__img-wrap").click(function () {
		$(this).addClass('hide-btn').find('video')[0].play()
	})
	
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
