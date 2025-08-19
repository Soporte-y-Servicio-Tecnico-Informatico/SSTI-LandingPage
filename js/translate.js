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
                'page.title': 'SSTI - Soporte y Servicio Técnico Informático',
                'services.title': 'Servicios Principales',
                'services.subtitle': 'Soluciones tecnológicas diseñadas para impulsar tu negocio con soporte experto y resultados medibles.',
                'services.card.support.title': 'Soporte Técnico Integral',
                'services.card.support.desc': 'Atención rápida y experta para resolver incidencias de hardware, software y redes, en sitio y de forma remota.',
                'services.card.maintenance.title': 'Mantenimiento Preventivo y Correctivo',
                'services.card.maintenance.desc': 'Optimización, limpieza y reparación de equipos para maximizar el rendimiento y evitar paradas no planificadas.',
                'services.card.networking.title': 'Redes e Infraestructura',
                'services.card.networking.desc': 'Diseño, instalación y mejora de redes cableadas e inalámbricas con alta disponibilidad y seguridad.',
                'services.card.cyber.title': 'Ciberseguridad y Protección de Datos',
                'services.card.cyber.desc': 'Antivirus, firewalls, hardening y políticas de respaldo para proteger su información crítica.',
                'services.card.cloud.title': 'Cloud y Virtualización',
                'services.card.cloud.desc': 'Migración a la nube, Microsoft 365, virtualización y modernización de infraestructura para escalar con eficiencia.',
                'services.card.backup.title': 'Servidores, Backup y Continuidad',
                'services.card.backup.desc': 'Implementación y monitoreo de servidores, copias de seguridad y planes de recuperación ante desastres.',
                'services.cta.primary': 'Solicitar Cotización',
                'services.cta.secondary': 'Agendar Diagnóstico',
                'services.group.support.title': 'Soporte técnico (presencial y remoto)',
                'services.group.webdev.title': 'Desarrollo web y publicidad digital'
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
                'page.title': 'SSTI - IT Technical Support and Service',
                'services.title': 'Core Services',
                'services.subtitle': 'Technology solutions designed to power your business with expert support and measurable results.',
                'services.card.support.title': 'Comprehensive IT Support',
                'services.card.support.desc': 'Fast, expert assistance to resolve hardware, software, and network issues, both on-site and remotely.',
                'services.card.maintenance.title': 'Preventive & Corrective Maintenance',
                'services.card.maintenance.desc': 'Optimization, cleaning, and repair of equipment to maximize performance and prevent unplanned downtime.',
                'services.card.networking.title': 'Networking & Infrastructure',
                'services.card.networking.desc': 'Design, installation, and improvement of wired and wireless networks with high availability and security.',
                'services.card.cyber.title': 'Cybersecurity & Data Protection',
                'services.card.cyber.desc': 'Antivirus, firewalls, hardening, and backup policies to protect your critical information.',
                'services.card.cloud.title': 'Cloud & Virtualization',
                'services.card.cloud.desc': 'Cloud migration, Microsoft 365, virtualization, and infrastructure modernization to scale efficiently.',
                'services.card.backup.title': 'Servers, Backup & Continuity',
                'services.card.backup.desc': 'Implementation and monitoring of servers, backups, and disaster recovery plans.',
                'services.cta.primary': 'Request a Quote',
                'services.cta.secondary': 'Schedule a Diagnostic',
                'services.group.support.title': 'Technical support (on-site and remote)',
                'services.group.webdev.title': 'Web development and digital marketing'
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
