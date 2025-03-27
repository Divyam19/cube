document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.page1 .gimg');
    const mainImage = document.querySelector('.timg');

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
});