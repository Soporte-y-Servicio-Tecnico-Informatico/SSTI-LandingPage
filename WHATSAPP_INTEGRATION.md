# Integración de WhatsApp - SSTI Landing Page

## Funcionalidades Agregadas

### 1. Botón Principal de WhatsApp
- **Ubicación**: Sección Hero (botón "Solicitar Soporte")
- **Funcionalidad**: Al hacer clic, abre WhatsApp con un mensaje predefinido
- **Número**: +506 8642 2654
- **Mensajes**: 
  - Español: "Hola! 👋 Necesito solicitar soporte técnico informático. ¿Podrían ayudarme con una consulta?"
  - Inglés: "Hello! 👋 I need to request IT technical support. Could you help me with an inquiry?"

### 2. Sistema de Traducción Automática
- Los mensajes de WhatsApp se adaptan automáticamente al idioma seleccionado
- Soporte completo para español e inglés
- Tooltips traducibles en ambos idiomas

### 3. Características Visuales
- Mantiene el diseño original del botón
- Solo cambia el ícono a WhatsApp
- Sin efectos visuales adicionales
- Diseño responsivo existente preservado

## Archivos Modificados

### HTML
- `index.html`: Botón principal convertido a WhatsApp con tooltips traducibles

### JavaScript
- `js/whatsapp.js`: Nuevo sistema de gestión de WhatsApp
- `js/translate.js`: Integración con el sistema de traducciones

### CSS
- `css/styles.css`: Estilos específicos para el botón de WhatsApp

## Cómo Funciona

1. **Inicialización**: El sistema se inicializa automáticamente al cargar la página
2. **Gestión de Clics**: Intercepta clics en el botón y abre WhatsApp en una nueva pestaña
3. **Traducción**: Se integra con el sistema de idiomas existente
4. **Mensajes**: Genera URLs de WhatsApp con mensajes codificados correctamente

## Personalización

### Cambiar Número de WhatsApp
Editar en `js/whatsapp.js`:
```javascript
this.phoneNumber = 'TU_NUMERO_AQUI';
```

### Modificar Mensajes
Editar en `js/whatsapp.js`:
```javascript
getWhatsAppMessage(language) {
    const messages = {
        es: 'Tu mensaje en español',
        en: 'Your message in English'
    };
    return messages[language] || messages.es;
}
```

### Agregar Nuevos Idiomas
1. Agregar traducciones en `js/translate.js`
2. Agregar mensajes en `js/whatsapp.js`
3. Actualizar tooltips en el HTML

## Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles y de escritorio
- ✅ Aplicación nativa de WhatsApp
- ✅ WhatsApp Web
- ✅ Sistema de traducciones existente

## Beneficios

1. **Acceso Directo**: Los clientes pueden contactar inmediatamente sin salir del sitio
2. **Mensajes Predefinidos**: Facilita la comunicación inicial
3. **Multiidioma**: Soporte para audiencias internacionales
4. **Experiencia de Usuario**: Proceso de contacto simplificado y visualmente atractivo
5. **Integración Seamless**: Funciona perfectamente con el diseño existente

## Próximas Mejoras Sugeridas

- [ ] Agregar más tipos de mensajes predefinidos
- [ ] Integración con analytics para tracking de clics
- [ ] Mensajes personalizados según la sección del sitio
- [ ] Horarios de disponibilidad en tiempo real
- [ ] Chatbot básico para preguntas frecuentes
