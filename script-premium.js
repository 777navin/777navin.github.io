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

// ==================== DRIFT-IN SCROLL REVEAL ====================

function initDriftReveal() {
    const DRIFT_SELECTORS = '.toolbox-card, .cp-card, .project-card, .timeline-card, .about-v2__portrait-card, .section-title, .section-kicker';
    const targets = document.querySelectorAll(DRIFT_SELECTORS);
    if (!targets.length) return;

    // If reduced motion, immediately show all targets
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        targets.forEach(el => el.classList.add('in-view'));
        return;
    }

    // Assign stagger delays based on sibling index within parent
    targets.forEach(el => {
        const siblings = Array.from(el.parentElement.children).filter(
            child => child.matches(DRIFT_SELECTORS)
        );
        const index = siblings.indexOf(el);
        el.style.setProperty('--reveal-delay', `${index * 0.1}s`);
    });

    // Observe with IntersectionObserver
    const driftObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                driftObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(el => driftObserver.observe(el));
}

// ==================== MAGNETIC INTERACTIONS ====================

const MAGNETIC_RADIUS = 80;   // px — activation distance
const MAGNETIC_STRENGTH = 12; // px — max pull distance

function computeMagneticOffset(rect, mouseX, mouseY) {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
    if (distance > MAGNETIC_RADIUS) return { dx: 0, dy: 0 };
    const rawDx = (mouseX - centerX) * (MAGNETIC_STRENGTH / MAGNETIC_RADIUS);
    const rawDy = (mouseY - centerY) * (MAGNETIC_STRENGTH / MAGNETIC_RADIUS);
    const dx = Math.max(-MAGNETIC_STRENGTH, Math.min(MAGNETIC_STRENGTH, rawDx));
    const dy = Math.max(-MAGNETIC_STRENGTH, Math.min(MAGNETIC_STRENGTH, rawDy));
    return { dx, dy };
}

function initMagneticElements(selector) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    document.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const { dx, dy } = computeMagneticOffset(rect, e.clientX, e.clientY);
            if (dx === 0 && dy === 0) {
                el.style.transform = '';
            } else {
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            }
        });
    }, { passive: true });
}

// ==================== PARALLAX MESH BLOBS ====================

function initParallaxBlobs() {
    const BLOB_MULTIPLIERS = [0.02, 0.03, 0.015, 0.025];
    const blobs = document.querySelectorAll('.blob');
    if (!blobs.length) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobTicking = false;

    function updateBlobs() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const offsetX = mouseX - window.innerWidth / 2;
        const offsetY = mouseY - window.innerHeight / 2;

        blobs.forEach((blob, i) => {
            const multiplier = BLOB_MULTIPLIERS[i] || 0.02;
            blob.style.setProperty('--tx', `${-offsetX * multiplier}px`);
            blob.style.setProperty('--ty', `${(-offsetY + window.scrollY * 0.3) * multiplier}px`);
        });

        blobTicking = false;
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!blobTicking) {
            requestAnimationFrame(updateBlobs);
            blobTicking = true;
        }
    }, { passive: true });

    window.addEventListener('scroll', () => {
        if (!blobTicking) {
            requestAnimationFrame(updateBlobs);
            blobTicking = true;
        }
    }, { passive: true });
}

// ==================== INIT ON DOM READY ====================

document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    typeEffect();

    // Initialise parallax blob movement
    initParallaxBlobs();

    // Initialise magnetic interactions
    initMagneticElements('.nav-cta, .hero__profile-social-link');

    // Initialise drift-in scroll reveals
    initDriftReveal();
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
