document.addEventListener('DOMContentLoaded', function() {
    // Get all flavor option radio buttons
    const flavorRadios = document.querySelectorAll('.flavor-option input[type="radio"]');
    
    // Get the subscription image that needs to be updated (Every 30 Days image)
    const subscriptionImage = document.querySelector('.included-items-2 .item-group:first-child img');
    
    // Define image paths for each flavor
    const flavorImages = {
        'original': '/assets/bags/white.png',
        'matcha': '/assets/bags/green.png',
        'cocoa': '/assets/bags/cocoa.png'
    };
    
    // Add event listeners to each flavor radio button
    flavorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                // Get the selected flavor value
                const selectedFlavor = this.value.toLowerCase();
                
                // Get the corresponding image path
                const imagePath = flavorImages[selectedFlavor];
                
                // Update the subscription image if we have a matching image path
                if (imagePath && subscriptionImage) {
                    subscriptionImage.src = imagePath;
                }
            }
        });
    });
    
    // Set default selected flavor if one is already checked
    const checkedFlavor = document.querySelector('.flavor-option input[type="radio"]:checked');
    if (checkedFlavor) {
        // Trigger the change event to update the image based on the initially selected flavor
        checkedFlavor.dispatchEvent(new Event('change'));
    }
});