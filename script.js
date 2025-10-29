// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '0';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.padding = '';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Keyboard accessibility for hamburger
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});



























 (function () {
    const total = 16;
    const images = Array.from({ length: total }, (_, i) => `sliding img ${i + 1}.jpg`);

    const slidesEl = document.querySelector('.slides');
    const dotsEl = document.getElementById('slider-dots');
    const prevBtn = document.querySelector('.slider .prev');
    const nextBtn = document.querySelector('.slider .next');
    const slider = document.querySelector('.slider');

    let index = 0, timer, lastDirection = 1;

    // Create all image elements
    images.forEach((src, i) => {
        if (i > 0) {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${i + 1}`;
            img.className = 'slider-image';
            slidesEl.appendChild(img);
        }
    });

    const imgElements = document.querySelectorAll('.slider-image');

    // Build dots
    images.forEach((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', `Go to slide ${i + 1}`);
        b.addEventListener('click', () => { 
            const dir = i > index ? 1 : -1;
            goTo(i, dir); 
            restart(); 
        });
        dotsEl.appendChild(b);
    });

    function goTo(n, direction) {
        const newIndex = (n + total) % total;

        // update dots
        [...dotsEl.children].forEach((d, i) => d.classList.toggle('active', i === newIndex));
        if (newIndex === index) return;

        const current = imgElements[index];
        const target = imgElements[newIndex];
        const dir = direction !== undefined ? direction : lastDirection;
        lastDirection = dir;

        // Clean all classes from target
        target.classList.remove('active','slide-out-left','slide-out-right','from-left','from-right');
        
        // Set entry position based on direction
        if (dir === 1) {
            // Next: slide from right to left
            target.classList.add('from-right');
        } else {
            // Prev: slide from left to right
            target.classList.add('from-left');
        }

        // Force reflow
        target.offsetWidth;

        // Animate current out and target in
        current.classList.remove('active');
        current.classList.add(dir === 1 ? 'slide-out-left' : 'slide-out-right');
        
        target.classList.add('active');
        target.classList.remove('from-left','from-right');

        // Cleanup after animation
        setTimeout(() => {
            current.classList.remove('slide-out-left','slide-out-right');
        }, 600);

        index = newIndex;
    }

    function next() { goTo((index + 1) % total, 1); }
    function prev() { goTo((index - 1 + total) % total, -1); }

    function start() { stop(); timer = setInterval(next, 4000); }
    function stop() { if (timer) clearInterval(timer); }
    function restart() { start(); }

    // Controls
    nextBtn.addEventListener('click', () => { next(); restart(); });
    prevBtn.addEventListener('click', () => { prev(); restart(); });

    // Pause on hover
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);

    // Keyboard support
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { next(); restart(); }
        if (e.key === 'ArrowLeft') { prev(); restart(); }
    });
    slider.setAttribute('tabindex', '0');

    // Init
    goTo(0, 1);
    start();
})();

























        

     (() => {
        const section = document.getElementById('brand-showcase');
        const brand = section.querySelector('.brand');
        const mediaReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

        const io = new IntersectionObserver(([entry]) => {
        section.classList.toggle('is-visible', entry.isIntersecting);
        }, { threshold: 0.25 });
        io.observe(section);

        if (!mediaReduce.matches) {
        // Energy waves
        for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'energy-wave';
        wave.style.animationDelay = `${i * 2.5}s`;
        section.appendChild(wave);
        }

        // Magnetic field effect on mouse move
        section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        brand.style.setProperty('--mx', `${x}%`);
        brand.style.setProperty('--my', `${y}%`);
        });

        // Floating orbs - dark theme colors
        const palette = ['#9966ff', '#8844dd', '#7733cc', '#6622bb'];
        for (let i = 0; i < 4; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.style.left = `${10 + i * 25}%`;
        orb.style.top = `${20 + (i % 2) * 40}%`;
        orb.style.setProperty('--c', palette[i]);
        orb.style.setProperty('--t', `${12 + i * 3}s`);
        orb.style.setProperty('--size', `${60 + i * 20}px`);
        orb.style.setProperty('--dx', `${(i % 2 ? 1 : -1) * (30 + i * 10)}px`);
        orb.style.setProperty('--dy', `${(i % 2 ? -1 : 1) * (40 + i * 10)}px`);
        orb.style.setProperty('--dx2', `${(i % 2 ? -1 : 1) * (20 + i * 10)}px`);
        orb.style.setProperty('--dy2', `${(i % 2 ? 1 : -1) * (30 + i * 10)}px`);
        orb.style.animationDelay = `${-i * 3}s`;
        section.appendChild(orb);
        }
        }
        })();


























   // Word Rotator Animation
    (function() {
        const words = ['websites', 'assistants', 'portfolios', 'resumes', 'photos', 'videos'];
        const rotator = document.getElementById('word-rotator');
        let currentIndex = 0;
        
        if (rotator) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % words.length;
                rotator.style.opacity = '0';
                
                setTimeout(() => {
                    rotator.textContent = words[currentIndex];
                    rotator.style.opacity = '1';
                }, 300);
            }, 3000);
        }
    })();

    // Badge Item Light Effect on Mouse Move
    document.querySelectorAll('.badge-item').forEach(badge => {
        badge.addEventListener('mousemove', (e) => {
            const rect = badge.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            badge.style.setProperty('--mouse-x', `${x}px`);
            badge.style.setProperty('--mouse-y', `${y}px`);
        });
    });
































                function showServiceDetails(category) {
        const modal = document.getElementById('serviceDetailModal');
        const serviceData = {
            websites: {
                emoji: '🌈',
                title: 'AI Websites',
                description: 'We build fast, beautiful, and accessible websites using modern web technologies. Our sites are optimized for performance, SEO, and user experience. From landing pages to full web applications, we deliver clean code that scales.',
                badges: ['HTML', 'CSS', 'JS', 'SEO', 'React', 'Performance']
            },
            assistants: {
                emoji: '🤝',
                title: 'Smart Assistants',
                description: 'Custom AI assistants that automate customer support, sales conversations, and internal workflows. Powered by advanced NLP, our chatbots understand context and deliver human-like interactions that drive results.',
                badges: ['NLP', 'Chat', 'APIs', 'Automation', 'Machine Learning']
            },
            portfolio: {
                emoji: '⭐',
                title: 'Brand & Portfolio',
                description: 'Stand out with a compelling personal brand and portfolio. We create stunning websites that showcase your work, tell your story, and attract opportunities. Perfect for creatives, freelancers, and professionals.',
                badges: ['Design', 'UX', 'Story', 'Branding', 'Visual Identity']
            },
            resume: {
                emoji: '📈',
                title: 'Resume Services',
                description: 'Land more interviews with ATS-optimized resumes that get noticed. Our expert writers craft compelling narratives that highlight your achievements and pass through applicant tracking systems.',
                badges: ['ATS', 'Format', 'Content', 'Career Consulting', 'LinkedIn']
            },
            photos: {
                emoji: '🖼️',
                title: 'Photo Services',
                description: 'Professional photo editing, retouching, and enhancement services. From product photography to portraits, we make your images shine with color correction, background removal, and artistic effects.',
                badges: ['Retouch', 'Edit', 'Enhance', 'Color Grading', 'Compositing']
            },
            videos: {
                emoji: '🎬',
                title: 'Video Production',
                description: 'Create engaging videos that captivate your audience. From promotional content to educational videos, we handle editing, motion graphics, color grading, and sound design to deliver professional results.',
                badges: ['Edit', 'Effects', 'Story', 'Motion Graphics', 'Sound Design']
            }
        };
        
        const data = serviceData[category];
        document.getElementById('serviceDetailEmoji').textContent = data.emoji;
        document.getElementById('serviceDetailHeading').textContent = data.title;
        document.getElementById('serviceDetailInfo').textContent = data.description;
        
        const badgesContainer = document.getElementById('serviceDetailBadges');
        badgesContainer.innerHTML = data.badges.map(badge => 
            `<span class="service-badge">${badge}</span>`
        ).join('');
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideServiceDetails() {
        const modal = document.getElementById('serviceDetailModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close modal on background click
    document.getElementById('serviceDetailModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideServiceDetails();
        }
    });






























         (function () {
            const section = document.querySelector('#customer-feedback');
            if (!section) return;

            const track = section.querySelector('.feedback-track');
            const slides = Array.from(section.querySelectorAll('.feedback-slide'));
            const prevBtn = section.querySelector('.feedback-prev');
            const nextBtn = section.querySelector('.feedback-next');
            const dotsWrap = section.querySelector('.feedback-dots');

            let current = 0;
            let timerId = null;

            function buildDots() {
                dotsWrap.innerHTML = '';
                slides.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = 'feedback-dot' + (i === 0 ? ' active' : '');
                    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                    dot.addEventListener('click', () => goTo(i, true));
                    dotsWrap.appendChild(dot);
                });
            }

            function update() {
                track.style.transform = 'translateX(-' + (current * 100) + '%)';
                const dots = dotsWrap.querySelectorAll('.feedback-dot');
                dots.forEach((d, i) => d.classList.toggle('active', i === current));
            }

            function goTo(index, user = false) {
                const len = slides.length;
                current = (index + len) % len;
                update();
                if (user) restartAuto();
            }

            function next() { goTo(current + 1); }
            function prev() { goTo(current - 1); }

            function startAuto() {
                stopAuto();
                timerId = setInterval(next, 5000);
            }
            function stopAuto() {
                if (timerId) clearInterval(timerId);
                timerId = null;
            }
            function restartAuto() {
                stopAuto();
                startAuto();
            }

            prevBtn.addEventListener('click', () => { prev(); restartAuto(); });
            nextBtn.addEventListener('click', () => { next(); restartAuto(); });

            section.addEventListener('mouseenter', stopAuto);
            section.addEventListener('mouseleave', startAuto);

            section.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') { next(); restartAuto(); }
                if (e.key === 'ArrowLeft')  { prev(); restartAuto(); }
            });

            buildDots();
            update();
            startAuto();
        })();


































 document.addEventListener('DOMContentLoaded', function() {
                const faqItems = document.querySelectorAll('.faq-item');

                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-question');
                    
                    question.addEventListener('click', () => {
                        const isActive = item.classList.contains('active');
                        
                        // Close all FAQ items
                        faqItems.forEach(faq => {
                            faq.classList.remove('active');
                            faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                        });

                        // Open clicked item if it wasn't active
                        if (!isActive) {
                            item.classList.add('active');
                            question.setAttribute('aria-expanded', 'true');
                        }
                    });
                });
            });






























             // JavaScript for form handling
            document.getElementById('contactForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.submit-btn');
                const formStatus = document.getElementById('formStatus');
                const formData = new FormData(this);
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span>';
                formStatus.style.display = 'none';
                
                try {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        formStatus.className = 'form-status success';
                        formStatus.textContent = '✅ Thank you! Your message has been sent successfully.';
                        this.reset();
                    } else {
                        throw new Error('Submission failed');
                    }
                } catch (error) {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = '❌ Oops! Something went wrong. Please try again or email us directly at rs4848361@gmail.com';
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message</span><i aria-hidden="true">🚀</i>';
                }
            });




























             (function () {
                const yearEl = document.getElementById('footer-year');
                if (yearEl) yearEl.textContent = String(new Date().getFullYear());

                const form = document.getElementById('footer-subscribe');
                const email = document.getElementById('footer-email');
                const msg = document.getElementById('subscribe-msg');

                function validateEmail(v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                }

                if (form && email && msg) {
                    form.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        msg.textContent = '';
                        const honey = form.querySelector('.hp-field');
                        if (honey && honey.value) return; // bot trap

                        const value = email.value.trim();
                        if (!validateEmail(value)) {
                            msg.textContent = 'Please enter a valid email.';
                            msg.style.color = '#ff9aa2';
                            email.focus();
                            return;
                        }

                        try {
                            // Demo only: simulate a network request
                            await new Promise(r => setTimeout(r, 700));
                            msg.textContent = 'Thanks! Please check your inbox to confirm.';
                            msg.style.color = '#9ae6b4';
                            form.reset();
                        } catch {
                            msg.textContent = 'Something went wrong. Please try again.';
                            msg.style.color = '#ff9aa2';
                        }
                    });
                }

                const toTop = document.getElementById('to-top');
                const toggleToTop = () => {
                    if (!toTop) return;
                    if (window.scrollY > 600) {
                        toTop.classList.add('show');
                    } else {
                        toTop.classList.remove('show');
                    }
                };
                window.addEventListener('scroll', toggleToTop, { passive: true });
                toggleToTop();

                if (toTop) {
                    toTop.addEventListener('click', () => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                }
            })();

































           // Animated counter for metrics section
        function animateMetrics() {
            const metricValues = document.querySelectorAll('.metric-value');
            
            const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                    entry.target.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                    } else {
                    entry.target.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
                }
            });
            }, { threshold: 0.5 });
            
            metricValues.forEach(metric => observer.observe(metric));
        }
        
        // Initialize on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', animateMetrics);
        } else {
            animateMetrics();
        }




























             // Update copyright year automatically
        document.addEventListener('DOMContentLoaded', function() {
            const yearSpan = document.getElementById('footer-copyright-year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }

            // Newsletter form submission
            const newsletterForm = document.getElementById('footer-newsletter-form');
            const newsletterMsg = document.getElementById('footer-newsletter-msg');
            
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const emailInput = document.getElementById('footer-newsletter-email');
                    const honeypot = newsletterForm.querySelector('.footer-honeypot');
                    
                    // Check honeypot (bot protection)
                    if (honeypot && honeypot.value !== '') {
                        return;
                    }
                    
                    // Validate email
                    if (!emailInput.validity.valid) {
                        newsletterMsg.textContent = 'Please enter a valid email address.';
                        newsletterMsg.style.color = '#ff6b6b';
                        return;
                    }
                    
                    // Simulate API call (replace with actual endpoint)
                    newsletterMsg.textContent = 'Subscribing...';
                    newsletterMsg.style.color = '#666';
                    
                    setTimeout(() => {
                        newsletterMsg.textContent = '✓ Thanks for subscribing!';
                        newsletterMsg.style.color = '#4CAF50';
                        emailInput.value = '';
                    }, 1000);
                });
            }

            // Back to top button
            const backToTopBtn = document.getElementById('back-to-top-btn');
            
            if (backToTopBtn) {
                // Show/hide based on scroll position
                window.addEventListener('scroll', function() {
                    if (window.pageYOffset > 300) {
                        backToTopBtn.classList.add('visible');
                    } else {
                        backToTopBtn.classList.remove('visible');
                    }
                });
                
                // Smooth scroll to top
                backToTopBtn.addEventListener('click', function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        });