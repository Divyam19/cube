function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

const searchIcon = document.querySelector('.search-icon');
const searchBox = document.querySelector('.search-box');
const navMenu = document.querySelector('.nav-menu');
const rightSection = document.querySelector('.right-section');

searchIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    searchBox.classList.toggle('active');
    navMenu.classList.toggle('hidden');
    rightSection.classList.toggle('search-active');
    
    if (searchBox.classList.contains('active')) {
        searchBox.querySelector('input').focus();
    }
});

searchBox.addEventListener('click', function(e) {
    e.stopPropagation();
});

document.addEventListener('click', function() {
    if (searchBox.classList.contains('active')) {
        searchBox.classList.remove('active');
        navMenu.classList.remove('hidden');
        rightSection.classList.remove('search-active');
    }
});

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer to trigger animation when element is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const targetValue = parseInt(element.getAttribute('data-target'));
            
            // Only animate if not already animated
            if (!element.classList.contains('animated')) {
                animateValue(element, 0, targetValue, 2000);
                element.classList.add('animated');
            }
        }
    });
}, {
    threshold: 0.1 // Trigger when at least 10% of the element is visible
});

// Ensure DOM is fully loaded before observing elements
document.addEventListener('DOMContentLoaded', () => {
    // Observe all moving-number elements
    document.querySelectorAll('.moving-number').forEach(element => {
        observer.observe(element);
    });
    
    console.log('Moving number observers initialized');
});


// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const toggle = item.querySelector('.faq-toggle');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', function() {
      // Toggle active class on the answer
      answer.classList.toggle('active');
      
      // Toggle active class on the toggle button (for rotation)
      toggle.classList.toggle('active');
      
      // Close other open FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-answer').classList.remove('active');
          otherItem.querySelector('.faq-toggle').classList.remove('active');
        }
      });
    });
    
    // Make the toggle button also trigger the click event
    toggle.addEventListener('click', function(e) {
      // Prevent the event from bubbling up to the question div
      e.stopPropagation();
      // Manually trigger the click on the parent question div
      question.click();
    });
  });
});

function subscribe() {
  let inputField = document.getElementById("emailInput");
  let email = inputField.value.trim();

  if (email === "") {
      alert("Please enter a valid email!");
      return;
  }

  inputField.value = ""; // Clear input
  alert("Email registered!");
}

function subscribe2() {
  let inputField = document.getElementById("emailInput2");
  let email = inputField.value.trim();

  if (email === "") {
      alert("Please enter a valid email!");
      return;
  }

  inputField.value = ""; // Clear input
  alert("Email registered!");
}

// Image slider functionality
const productImages = [
    '/assets/photos/1.png',
    '/assets/photos/2_1_11zon.png',
    '/assets/photos/3_2_11zon.png',
    '/assets/photos/4_3_11zon.png',
    '/assets/photos/5_4_11zon.png',
    '/assets/photos/7_5_11zon.png',
    '/assets/photos/8_6_11zon.png',
    '/assets/photos/9_7_11zon.png',
];

let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const productImage = document.querySelector('.timg-container .timg');
    const prevButton = document.querySelector('.timg-container .slider-nav.prev');
    const nextButton = document.querySelector('.timg-container .slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (productImage && prevButton && nextButton && dotsContainer) {
        // Create pagination dots
        productImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentImageIndex = index;
                updateImage();
                updateDots();
            });
            dotsContainer.appendChild(dot);
        });

        function updateImage() {
            productImage.src = productImages[currentImageIndex];
            updateDots();
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentImageIndex);
            });
        }

        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
            updateImage();
        });

        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % productImages.length;
            updateImage();
        });
    }
});

// Original map slider code
const buttonsWrapper = document.querySelector(".map");
const slides = document.querySelector(".inner");

buttonsWrapper.addEventListener("click", e => {
  if (e.target.nodeName === "BUTTON") {
    Array.from(buttonsWrapper.children).forEach(item =>
      item.classList.remove("active")
    );
    if (e.target.classList.contains("first")) {
      slides.style.transform = "translateX(-0%)";
      e.target.classList.add("active");
    } else if (e.target.classList.contains("second")) {
      slides.style.transform = "translateX(-33.33333333333333%)";
      e.target.classList.add("active");
    } else if (e.target.classList.contains('third')){
      slides.style.transform = 'translatex(-66.6666666667%)';
      e.target.classList.add('activee');
    }
  }
});