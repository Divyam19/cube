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


const testimonials = [
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position, Company name",
      rating: 5
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position, Company name",
      rating: 5
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position, Company name",
      rating: 5
    },
    {
      quote: "Exceptional service! The product exceeded my expectations. The team was responsive and helpful throughout the entire process.",
      name: "John Smith",
      position: "CTO, Tech Innovations",
      rating: 5
    },
    {
      quote: "I've been using this service for over a year now and I'm consistently impressed with the quality and attention to detail.",
      name: "Sarah Johnson",
      position: "Marketing Director, Creative Co.",
      rating: 5
    },
    {
      quote: "The customer support team went above and beyond to help me resolve my issues. I couldn't be happier with the results.",
      name: "Michael Brown",
      position: "Founder, Startup Inc.",
      rating: 5
    },
    {
      quote: "This platform has transformed how we operate. The intuitive interface and powerful features have saved us countless hours.",
      name: "Emily Davis",
      position: "Operations Manager, Global Ltd.",
      rating: 5
    },
    {
      quote: "I was skeptical at first, but after trying it out, I'm completely sold. The results speak for themselves.",
      name: "Robert Wilson",
      position: "Lead Developer, Software Solutions",
      rating: 5
    }
  ];

  // DOM elements
  const carouselTrack = document.getElementById('carousel-track');
  const pagination = document.getElementById('pagination');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  // Carousel state
  let currentIndex = 0;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // Create star rating HTML
  function createStarRating(rating) {
    let starsHTML = '';
    for (let i = 0; i < rating; i++) {
      starsHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      `;
    }
    return starsHTML;
  }

  // Create testimonial card HTML
  function createTestimonialCard(testimonial) {
    return `
      <div class="testimonial-card">
        <div class="stars">
          ${createStarRating(testimonial.rating)}
        </div>
        <p class="quote">"${testimonial.quote}"</p>
        <div class="author">
          <div class="author-image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E" alt="">
          </div>
          <div class="author-info">
            <span class="author-name">${testimonial.name}</span>
            <span class="author-position">${testimonial.position}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Create pagination dots
  function createPagination() {
    pagination.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('pagination-dot');
      if (i === currentIndex) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        goToPage(i);
      });
      pagination.appendChild(dot);
    }
  }

  // Render testimonials for current page
  function renderTestimonials() {
    carouselTrack.innerHTML = '';
    const startIndex = currentIndex * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, testimonials.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      carouselTrack.innerHTML += createTestimonialCard(testimonials[i]);
    }
    
    // Add empty cards if needed to maintain layout
    const remainingSlots = itemsPerPage - (endIndex - startIndex);
    for (let i = 0; i < remainingSlots; i++) {
      carouselTrack.innerHTML += `<div class="testimonial-card" style="visibility: hidden;"></div>`;
    }
    
    updatePagination();
  }

  // Update pagination dots
  function updatePagination() {
    const dots = document.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Go to specific page
  function goToPage(index) {
    currentIndex = index;
    renderTestimonials();
    
    // Apply transition effect
    carouselTrack.style.transform = 'translateX(0)';
  }

  // Go to next page
  function goToNextPage() {
    // Apply slide out animation
    carouselTrack.style.transform = 'translateX(-10px)';
    carouselTrack.style.opacity = '0.8';
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % totalPages;
      renderTestimonials();
      
      // Reset and apply slide in animation
      carouselTrack.style.transform = 'translateX(10px)';
      carouselTrack.style.opacity = '0.8';
      
      setTimeout(() => {
        carouselTrack.style.transform = 'translateX(0)';
        carouselTrack.style.opacity = '1';
      }, 50);
    }, 300);
  }

  // Go to previous page
  function goToPrevPage() {
    // Apply slide out animation
    carouselTrack.style.transform = 'translateX(10px)';
    carouselTrack.style.opacity = '0.8';
    
    setTimeout(() => {
      currentIndex = (currentIndex - 1 + totalPages) % totalPages;
      renderTestimonials();
      
      // Reset and apply slide in animation
      carouselTrack.style.transform = 'translateX(-10px)';
      carouselTrack.style.opacity = '0.8';
      
      setTimeout(() => {
        carouselTrack.style.transform = 'translateX(0)';
        carouselTrack.style.opacity = '1';
      }, 50);
    }, 300);
  }

  // Event listeners
  prevButton.addEventListener('click', goToPrevPage);
  nextButton.addEventListener('click', goToNextPage);

  // Initialize carousel
  createPagination();
  renderTestimonials();

  // Auto-play carousel (optional)
  let autoplayInterval;
  
  function startAutoplay() {
    autoplayInterval = setInterval(goToNextPage, 5000);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Start autoplay
  startAutoplay();
  
  // Pause autoplay on hover
  document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoplay);
  document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoplay);
  
  // Responsive handling
  function handleResize() {
    renderTestimonials();
  }
  
  window.addEventListener('resize', handleResize);

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