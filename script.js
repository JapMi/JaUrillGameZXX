// Обработчик загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Задержка для плавного скрытия шторки
    setTimeout(() => {
        const curtain = document.querySelector('.curtain');
        if(curtain) {
            curtain.style.display = 'none';
        }
    }, 1500);
    
    // Здесь можно добавить обработчики для кнопок
    const buttons = document.querySelectorAll('.nav-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Пример обработки клика
            console.log(`Нажата кнопка: ${e.target.textContent}`);
            // Добавьте свою логику здесь
        });
    });
});