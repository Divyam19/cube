document.addEventListener('DOMContentLoaded', function() {
    const flavorRadios = document.querySelectorAll('.flavor-option input[type="radio"]');
    const subscriptionImage = document.querySelector('.included-items-2 .item-group:first-child img');
    const flavorImages = {
        'original': '/assets/bags/white.png',
        'matcha': '/assets/bags/green.png',
        'cocoa': '/assets/bags/cocoa.png'
    };

    flavorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const selectedFlavor = this.value.toLowerCase();
                const imagePath = flavorImages[selectedFlavor];
                if (imagePath && subscriptionImage) {
                    subscriptionImage.src = imagePath;
                }
            }
        });
    });

    const checkedFlavor = document.querySelector('.flavor-option input[type="radio"]:checked');
    if (checkedFlavor) {
        checkedFlavor.dispatchEvent(new Event('change'));
    }
});