// WhatsApp Integration System - Funcionalidad básica
class WhatsAppManager {
    constructor() {
        this.phoneNumber = '50686422654';
        this.init();
    }

    init() {
        this.setupWhatsAppButton();
    }

    setupWhatsAppButton() {
        const whatsappBtn = document.getElementById('whatsappSupportBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsApp();
            });
        }
    }

    openWhatsApp() {
        const currentLang = window.languageTranslator ? window.languageTranslator.getCurrentLanguage() : 'es';
        const message = this.getWhatsAppMessage(currentLang);
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    getWhatsAppMessage(language) {
        const messages = {
            es: 'Hola! Necesito solicitar soporte técnico. ¿Podrían ayudarme?',
            en: 'Hello! I need to request technical support. Could you help me?'
        };
        return messages[language] || messages.es;
    }

    // Método para cambiar el idioma de los mensajes de WhatsApp
    updateLanguage(language) {
        // Solo actualizar el mensaje del botón principal
        const whatsappBtn = document.getElementById('whatsappSupportBtn');
        if (whatsappBtn) {
            // El botón ya está configurado, no necesita actualización adicional
        }
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
