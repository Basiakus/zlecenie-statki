/* --VARIABLE DECLARATION-- */

const nav = document.querySelector('nav');						// The navigation
const button = document.querySelector('#navButton');			// The button in a navigation (mobile devices)
const compassNeedle = document.querySelector('#compassNeedle')	// The compass-needle in a button
const sections = document.querySelectorAll('section');			// all the sections
const navTrigers = document.querySelectorAll('nav li');			// navigation poits 
const prevSlide = document.querySelector('.prev');				// prev slide button
const nextSlide = document.querySelector('.next');				// next slide button
let slideIndex = 1;												// current slide in carusel										



/* --NAVBUTTON IN SECTION ONE-- */

function showNavigation() {					
	const emptyContents = document.querySelectorAll('.emptyContent');

	/*add classes with animation attributes*/
	emptyContents.forEach( emptyContent => 
		(!emptyContent.classList.contains('hide')) ? emptyContent.classList.add('hide') : emptyContent.classList.remove('hide')
	);
	(!nav.classList.contains('off')) ? nav.classList.add('off') : nav.classList.remove('off');
	(!button.classList.contains('click')) ? button.classList.add('click') : button.classList.remove('click');
	(!compassNeedle.classList.contains('press')) ? compassNeedle.classList.add('press') : compassNeedle.classList.remove('press');
}
button.addEventListener('click', showNavigation);



/* --CARUSEL IN SECTION TWO-- */

showSlide(slideIndex);

function plusSlide() {
	showSlide(slideIndex += 1);
}
function minusSlide() {
	showSlide(slideIndex += -1);
}
function showSlide(n) {
	let i;
	const slides = document.querySelectorAll('.mySlides');
	/*after last slide change to first slide */
	if(n > slides.length) {slideIndex = 1}
	/*opposide as upper*/ 					
	if(n < 1) {slideIndex = slides.length}					
	/*set all slides display:none*/
	for (i = 0; i < slides.length; i++) { 					
		slides[i].style.display = "none"; 
	}
	slides[slideIndex-1].style.display = "flex"; 
}
prevSlide.addEventListener('click', minusSlide);
nextSlide.addEventListener('click', plusSlide);



/* --CONNECTING NAVIGATION POINTS WITH SECTION'S DISPLAY-- */

/*set first section to be visible*/
sections[0].classList.add('displayFlex', 'changeEffects');

/*function add classes with changing of sections*/
function changeEffects(index) {								
	sections[index].classList.add('changeEffects');
}

/*connect navigation trigers with correct section by data-set*/								
function showSection() {									
	const index = this.dataset.index;										
	sections.forEach(section => section.classList.remove('displayFlex', 'changeEffects'));
	sections[index].classList.add('displayFlex');

	/*active change effects after 10ms*/
	setTimeout(function() {																										
		changeEffects(index);
		mapRefresh();/*correct display of map in section 4 after display changeing*/																										
	}, 10);

	/*call showNavigation() only under 801px width devices*/
	if (window.matchMedia("(max-width: 801px)").matches) showNavigation(); 					
}
navTrigers.forEach( triger => {
	triger.addEventListener('click',showSection);
});



/* --ADDING MAP FROM LEAFLETJS.COM-- */

const mymap = L.map('map').setView([53.9074403, 14.2508657], 13);

/*inicialize map*/
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 20,    
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYmFzaWFrdXMiLCJhIjoiY2ptY2dtaHU0MDlvNzNrbnp6M2QwNXk0YiJ9.6eUNcDrGgcNhRBAMrMouPw'
}).addTo(mymap);

/*inicialize marker*/
const marker = L.marker([53.9074403, 14.2508657])
	.addTo(mymap)
	.bindPopup('tutaj jesteśmy');

/*func fixing bug with false size on section load*/
function mapRefresh() { 	 
	setTimeout(function() {
		mymap.invalidateSize();
		marker.openPopup();
	}, 20);
}