document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.page1 .gimg');
    const mainImage = document.querySelector('.timg');
    const imgContainer = document.querySelector('.timg-container');
    
    if (!document.querySelector('.page1 .gimg.active') && thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const newSrc = this.getAttribute('src');
            mainImage.src = newSrc;
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
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
                const activeThumb = document.querySelector('.page1 .gimg.active');
                if (!activeThumb) return;
                
                let nextThumb;
                
                if (distance > 0) {
                    nextThumb = activeThumb.previousElementSibling || thumbnails[thumbnails.length - 1];
                } else {
                    nextThumb = activeThumb.nextElementSibling || thumbnails[0];
                }
                
                if (nextThumb) {
                    nextThumb.click();
                }
            }
        }
    }
});