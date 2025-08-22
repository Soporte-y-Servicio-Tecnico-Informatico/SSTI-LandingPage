# Integración de WhatsApp - SSTI Landing Page

## Funcionalidades Agregadas

### 1. Botones de WhatsApp
- **Página Principal**:
  - Botón "Solicitar Soporte" (Sección Hero)
  - Botón "Solicitar Cotización" (Sección Servicios)
- **Página de Servicios** (`store/services/services.html`):
  - Botones de servicios técnicos (Asesoría, Mantenimiento, Cambio de Hardware, etc.)
- **Página de Productos** (`store/store/store.html`):
  - Botones "Comprar Ahora" para productos tecnológicos
- **Funcionalidad**: Todos abren WhatsApp con mensajes predefinidos apropiados
- **Número**: +506 8642 2654
- **Mensajes Especializados**: 
  - **Soporte**: "Hola! Necesito solicitar soporte técnico. ¿Podrían ayudarme?"
  - **Cotización**: "Hola! Me gustaría solicitar una cotización para servicios técnicos. ¿Podrían enviarme información sobre precios y opciones disponibles?"
  - **Servicios Específicos**: Mensajes personalizados para cada tipo de servicio
  - **Productos**: Mensajes para consultas de compra

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
- `store/services/services.html`: Botones de servicios con funcionalidad WhatsApp
- `store/store/store.html`: Botones de productos con funcionalidad WhatsApp

### JavaScript
- `js/whatsapp.js`: Sistema extendido de gestión de WhatsApp para múltiples páginas
- `js/translate.js`: Integración con el sistema de traducciones

### CSS
- Sin cambios - se mantiene el diseño original de todos los botones

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
        },
        // Servicios específicos
        consulting: {
            es: 'Tu mensaje de asesoría en español',
            en: 'Your consulting message in English'
        },
        maintenance: {
            es: 'Tu mensaje de mantenimiento en español',
            en: 'Your maintenance message in English'
        },
        // Y así para cada tipo de servicio...
        purchase: {
            es: 'Tu mensaje de compra en español',
            en: 'Your purchase message in English'
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
2. **Mensajes Ultra-Especializados**: Mensajes específicos para cada tipo de servicio y producto
3. **Multiidioma**: Soporte para audiencias internacionales
4. **Experiencia de Usuario**: Proceso de contacto simplificado y apropiado para cada necesidad
5. **Integración Seamless**: Funciona perfectamente con el diseño existente en todas las páginas
6. **Eficiencia**: Reduce el tiempo de comunicación inicial al especificar exactamente qué se necesita
7. **Cobertura Completa**: Funcionalidad WhatsApp en todas las páginas del sitio (principal, servicios y productos)
8. **Sin Cambios Visuales**: Todos los botones mantienen su diseño original

## Próximas Mejoras Sugeridas

- [ ] Agregar más tipos de mensajes predefinidos
- [ ] Integración con analytics para tracking de clics
- [ ] Mensajes personalizados según la sección del sitio
- [ ] Horarios de disponibilidad en tiempo real
- [ ] Chatbot básico para preguntas frecuentes
