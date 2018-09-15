
let slideIndex = 1; //current slide 
const prevSlide = document.querySelector('.prev'); //prev slide button
const nextSlide = document.querySelector('.next'); //next slide button

showSlide(slideIndex);

function plusSlide() {
	showSlide(slideIndex += 1);
}
function minusSlide() {
	showSlide(slideIndex += -1);
}

function showSlide(n) {
	let i;
	const slides = document.querySelectorAll('.mySlides'); //nodelist of .mySliders
	if(n > slides.length) {slideIndex = 1} // after last slide change to first slide 
	if(n < 1) {slideIndex = slides.length} // opposide as upper

	for (i = 0; i < slides.length; i++) { // set all slides display none
		slides[i].style.display = "none"; 
	}
	slides[slideIndex-1].style.display = "flex"; 
}

prevSlide.addEventListener('click', minusSlide);
nextSlide.addEventListener('click', plusSlide);


