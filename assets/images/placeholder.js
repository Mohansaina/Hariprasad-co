// Placeholder image generator for CA Professional
// This creates a professional-looking placeholder using Canvas API

function createProfessionalPlaceholder(width = 400, height = 400) {
    // Create an offscreen canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#f0f4f8');
    bgGradient.addColorStop(1, '#dfe7f1');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw a professional silhouette
    ctx.fillStyle = '#003366'; // Navy blue
    
    // Draw body (simple suit representation)
    ctx.beginPath();
    ctx.moveTo(width * 0.4, height * 0.4); // Start at shoulder
    ctx.lineTo(width * 0.3, height * 0.6); // Left arm
    ctx.lineTo(width * 0.35, height * 0.8); // Left side
    ctx.lineTo(width * 0.65, height * 0.8); // Right side
    ctx.lineTo(width * 0.7, height * 0.6); // Right arm
    ctx.lineTo(width * 0.6, height * 0.4); // Back to shoulder
    ctx.closePath();
    ctx.fill();
    
    // Draw head
    const headRadius = width * 0.15;
    const headX = width * 0.5;
    const headY = height * 0.3;
    
    // Head circle
    ctx.beginPath();
    ctx.arc(headX, headY, headRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#f8d7b6'; // Skin tone
    ctx.fill();
    
    // Face details (simple)
    ctx.fillStyle = '#003366';
    
    // Eyes
    ctx.beginPath();
    ctx.arc(headX - headRadius * 0.3, headY - headRadius * 0.1, headRadius * 0.08, 0, Math.PI * 2);
    ctx.arc(headX + headRadius * 0.3, headY - headRadius * 0.1, headRadius * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    ctx.beginPath();
    ctx.arc(headX, headY + headRadius * 0.2, headRadius * 0.2, 0, Math.PI);
    ctx.strokeStyle = '#003366';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Necktie
    ctx.fillStyle = '#00a86b'; // Emerald green
    ctx.beginPath();
    ctx.moveTo(width * 0.48, height * 0.45);
    ctx.lineTo(width * 0.45, height * 0.55);
    ctx.lineTo(width * 0.55, height * 0.55);
    ctx.lineTo(width * 0.52, height * 0.45);
    ctx.closePath();
    ctx.fill();
    
    // Return data URL
    return canvas.toDataURL('image/png');
}

// Function to save the generated image to localStorage or use directly
function saveProfessionalImage() {
    const imageDataUrl = createProfessionalPlaceholder();
    
    // Save to localStorage for reuse
    localStorage.setItem('caProfessionalImage', imageDataUrl);
    
    // Also return the URL
    return imageDataUrl;
}

// Function to set the image on the page
function setProfessionalImage() {
    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        const profileImages = document.querySelectorAll('.profile-image');
        
        // First, try to get from localStorage
        let imageUrl = localStorage.getItem('caProfessionalImage');
        
        if (!imageUrl) {
            // If not in storage, generate and save
            imageUrl = saveProfessionalImage();
        }
        
        // Set the image source for all profile images
        profileImages.forEach(img => {
            img.src = imageUrl;
            img.alt = "Professional CA - Hariprasad & Co";
            
            // Add error handling in case image doesn't load
            img.onerror = function() {
                // Fallback to a text representation if image fails
                this.style.backgroundColor = '#003366';
                this.style.color = 'white';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.fontSize = '50px';
                this.innerHTML = '<i class="fas fa-user-tie"></i>';
            };
        });
    });
}

// Initialize when page loads
setProfessionalImage();

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createProfessionalPlaceholder, saveProfessionalImage, setProfessionalImage };
}