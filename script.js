// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(26, 77, 58, 0.95)';
        } else {
            header.style.backgroundColor = '';
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Gallery item click events
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageNumber = this.dataset.image;
            showImageModal(imageNumber);
        });
    });
    
    // CTA Button click event
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Stats counter animation
    function animateStats() {
        const statItems = document.querySelectorAll('.stat-item h3');
        const animateCount = (element, target) => {
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 20);
        };
        
        statItems.forEach(item => {
            const text = item.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (number) {
                item.textContent = '0';
                animateCount(item, number);
            }
        });
    }
    
    // Trigger stats animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.about-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Gallery hover effects
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Dynamic background colors based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                document.body.setAttribute('data-current-section', section.id);
            }
        });
    });
    
    // Typewriter effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typewriter effect
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
    
    // Image modal functionality
    function showImageModal(imageNumber) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-image">
                    <div class="modal-placeholder">Redwood Image ${imageNumber}</div>
                </div>
                <p class="modal-caption">California Redwoods - Image ${imageNumber}</p>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            .image-modal {
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 80%;
                max-height: 80%;
                position: relative;
                transform: scale(0.7);
                transition: transform 0.3s ease;
            }
            
            .image-modal.active {
                opacity: 1;
            }
            
            .image-modal.active .modal-content {
                transform: scale(1);
            }
            
            .close-modal {
                position: absolute;
                top: 1rem;
                right: 1.5rem;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            }
            
            .modal-image {
                width: 400px;
                height: 300px;
                background: linear-gradient(135deg, #4a7c4a 0%, #6b8e6b 100%);
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }
            
            .modal-caption {
                text-align: center;
                color: #333;
                font-size: 1.1rem;
            }
        `;
        
        // Add styles to document if not already present
        if (!document.querySelector('#modal-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'modal-styles';
            styleSheet.textContent = modalStyles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(modal);
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal events
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        function closeModal() {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    // Form submission handler
    function handleFormSubmission(form) {
        const formData = new FormData(form);
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const notificationStyles = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 2rem;
                border-radius: 5px;
                color: white;
                font-weight: bold;
                z-index: 3000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .notification.success {
                background-color: #4a7c4a;
            }
            
            .notification.error {
                background-color: #d32f2f;
            }
            
            .notification.info {
                background-color: #2196f3;
            }
            
            .notification.show {
                transform: translateX(0);
            }
        `;
        
        // Add notification styles if not present
        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = notificationStyles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            activateEasterEgg();
        }
    });
    
    function activateEasterEgg() {
        document.body.style.filter = 'hue-rotate(180deg)';
        showNotification('🌲 Ancient forest magic activated! 🌲', 'success');
        
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    }
    
    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(function() {
        // Existing scroll functionality is already handled above
    }, 16)); // ~60fps
    
    // Lazy loading for gallery items
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.gallery-item');
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    item.classList.add('loaded');
                    imageObserver.unobserve(item);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Dark mode toggle (hidden feature)
    let darkModeEnabled = false;
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
    });
    
    function toggleDarkMode() {
        darkModeEnabled = !darkModeEnabled;
        
        if (darkModeEnabled) {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            showNotification('Dark mode activated! Press Ctrl+D to toggle.', 'info');
        } else {
            document.body.style.filter = '';
            showNotification('Light mode activated!', 'info');
        }
    }
});