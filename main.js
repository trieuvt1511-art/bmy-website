/* ========================================
   B'MY WEBSITE - JAVASCRIPT
   Interactive Features & Functionality
   ======================================== */

// ========================================
// LANGUAGE SYSTEM
// ========================================
const translations = {
    es: {
        navHero: 'Inicio',
        navCategories: 'Categorías',
        navStory: 'Historia',
        navMenu: 'Menú',
        navGallery: 'Galería',
        navLocation: 'Ubicación',
        countdownDays: 'días',
        countdownHours: 'horas',
        countdownMinutes: 'minutos',
        countdownSeconds: 'segundos'
    },
    en: {
        navHero: 'Home',
        navCategories: 'Categories',
        navStory: 'Story',
        navMenu: 'Menu',
        navGallery: 'Gallery',
        navLocation: 'Location',
        countdownDays: 'days',
        countdownHours: 'hours',
        countdownMinutes: 'minutes',
        countdownSeconds: 'seconds'
    },
    vi: {
        navHero: 'Trang chủ',
        navCategories: 'Danh mục',
        navStory: 'Câu chuyện',
        navMenu: 'Thực đơn',
        navGallery: 'Thư viện',
        navLocation: 'Địa chỉ',
        countdownDays: 'ngày',
        countdownHours: 'giờ',
        countdownMinutes: 'phút',
        countdownSeconds: 'giây'
    }
};

let currentLanguage = localStorage.getItem('preferredLanguage') || 'es';

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
            currentLanguage = lang;
        });
    });

    // Load and apply saved preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    const savedLangBtn = document.querySelector(`[data-lang="${savedLang}"]`);
    if (savedLangBtn) {
        savedLangBtn.click();
    }
}

function setLanguage(lang) {
    // Update all elements with data-{lang} attributes
    document.querySelectorAll('[data-es][data-en][data-vi]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text && !element.classList.contains('no-translate')) {
            element.textContent = text;
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder-es]').forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });

    // Update countdown labels
    updateCountdownLabels(lang);
}

function updateCountdownLabels(lang) {
    const labels = document.querySelectorAll('.countdown-label-small');
    const countdownLabels = ['days', 'hours', 'minutes', 'seconds'];

    labels.forEach((label, index) => {
        if (countdownLabels[index]) {
            const translatedLabel = translations[lang][`countdown${countdownLabels[index].charAt(0).toUpperCase() + countdownLabels[index].slice(1)}`];
            if (translatedLabel) {
                label.textContent = translatedLabel;
            }
        }
    });
}

// ========================================
// COUNTDOWN TIMER - May 26, 2026
// ========================================
function initCountdown() {
    // Madrid timezone
    const launchDate = new Date('2026-05-26T11:00:00+02:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance < 0) {
            const countdownContainer = document.getElementById('countdown-container');
            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <h2 style="color: #ee3124; text-align: center; width: 100%; font-family: 'Oswald', sans-serif; font-size: 2rem; margin: 0;">
                        ¡Ahora estamos abiertos!<br>Visítanos en C/ Fernández de los Ríos, 106, Madrid.
                    </h2>
                `;
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
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

            // Hide all categories with fade out
            document.querySelectorAll('.menu-category').forEach(cat => {
                cat.classList.remove('active');
            });

            // Show selected category with fade in
            const selectedCategory = document.querySelector(`.menu-category[data-category="${category}"]`);
            if (selectedCategory) {
                selectedCategory.classList.add('active');
            }
        });
    });
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

        // Simple email validation
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            messageEl.textContent = currentLanguage === 'es' ? 'Por favor, ingresa un email válido' :
                                   currentLanguage === 'en' ? 'Please enter a valid email' :
                                   'Vui lòng nhập một email hợp lệ';
            messageEl.style.color = '#ee3124';
            return;
        }

        // Simulate API call
        messageEl.textContent = currentLanguage === 'es' ? 'Procesando...' :
                               currentLanguage === 'en' ? 'Processing...' :
                               'Đang xử lý...';
        messageEl.style.color = '#426ab3';

        setTimeout(() => {
            messageEl.textContent = currentLanguage === 'es' ? 'Gracias por suscribirte. Recibirás un correo de confirmación pronto.' :
                                   currentLanguage === 'en' ? 'Thank you for subscribing. Check your email for confirmation.' :
                                   'Cảm ơn bạn đã đăng ký. Kiểm tra email của bạn để xác nhận.';
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
// SCROLL ANIMATIONS - FULLY VISIBLE BY DEFAULT
// ========================================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.menu-card, .gallery-item, .category-card, .info-card, .testimonial-card, .footer-section'
    );

    // Set initial state - VISIBLE by default
    elements.forEach((el, index) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // Only apply intersection observer for additional entrance animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only observe elements that benefit from animation
    elements.forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scroll-shadow');
        } else {
            navbar.classList.remove('scroll-shadow');
        }
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
                updateActiveNavLink();
            }
        });
    });
}

// ========================================
// UPDATE ACTIVE NAV LINK ON SCROLL
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
function initButtonRipples() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.background = 'rgba(255, 255, 255, 0.7)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';

            if (!this.style.position || this.style.position === 'static') {
                this.style.position = 'relative';
            }

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes if not already present
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// LAZY LOADING IMAGES
// ========================================
function initLazyLoading() {
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
}

// ========================================
// VIEWPORT DETECTION
// ========================================
const isMobile = () => window.innerWidth < 768;
const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;
const isDesktop = () => window.innerWidth >= 1024;

// ========================================
// UTILITY FUNCTIONS
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// TESTIMONIALS CAROUSEL (Simple Loop)
// ========================================
function initTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length <= 1) return;

    let currentIndex = 0;
    const autoplayDelay = 6000;

    function showTestimonial(index) {
        testimonials.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    showTestimonial(0);
    setInterval(nextTestimonial, autoplayDelay);
}

// ========================================
// INITIALIZE ALL FEATURES
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('B\'My Website Loaded - May 26, 2026 Opening');

    // Initialize features
    initLanguageSwitcher();
    initCountdown();
    initMenuTabs();
    initNewsletterForm();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initButtonRipples();
    initLazyLoading();
    initTestimonialsCarousel();

    // Set initial active nav link
    updateActiveNavLink();

    // Update active nav link on scroll
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

    // Log device info for debugging
    if (isDesktop()) {
        console.log('Device: Desktop');
    } else if (isTablet()) {
        console.log('Device: Tablet');
    } else {
        console.log('Device: Mobile');
    }
});

// ========================================
// HANDLE WINDOW RESIZE
// ========================================
window.addEventListener('resize', debounce(() => {
    // Recalculate layouts on resize
    updateActiveNavLink();
}, 250));

// ========================================
// PREVENT LAYOUT SHIFT - Smooth Transitions
// ========================================
window.addEventListener('load', () => {
    // Ensure all images are fully loaded before animations
    document.body.style.opacity = '1';
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or overlays here if added
    }
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
if ('performance' in window && 'measure' in window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}
