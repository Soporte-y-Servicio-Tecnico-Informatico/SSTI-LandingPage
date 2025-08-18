// Multi-language Translation System
class LanguageTranslator {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'es';
        this.languageToggle = document.getElementById('languageToggle');
        this.langText = document.querySelector('.lang-text');
        this.translatableByKey = [];
        this.translatableByData = [];
        this.translations = {
            es: {
                'header.company.title1': 'Soporte y Servicio',
                'header.company.title2': 'Técnico Informático',
                'nav.home': 'Inicio',
                'nav.about': 'Nosotros',
                'nav.services': 'Servicios',
                'nav.blog': 'Blog',
                'nav.store': 'Tienda',
                'nav.contact': 'Contacto',
                'hero.title.main': 'Soporte Técnico',
                'hero.title.sub': 'Profesional',
                'hero.description': 'Soluciones integrales de tecnología para empresas y hogares. Reparación, mantenimiento y soporte técnico especializado con más de 10 años de experiencia en el sector.',
                'hero.feature.guarantee': 'Garantía 100%',
                'hero.feature.response': 'Respuesta 24/7',
                'hero.feature.onsite': 'Servicio a Domicilio',
                'hero.cta.support': 'Solicitar Soporte',
                'hero.cta.services': 'Ver Servicios',
                'hero.stats.clients': 'Clientes Satisfechos',
                'hero.stats.years': 'Años de Experiencia',
                'hero.stats.support': 'Soporte Disponible',
                'hero.scroll': 'Desliza para explorar',
                'page.title': 'SSTI - Soporte y Servicio Técnico Informático'
            },
            en: {
                'header.company.title1': 'Support & Service',
                'header.company.title2': 'IT Technician',
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.services': 'Services',
                'nav.blog': 'Blog',
                'nav.store': 'Store',
                'nav.contact': 'Contact',
                'hero.title.main': 'IT Support',
                'hero.title.sub': 'Professional',
                'hero.description': 'Comprehensive technology solutions for homes and businesses. Repair, maintenance, and specialized IT support with over 10 years of experience.',
                'hero.feature.guarantee': '100% Guarantee',
                'hero.feature.response': '24/7 Response',
                'hero.feature.onsite': 'On-site Service',
                'hero.cta.support': 'Request Support',
                'hero.cta.services': 'View Services',
                'hero.stats.clients': 'Satisfied Clients',
                'hero.stats.years': 'Years of Experience',
                'hero.stats.support': 'Support Available',
                'hero.scroll': 'Scroll to explore',
                'page.title': 'SSTI - IT Technical Support and Service'
            }
        };
        this.init();
    }

    init() {
        // Encontrar elementos traducibles primero
        this.findTranslatableElements();

        // Aplicar idioma guardado al cargar la página
        this.applyLanguage(this.currentLanguage);
        
        // Agregar event listener al botón de idioma
        if (this.languageToggle) {
            this.languageToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }

    findTranslatableElements() {
        // data-i18n (preferido)
        const byKey = document.querySelectorAll('[data-i18n]');
        this.translatableByKey = Array.from(byKey);

        // Compatibilidad: elementos con data-es y data-en
        const byData = document.querySelectorAll('[data-es][data-en]');
        this.translatableByData = Array.from(byData);
    }

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
        this.applyLanguage(newLanguage);
        this.currentLanguage = newLanguage;
        localStorage.setItem('language', newLanguage);
    }

    applyLanguage(language) {
        // Botón
        this.updateLanguageButton(language);

        // data-i18n
        this.translateByKey(language);

        // compatibilidad data-es/data-en
        this.translateByDataAttributes(language);
        
        // lang del documento
        document.documentElement.lang = language;
        
        // Título de la página
        this.updatePageTitle(language);
    }

    updateLanguageButton(language) {
        if (this.langText) {
            this.langText.textContent = language.toUpperCase();
        }
    }

    translateByKey(language) {
        const dict = this.translations[language] || {};
        this.translatableByKey.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = dict[key];
            if (typeof text === 'string') {
                element.textContent = text;
            }
        });
    }

    translateByDataAttributes(language) {
        this.translatableByData.forEach(element => {
            const translation = element.getAttribute(`data-${language}`);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    updatePageTitle(language) {
        const dict = this.translations[language] || {};
        document.title = dict['page.title'] || 'SSTI';
    }

    // API pública
    getCurrentLanguage() { return this.currentLanguage; }
    setLanguage(language) {
        if (language === 'es' || language === 'en') {
            this.applyLanguage(language);
            this.currentLanguage = language;
            localStorage.setItem('language', language);
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.languageTranslator = new LanguageTranslator();
});

// Export CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageTranslator;
}
