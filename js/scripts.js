// Header Scripts for SSTI Website
class SSTIHeader {
    constructor() {
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initScrollEffects();
    }

    // Menú móvil
    initMobileMenu() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Cerrar menú al hacer clic en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Cerrar menú al redimensionar la ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const isOpen = this.navMenu.classList.contains('mobile-open');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.navMenu.classList.add('mobile-open');
        this.mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('mobile-open');
        this.mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Efectos de scroll del header
    initScrollEffects() {
        // Efecto de header al hacer scroll
        let lastScrollTop = 0;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        });

        // Scroll suave para enlaces internos
        this.initSmoothScroll();
        
        // Efectos de animación para la hero section
        this.initHeroAnimations();
    }

    // Scroll suave para enlaces internos
    initSmoothScroll() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animaciones para la hero section
    initHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-features, .hero-actions, .hero-visual');
        
        // Función para verificar si un elemento está en el viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        // Función para animar elementos cuando entran en el viewport
        const animateOnScroll = () => {
            heroElements.forEach((element, index) => {
                if (isInViewport(element)) {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        };

        // Aplicar estilos iniciales para la animación
        heroElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });

        // Ejecutar animación al cargar la página
        setTimeout(animateOnScroll, 100);
        
        // Ejecutar animación al hacer scroll
        window.addEventListener('scroll', animateOnScroll);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.sstiHeader = new SSTIHeader();
});

// Exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SSTIHeader;
}
