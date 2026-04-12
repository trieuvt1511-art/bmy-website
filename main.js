/* ========================================
   B'MY WEBSITE - MAIN JAVASCRIPT
   Bold & Playful Interactive Features
   ======================================== */

// ========================================
// 1. LANGUAGE SWITCHING (i18n)
// ========================================

const translations = {
    es: {
        'Inicio': 'Inicio',
        'Menú': 'Menú',
        'Historia': 'Nuestra Historia',
        'Galería': 'Galería',
        'Contacto': 'Contacto',
        'Días': 'Días',
        'Horas': 'Horas',
        'Minutos': 'Minutos',
        'Segundos': 'Segundos'
    },
    en: {
        'Inicio': 'Home',
        'Menú': 'Menu',
        'Historia': 'Story',
        'Galería': 'Gallery',
        'Contacto': 'Contact',
        'Días': 'Days',
        'Horas': 'Hours',
        'Minutos': 'Minutes',
        'Segundos': 'Seconds'
    },
    vi: {
        'Inicio': 'Trang chủ',
        'Menú': 'Thực đơn',
        'Historia': 'Câu chuyện',
        'Galería': 'Thư viện',
        'Contacto': 'Liên hệ',
        'Días': 'Ngày',
        'Horas': 'Giờ',
        'Minutos': 'Phút',
        'Segundos': 'Giây'
    }
};

let currentLanguage = 'es';

// Initialize language switcher
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguageSwitcher();
    initializeCountdown();
    initializeMenuTabs();
    initializeGalleryTabs();
    initializeReservationForm();
    initializeLeadForm();
    initializeMobileMenu();
    initializeSocialProofCounter();
});

function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            changeLanguage(selectedLang);

            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function changeLanguage(lang) {
    currentLanguage = lang;

    // Update all elements with data attributes
    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        const text = element.getAttribute('data-' + lang);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.hasAttribute('data-placeholder-' + lang)) {
            element.placeholder = element.getAttribute('data-placeholder-' + lang);
        } else {
            element.textContent = text;
        }
    });

    // Store language preference
    localStorage.setItem('bmyLanguage', lang);
}

// Load saved language preference
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('bmyLanguage') || 'es';
    const langBtn = document.querySelector(`[data-lang="${savedLang}"]`);
    if (langBtn) {
        langBtn.click();
    }
});

// ========================================
// 2. COUNTDOWN TIMER
// ========================================

function initializeCountdown() {
    const countdownDate = new Date('2026-05-01T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) {
                daysEl.textContent = days;
                daysEl.style.animation = 'none';
                setTimeout(() => {
                    daysEl.style.animation = 'pulse 0.6s ease-out';
                }, 10);
            }
            if (hoursEl) hoursEl.textContent = hours;
            if (minutesEl) minutesEl.textContent = minutes;
            if (secondsEl) secondsEl.textContent = seconds;
        }
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========================================
// 3. MENU TABS
// ========================================

function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));

            // Add active class to clicked tab and corresponding category
            this.classList.add('active');
            document.querySelector(`.menu-category[data-category="${category}"]`)?.classList.add('active');
        });
    });
}

// ========================================
// 4. GALLERY TABS
// ========================================

function initializeGalleryTabs() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContainers = document.querySelectorAll('.gallery-container');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Remove active class from all
            galleryTabs.forEach(t => t.classList.remove('active'));
            galleryContainers.forEach(cont => cont.classList.remove('active'));

            // Add active class to clicked tab and corresponding container
            this.classList.add('active');
            document.querySelector(`.gallery-container[data-category="${category}"]`)?.classList.add('active');
        });
    });
}

// ========================================
// 5. FORMS - LEAD CAPTURE & RESERVATION
// ========================================

function initializeLeadForm() {
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;

            // Simulate success
            showFormSuccess(this, 'Email received! Check your inbox for your free bánh mì voucher. 🎉');

            // Increment social proof counter
            incrementSignupCount();

            // Store data (in real app, send to server)
            console.log('Lead captured:', { name, email, phone });

            // Reset form
            this.reset();
        });
    }
}

function initializeReservationForm() {
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const guests = this.querySelector('select').value;
            const date = this.querySelector('input[type="date"]').value;
            const time = this.querySelector('input[type="time"]').value;

            // Simulate success
            showFormSuccess(this, 'Reservation confirmed! We\'ll send you a confirmation email shortly. 🎉');

            console.log('Reservation made:', { name, email, phone, guests, date, time });

            // Reset form
            this.reset();
        });
    }
}

