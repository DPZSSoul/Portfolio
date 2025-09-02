// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    handleFormSubmit();
    handleSmoothScroll();
    handleScrollSpy();
    initializeProjectPreviews();
    animateProjectCardsOnLoad();
    addParticleEffects();
    addScrollAnimations();
    addTypingEffect();
    addParallaxEffects();
    addMouseTrailEffect();
}

// Form handling
function handleFormSubmit() {
    const form = document.querySelector('.contact-form');
    const status = document.getElementById('form-status');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Show sending status
        status.textContent = 'Sending message...';
        status.className = 'form-status sending';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual Formspree endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success status
            status.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            status.className = 'form-status success';
            form.reset();
            
            // Reset after 5 seconds
            setTimeout(() => {
                status.textContent = '';
                status.className = 'form-status';
            }, 5000);
            
        } catch (error) {
            // Show error status
            status.textContent = 'Failed to send message. Please try again.';
            status.className = 'form-status error';
        } finally {
            submitButton.disabled = false;
        }
    });
}

// Smooth scrolling
function handleSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll spy for navigation
function handleScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Add scrolled class to header
        const header = document.querySelector('header');
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize project preview animations
function initializeProjectPreviews() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const preview = card.querySelector('.project-preview');
        
        // Mouse enter animation
        card.addEventListener('mouseenter', () => {
            animateProjectPreview(card, true);
        });
        
        // Mouse leave animation
        card.addEventListener('mouseleave', () => {
            animateProjectPreview(card, false);
        });
        
        // Click ripple effect
        card.addEventListener('click', (e) => {
            addClickRipple(e, card);
        });
    });
}

// Animate project preview on hover
function animateProjectPreview(card, isEntering) {
    const navItems = card.querySelectorAll('.nav-item');
    const previewContent = card.querySelectorAll('.preview-content > *:not(.preview-nav)');
    const chartBars = card.querySelectorAll('.chart-bar');
    
    if (isEntering) {
        // Animate nav items
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, index * 100);
        });
        
        // Animate content
        previewContent.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, index * 150);
        });
        
        // Animate chart bars
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'pulse 2s ease-in-out infinite';
            }, index * 200);
        });
    } else {
        // Reset animations
        navItems.forEach(item => {
            item.style.transform = 'translateY(10px)';
            item.style.opacity = '0.7';
        });
        
        previewContent.forEach(item => {
            item.style.transform = 'translateY(10px)';
            item.style.opacity = '0.8';
        });
        
        chartBars.forEach(bar => {
            bar.style.animation = 'none';
        });
    }
}

// Add click ripple effect
function addClickRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Animate project cards on load
function animateProjectCardsOnLoad() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

// Add particle effects
function addParticleEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
        pointer-events: none;
        z-index: 1;
    `;
    
    container.appendChild(particle);
}

// Add scroll-triggered animations
function addScrollAnimations() {
    const elements = document.querySelectorAll('.hero h1, .hero .tagline, .hero .hero-buttons, h2, .project-card, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Add typing effect to hero tagline
function addTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--accent)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            tagline.style.borderRight = 'none';
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Add parallax effects
function addParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroContent = hero.querySelector('.container');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroContent.style.transform = `translateY(${rate}px)`;
    });
}

// Add mouse trail effect
function addMouseTrailEffect() {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0;
    `;
    
    document.body.appendChild(trail);
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.style.opacity = '1';
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX - 10 + 'px';
        trail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Hide trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
    });
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .floating-particle {
        animation: floatParticle 15s ease-in-out infinite;
    }
    
    .hero h1, .hero .tagline, .hero .hero-buttons {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-card {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .contact-form {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .preview-content > *:not(.preview-nav) {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .chart-bar {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

document.head.appendChild(style);

