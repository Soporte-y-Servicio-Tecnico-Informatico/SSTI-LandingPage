# Configuración del Formulario de Contacto

## Descripción
El formulario de contacto está configurado para enviar correos electrónicos a dos direcciones:
- **Soporte Técnico**: soporteservicioti@gmail.com
- **Sugerencias**: sstigerencia@gmail.com

## Opciones de Configuración

### Opción 1: EmailJS (Recomendado)
EmailJS es un servicio que permite enviar emails directamente desde JavaScript sin necesidad de un backend.

#### Pasos de configuración:
1. Ve a [EmailJS.com](https://www.emailjs.com/) y crea una cuenta gratuita
2. Crea un nuevo servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email con los siguientes parámetros:
   - `{{from_name}}` - Nombre del remitente
   - `{{from_email}}` - Email del remitente
   - `{{from_phone}}` - Teléfono del remitente
   - `{{subject}}` - Asunto del mensaje
   - `{{message}}` - Contenido del mensaje
4. Obtén tu Service ID, Template ID y User ID
5. Actualiza el archivo `js/contact.js` con tus credenciales:

```javascript
const emailjsConfig = {
    serviceId: 'TU_SERVICE_ID',
    templateId: 'TU_TEMPLATE_ID',
    userId: 'TU_USER_ID',
    // ... resto de la configuración
};
```

#### Plantilla de Email recomendada:
```
Nuevo mensaje de contacto

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{from_phone}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de SSTI.
```

### Opción 2: FormSubmit.co (Alternativa gratuita)
FormSubmit.co es un servicio gratuito que no requiere registro.

#### Configuración automática:
El formulario ya está configurado para usar FormSubmit.co como respaldo. Solo necesitas:
1. Verificar que el formulario tenga el atributo `action` correcto
2. Los correos se enviarán automáticamente a ambos emails

### Opción 3: Backend propio
Si prefieres implementar tu propio backend:

1. Crea un servidor (Node.js, PHP, Python, etc.)
2. Implementa el endpoint para enviar emails
3. Actualiza la función `sendContactEmail` en `js/contact.js`
4. Usa librerías como Nodemailer (Node.js) o PHPMailer (PHP)

## Características del Formulario

### Validaciones implementadas:
- ✅ Campos obligatorios (nombre, email, asunto, mensaje)
- ✅ Formato de email válido
- ✅ Aceptación de política de privacidad
- ✅ Validación en tiempo real

### Funcionalidades:
- 🎨 Diseño responsive y moderno
- 🌙 Compatible con modo oscuro/claro
- 🌍 Soporte para múltiples idiomas (ES/EN)
- 📱 Optimizado para dispositivos móviles
- 🔔 Notificaciones de éxito/error
- ⏳ Estado de carga durante el envío

### Campos del formulario:
1. **Nombre Completo** (requerido)
2. **Correo Electrónico** (requerido)
3. **Teléfono** (opcional)
4. **Asunto** (requerido) - con opciones predefinidas
5. **Mensaje** (requerido)
6. **Política de Privacidad** (requerido)

## Personalización

### Cambiar emails de destino:
Edita el archivo `js/contact.js` y modifica estas líneas:

```javascript
// En la función sendContactEmail
to_support: 'soporteservicioti@gmail.com',
to_suggestions: 'sstigerencia@gmail.com'

// En la función sendViaFormSubmit
form.action = 'https://formsubmit.co/el/soporteservicioti@gmail.com';
'_cc': 'sstigerencia@gmail.com'
```

### Modificar estilos:
Los estilos están en `css/styles.css` en la sección `/* ===== ESTILOS PARA LA SECCIÓN DE CONTACTO ===== */`

### Cambiar mensajes:
Edita los textos en el archivo HTML `index.html` en la sección de contacto.

## Solución de Problemas

### El formulario no envía emails:
1. Verifica que EmailJS esté configurado correctamente
2. Revisa la consola del navegador para errores
3. Asegúrate de que los campos requeridos estén completos

### Emails no llegan:
1. Verifica la carpeta de spam
2. Confirma que las direcciones de email sean correctas
3. Revisa la configuración del servicio de email

### Problemas de validación:
1. Asegúrate de que todos los campos requeridos estén completos
2. Verifica que el email tenga un formato válido
3. Confirma que se haya marcado la casilla de privacidad

## Notas Importantes

- **Gratuito**: FormSubmit.co es completamente gratuito
- **Límites**: EmailJS tiene límites en el plan gratuito (200 emails/mes)
- **Seguridad**: Los emails se envían de forma segura
- **Privacidad**: Se incluye validación de política de privacidad
- **Responsive**: El formulario funciona en todos los dispositivos

## Soporte

Si tienes problemas con la configuración:
1. Revisa este documento
2. Consulta la documentación de EmailJS o FormSubmit.co
3. Verifica la consola del navegador para errores
4. Asegúrate de que todos los archivos estén correctamente enlazados
