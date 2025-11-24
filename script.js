
document.addEventListener('DOMContentLoaded', function () {

    const header = document.getElementById('header');
    const homeSection = document.getElementById('home');
    let lastScrollTop = 0;

    // --- Header Scroll Behavior ---
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Removed header hiding/showing logic
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

        if (window.scrollY > homeSection.offsetTop + homeSection.offsetHeight - header.offsetHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Link Highlighting (Main and Side Nav) ---
    const sections = document.querySelectorAll('section');
    const mainNavLinks = document.querySelectorAll('.nav-center a');
    const sideNavLinks = document.querySelectorAll('.side-nav a');

    function updateActiveLinks() {
        let currentSectionId = '';
        const headerOffset = 100; // px offset to trigger the change a bit sooner

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - headerOffset) {
                currentSectionId = section.getAttribute('id');
            }
        });

        const updateLinks = (links, attribute) => {
            links.forEach(link => {
                link.classList.remove('active');
                const sectionId = attribute === 'href' ? link.getAttribute(attribute).substring(1) : link.dataset.section;
                if (sectionId === currentSectionId) {
                    link.classList.add('active');
                }
            });
        };

        updateLinks(mainNavLinks, 'href');
        updateLinks(sideNavLinks, 'dataset');
    }

    // --- Heading Animation on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } 
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight; // Get dynamic header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Initial Calls ---
    updateActiveLinks();
    window.addEventListener('scroll', updateActiveLinks);

    // --- Home Section Animation ---
    window.addEventListener('load', () => {
        document.querySelector('#home h1').classList.add('visible');
        document.querySelector('#home p').classList.add('visible');

        setTimeout(() => {
            document.querySelector('.hero-background').classList.add('hover-enabled');
        }, 1000); // 1s delay to match the animation
    });
});
