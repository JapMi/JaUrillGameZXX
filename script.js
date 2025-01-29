document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cyber-button');
    const output = document.getElementById('output');
    const bgMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    // Audio Context initialization
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let musicStarted = false;
    
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

    // Click sound generator
    const playClickSound = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(1200 + Math.random() * 800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        setTimeout(() => oscillator.stop(), 50);
    };

    // Typewriter effect
    const typeWriter = (text, element) => {
        element.innerHTML = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 30 + Math.random() * 40);
            }
        };
        type();
    };

    // Main interaction handler
    const handleInteraction = (button) => {
        if (!musicStarted) {
            bgMusic.play().catch(() => {});
            musicStarted = true;
            musicToggle.textContent = "MUSIC: ON";
        }
        
        playClickSound();
        button.classList.add('active');
        
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        typeWriter(randomMsg, output);
        
        output.style.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        
        setTimeout(() => {
            button.classList.remove('active');
        }, 200);
    };

    // Event listeners
    buttons.forEach(button => {
        button.addEventListener('click', () => handleInteraction(button));
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleInteraction(button);
        }, { passive: false });
    });

    // Music toggle
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = "MUSIC: ON";
        } else {
            bgMusic.pause();
            musicToggle.textContent = "MUSIC: OFF";
        }
        playClickSound();
    });

    // Mobile viewport height fix
    const setViewportHeight = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();

    // Initialize audio context on first interaction
    document.body.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }, { once: true });
});