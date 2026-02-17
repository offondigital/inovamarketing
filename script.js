// script.js

// Menu sanduíche - funcionalidade de abrir/fechar
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const body = document.body;

function toggleMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Rolagem suave para todas as âncoras internas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Fechar menu mobile se estiver aberto
            if (navLinks && navLinks.classList.contains('active')) {
                toggleMenu();
            }
            
            // Rolagem suave com offset para o header fixo
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fechar menu ao redimensionar para desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 600 && navLinks && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Lazy loading para imagens
if ('loading' in HTMLImageElement.prototype) {
    // Navegador suporta lazy loading nativo
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback para navegadores antigos - carregar biblioteca lazysizes
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.async = true;
    document.body.appendChild(script);
}

// Carregar scripts de forma assíncrona (para elementos com data-src)
const scripts = document.querySelectorAll('script[data-src]');
scripts.forEach(script => {
    script.src = script.dataset.src;
});

// Fechar menu ao clicar em um link (redundante, mas garantia extra)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 600 && navLinks && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Prevenir que o scroll do body seja bloqueado se o menu for fechado de outra forma
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Otimização: marcar links externos para abrir em nova aba com segurança
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// Garantir que os títulos dinâmicos tenham a classe correta
document.addEventListener('DOMContentLoaded', () => {
    // Qualquer inicialização adicional pode ser colocada aqui
    console.log('InovaMarketing: site carregado com sucesso');
});