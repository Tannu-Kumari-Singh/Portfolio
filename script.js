document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 60;

        revealElements.forEach((el) => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    setTimeout(revealOnScroll, 100);

    // 2. Navbar Styling & Active Link Highlighting on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('header, section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const handleScrollNav = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking
        let currentSectionId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScrollNav);
    handleScrollNav();

    // 3. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksList = document.getElementById('navLinks');

    if (mobileToggle && navLinksList) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinksList.classList.toggle('mobile-open');
            mobileToggle.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close mobile nav when clicking a link
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('mobile-open');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // 4. Lightbox Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.getElementById('closeModal');
    const triggers = document.querySelectorAll('.cert-trigger, #hero-image-container img');

    const openModal = (src, captionText) => {
        if (modal && modalImage) {
            modalImage.src = src;
            if (modalCaption) {
                modalCaption.textContent = captionText || '';
            }
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', function () {
            let img = this;
            if (this.tagName.toLowerCase() !== 'img') {
                img = this.querySelector('img');
            }
            if (img) {
                const title = this.getAttribute('data-title') || img.alt || 'Preview';
                openModal(img.src, title);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    // 5. Toast Notification System
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout;

    const showToast = (message) => {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    // 6. Copy Email Button
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email') || 'tanvisinha54321@gmail.com';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email)
                    .then(() => showToast('Email copied to clipboard!'))
                    .catch(() => fallbackCopy(email));
            } else {
                fallbackCopy(email);
            }
        });
    }

    const fallbackCopy = (text) => {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            showToast('Email copied to clipboard!');
        } catch (err) {
            showToast('Failed to copy. Email: ' + text);
        }
        document.body.removeChild(tempInput);
    };

    // 7. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('senderName')?.value || '';
            const email = document.getElementById('senderEmail')?.value || '';
            const subject = document.getElementById('senderSubject')?.value || 'HR Inquiry';
            const message = document.getElementById('senderMessage')?.value || '';

            // Construct mailto link
            const mailtoUrl = `mailto:tanvisinha54321@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Tannu,\n\nMy name is ${name} (${email}).\n\n${message}`)}`;
            
            showToast('Opening your email client...');
            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 600);

            contactForm.reset();
        });
    }
});
