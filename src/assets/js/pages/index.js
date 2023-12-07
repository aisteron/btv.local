import {qs,qsa} from '../libs'
export function Pages(){
	services_page_nav_accordion()
}

function services_page_nav_accordion(){

	if(!qs('.services_aside_nav')) return

	qsa('.services_aside_nav ul .title').forEach(el => {
		el.listen("click", e => {
			e.target.closest('li').classList.toggle('open')
		})
	})

}