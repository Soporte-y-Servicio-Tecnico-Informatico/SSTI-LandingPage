// WhatsApp Integration System - Funcionalidad básica
class WhatsAppManager {
    constructor() {
        this.phoneNumber = '50686422654';
        this.init();
    }

    init() {
        this.setupWhatsAppButtons();
    }

    setupWhatsAppButtons() {
        // Botón de solicitar soporte (página principal)
        const whatsappBtn = document.getElementById('whatsappSupportBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsApp('support');
            });
        }

        // Botón de solicitar cotización (página principal)
        const quoteBtn = document.querySelector('a[href="#contacto"] .btn-text');
        if (quoteBtn && quoteBtn.textContent.includes('Cotización')) {
            const quoteBtnParent = quoteBtn.closest('a');
            if (quoteBtnParent) {
                quoteBtnParent.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openWhatsApp('quote');
                });
            }
        }

        // Botones de servicios en store/services/services.html
        this.setupServiceButtons();
        
        // Botones de productos en store/store/store.html
        this.setupProductButtons();
    }

    setupServiceButtons() {
        // Botones de servicios técnicos
        const serviceButtons = document.querySelectorAll('.service-cta');
        serviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceType = this.getServiceTypeFromButton(button);
                this.openWhatsApp(serviceType);
            });
        });
    }

    setupProductButtons() {
        // Botones de compra de productos
        const buyButtons = document.querySelectorAll('.btn-primary');
        buyButtons.forEach(button => {
            if (button.textContent.includes('Comprar')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openWhatsApp('purchase');
                });
            }
        });
    }

    getServiceTypeFromButton(button) {
        const buttonText = button.textContent.toLowerCase();
        
        if (buttonText.includes('asesoría') || buttonText.includes('consulting')) return 'consulting';
        if (buttonText.includes('mantenimiento') || buttonText.includes('maintenance')) return 'maintenance';
        if (buttonText.includes('cambio') || buttonText.includes('replacement')) return 'replacement';
        if (buttonText.includes('instalación') || buttonText.includes('installation')) return 'installation';
        if (buttonText.includes('limpieza') || buttonText.includes('cleanup')) return 'cleaning';
        if (buttonText.includes('configuración') || buttonText.includes('configuration')) return 'configuration';
        if (buttonText.includes('respaldo') || buttonText.includes('backup')) return 'backup';
        if (buttonText.includes('propuesta') || buttonText.includes('proposal')) return 'proposal';
        if (buttonText.includes('capacitación') || buttonText.includes('training')) return 'training';
        
        return 'service'; // Default
    }

    openWhatsApp(type = 'support') {
        const currentLang = window.languageTranslator ? window.languageTranslator.getCurrentLanguage() : 'es';
        const message = this.getWhatsAppMessage(currentLang, type);
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    getWhatsAppMessage(language, type = 'support') {
        const messages = {
            support: {
                es: 'Hola! Necesito solicitar soporte técnico. ¿Podrían ayudarme?',
                en: 'Hello! I need to request technical support. Could you help me?'
            },
            quote: {
                es: 'Hola! Me gustaría solicitar una cotización para servicios técnicos. ¿Podrían enviarme información sobre precios y opciones disponibles?',
                en: 'Hello! I would like to request a quote for technical services. Could you send me information about prices and available options?'
            },
            // Mensajes para servicios específicos
            consulting: {
                es: 'Hola! Me interesa solicitar asesoría en TI. ¿Podrían ayudarme con orientación para compras y mejoras tecnológicas?',
                en: 'Hello! I am interested in requesting IT consulting. Could you help me with guidance for technology purchases and upgrades?'
            },
            maintenance: {
                es: 'Hola! Necesito solicitar mantenimiento preventivo para mi equipo. ¿Podrían darme información sobre el servicio?',
                en: 'Hello! I need to request preventive maintenance for my equipment. Could you give me information about the service?'
            },
            replacement: {
                es: 'Hola! Necesito solicitar un cambio de hardware en mi equipo. ¿Podrían ayudarme con esto?',
                en: 'Hello! I need to request a hardware replacement for my equipment. Could you help me with this?'
            },
            installation: {
                es: 'Hola! Necesito solicitar instalación de software o sistemas. ¿Podrían darme información sobre este servicio?',
                en: 'Hello! I need to request software or system installation. Could you give me information about this service?'
            },
            cleaning: {
                es: 'Hola! Me interesa solicitar limpieza de equipos. ¿Podrían darme información sobre este servicio?',
                en: 'Hello! I am interested in requesting equipment cleaning. Could you give me information about this service?'
            },
            configuration: {
                es: 'Hola! Necesito solicitar configuración de redes o sistemas. ¿Podrían ayudarme con esto?',
                en: 'Hello! I need to request network or system configuration. Could you help me with this?'
            },
            backup: {
                es: 'Hola! Me interesa solicitar servicios de respaldo y recuperación de datos. ¿Podrían darme información?',
                en: 'Hello! I am interested in requesting backup and data recovery services. Could you give me information?'
            },
            proposal: {
                es: 'Hola! Me gustaría solicitar una propuesta para servicios técnicos. ¿Podrían enviarme información detallada?',
                en: 'Hello! I would like to request a proposal for technical services. Could you send me detailed information?'
            },
            training: {
                es: 'Hola! Me interesa solicitar capacitación en herramientas tecnológicas. ¿Podrían darme información sobre los cursos?',
                en: 'Hello! I am interested in requesting training in technology tools. Could you give me information about the courses?'
            },
            // Mensaje para compras de productos
            purchase: {
                es: 'Hola! Me interesa comprar productos tecnológicos. ¿Podrían darme información sobre disponibilidad y precios?',
                en: 'Hello! I am interested in purchasing technology products. Could you give me information about availability and prices?'
            },
            // Mensaje genérico para servicios
            service: {
                es: 'Hola! Me interesa solicitar un servicio técnico. ¿Podrían darme información sobre opciones disponibles?',
                en: 'Hello! I am interested in requesting a technical service. Could you give me information about available options?'
            }
        };
        
        const typeMessages = messages[type] || messages.support;
        return typeMessages[language] || typeMessages.es;
    }

    // Método para cambiar el idioma de los mensajes de WhatsApp
    updateLanguage(language) {
        // Los botones ya están configurados, no necesitan actualización adicional
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.whatsappManager = new WhatsAppManager();
});

// Export CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppManager;
}
