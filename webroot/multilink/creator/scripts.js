// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    const mainLink = document.getElementById('website-link');
    const videoIframe = document.querySelector('.video-container iframe');

    function translatePage(lang) {
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            element.innerHTML = translations[lang][key] || element.innerHTML;
        });

        // Обновление ссылки на сайт
        mainLink.href = translations[lang].websiteLink;

        // Обновление ссылки на видео
        videoIframe.src = translations[lang].videoUrl;
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            translatePage(lang);
        });
    });

    // Устанавливаем язык по умолчанию как русский
    translatePage('ru');
});

