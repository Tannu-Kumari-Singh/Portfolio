document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 50;

        revealElements.forEach((el) => {
            const revealTop = el.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger animations after a slight delay for initial load
    setTimeout(revealOnScroll, 100);

    // Navbar styling on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Lightbox Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    const galleryImages = document.querySelectorAll('.app-mockup, #hero-image-container img');

    if(modal && modalImage && closeBtn) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.classList.add('show');
                modalImage.src = this.src;
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
});
