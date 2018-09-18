/* --VARIABLE DECLARATION-- */

const nav = document.querySelector('nav');						// navigation
const button = document.querySelector('#navButton');			// button in navigation (mobile devices)
const sections = document.querySelectorAll('section');			// all sections
const navTrigers = document.querySelectorAll('nav li');			// navigation poits 



/* --NAVBUTTON IN SECTION#ONE-- */

function showNavigation() {
	const navWidth = nav.offsetWidth;						
	const emptyContents = document.querySelectorAll('.emptyContent');		// add class to all of all .emptyContent's of DOM elements 
	emptyContents.forEach( emptyContent => 
		(!emptyContent.classList.contains('hide')) ? 
		emptyContent.classList.add('hide') : 
		emptyContent.classList.remove('hide')
	);

	(!nav.classList.contains('off')) ? nav.classList.add('off') : nav.classList.remove('off');
	(!button.classList.contains('click')) ? button.classList.add('click') : button.classList.remove('click');
}
button.addEventListener('click', showNavigation);



/* --CARUSEL IN SECTION#TWO-- */

let slideIndex = 1; 										// current slide 
const prevSlide = document.querySelector('.prev');  		// prev slide button
const nextSlide = document.querySelector('.next');  		// next slide button

showSlide(slideIndex);

function plusSlide() {
	showSlide(slideIndex += 1);
}
function minusSlide() {
	showSlide(slideIndex += -1);
}
function showSlide(n) {
	let i;
	const slides = document.querySelectorAll('.mySlides');					// nodelist of .mySliders
	if(n > slides.length) {slideIndex = 1} 									// after last slide change to first slide 
	if(n < 1) {slideIndex = slides.length}									// opposide as upper

	for (i = 0; i < slides.length; i++) { 									// set all slides display:none
		slides[i].style.display = "none"; 
	}
	slides[slideIndex-1].style.display = "flex"; 
}
prevSlide.addEventListener('click', minusSlide);
nextSlide.addEventListener('click', plusSlide);



/* --CONNECTING NAVIGATION POINTS WITH SECTION'S DISPLAY-- */

sections[0].classList.add('displayFlex');									// set first section to be visible
function showSection() {													// connect navigation point with correct section by data-set
	const index = this.dataset.index;										
	sections.forEach(section => section.classList.remove('displayFlex'));
	sections[index].classList.add('displayFlex');
	showNavigation();
}

navTrigers.forEach( triger => {
	triger.addEventListener('click',showSection);
});



