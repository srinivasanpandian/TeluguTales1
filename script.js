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
const sections = document.querySelectorAll('.hero, .second-section, .third-section, .fourth-section, .fifth-section, .seventh-section, .eighth-section, .ninth-section');
const backgrounds = document.querySelectorAll('.wooden-background, .second-background, .third-background, .fourth-background');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Hide all backgrounds first
            backgrounds.forEach(bg => {
                bg.style.opacity = '0';
            });
            
            // Remove visible class from fifth section
            document.querySelector('.fifth-section').classList.remove('visible');
            
            // Show the background for the current section
            const sectionIndex = Array.from(sections).indexOf(entry.target);
            
            if (sectionIndex === 4) { // Fifth section
                document.querySelector('.fifth-section').classList.add('visible');
            } else {
                backgrounds[sectionIndex].style.opacity = '1';
            }
            
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

// Fifth Section Observer
const fifthSection = document.querySelector('.fifth-section');
const fifthObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add leaf transition when entering fifth section
            const leafLeft = document.querySelector('.leaf-left');
            const leafRight = document.querySelector('.leaf-right');
            
            setTimeout(() => {
                leafLeft.classList.add('active');
                leafRight.classList.add('active');
                
                setTimeout(() => {
                    leafLeft.classList.add('open');
                    leafRight.classList.add('open');
                }, 100);
            }, 500);
        } else {
            // Remove classes when scrolling away
            const leafLeft = document.querySelector('.leaf-left');
            const leafRight = document.querySelector('.leaf-right');
            
            leafLeft.classList.remove('open');
            leafRight.classList.remove('open');
            
            setTimeout(() => {
                leafLeft.classList.remove('active');
                leafRight.classList.remove('active');
                entry.target.classList.remove('visible');
            }, 1000);
        }
    });
}, {
    threshold: 0.2
});

fifthObserver.observe(fifthSection);

// Cooking Stories Section - Book Navigation
// This section has been removed as the sixth section was removed from the HTML 
const stories = [
    { img: 'https://i.pravatar.cc/100?u=1', name: 'Lakshmi', blurb: 'My grandmother\'s secret Sakinalu recipe.' },
    { img: 'https://i.pravatar.cc/100?u=2', name: 'Raju', blurb: 'Bonalu festival and our family\'s special offerings.' },
    { img: 'https://i.pravatar.cc/100?u=3', name: 'Padma', blurb: 'Telangana wedding feast traditions.' },
    { img: 'https://i.pravatar.cc/100?u=4', name: 'Venkat', blurb: 'Gongura pachadi that cured homesickness!' },
    { img: 'https://i.pravatar.cc/100?u=5', name: 'Sunitha', blurb: 'Sarva Pindi recipe passed down generations.' },
    { img: 'https://i.pravatar.cc/100?u=6', name: 'Prasad', blurb: 'The perfect Hyderabadi biryani technique.' },
    { img: 'https://i.pravatar.cc/100?u=7', name: 'Kavitha', blurb: 'Bathukamma celebrations and festive foods.' },
    { img: 'https://i.pravatar.cc/100?u=8', name: 'Srinivas', blurb: 'Tales told over spicy Pachi Pulusu.' },
  ];

  const carousel = document.getElementById('circle-carousel');
  const overlay = document.getElementById('story-overlay');
  const expandedCard = document.getElementById('story-card-expanded');
  const storyContent = document.querySelector('.story-content');
    // Reuse existing closeBtn variable if already defined
    if (!window.closeBtn) {
      const closeBtn = document.querySelector('.close-btn');
    }

  function positionCards() {
    // Clear existing cards
    carousel.innerHTML = '';
    
    // Get current dimensions
    const carouselRect = carousel.getBoundingClientRect();
    
    // Set a minimum size to maintain proper spacing
    const minSize = Math.max(carouselRect.width, 320);
    
    // Calculate center and radius based on viewport
    const centerX = carouselRect.width / 2;
    const centerY = carouselRect.height / 2;
    
    // Adjust radius based on screen size but maintain minimum
    const radius = Math.min(centerX, centerY) * 0.8;
    const cardSize = Math.min(70, radius * 0.35); // Adjust card size proportionally
    
    stories.forEach((story, i) => {
      const angle = (2 * Math.PI * i) / stories.length;
      const x = centerX + radius * Math.cos(angle) - (cardSize / 2);
      const y = centerY + radius * Math.sin(angle) - (cardSize / 2);
  
      const card = document.createElement('div');
      card.className = 'story-card';
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      card.style.width = `${cardSize}px`;
      card.style.height = `${cardSize}px`;
      
      // Only show the image in the circle, no name
      card.innerHTML = `
        <img src="${story.img}" alt="${story.name}" style="width: ${cardSize * 0.9}px; height: ${cardSize * 0.9}px;" />
      `;
      
      card.addEventListener('click', () => {
        // Show name and blurb in the modal
        storyContent.innerHTML = `
          <img src="${story.img}" alt="${story.name}" />
          <h3>${story.name}</h3>
          <p>${story.blurb}</p>
        `;
        overlay.classList.add('active');
      });
      
      carousel.appendChild(card);
    });
  }
  
  // Position cards initially
  positionCards();
  
  // Reposition on window resize
  window.addEventListener('resize', positionCards);
  
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

