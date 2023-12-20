import {load_toast, qs,qsa, xml} from '../libs'
export function Pages(){
	services_page_nav_accordion()
	zayavka_form()
	header_services_menu_item_open()
	dialog_popup()
	widget_callback()
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

		let res = await xml("form_zayavka", obj, 'api').then(r => JSON.parse(r))
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

function header_services_menu_item_open(){
	let lis = qsa('header li.expandable')
	if(!lis.length) return


	lis.forEach(li => {
		let img = qs("img", li)

		img.listen("click", e => {
			e.target.closest(".expandable").classList.toggle('open')

		})

	})

	document.listen("click", e => {
		let lis = qsa('header li.expandable')
		let it_close = true

		lis.forEach(li =>{
			let svg = qs("svg", li);
			(e.target == svg || li.contains(e.target) ) && (it_close = false)	
		})
		
		it_close && lis.forEach(li => li.classList.remove('open'))
		
	})
	
}

function dialog_popup(){
	let d = qs('footer dialog')
	if(!d) return
	qsa('.ask').forEach(el => {
		el.listen("click", _ => d.showModal())
	})

	qs('.close', d).listen("click", _=> d.close())

	// submit

	qs('form',d).listen("submit", async (e) => {
		e.preventDefault()
		let o = JSON.stringify({phone: qs('input[type="text"]',e.target).value})
		 
		let res = await xml('callback', o, 'api').then(r => JSON.parse(r))
		await load_toast()
		
		if(res){
			qs('form', d).remove()
			qs('p', d).innerHTML = 'Успешно <br>отправлено!'
			new Snackbar('Успешно отправлено')
		} else {
			new Snackbar('Ошибка отправки')
		}
	})

}

function widget_callback(){
	let form = qs('.widget.callback form')
	if(!form) return

	
	form.listen("submit", async e => {

		let o = {
			name: qsa('input', form)[0].value,
			phone: qsa('input', form)[1].value,
			message: qs('textarea', form).value,
		}

		e.preventDefault()

		await load_toast()
		
		try {

			let res = await xml('widget_callback', o, 'api').then(r => JSON.parse(r))

			if(res.success){
				new Snackbar("Успешно отправлено");
				[...qsa('input[type="text"]', form), qs('textarea')].forEach(el => el.value = '')
			} else {
				new Snackbar("Ошибка отправки")
			}
		} catch(e){
			new Snackbar(e)
		}
		
	})
}