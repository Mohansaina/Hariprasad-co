// Hariprasad & Co Mobile UI - Interactive Elements

// Ensure viewport is set for all devices
function setViewport() {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
        document.head.appendChild(viewport);
    } else {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
    }
}

// Initialize viewport settings
setViewport();

// Set default layout to desktop
if (document.body) {
    document.body.setAttribute('data-layout', 'desktop');
    document.body.classList.add('loaded');
} else {
    // If body hasn't loaded yet, set it when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        document.body.setAttribute('data-layout', 'desktop');
        document.body.classList.add('loaded');
        
        // Add loading animation to elements
        const elements = document.querySelectorAll('.service-card, .profile-image-container, .whatsapp-button, .rating-section');
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.5s ease';
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 100);
            }, 500);
        });
    });
}

// Detect device type
function getDeviceType() {
    const width = window.innerWidth;
    if (width <= 480) return 'mobile';
    if (width <= 768) return 'tablet';
    return 'desktop';
}

// Add device type class to body for CSS targeting
function updateDeviceClass() {
    const deviceType = getDeviceType();
    document.body.classList.remove('mobile', 'tablet', 'desktop');
    document.body.classList.add(deviceType);
}

// Update on load and resize
window.addEventListener('load', updateDeviceClass);
window.addEventListener('resize', updateDeviceClass);

// Parallax effect for header background
function initParallax() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            // Move background at slower speed for parallax effect
            header.style.backgroundPosition = `0 ${-scrollPosition * 0.5}px`;
        });
    }
}

// Initialize parallax effect
initParallax();

// Mobile menu toggle functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change hamburger icon to close icon
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Initialize mobile menu
initMobileMenu();

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    // Add click event to WhatsApp button (in case we need to add analytics or tracking)
    if(whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            console.log('WhatsApp button clicked');
            // Here you could add analytics tracking if needed
        });
    }
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add touch feedback for mobile devices
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Mouse events for desktop
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animation for rating stars
    const stars = document.querySelector('.stars');
    if(stars) {
        const starIcons = stars.querySelectorAll('i');
        starIcons.forEach((star, index) => {
            setTimeout(() => {
                star.style.opacity = '1';
                star.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe service cards
    serviceCards.forEach(card => {
        observer.observe(card);
    });
});

// Utility function to check if user is on mobile device
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Function to format phone numbers
function formatPhoneNumber(phoneNumber) {
    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format as +91 XXXXXXXXXX
    if(cleaned.length === 10) {
        return '+91 ' + cleaned.slice(0, 5) + ' ' + cleaned.slice(5);
    }
    
    return phoneNumber;
}

// Function to validate contact form (if added later)
function validateContactForm(formData) {
    const errors = [];
    
    if(!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    if(!formData.email || !isValidEmail(formData.email)) {
        errors.push('Valid email is required');
    }
    
    if(!formData.phone || formData.phone.length < 10) {
        errors.push('Valid phone number is required');
    }
    
    return errors;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to send notification (for contact form submission)
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        backgroundColor: type === 'success' ? '#00a86b' : '#ff6b6b',
        zIndex: '1000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '14px',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}