// Timeline interaction
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Smooth scroll to the item
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
});

// Circle Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const stories = [
        { img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop', name: 'Lakshmi', blurb: 'My grandmother\'s secret Sakinalu recipe.' },
        { img: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=1000&auto=format&fit=crop', name: 'Raju', blurb: 'Bonalu festival and our family\'s special offerings.' },
        { img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop', name: 'Padma', blurb: 'Telangana wedding feast traditions.' },
        { img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop', name: 'Venkat', blurb: 'Gongura pachadi that cured homesickness!' },
        { img: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=1000&auto=format&fit=crop', name: 'Sunitha', blurb: 'Sarva Pindi recipe passed down generations.' },
        { img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop', name: 'Prasad', blurb: 'The perfect Hyderabadi biryani technique.' },
        { img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop', name: 'Kavitha', blurb: 'Bathukamma celebrations and festive foods.' },
        { img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop', name: 'Srinivas', blurb: 'Tales told over spicy Pachi Pulusu.' }
    ];

    const carousel = document.querySelector('.circle-carousel');
    const overlay = document.querySelector('.story-overlay');
    const storyContent = document.querySelector('.story-content');

    function createStoryCards() {
        // Clear existing cards
        carousel.innerHTML = '';
        
        const centerX = carousel.offsetWidth / 2;
        const centerY = carousel.offsetHeight / 2;
        // Reduce the radius to bring cards closer together
        const radius = Math.min(centerX, centerY) * 0.45; // Reduced from 0.8 to 0.45
        const cardSize = 85; // Fixed card size
        const halfCard = cardSize / 2;

        stories.forEach((story, index) => {
            // Adjust starting angle to position first card at top
            const angle = (2 * Math.PI * index) / stories.length - Math.PI / 2;
            
            // Calculate position using trigonometry
            const x = centerX + radius * Math.cos(angle) - halfCard;
            const y = centerY + radius * Math.sin(angle) - halfCard;

            const card = document.createElement('div');
            card.className = 'story-card';
            card.style.width = `${cardSize}px`;
            card.style.height = `${cardSize}px`;
            card.style.left = `${x}px`;
            card.style.top = `${y}px`;
            
            // Create and load image
            const img = document.createElement('img');
            img.src = story.img;
            img.alt = story.name;
            img.loading = 'lazy';
            
            // Add error handling for images
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/85x85.png?text=Story';
            };

            card.appendChild(img);

            // Add name label below the image
            const nameLabel = document.createElement('div');
            nameLabel.className = 'story-name';
            nameLabel.textContent = story.name;
            card.appendChild(nameLabel);

            card.addEventListener('click', () => {
                showStory(story);
            });

            carousel.appendChild(card);
        });
    }

    function showStory(story) {
        storyContent.innerHTML = `
            <img src="${story.img}" alt="${story.name}" onerror="this.src='https://via.placeholder.com/120x120.png?text=Story'">
            <h3>${story.name}</h3>
            <p>${story.blurb}</p>
            <button class="close-btn">&times;</button>
        `;
        
        const closeBtn = storyContent.querySelector('.close-btn');
        closeBtn.addEventListener('click', closeStory);
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeStory() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Initialize the carousel
    createStoryCards();

    // Close overlay when clicking outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeStory();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeStory();
        }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createStoryCards, 250);
    });
});  