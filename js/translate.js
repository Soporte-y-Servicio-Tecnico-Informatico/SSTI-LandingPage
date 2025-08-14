// Multi-language Translation System
class LanguageTranslator {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'es';
        this.languageToggle = document.getElementById('languageToggle');
        this.langText = document.querySelector('.lang-text');
        this.translatableElements = [];
        this.init();
    }

    init() {
        // Aplicar idioma guardado al cargar la página
        this.applyLanguage(this.currentLanguage);
        
        // Agregar event listener al botón de idioma
        this.languageToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Encontrar todos los elementos traducibles
        this.findTranslatableElements();
    }

    findTranslatableElements() {
        // Buscar elementos con atributos data-es y data-en
        const elementsWithData = document.querySelectorAll('[data-es][data-en]');
        
        elementsWithData.forEach(element => {
            this.translatableElements.push({
                element: element,
                originalText: element.textContent
            });
        });
    }

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
        this.applyLanguage(newLanguage);
        this.currentLanguage = newLanguage;
        localStorage.setItem('language', newLanguage);
    }

    applyLanguage(language) {
        // Actualizar el texto del botón de idioma
        this.updateLanguageButton(language);
        
        // Traducir todos los elementos
        this.translateElements(language);
        
        // Actualizar el atributo lang del HTML
        document.documentElement.lang = language;
        
        // Actualizar el título de la página
        this.updatePageTitle(language);
    }

    updateLanguageButton(language) {
        if (this.langText) {
            this.langText.textContent = language.toUpperCase();
        }
    }

    translateElements(language) {
        this.translatableElements.forEach(item => {
            const element = item.element;
            const translation = element.getAttribute(`data-${language}`);
            
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    updatePageTitle(language) {
        const titles = {
            es: 'SSTI - Soporte y Servicio Técnico Informático',
            en: 'SSTI - IT Technical Support and Service'
        };
        
        document.title = titles[language] || titles.es;
    }

    // Método público para obtener el idioma actual
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Método público para establecer un idioma específico
    setLanguage(language) {
        if (language === 'es' || language === 'en') {
            this.applyLanguage(language);
            this.currentLanguage = language;
            localStorage.setItem('language', language);
        }
    }

    // Método para traducir texto dinámicamente
    translateText(text, language) {
        const translations = {
            es: {
                'Welcome': 'Bienvenido',
                'About': 'Nosotros',
                'Services': 'Servicios',
                'Contact': 'Contacto',
                'Home': 'Inicio',
                'Blog': 'Blog',
                'Store': 'Tienda'
            },
            en: {
                'Bienvenido': 'Welcome',
                'Nosotros': 'About',
                'Servicios': 'Services',
                'Contacto': 'Contact',
                'Inicio': 'Home',
                'Blog': 'Blog',
                'Tienda': 'Store'
            }
        };

        return translations[language]?.[text] || text;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.languageTranslator = new LanguageTranslator();
});

// Exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageTranslator;
}
