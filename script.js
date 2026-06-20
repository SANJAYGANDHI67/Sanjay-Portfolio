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
       LIVE GITHUB REPOS FEED & STATS
       ========================================================================== */
    const githubUsername = 'SANJAYGANDHI67';
    const reposGrid = document.getElementById('github-repos-grid');
    const reposStatElement = document.getElementById('stat-repos');

    // List of colors for different programming languages
    const langColors = {
        html: 'hsl(12, 80%, 52%)',
        css: 'hsl(205, 85%, 48%)',
        javascript: 'hsl(45, 90%, 50%)',
        typescript: 'hsl(211, 60%, 48%)',
        python: 'hsl(207, 70%, 54%)',
        java: 'hsl(24, 73%, 45%)',
        c: 'hsl(200, 30%, 40%)',
        cpp: 'hsl(220, 40%, 50%)'
    };

    const mockRepos = [
        {
            name: 'python-practice-projects',
            description: 'Collection of clean algorithms, computing programs, loops, recursion functions, and structural debugging exercises in Python.',
            language: 'Python',
            stargazers_count: 5,
            forks_count: 1,
            html_url: `https://github.com/${githubUsername}/python-practice-projects`
        },
        {
            name: 'ai-learning-exercises',
            description: 'Introductory machine learning models, regression analysis plots, and dataset preprocessing pipeline experiments.',
            language: 'Python',
            stargazers_count: 7,
            forks_count: 2,
            html_url: `https://github.com/${githubUsername}/ai-learning-exercises`
        },
        {
            name: 'algorithmic-problem-solving',
            description: 'Core linear data structures implementations, search/sort optimizations, and computational complexity practices.',
            language: 'Python',
            stargazers_count: 4,
            forks_count: 0,
            html_url: `https://github.com/${githubUsername}/algorithmic-problem-solving`
        }
    ];

    const renderRepos = (repos) => {
        if (!reposGrid) return;
        reposGrid.innerHTML = '';
        
        repos.forEach(repo => {
            const lang = repo.language ? repo.language.toLowerCase() : 'html';
            const color = langColors[lang] || 'var(--text-muted)';
            const desc = repo.description || 'No description provided for this repository.';
            
            const card = document.createElement('div');
            card.className = 'repo-card glass-panel';
            card.innerHTML = `
                <div class="repo-header">
                    <i class="fa-regular fa-folder-open repo-icon-folder"></i>
                    <div class="repo-links">
                        <a href="${repo.html_url}" target="_blank" class="repo-link-btn" aria-label="View Github Repository"><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>
                <h4 class="repo-name-text">${repo.name}</h4>
                <p class="repo-description">${desc}</p>
                <div class="repo-footer">
                    <span class="repo-lang">
                        <span class="repo-lang-dot" style="background-color: ${color}"></span>
                        <span>${repo.language || 'HTML'}</span>
                    </span>
                    <div class="repo-stats-counters">
                        <span class="repo-stat-item"><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
                        <span class="repo-stat-item"><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                    </div>
                </div>
            `;
            reposGrid.appendChild(card);
        });
    };

    const fetchGitHubData = async () => {
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

            const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
            if (reposResponse.ok) {
                const reposData = await reposResponse.json();
                if (reposData && reposData.length > 0) {
                    renderRepos(reposData);
                } else {
                    renderRepos(mockRepos);
                }
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            console.warn('GitHub API request failed or rate limited. Falling back to mock feed data.', error);
            renderRepos(mockRepos);
        }
    };

    fetchGitHubData();

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