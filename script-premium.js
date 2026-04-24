/* ================================================================
   PREMIUM PORTFOLIO - JAVASCRIPT (Optimized)
   Lightweight interactions — no heavy cursor/ring animations
   ================================================================ */

// ==================== TYPING ANIMATION ====================

const typingTexts = [
    "Full Stack Developer",
    "AI & ML Specialist",
    "Competitive Programmer",
    "Problem Solver"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 80;
const deleteSpeed = 40;
const pauseTime = 2000;

function typeEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const currentText = typingTexts[textIndex];

    if (!isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
            return;
        }
    } else {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(typeEffect, 500);
            return;
        }
    }

    setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed);
}

// ==================== NAVBAR SCROLL EFFECT ====================

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

let lastScrollY = 0;
let ticking = false;

function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll(lastScrollY);
            ticking = false;
        });
        ticking = true;
    }
}

function handleScroll(scrollY) {
    // Navbar background
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    updateActiveNavLink(scrollY);
}

function updateActiveNavLink(scrollY) {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = '#ff5722';
        }
    });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ==================== SMOOTH SCROLL ====================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu after clicking a link
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu) navMenu.classList.remove('open');
        if (navToggle) navToggle.classList.remove('active');
    });
});

// ==================== MOBILE NAV TOGGLE ====================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });
}

// CTA smooth scroll
const navCta = document.querySelector('.nav-cta');
if (navCta) {
    navCta.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = navCta.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ==================== INTERSECTION OBSERVER ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ==================== INIT ON DOM READY ====================

document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    typeEffect();

    // Observe elements for scroll-reveal
    const elementsToObserve = document.querySelectorAll(
        '.skill-group, .stat-card, .platform-card, .repo-card, .project-card, .achievement-item, .contact-card, .timeline-card, .responsibility-card'
    );

    elementsToObserve.forEach(el => {
        if (el.classList.contains('timeline-card')) {
            el.classList.add('scroll-reveal');
            const timelineIndex = Array.from(el.parentElement.children).indexOf(el);
            el.style.setProperty('--reveal-delay', `${timelineIndex * 0.12}s`);
        }
        observer.observe(el);
    });
});

// ==================== PAGE LOAD ====================
// Hero animations are handled by CSS keyframes (heroFadeUp / heroImgIn)
// No JS-driven hero animation needed

// ==================== KEYBOARD NAVIGATION ====================

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
});

// ==================== ACCESSIBILITY ====================

const interactiveElements = document.querySelectorAll('a, button');

interactiveElements.forEach(element => {
    element.addEventListener('focus', function () {
        this.style.outline = '2px solid #ff5722';
        this.style.outlineOffset = '2px';
    });
    element.addEventListener('blur', function () {
        this.style.outline = 'none';
    });
});

// ==================== SCROLL TO TOP ====================

document.querySelector('.logo-avatar')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== LUCIDE ICONS ====================

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

console.log('Portfolio loaded ✨');
