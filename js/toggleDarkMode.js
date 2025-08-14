// Dark Mode Toggle Functionality
class DarkModeToggle {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Aplicar tema guardado al cargar la página
        this.applyTheme(this.currentTheme);
        
        // Agregar event listener al botón
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Agregar event listener para cambios de preferencia del sistema
        this.watchSystemPreference();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.currentTheme = newTheme;
        localStorage.setItem('theme', newTheme);
    }

    applyTheme(theme) {
        const body = document.body;
        const html = document.documentElement;
        
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            html.setAttribute('data-theme', 'dark');
            this.updateThemeIcon('dark');
        } else {
            body.removeAttribute('data-theme');
            html.removeAttribute('data-theme');
            this.updateThemeIcon('light');
        }
    }

    updateThemeIcon(theme) {
        const darkIcon = document.querySelector('.theme-icon-dark');
        const lightIcon = document.querySelector('.theme-icon-light');
        
        if (theme === 'dark') {
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        } else {
            darkIcon.style.display = 'block';
            lightIcon.style.display = 'none';
        }
    }

    watchSystemPreference() {
        // Verificar si el navegador soporta prefers-color-scheme
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Solo aplicar preferencia del sistema si no hay tema guardado
            if (!localStorage.getItem('theme')) {
                mediaQuery.addEventListener('change', (e) => {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(newTheme);
                    this.currentTheme = newTheme;
                    localStorage.setItem('theme', newTheme);
                });
            }
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeToggle = new DarkModeToggle();
});

// Exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
}
