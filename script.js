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
// В конец скрипта добавьте
window.addEventListener('resize', () => {
    if (window.visualViewport) {
        document.documentElement.style.setProperty('--vh', `${window.visualViewport.height * 0.01}px`);
    }
});

// Обработка мобильного ввода
document.addEventListener('touchstart', function(e) {
    if (!e.target.classList.contains('cyber-button')) return;
    e.target.classList.add('active');
});

document.addEventListener('touchend', function(e) {
    if (!e.target.classList.contains('cyber-button')) return;
    e.target.classList.remove('active');
});
// Добавьте в конец скрипта
// Адаптация к виртуальной клавиатуре
let viewportHeight = window.innerHeight;
window.addEventListener('resize', () => {
    if (window.visualViewport) {
        const newViewportHeight = window.visualViewport.height;
        if (Math.abs(viewportHeight - newViewportHeight) > 100) {
            document.documentElement.style.setProperty('--vh', `${newViewportHeight * 0.01}px`);
        }
    }
});

// Обработка касаний
document.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('cyber-button')) {
        e.target.style.transform = 'scale(0.98)';
    }
}, { passive: true });

document.addEventListener('touchend', function(e) {
    if (e.target.classList.contains('cyber-button')) {
        e.target.style.transform = '';
    }
}, { passive: true });
// Основной код остаётся, добавляем новые функции

// 3D эффект параллакса
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelector('.container').style.transform = 
        `rotateX(${y}deg) rotateY(${x}deg)`;
});

// Интерактивный ввод команд
document.getElementById('commandInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = e.target.value;
        e.target.value = '';
        processCommand(command);
    }
});

function processCommand(command) {
    const output = document.getElementById('output');
    output.innerHTML = `>_ ${command}<br>${output.innerHTML}`;
    
    // Пример обработки команд
    switch(command.toLowerCase()) {
        case 'help':
            output.innerHTML = `Available commands:<br>
                - help: Show this message<br>
                - theme [dark/light]: Change theme<br>
                - music [on/off]: Toggle music<br>
                ${output.innerHTML}`;
            break;
        case 'theme dark':
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            break;
        case 'theme light':
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            break;
        default:
            output.innerHTML = `Unknown command: ${command}<br>${output.innerHTML}`;
    }
}

// Анимация системных ресурсов
function updateSystemStats() {
    document.querySelectorAll('.bar').forEach(bar => {
        const progress = Math.random() * 80 + 20;
        bar.style.setProperty('--progress', `${progress}%`);
    });
    requestAnimationFrame(updateSystemStats);
}
updateSystemStats();

// Интерактивные частицы
document.addEventListener('mousemove', (e) => {
    const particles = document.createElement('div');
    particles.className = 'particle';
    particles.style.left = e.pageX + 'px';
    particles.style.top = e.pageY + 'px';
    document.body.appendChild(particles);
    
    setTimeout(() => particles.remove(), 1000);
});

// Инициализация
document.body.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, { once: true });
// Переключение темы Matrix
const themeToggle = document.getElementById('themeToggle');
let isMatrixMode = false;

themeToggle.addEventListener('click', () => {
    isMatrixMode = !isMatrixMode;
    
    if(isMatrixMode) {
        document.body.classList.add('matrix-theme');
        themeToggle.textContent = "NORMAL MODE";
        
        // Добавляем эффект цифрового дождя
        startMatrixEffect();
    } else {
        document.body.classList.remove('matrix-theme');
        themeToggle.textContent = "MATRIX MODE";
        
        // Убираем эффект цифрового дождя
        stopMatrixEffect();
    }
    
    localStorage.setItem('matrixMode', isMatrixMode);
});

// Эффект цифрового дождя
function startMatrixEffect() {
    const container = document.querySelector('.container');
    const chars = '01';

    function createStream() {
        const stream = document.createElement('div');
        stream.className = 'matrix-stream';
        stream.style.left = Math.random() * 100 + 'vw';
        stream.style.animationDuration = Math.random() * 3 + 2 + 's';
        
        for(let i = 0; i < 20; i++) {
            const char = document.createElement('span');
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.color = `hsl(120, 100%, ${70 - (i * 3)}%)`;
            stream.appendChild(char);
        }
        
        container.appendChild(stream);
        
        setTimeout(() => stream.remove(), 10000);
    }

    function matrixLoop() {
        createStream();
        if(isMatrixMode) setTimeout(matrixLoop, 100);
    }

    matrixLoop();
}

function stopMatrixEffect() {
    document.querySelectorAll('.matrix-stream').forEach(stream => stream.remove());
}

// Проверка сохраненной темы
if(localStorage.getItem('matrixMode') === 'true') {
    themeToggle.click();
}