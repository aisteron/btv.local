import  { qs,sw } from '../libs';

export function Ui(){
	swipers.services()
	swipers.news()
	swipers.testimonials()
	open_mobile_burger_menu()
}

export const swipers = {

	async services(){

		let ss = qs('.swiper.services')
		if(!ss) return

		await sw.load()

		let settings = {
			slidesPerView: 1,
			spaceBetween: 10,
			pagination: {
				el: qs(".pagination",ss.closest('.widget')),
				clickable: true,
			},
			navigation: {
        nextEl: qs(".next",ss.closest(".widget")),
        prevEl: qs(".prev",ss.closest(".widget")),
      },
			breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
		}
		sw.init(ss, settings)
	},

	async news(){

		let ss = qs('.swiper.news')
		if(!ss) return

		await sw.load()

		let settings = {
			slidesPerView: 1,
			spaceBetween: 10,
			pagination: {
				el: qs(".pagination",ss.closest('.widget')),
				clickable: true,
			},
			navigation: {
        nextEl: qs(".next",ss.closest(".widget")),
        prevEl: qs(".prev",ss.closest(".widget")),
      },
			watchSlidesProgress: true,
			breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
		}
		sw.init(ss, settings)
	},

	async testimonials(){

		let ss = qs('.swiper.testimonials')
		if(!ss) return

		await sw.load()

		let settings = {
			slidesPerView: 1,
			spaceBetween: 10,
			pagination: {
				el: qs(".pagination",ss.closest('.widget')),
				clickable: true,
			},
			navigation: {
        nextEl: qs(".next",ss.closest(".widget")),
        prevEl: qs(".prev",ss.closest(".widget")),
      },
			watchSlidesProgress: true,
			breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
		}
		sw.init(ss, settings)
	}

}

function open_mobile_burger_menu(){
	let burger = qs('#nav-icon1')
	if(!burger) return

	burger.listen("click", e => {
		burger.classList.toggle('open')
	})

}