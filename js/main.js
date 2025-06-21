// Aguarda o carregamento completo da página para executar os scripts
document.addEventListener('DOMContentLoaded', () => {

    // Ativa os ícones do Lucide
    lucide.createIcons();

    // ---- SCRIPT PARA CABEÇALHO COM FUNDO AO ROLAR ----
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-card', 'shadow-lg');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('bg-card', 'shadow-lg');
                header.classList.add('bg-transparent');
            }
        });
    }

    // ---- SCRIPT PARA MENU MOBILE ----
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });


    // ---- SCRIPT PARA ANIMAÇÃO AO ROLAR (SCROLL REVEAL) ----
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));


    // ---- SCRIPT PARA SLIDER DE DEPOIMENTOS ----
    // Você pode editar os textos, nomes e cargos aqui
    const testimonials = [
        {
            image: 'images/testimonial-1.jpg',
            text: 'A equipa da M&K Advocacia foi fundamental para a resolução do meu caso. Profissionais extremamente competentes e atenciosos. Recomendo a todos que precisam de serviços jurídicos de qualidade.',
            author: 'Carlos Silva',
            role: 'Empresário'
        },
        {
            image: 'images/testimonial-2.jpg',
            text: 'Fui muito bem assessorado em todas as etapas do meu processo. A transparência e o profissionalismo da equipa passaram-me muita segurança. Estou muito satisfeito com o resultado.',
            author: 'Mariana Costa',
            role: 'Arquiteta'
        },
        {
            image: 'images/testimonial-3.jpg',
            text: 'Serviço jurídico impecável. A dedicação da M&K Advocacia no meu caso foi surpreendente. Eles realmente importam-se com o cliente e procuram a melhor solução.',
            author: 'Jorge Almeida',
            role: 'Servidor Público'
        }
    ];

    let currentTestimonialIndex = 0;

    const testimonialImage = document.getElementById('testimonial-image');
    const testimonialText = document.getElementById('testimonial-text');
    const testimonialAuthor = document.getElementById('testimonial-author');
    const testimonialRole = document.getElementById('testimonial-role');
    const testimonialCard = document.getElementById('testimonial-card');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');

    function updateTestimonial(index) {
        if (!testimonialCard) return;

        const testimonial = testimonials[index];
        
        testimonialCard.style.opacity = '0'; // Começa a transição de fade-out

        setTimeout(() => {
            testimonialImage.src = testimonial.image;
            testimonialImage.alt = testimonial.author;
            testimonialText.textContent = testimonial.text;
            testimonialAuthor.textContent = testimonial.author;
            testimonialRole.textContent = testimonial.role;
            
            // Atualiza os pontos de navegação (dots)
            if (dotsContainer) {
                const dots = dotsContainer.children;
                for (let i = 0; i < dots.length; i++) {
                    dots[i].classList.remove('bg-primary');
                    dots[i].classList.add('bg-border');
                }
                dots[index].classList.add('bg-primary');
                dots[index].classList.remove('bg-border');
            }
            
            testimonialCard.style.opacity = '1'; // Transição de fade-in
        }, 300); // Duração da transição em milissegundos
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full transition-colors';
            dot.classList.add(index === 0 ? 'bg-primary' : 'bg-border');
            dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
            dot.addEventListener('click', () => {
                currentTestimonialIndex = index;
                updateTestimonial(currentTestimonialIndex);
            });
            dotsContainer.appendChild(dot);
        });
    }

    if (testimonialCard) {
        prevButton.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonial(currentTestimonialIndex);
        });

        nextButton.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            updateTestimonial(currentTestimonialIndex);
        });

        createDots();
        updateTestimonial(0); // Inicia o primeiro depoimento
    }

    // ---- SCRIPT PARA FORMULÁRIOS ENVIAREM VIA WHATSAPP ----
    const seuNumeroWhatsApp = '5511949207386'; // Altere para o seu número

    function handleFormSubmit(event, formId) {
        event.preventDefault();
        const form = document.getElementById(formId);
        if (!form) return;

        const formData = new FormData(form);
        let message = '';
        
        if (formId === 'hero-form') {
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const area = formData.get('area');
            message = `Olá! Gostaria de agendar uma consulta gratuita.\n\n*Nome:* ${name}\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*Área de Interesse:* ${area}`;
        } else if (formId === 'contact-form') {
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const body = formData.get('message');
            message = `Olá! Contato pelo site.\n\n*Nome:* ${name}\n*E-mail:* ${email}\n*Assunto:* ${subject}\n\n*Mensagem:*\n${body}`;
        }

        const whatsappUrl = `https://wa.me/${seuNumeroWhatsApp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        form.reset();
    }

    const heroForm = document.getElementById('hero-form');
    const contactForm = document.getElementById('contact-form');

    if (heroForm) {
        heroForm.addEventListener('submit', (e) => handleFormSubmit(e, 'hero-form'));
    }
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact-form'));
    }
});
