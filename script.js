// Salt particle animation
function createSaltParticle() {
    const saltShaker = document.querySelector('.salt-shaker');
    const particlesContainer = document.querySelector('.salt-particles');
    
    const particle = document.createElement('div');
    particle.className = 'salt-particle';
    
    // Random position
    const randomX = Math.random() * 20 - 10; // -10 to 10px
    
    // Set initial position
    particle.style.left = `${randomX}px`;
    particle.style.opacity = '1';
    
    // particlesContainer.appendChild(particle);
    
    // Animate falling
    let position = 0;
    const fall = setInterval(() => {
        position += 2;
        particle.style.transform = `translate(${randomX}px, ${position}px)`;
        particle.style.opacity = Math.max(0, 1 - position / 50);
        
        if (position > 50) {
            clearInterval(fall);
            particle.remove();
        }
    }, 20);
}

// Create salt particles periodically
setInterval(createSaltParticle, 100);

// Banana Leaf Transition
const leafLeft = document.querySelector('.leaf-left');
const leafRight = document.querySelector('.leaf-right');
const secondSection = document.querySelector('.second-section');
const hero = document.querySelector('.hero');

let hasReachedSecondSection = false;
let hasOpenedLeaves = false;

const leafObserverOptions = {
    root: null,
    rootMargin: '-20% 0px',
    threshold: [0, 0.5]
};

const leafObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target === secondSection) {
            // First step: Show leaves when reaching second section
            if (!hasReachedSecondSection) {
                leafLeft.classList.add('active');
                leafRight.classList.add('active');
                hasReachedSecondSection = true;
            }
            
            // Second step: Open leaves when scrolling further (at 50% visibility)
            if (entry.intersectionRatio >= 0.5 && !hasOpenedLeaves) {
                setTimeout(() => {
                    leafLeft.classList.add('open');
                    leafRight.classList.add('open');
                    hasOpenedLeaves = true;
                }, 100);
            }
        } else {
            // Reset when leaving second section
            if (!entry.isIntersecting && entry.target === secondSection) {
                if (hasOpenedLeaves) {
                    leafLeft.classList.remove('open');
                    leafRight.classList.remove('open');
                    hasOpenedLeaves = false;
                }
                
                setTimeout(() => {
                    leafLeft.classList.remove('active');
                    leafRight.classList.remove('active');
                    hasReachedSecondSection = false;
                }, 1500);
            }
        }
    });
}, leafObserverOptions);

leafObserver.observe(secondSection);

// Section Visibility Handling
const sections = document.querySelectorAll('.hero, .second-section, .third-section, .fourth-section, .fifth-section, .sixth-section, .seventh-section, .eighth-section, .ninth-section');
const backgrounds = document.querySelectorAll('.wooden-background, .second-background, .third-background, .fourth-background, .fifth-background, .sixth-background, .seventh-background, .eighth-background, .ninth-background');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Hide all backgrounds first
            backgrounds.forEach(bg => bg.style.opacity = '0');
            
            // Show the background for the current section
            const sectionIndex = Array.from(sections).indexOf(entry.target);
            backgrounds[sectionIndex].style.opacity = '1';
            
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Menu Modal Handling
const menuCloud = document.querySelector('.menu-cloud');
const menuModal = document.getElementById('menuModal');
const closeBtn = document.querySelector('.close-btn');
const menuItems = document.querySelectorAll('.menu-items li');

function openModal() {
    menuModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    menuModal.classList.remove('show');
    document.body.style.overflow = '';
}

menuCloud.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
menuModal.addEventListener('click', (e) => {
    if (e.target === menuModal) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal.classList.contains('show')) {
        closeModal();
    }
});

// Menu item hover effects
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Menu item click handling
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            closeModal();
        }
    });
});

// Loading animation for hero elements
const heroElements = document.querySelectorAll('.hero > *');
heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, index * 200);
});

// Optional: Add smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.hero > div');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize elements with fade-in effect
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.hero > div');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Add transition to wooden background
    const woodenBg = document.querySelector('.wooden-background');
    woodenBg.style.transition = 'opacity 0.5s ease-in-out';
}); 