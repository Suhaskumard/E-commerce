/**
 * =============================
 * ANIMATIONS.JS - Scroll Triggered Animations
 * Lightweight animations using Intersection Observer API
 * ============================= */

/**
 * Initialize all scroll-triggered animations
 * Uses Intersection Observer API for optimal performance
 */
function initializeScrollAnimations() {
    // Automatically add animation helpers to home sections and cards
    document.querySelectorAll(
        '#hero, #feature, #product1, #banner, #new-arrivals, #recently-viewed, #sm-banner, #banner3, #newsletter, #feature .fe-box, #product1 .pro, #new-arrivals .pro, #recently-viewed .pro'
    ).forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: add animation classes immediately for older browsers
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('in-view');
        });
        return;
    }

    // Configure Intersection Observer options
    const observerOptions = {
        threshold: 0.1,  // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'  // Start animations 50px before element enters viewport
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element enters viewport
                entry.target.classList.add('in-view');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-triggered animation elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Add animation classes to product cards dynamically
 * Called when products are rendered
 */
function addProductCardAnimations(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Add animation class to all product cards
    container.querySelectorAll('.pro').forEach(card => {
        // Remove existing animation class if any
        card.classList.remove('in-view');
        
        // Add scroll animation class
        card.classList.add('animate-on-scroll');
    });

    // Re-initialize observer for newly added cards
    initializeScrollAnimations();
}

/**
 * Add staggered animation to feature cards
 * Already handled by CSS, but can be enhanced with JS
 */
function enhanceFeatureCards() {
    const featureBoxes = document.querySelectorAll('#feature .fe-box');
    
    featureBoxes.forEach((box, index) => {
        // Add smooth visibility with staggered timing
        box.style.animation = `scaleInCenter 0.6s ease-out ${index * 0.05}s both`;
    });
}

/**
 * Add animation to product cards that appear after filtering/sorting
 * This ensures newly rendered products animate smoothly
 */
function animateProductsOnLoad() {
    // Observe for dynamic content changes
    const observer = new MutationObserver(() => {
        // Add animation to cards that don't have it yet
        document.querySelectorAll('.pro:not(.animate-on-scroll)').forEach(card => {
            card.classList.add('animate-on-scroll', 'in-view');
        });
    });

    // Observe product containers for changes
    const containers = [
        document.getElementById('featured-products'),
        document.getElementById('new-arrivals-container'),
        document.getElementById('recently-viewed-container')
    ];

    containers.forEach(container => {
        if (container) {
            observer.observe(container, {
                childList: true,
                subtree: true,
                attributes: false
            });
        }
    });
}

/**
 * Enhance navbar animations on scroll
 * Add subtle effects when page is scrolled
 */
function enhanceNavbarAnimations() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('header');

    if (!navbar) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add subtle shadow effect when scrolled
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.1)';
            navbar.style.transition = 'box-shadow 0.3s ease-out';
        } else {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.06)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
}

/**
 * Add smooth scroll behavior and animations to buttons
 */
function enhanceButtonAnimations() {
    const buttons = document.querySelectorAll('button, a[href*="shop"]');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Subtle scale effect
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });
}

/**
 * Create intersection observer for parallax-like effects
 * Subtle parallax on hero images and banners
 */
function initializeParallaxEffects() {
    const hero = document.getElementById('hero');
    
    if (!hero || !('IntersectionObserver' in window)) return;

    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply parallax effect based on scroll position
                const scrollPercent = (window.scrollY / entry.target.offsetHeight);
                entry.target.style.backgroundPosition = `top ${25 + scrollPercent * 5}% right 0`;
                entry.target.style.transition = 'background-position 0.1s linear';
            }
        });
    });

    parallaxObserver.observe(hero);
}

/**
 * Initialize all animations
 * Exported for use in other modules
 */
function initializeAllAnimations() {
    // Delay slightly to ensure DOM is fully loaded
    setTimeout(() => {
        initializeScrollAnimations();
        enhanceFeatureCards();
        animateProductsOnLoad();
        enhanceNavbarAnimations();
        enhanceButtonAnimations();
        initializeParallaxEffects();
    }, 100);
}

// Auto-initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllAnimations);
} else {
    initializeAllAnimations();
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeScrollAnimations,
        addProductCardAnimations,
        enhanceFeatureCards,
        animateProductsOnLoad,
        enhanceNavbarAnimations,
        enhanceButtonAnimations,
        initializeParallaxEffects,
        initializeAllAnimations
    };
}