function showFormSuccess(form, message) {
    const originalBtnText = form.querySelector('button[type="submit"]').textContent;
    const btn = form.querySelector('button[type="submit"]');

    // Change button to show success
    btn.style.background = 'linear-gradient(135deg, #43CB00, #2a8a00)';
    btn.textContent = '✓ ' + message;
    btn.disabled = true;

    // Show toast notification
    showToast(message);

    // Reset button after 3 seconds
    setTimeout(() => {
        btn.style.background = '';
        btn.textContent = originalBtnText;
        btn.disabled = false;
    }, 3000);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #43CB00;
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        font-family: 'Oswald', sans-serif;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// 6. SOCIAL PROOF COUNTER
// ========================================

let signupCount = localStorage.getItem('bmySignups') || 247;

function initializeSocialProofCounter() {
    const counter = document.getElementById('signupCount');
    if (counter) {
        animateCounter(counter, parseInt(signupCount));
    }
}

function incrementSignupCount() {
    signupCount = parseInt(signupCount) + 1;
    localStorage.setItem('bmySignups', signupCount);

    const counter = document.getElementById('signupCount');
    if (counter) {
        animateCounter(counter, parseInt(signupCount));
    }
}

function animateCounter(element, targetNumber) {
    const currentNumber = parseInt(element.textContent);
    const increment = Math.ceil((targetNumber - currentNumber) / 20);
    let currentValue = currentNumber;

    const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetNumber) {
            element.textContent = targetNumber;
            clearInterval(interval);
        } else {
            element.textContent = currentValue;
        }
    }, 30);

    // Add bounce effect
    element.style.animation = 'pulse 0.6s ease-out';
}

// ========================================
// 7. MOBILE MENU
// ========================================

function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.flexDirection = 'column';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            navMenu.style.gap = '0.5rem';
        });
    }
}

// ========================================
// 8. SMOOTH SCROLL & PAGE TRANSITIONS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// 9. SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements on scroll
document.querySelectorAll('.value-card, .product-card, .menu-item, .founder-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ========================================
// 10. INTERACTIVE ELEMENTS
// ========================================

// Mascot interaction
const mascot = document.querySelector('.mascot-character');
if (mascot) {
    mascot.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'mascot-wave 0.6s ease-out';
        }, 10);
    });
}

// Product card interactions
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// ========================================
// 11. PAGE TRANSITIONS
// ========================================

// Add fade-in animation on page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-out';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// 12. LOCAL STORAGE & PERSISTENCE
// ========================================

// Save user preferences
function savePreference(key, value) {
    localStorage.setItem(`bmy_${key}`, value);
}

function getPreference(key) {
    return localStorage.getItem(`bmy_${key}`);
}

// ========================================
// 13. UTILITY FUNCTIONS
// ========================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(function() {
    // Responsive adjustments
}, 250);

window.addEventListener('resize', handleResize);

// ========================================
// 14. LOADING STATES & ERROR HANDLING
// ========================================

// Simulate API calls with loading states
function simulateApiCall(duration = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, duration);
    });
}

// ========================================
// 15. PERFORMANCE OPTIMIZATIONS
// ========================================

// Lazy load images (when implemented with actual images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========================================
// 16. SPECIAL EASTER EGGS
// ========================================

// Secret keyboard shortcut
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    // Fun message for Easter egg hunters
    console.log('%cB\'My Easter Egg! 🎉', 'color: #ee3124; font-size: 20px; font-weight: bold;');
    console.log('%cYou\'ve discovered the secret! 🍞 ☕', 'color: #426ab3; font-size: 16px;');

    // Add fun visual effect
    const style = document.createElement('style');
    style.textContent = `
        body {
            animation: rainbow 0.5s ease-out;
        }
        @keyframes rainbow {
            0% { background: #ee3124; }
            20% { background: #ffea82; }
            40% { background: #43CB00; }
            60% { background: #426ab3; }
            80% { background: #e8712a; }
            100% { background: white; }
        }
    `;
    document.head.appendChild(style);

    // Show celebration message
    showToast('🎉 You found the Easter egg! Welcome to B\'My\'s secret club! 🍞');
}

// ========================================
// 17. ACCESSIBILITY FEATURES
// ========================================

// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// 18. ANALYTICS & TRACKING (Optional)
// ========================================

function trackEvent(eventName, eventData) {
    // In production, this would send to Google Analytics or similar
    console.log(`Event: ${eventName}`, eventData);
}

// Track page views
trackEvent('page_view', {
    page: window.location.pathname,
    timestamp: new Date().toISOString()
});

// ========================================
// 19. INIT COMPLETE MESSAGE
// ========================================

console.log('%cB\'My Website Loaded Successfully! 🍞☕', 'color: #ee3124; font-size: 16px; font-weight: bold;');
console.log('Welcome to the delicious world of B\'My. Sabor real, esencia de Vietnam. 🇻🇳');

// Export functions for external use if needed
window.BMy = {
    changeLanguage,
    trackEvent,
    savePreference,
    getPreference
};
