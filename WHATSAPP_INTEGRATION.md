# Integración de WhatsApp - SSTI Landing Page

## Funcionalidades Agregadas

### 1. Botones de WhatsApp
- **Botón "Solicitar Soporte"**: Sección Hero
- **Botón "Solicitar Cotización"**: Sección Servicios
- **Funcionalidad**: Ambos abren WhatsApp con mensajes predefinidos apropiados
- **Número**: +506 8642 2654
- **Mensajes**: 
  - **Soporte**: "Hola! Necesito solicitar soporte técnico. ¿Podrían ayudarme?"
  - **Cotización**: "Hola! Me gustaría solicitar una cotización para servicios técnicos. ¿Podrían enviarme información sobre precios y opciones disponibles?"

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
getWhatsAppMessage(language, type = 'support') {
    const messages = {
        support: {
            es: 'Tu mensaje de soporte en español',
            en: 'Your support message in English'
        },
        quote: {
            es: 'Tu mensaje de cotización en español',
            en: 'Your quote message in English'
        }
    };
    
    const typeMessages = messages[type] || messages.support;
    return typeMessages[language] || typeMessages.es;
}
```

### Agregar Nuevos Idiomas
1. Agregar traducciones en `js/translate.js`
2. Agregar mensajes en `js/whatsapp.js`
3. Actualizar tooltips en el HTML

### Agregar Nuevos Tipos de Mensajes
1. Agregar el nuevo tipo en `getWhatsAppMessage()` en `js/whatsapp.js`
2. Crear el botón correspondiente en el HTML
3. Configurar el event listener en `setupWhatsAppButtons()`

## Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles y de escritorio
- ✅ Aplicación nativa de WhatsApp
- ✅ WhatsApp Web
- ✅ Sistema de traducciones existente

## Beneficios

1. **Acceso Directo**: Los clientes pueden contactar inmediatamente sin salir del sitio
2. **Mensajes Especializados**: Diferentes mensajes según el tipo de consulta (soporte vs. cotización)
3. **Multiidioma**: Soporte para audiencias internacionales
4. **Experiencia de Usuario**: Proceso de contacto simplificado y apropiado para cada necesidad
5. **Integración Seamless**: Funciona perfectamente con el diseño existente
6. **Eficiencia**: Reduce el tiempo de comunicación inicial al especificar el tipo de consulta

## Próximas Mejoras Sugeridas

- [ ] Agregar más tipos de mensajes predefinidos
- [ ] Integración con analytics para tracking de clics
- [ ] Mensajes personalizados según la sección del sitio
- [ ] Horarios de disponibilidad en tiempo real
- [ ] Chatbot básico para preguntas frecuentes
