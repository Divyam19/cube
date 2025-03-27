document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.wrapper');
    const inner = document.querySelector('.inner');
    const cards = document.querySelectorAll('.cardd');
    const map = document.querySelector('.map');
    let currentIndex = 0;
    const cardsPerSlide = 3;
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);

    // Set initial width for wrapper and inner container
    wrapper.style.width = `${cardsPerSlide * 18.5}em`; // Adjusted for card width + gap
    inner.style.width = `${cards.length * 18.5}em`;

    // Clear existing dots (if any)
    map.innerHTML = '';

    // Create navigation dots
    for (let i = 0; i < totalSlides; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => goToSlide(i));
        if (i === 0) button.classList.add('activee');
        map.appendChild(button);
    }

    function goToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * (cardsPerSlide * 18.5);
        inner.style.transition = "transform 0.5s ease-in-out";
        inner.style.transform = `translateX(${offset}em)`;

        // Update active dot
        document.querySelectorAll('.map button').forEach((btn, i) => {
            btn.classList.toggle('activee', i === currentIndex);
        });
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        } else {
            // Smoothly reset to first slide
            setTimeout(() => {
                inner.style.transition = "none"; // Remove transition for instant reset
                goToSlide(0);
                setTimeout(() => {
                    inner.style.transition = "transform 0.5s ease-in-out"; // Restore transition
                }, 50);
            }, 500);
        }
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
});