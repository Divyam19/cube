document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.page1 .gimg');
    const mainImage = document.querySelector('.timg');
    const imgContainer = document.querySelector('.timg-container');
    
    // Set the first thumbnail as active by default if none is active
    if (!document.querySelector('.page1 .gimg.active') && thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Get the src from the clicked thumbnail and update main image
            const newSrc = this.getAttribute('src');
            mainImage.src = newSrc;
            
            // Add active state to clicked thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add touch swipe support for mobile
    if (imgContainer) {
        let startX, endX;
        const threshold = 50; // Minimum distance to be considered a swipe
        
        imgContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, false);
        
        imgContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const distance = endX - startX;
            
            if (Math.abs(distance) >= threshold) {
                // Find current active thumbnail
                const activeThumb = document.querySelector('.page1 .gimg.active');
                if (!activeThumb) return;
                
                let nextThumb;
                
                if (distance > 0) {
                    // Swipe right - go to previous image
                    nextThumb = activeThumb.previousElementSibling || thumbnails[thumbnails.length - 1];
                } else {
                    // Swipe left - go to next image
                    nextThumb = activeThumb.nextElementSibling || thumbnails[0];
                }
                
                if (nextThumb) {
                    // Simulate click on the next thumbnail
                    nextThumb.click();
                }
            }
        }
    }
});