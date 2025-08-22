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
        // Botón de solicitar soporte
        const whatsappBtn = document.getElementById('whatsappSupportBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsApp('support');
            });
        }

        // Botón de solicitar cotización
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
