import  { qs,sw } from '../libs';

export function Ui(){
	swipers.services()
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
	}

}