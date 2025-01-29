document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cyber-button');
    const output = document.getElementById('output');
    const bgMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const volumeControl = document.getElementById('volume');
    const themeToggle = document.getElementById('themeToggle');
    const volumeIcon = document.getElementById('volumeIcon');
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let musicStarted = false;
    let volumeLevel = 0.5;
    let lastVolume = 0.5;
    
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

    const soundPresets = {
        btn1: { freq: 800, type: 'square', duration: 40 },
        btn2: { freq: 1200, type: 'sawtooth', duration: 60 },
        btn3: { freq: 400, type: 'triangle', duration: 80 }
    };

    const playButtonSound = (buttonId) => {
        if (volumeLevel === 0) return;
        
        const preset = soundPresets[buttonId];
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = preset.type;
        oscillator.frequency.setValueAtTime(preset.freq, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.1 * volumeLevel, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + preset.duration * 0.001);
        
        oscillator.connect(gainNode).connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + preset.duration * 0.001);
    };

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

    const handleInteraction = (button) => {
        if (!musicStarted) {
            bgMusic.play().catch(() => {});
            musicStarted = true;
            musicToggle.textContent = "MUSIC: ON";
        }
        
        playButtonSound(button.id);
        button.classList.add('active');
        
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        typeWriter(randomMsg, output);
        
        output.style.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        
        setTimeout(() => {
            button.classList.remove('active');
        }, 200);
    };

    // Инициализация настроек
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme + '-theme');
    
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume) {
        volumeLevel = parseFloat(savedVolume);
        volumeControl.value = volumeLevel;
        bgMusic.volume = volumeLevel;
        updateVolumeIcon();
    }

    // Обработчики событий
    buttons.forEach(button => {
        button.addEventListener('click', () => handleInteraction(button));
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleInteraction(button);
        }, { passive: false });
    });

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = "MUSIC: ON";
        } else {
            bgMusic.pause();
            musicToggle.textContent = "MUSIC: OFF";
        }
        playButtonSound('btn1');
    });

    volumeControl.addEventListener('input', (e) => {
        volumeLevel = e.target.value;
        bgMusic.volume = volumeLevel;
        localStorage.setItem('volume', volumeLevel);
        updateVolumeIcon();
    });

    function updateVolumeIcon() {
        volumeIcon.textContent = volumeLevel > 0 ? '🔊' : '🔇';
        if (volumeLevel > 0) lastVolume = volumeLevel;
    }

    volumeIcon.addEventListener('click', () => {
        if (volumeLevel > 0) {
            lastVolume = volumeLevel;
            volumeLevel = 0;
        } else {
            volumeLevel = lastVolume;
        }
        
        volumeControl.value = volumeLevel;
        bgMusic.volume = volumeLevel;
        localStorage.setItem('volume', volumeLevel);
        updateVolumeIcon();
        playButtonSound('btn2');
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        playButtonSound('btn3');
    });

    // Адаптация высоты вьюпорта
    const setViewportHeight = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();

    // Активация аудио контекста
    document.body.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }, { once: true });

    // Обработка ошибок аудио
    bgMusic.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        musicToggle.textContent = "MUSIC ERROR";
        musicToggle.disabled = true;
    });
});