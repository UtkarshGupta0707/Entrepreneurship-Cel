// script.js

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button-right');
const prevButton = document.querySelector('.carousel-button-left');
const slideWidth = slides[0].getBoundingClientRect().width;

// Clone the first and last slides for infinite scrolling
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstSlideClone);
track.insertBefore(lastSlideClone, slides[0]);

// Arrange the slides next to each other
const updatedSlides = Array.from(track.children);
updatedSlides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

let currentIndex = 1;

// Move to the actual first slide initially (not the cloned one)
track.style.transform = 'translateX(-' + slideWidth + 'px)';

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const updateCurrentSlide = (direction) => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    if (direction === 'next') {
        currentIndex++;
    } else if (direction === 'prev') {
        currentIndex--;
    }

    const nextSlide = updatedSlides[currentIndex];
    moveToSlide(track, currentSlide, nextSlide);
};

// Handle clicking next
nextButton.addEventListener('click', () => {
    updateCurrentSlide('next');

    // Handle the loop back to the first slide
    if (currentIndex === updatedSlides.length - 1) {
        setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform = 'translateX(-' + slideWidth + 'px)';
            currentIndex = 1;
        }, 500);
    }
});

// Handle clicking previous
prevButton.addEventListener('click', () => {
    updateCurrentSlide('prev');

    // Handle the loop back to the last slide
    if (currentIndex === 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform = 'translateX(-' + slideWidth * (updatedSlides.length - 2) + 'px)';
            currentIndex = updatedSlides.length - 2;
        }, 500);
    }
});

// Automatically slide to the next event every 3 seconds
let autoSlideInterval = setInterval(() => {
    nextButton.click();
}, 3000);

// Pause auto sliding when the user hovers over the carousel
track.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// Resume auto sliding when the user moves the mouse away
track.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        nextButton.click();
    }, 3000);
});


function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.tab-content').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';

    // Update active tab
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

