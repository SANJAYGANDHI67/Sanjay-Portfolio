/**
 * DEVELOPER PORTFOLIO - SCRIPT FILE
 * Name: Sanjay Gandhi A
 * Logic: Theme toggle, navbar sticky & highlight, mobile menu, stats counters, contact form, lightbox modal, typewriter, github feed
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       THEME TOGGLE SYSTEM
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('portfolio-theme', 'light');
            showToast('Light mode enabled', 'success');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('portfolio-theme', 'dark');
            showToast('Dark mode enabled', 'success');
        }
    });

    /* ==========================================================================
       STICKY HEADER & NAV STATE HIGHLIGHTS
       ========================================================================== */
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        // Sticky Header Add/Remove Scrolled State
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active Nav State Highlights based on viewport scroll position
        let currentSectionId = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 150;
            const sectionHeight = sec.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       MOBILE MENU DRAWER
       ========================================================================== */
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileToggleIcon = mobileToggleBtn.querySelector('i');
    
    mobileToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            mobileToggleIcon.className = 'fa-solid fa-xmark';
        } else {
            mobileToggleIcon.className = 'fa-solid fa-bars-staggered';
        }
    });
    
    // Close mobile menu on nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggleIcon.className = 'fa-solid fa-bars-staggered';
        });
    });

    /* ==========================================================================
       SCROLL REVEAL EFFECT
       ========================================================================== */
    const scrollRevealItems = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollRevealItems.forEach(item => {
        revealObserver.observe(item);
    });

    /* ==========================================================================
       SKILLS PROGRESS BAR FILL ANIMATION
       ========================================================================== */
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.skill-progress-bar .progress');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.8, 0.25, 1)';
                        bar.style.width = targetWidth;
                    }, 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    /* ==========================================================================
       STATISTICS COUNTER UP ANIMATION
       ========================================================================== */
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-numbers');
    
    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            let current = 0;
            const duration = 2000; // 2 seconds total animation time
            const stepTime = Math.max(Math.floor(duration / target), 15);
            
            const timer = setInterval(() => {
                current += 1;
                stat.textContent = current;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.4
    });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       CONTACT FORM HANDLER
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('btn-submit-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner animate-spin"></i>`;
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                
                showToast('Message sent successfully! I will reply shortly.', 'success');
            }, 1800);
        });
    }

    /* ==========================================================================
       TOAST FEEDBACK HELPER
       ========================================================================== */
    const toast = document.getElementById('form-toast');
    
    const showToast = (message, type = 'success') => {
        if (!toast) return;
        toast.textContent = message;
        toast.className = `toast show toast-${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    /* ==========================================================================
    /* ==========================================================================
       GITHUB REPOSITORY COUNTER UPDATE
       ========================================================================== */
    const githubUsername = 'SANJAYGANDHI67';
    const reposStatElement = document.getElementById('stat-repos');

    const updateRepoStatCounter = async () => {
        try {
            const profileResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
            if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                if (reposStatElement) {
                    reposStatElement.setAttribute('data-target', profileData.public_repos);
                    if (reposStatElement.textContent !== '0') {
                        reposStatElement.textContent = profileData.public_repos;
                    }
                }
            }
        } catch (error) {
            console.warn('Could not fetch live GitHub profile stats. Using default stat target.', error);
        }
    };

    updateRepoStatCounter();

    /* ==========================================================================
       SCROLL PROGRESS TOP INDICATOR
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = `${scrolled}%`;
        }
    });

    /* ==========================================================================
       TYPEWRITER SUBTITLE ANIMATION
       ========================================================================== */
    const typingSpan = document.getElementById('typing-text');
    const words = ["AI Systems", "UI/UX Interfaces", "Intelligent Apps", "Responsive UIs"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 120;

    const handleTypewriter = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
            typeDelay = 60;
        } else {
            charIndex++;
            typeDelay = 120;
        }

        if (typingSpan) {
            typingSpan.textContent = currentWord.substring(0, charIndex);
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeDelay = 1800;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 300;
        }

        setTimeout(handleTypewriter, typeDelay);
    };

    setTimeout(handleTypewriter, 1000);

    /* ==========================================================================
       CERTIFICATES LIGHTBOX MODAL
       ========================================================================== */
    const certCards = document.querySelectorAll('.cert-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = lightbox.querySelector('.lightbox-backdrop');
    
    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetSrc = card.getAttribute('data-cert-src');
            const targetAlt = card.querySelector('.cert-img-thumb').getAttribute('alt');
            
            lightboxImg.setAttribute('src', targetSrc);
            lightboxImg.setAttribute('alt', targetAlt);
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            lightboxImg.setAttribute('src', '');
        }, 300);
    };
    
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
});

// Extra spin styling animation helper for font-awesome spinner
const styleHelper = document.createElement('style');
styleHelper.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .animate-spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(styleHelper);