let navUlElement = document.querySelector('.nav__ul');
let hamburger = document.querySelector('.hamburger');



if(matchMobile.matches){
	hamburger.addEventListener('click',(e)=>{
		if(!navUlElement.classList.contains('nav__ul--animation')){
			navUlElement.classList.add('nav__ul--animation');
		}
		hamburger.classList.toggle('is-active');
		let ulHeight = navUlElement.scrollHeight;
		if(!navUlElement.classList.contains('open-menu')){
			navUlElement.classList.add('open-menu');
			navUlElement.style.height = `${ulHeight}px`;
		}
		else{
			navUlElement.classList.remove('open-menu');
			navUlElement.style.height = `0`;
		}
	})
}



let anchorElems = document.querySelectorAll('.nav__a');
anchorElems.forEach((anchorElem) => {
	if (anchorElem.href == window.location.href) {
        anchorElem.classList.add('active-menu');
	}
})



