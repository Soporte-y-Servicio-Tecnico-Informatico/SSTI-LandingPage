// Funcionalidad del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Función para manejar el envío del formulario
async function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.btn-submit');
    const formData = new FormData(form);
    
    // Validar formulario
    if (!validateForm(formData)) {
        return;
    }
    
    // Mostrar estado de carga
    setLoadingState(submitBtn, true);
    
    try {
        // Enviar formulario usando EmailJS
        await sendContactEmail(formData);
        
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
        // Limpiar formulario
        form.reset();
        
        // Remover clases de error
        clearFormErrors();
        
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        showErrorMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
        // Restaurar estado normal del botón
        setLoadingState(submitBtn, false);
    }
}

// Función para validar el formulario
function validateForm(formData) {
    let isValid = true;
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    // Limpiar errores previos
    clearFormErrors();
    
    // Validar campos requeridos
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const value = formData.get(fieldName).trim();
        
        if (!value) {
            showFieldError(field, 'Este campo es obligatorio');
            isValid = false;
        }
    });
    
    // Validar email
    const email = formData.get('email').trim();
    if (email && !isValidEmail(email)) {
        const emailField = document.getElementById('email');
        showFieldError(emailField, 'Por favor, ingresa un email válido');
        isValid = false;
    }
    
    // Validar checkbox de privacidad
    const privacy = formData.get('privacy');
    if (!privacy) {
        const privacyField = document.getElementById('privacy');
        const privacyGroup = privacyField.closest('.form-group');
        privacyGroup.classList.add('error');
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Debes aceptar la política de privacidad';
        privacyGroup.appendChild(errorMsg);
        isValid = false;
    }
    
    return isValid;
}

// Función para validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar error en un campo específico
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    formGroup.appendChild(errorMsg);
}

// Función para limpiar errores del formulario
function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.form-group.error');
    
    errorMessages.forEach(msg => msg.remove());
    errorFields.forEach(field => field.classList.remove('error'));
}

// Función para establecer estado de carga
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Función para enviar email usando EmailJS
async function sendContactEmail(formData) {
    // Configuración de EmailJS
    const emailjsConfig = {
        serviceId: 'YOUR_EMAILJS_SERVICE_ID', // Reemplazar con tu Service ID
        templateId: 'YOUR_EMAILJS_TEMPLATE_ID', // Reemplazar con tu Template ID
        userId: 'YOUR_EMAILJS_USER_ID', // Reemplazar con tu User ID
        templateParams: {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            from_phone: formData.get('phone') || 'No proporcionado',
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_support: 'soporteservicioti@gmail.com',
            to_suggestions: 'sstigerencia@gmail.com'
        }
    };
    
    // Si EmailJS no está disponible, usar método alternativo
    if (typeof emailjs !== 'undefined') {
        return await emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig.templateId,
            emailjsConfig.templateParams,
            emailjsConfig.userId
        );
    } else {
        // Método alternativo usando FormSubmit.co (gratuito)
        return await sendViaFormSubmit(formData);
    }
}

// Método alternativo usando FormSubmit.co
async function sendViaFormSubmit(formData) {
    const form = document.getElementById('contactForm');

    // URL correcta de FormSubmit para el correo principal
    form.action = 'https://formsubmit.co/soporteservicioti@gmail.com';

    // Campos ocultos para configurar el envío
    const hiddenFields = {
        '_cc': 'sstigerencia@gmail.com',
        '_subject': `Nuevo mensaje de contacto: ${formData.get('subject')}`,
        '_template': 'table',
        '_captcha': 'false',
        '_next': window.location.href // evita pantallas intermedias si no usamos fetch
    };

    Object.entries(hiddenFields).forEach(([name, value]) => {
        let hiddenField = form.querySelector(`input[name="${name}"]`);
        if (!hiddenField) {
            hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = name;
            form.appendChild(hiddenField);
        }
        hiddenField.value = value;
    });

    // Construir payload a partir del formulario visible (+ ocultos ya agregados)
    const payload = new FormData(form);

    // Enviar usando fetch con cabecera Accept JSON para respuesta consistente
    const response = await fetch(form.action, {
        method: 'POST',
        body: payload,
        headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Error en el envío (${response.status}): ${text}`);
    }

    return response;
}

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    // Crear notificación de éxito
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>¡Mensaje enviado exitosamente! Te responderemos pronto.</span>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Función para mostrar mensaje de error
function showErrorMessage(message) {
    // Crear notificación de error
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Estilos adicionales para las notificaciones
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification-content span {
        font-size: 0.95rem;
        line-height: 1.4;
    }
`;

// Agregar estilos al head
if (!document.querySelector('#notification-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
}
