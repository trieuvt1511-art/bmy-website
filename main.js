/* ========================================
   B'MY WEBSITE - JAVASCRIPT
   Interactive Features & Functionality
   ======================================== */

// Translations Dictionary
const translations = {
    es: {
        navHero: 'Inicio',
        navAbout: 'Historia',
        navMenu: 'Menú',
        navGallery: 'Galería',
        navLocation: 'Ubicación',
        countdownDays: 'días',
        countdownHours: 'horas',
        countdownMinutes: 'minutos'
    },
    en: {
        navHero: 'Home',
        navAbout: 'Story',
        navMenu: 'Menu',
        navGallery: 'Gallery',
        navLocation: 'Location',
        countdownDays: 'days',
        countdownHours: 'hours',
        countdownMinutes: 'minutes'
    },
    vi: {
        navHero: 'Trang chủ',
        navAbout: 'Câu chuyện',
        navMenu: 'Thực đơn',
        navGallery: 'Thư viện',
        navLocation: 'Địa chỉ',
        countdownDays: 'ngày',
        countdownHours: 'giờ',
        countdownMinutes: 'phút'
    }
};

// ========================================
// COUNTDOWN TIMER
// ========================================
function initCountdown() {
    const launchDate = new Date('2026-05-01T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML =
                '<h2 style="color: #ee3124; text-align: center; width: 100%;">¡Ahora estamos abiertos! Visítanos en C/Preguntoiro 29, Madrid.</h2>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========================================
// MENU TAB SWITCHING
// ========================================
function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Hide all categories
            document.querySelectorAll('.menu-category').forEach(cat => {
                cat.classList.remove('active');
            });

            // Show selected category
            document.querySelector(`.menu-category[data-category="${category}"]`).classList.add('active');
        });
    });
}

// ========================================
// LANGUAGE SWITCHING
// ========================================
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);

            // Update active button
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Save preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });

    // Load saved preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    document.querySelector(`[data-lang="${savedLang}"]`).click();
}

function setLanguage(lang) {
    console.log('Setting language to:', lang);
    // Translations can be extended here for dynamic content
}

// ========================================
// NEWSLETTER FORM
// ========================================
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('.newsletter-input').value;
        const messageEl = document.getElementById('newsletter-message');

        // Simulate API call
        messageEl.textContent = 'Procesando...';
        messageEl.style.color = '#426ab3';

        setTimeout(() => {
            messageEl.textContent = 'Gracias por suscribirte. Recibirás un correo de confirmación pronto.';
            messageEl.style.color = '#43CB00';
            form.reset();

            // Reset message after 5 seconds
            setTimeout(() => {
                messageEl.textContent = '';
            }, 5000);
        }, 1000);
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to specific elements
    document.querySelectorAll('.menu-item, .gallery-item, .value-card, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// ========================================
// FLOATING MASCOT INTERACTION
// ========================================
function initFloatingMascot() {
    const mascot = document.getElementById('floating-mascot');
    if (!mascot) return;

    // Hide on scroll if at top
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            mascot.style.opacity = '1';
        } else {
            mascot.style.opacity = '0.7';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Click to scroll to menu
    mascot.addEventListener('click', () => {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    });
}

// ========================================
// INITIALIZE ALL FEATURES
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('B\'My Website Loaded');

    // Initialize all features
    initCountdown();
    initMenuTabs();
    initLanguageSwitcher();
    initNewsletterForm();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initFloatingMascot();

    // Set initial active nav link
    updateActiveNavLink();
});

// ========================================
// UPDATE ACTIVE NAV LINK ON SCROLL
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// PERFORMANCE: Lazy load images
// ========================================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// BUTTON CLICK HANDLERS
// ========================================
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add ripple effect
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'rgba(255, 255, 255, 0.7)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';

        if (!this.style.position) {
            this.style.position = 'relative';
        }

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ========================================
// VIEWPORT DETECTION
// ========================================
const isMobile = () => window.innerWidth < 768;
const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;
const isDesktop = () => window.innerWidth >= 1024;

// Log device type (for debugging)
console.log('Device:', isMobile() ? 'Mobile' : isTablet() ? 'Tablet' : 'Desktop');

// ========================================
// UTILITY: Debounce function
// ========================================
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