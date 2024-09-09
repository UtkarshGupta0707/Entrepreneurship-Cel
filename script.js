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

// Arrange the slides next to each other
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

let currentIndex = 0;
const slidesPerGroup = 3; // Number of slides to move at a time

// Function to move to the desired group of slides
const moveToSlide = (track, targetIndex) => {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
};

// Handle clicking next
nextButton.addEventListener('click', () => {
    const maxIndex = slides.length - slidesPerGroup;

    if (currentIndex < maxIndex) {
        currentIndex += slidesPerGroup;
    } else {
        currentIndex = 0; // Loop back to the first set when reaching the end
    }

    moveToSlide(track, currentIndex);
});

// Handle clicking previous
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= slidesPerGroup;
    } else {
        currentIndex = slides.length - slidesPerGroup; // Loop back to the last set when reaching the start
    }

    moveToSlide(track, currentIndex);
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

