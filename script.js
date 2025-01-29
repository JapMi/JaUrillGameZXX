// script.js (оптимизированная версия)
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cyber-button');
    const output = document.getElementById('output');
    
    const messages = [
        "INITIALIZING NEURAL INTERFACE...",
        "ACCESSING MAINFRAME...",
        "ENCRYPTION PROTOCOL [███████] 100%",
        "WARNING: SYSTEM BREACH DETECTED",
        "UPLOADING VIRUS.EXE...",
        "CYBER-DAEMON ACTIVATED",
        "CRYPTO-LOCK ENGAGED",
        "ROOT ACCESS GRANTED",
        "OVERRIDE SYSTEM PROTOCOLS"
    ];

    const handleInteraction = (button) => {
        button.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        const randomMsg = messages[Math.random() * messages.length | 0];
        
        output.innerHTML = '';
        let i = 0;
        const typeWriter = () => {
            if (i < randomMsg.length) {
                output.innerHTML += randomMsg[i++];
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
        
        output.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        setTimeout(() => button.style.transform = '', 100);
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => handleInteraction(button));
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleInteraction(button);
        }, { passive: false });
    });

    const resizeHandler = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
});