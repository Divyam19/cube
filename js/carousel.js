document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.wrapper');
    const inner = document.querySelector('.inner');
    const cards = document.querySelectorAll('.cardd');
    const map = document.querySelector('.map');
    let currentIndex = 0;
    let cardsPerSlide = 3;
    
    function updateCardsPerSlide() {
        if (window.innerWidth <= 480) {
            cardsPerSlide = 1;
        } else if (window.innerWidth <= 768) {
            cardsPerSlide = 2;
        } else {
            cardsPerSlide = 3;
        }
        return Math.ceil(cards.length / cardsPerSlide);
    }
    
    let totalSlides = updateCardsPerSlide();

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-nav-button prev';
    prevButton.innerHTML = '❮';
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-nav-button next';
    nextButton.innerHTML = '❯';

    const carouselContainer = wrapper.parentElement;
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);

    const cloneCards = [...cards].slice(0, cardsPerSlide).map(card => card.cloneNode(true));
    cloneCards.forEach(card => inner.appendChild(card));

    wrapper.style.width = `${cardsPerSlide * 18.5}em`;
    inner.style.width = `${(cards.length + cloneCards.length) * 18.5}em`;

    map.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => goToSlide(i));
        if (i === 0) button.classList.add('activee');
        map.appendChild(button);
    }

    function goToSlide(index, smooth = true) {
        currentIndex = index;
        const offset = -currentIndex * (cardsPerSlide * 18.5);
        inner.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";
        inner.style.transform = `translateX(${offset}em)`;

        document.querySelectorAll('.map button').forEach((btn, i) => {
            btn.classList.toggle('activee', i === (index % totalSlides));
        });
    }

    function nextSlide() {
        if (currentIndex < totalSlides) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(currentIndex + 1);
            setTimeout(() => {
                goToSlide(0, false); // Instantly reset to the first slide
            }, 500);
        }
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(totalSlides - 1);
        }
    });

    nextButton.addEventListener('click', nextSlide);

    setInterval(nextSlide, 5000);
});