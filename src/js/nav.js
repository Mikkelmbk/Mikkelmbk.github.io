let navUlElement = document.querySelector('.nav__ul');
let hamburger = document.querySelector('.hamburger');
let anchorElems = document.querySelectorAll('.nav__a');
let selectedMenu = 0;




if (matchMobile.matches) {
	hamburger.addEventListener('click', (e) => {
		if (!navUlElement.classList.contains('nav__ul--animation')) {
			navUlElement.classList.add('nav__ul--animation');
		}
		hamburger.classList.toggle('is-active');
		let ulHeight = navUlElement.scrollHeight;
		if (!navUlElement.classList.contains('open-menu')) {
			navUlElement.classList.add('open-menu');
			navUlElement.style.height = `${ulHeight}px`;
		}
		else {
			navUlElement.classList.remove('open-menu');
			navUlElement.style.height = `0`;
		}
	})
	hightlightActiveLink();
}
else {
	let animation__lineElem = document.querySelector('.animation__line');
	anchorElems.forEach(anchor => {
		anchor.addEventListener('mouseover', (e) => {
			animateLine(e.target.dataset.number);
		});

		anchor.addEventListener('click', (e) => {
			selectedMenu = e.target.dataset.number;
			console.log(selectedMenu);
		});
		anchor.addEventListener('mouseout', () => {
			animateLine(selectedMenu)
		});
	});

	function animateLine(index) {
		console.log('index: ', index);
		let position = anchorElems[index].offsetLeft + parseInt(window.getComputedStyle(anchorElems[index], null).getPropertyValue('padding-left').split("px")[0]) + "px";
		let width = anchorElems[index].offsetWidth - parseInt(window.getComputedStyle(anchorElems[index], null).getPropertyValue('padding-left').split("px")[0]) - parseInt(window.getComputedStyle(anchorElems[index], null).getPropertyValue('padding-right').split("px")[0]) + "px";

		animation__lineElem.style.left = position;
		animation__lineElem.style.width = width;
	}
	// animateLine(selectedMenu);

	hightlightActiveLink(animateLine);
}



function hightlightActiveLink(animateLine) {

	anchorElems.forEach((anchorElem) => {
		if (anchorElem.href == window.location.href) {
			anchorElem.classList.add('active-menu');
			if(!matchMobile.matches){
				selectedMenu = anchorElem.dataset.number;
				animateLine(selectedMenu);
			}
		}
	});

}



