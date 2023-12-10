import {load_toast, qs,qsa, xml} from '../libs'
export function Pages(){
	services_page_nav_accordion()
	zayavka_form()
}

function services_page_nav_accordion(){

	if(!qs('.services_aside_nav')) return

	qsa('.services_aside_nav ul .title').forEach(el => {
		el.listen("click", e => {
			e.target.closest('li').classList.toggle('open')
		})
	})

}

function zayavka_form(){
	if(!qs('.widget.zayavka')) return
	
	
	qs('.zayavka form').listen("submit", async e =>{
		e.preventDefault()

		const obj = {
			short_name: qs('[name="short_name"]')?.value,
			full_name: qs('[name="full_name"]')?.value,
			addr: qs('[name="addr"]')?.value,
			bank: qs('[name="bank"]')?.value,
			unp: qs('[name="unp"]')?.value,
			head: qs('[name="head"]')?.value,
			approve_doc: qs('[name="approve_doc"]')?.value,
			service_list: qs('[name="service_list"]')?.value,
			face: qs('[name="face"]')?.value,
			email: qs('[name="email"]')?.value,
			
		}

		let res = await xml("form_zayavka", obj, '/api/').then(r => JSON.parse(r))
		await load_toast()

		if(res.success){
			new Snackbar("Успешно отправлено")
			Object.keys(obj).forEach(k => {
				qs(`[name="${k}"]`).value = ''
			})
		} else {
			new Snackbar("Ошибка отправки")
			new Snackbar("Пожалуйста, сообщите нам об этом")
		}



	})
}