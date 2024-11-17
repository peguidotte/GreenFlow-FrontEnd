AOS.init();

function toggleCard(element) {
    var cardAfter = element.nextElementSibling;
    if (cardAfter.classList.contains('show')) {
        cardAfter.classList.remove('show');
    } else {
        // Fechar todos os outros cards abertos
        document.querySelectorAll('.card-displayed-after.show').forEach(function (openCard) {
            openCard.classList.remove('show');
        });
        cardAfter.classList.add('show');
        // Centralizar o elemento na tela
    }
}

function toggleCardClick(element) {
    // Remover a classe 'clicked' de todos os cards
    document.querySelectorAll('.card-benef, .card-desaf').forEach(function (card) {
        card.classList.remove('clicked');
    });

    // Adicionar a classe 'clicked' ao card clicado
    element.classList.add('clicked');
}

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-link');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Scrollspy manual
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Ajuste conforme necessário
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(nav => {
                    nav.classList.remove('active');
                    if (nav.getAttribute('href') === `#${id}`) {
                        nav.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var observerLeft = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var cardLeftElements = document.querySelectorAll('.card-left');
                cardLeftElements.forEach(function (element) {
                    element.classList.add('fade-in-left');
                });
                observer.disconnect(); // Desconecta o observer após a primeira detecção
            }
        });
    }, observerOptions);

    var firstCardLeftElement = document.querySelector('.card-left');
    if (firstCardLeftElement) {
        observerLeft.observe(firstCardLeftElement);
    }

    var observerRight = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var cardRightElements = document.querySelectorAll('.card-right');
                cardRightElements.forEach(function (element) {
                    element.classList.add('fade-in-right');
                });
                observer.disconnect(); // Desconecta o observer após a primeira detecção
            }
        });
    }, observerOptions);

    var firstCardRightElement = document.querySelector('.card-right');
    if (firstCardRightElement) {
        observerRight.observe(firstCardRightElement);
    }

    // Fechar card-displayed-after ao clicar fora
    document.addEventListener('click', function (event) {
        var isClickInsideCard = event.target.closest('.card-displayed') || event.target.closest('.card-displayed-after');
        var isClickInsideCarousel = event.target.closest('.carousel');
        if (!isClickInsideCard && !isClickInsideCarousel) {
            document.querySelectorAll('.card-displayed-after.show').forEach(function (openCard) {
                openCard.classList.remove('show');
            });
        }

        // Remover a classe 'clicked' de todos os cards se clicar fora dos cards
        var isClickInsideAnyCard = event.target.closest('.card-benef') || event.target.closest('.card-desaf');
        if (!isClickInsideAnyCard) {
            document.querySelectorAll('.card-benef, .card-desaf').forEach(function (card) {
                card.classList.remove('clicked');
            });
        }
    });
});