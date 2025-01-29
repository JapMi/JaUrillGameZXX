document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('access-denied');
});

function checkAccess() {
    const code = document.getElementById('accessCode').value;
    const error = document.getElementById('accessError');
    
    if(code === '1337') {
        document.querySelector('.access-modal').style.display = 'none';
        document.body.classList.remove('access-denied');
        // Активируем звук после успешного ввода кода
        const clickSound = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
        clickSound.play();
    } else {
        error.textContent = 'НЕВЕРНЫЙ КОД! ПОПРОБУЙТЕ СНОВА';
        error.style.display = 'block';
        // Эффект ошибки
        document.querySelector('.access-box').animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });
    }
}

// Обработка нажатия Enter
document.getElementById('accessCode').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') checkAccess();
});
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
    let isMatrixMode = false;
    let errorInterval;

    // Инициализация настроек
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme + '-theme');
    
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume) {
        volumeLevel = parseFloat(savedVolume);
        volumeControl.value = volumeLevel;
        bgMusic.volume = volumeLevel;
    }

    // Обработчики событий
    buttons.forEach(button => {
        button.addEventListener('click', () => handleInteraction(button));
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleInteraction(button);
        }, { passive: false });
    });

    // Переключение темы
    themeToggle.addEventListener('click', () => {
        isMatrixMode = !isMatrixMode;
        if(isMatrixMode) {
            document.body.classList.add('matrix-theme');
            themeToggle.textContent = "NORMAL MODE";
            stopNormalEffects();
            startMatrixEffect();
        } else {
            document.body.classList.remove('matrix-theme');
            themeToggle.textContent = "MATRIX MODE";
            stopMatrixEffect();
            startNormalEffects();
        }
        localStorage.setItem('matrixMode', isMatrixMode);
    });

    // Эффекты
    function startNormalEffects() {
        errorInterval = setInterval(createError, 1500);
    }

    function stopNormalEffects() {
        clearInterval(errorInterval);
        document.querySelectorAll('.error-fall').forEach(el => el.remove());
    }

    function createError() {
        const error = document.createElement('div');
        error.className = 'error-fall';
        error.textContent = 'ERROR';
        error.style.left = Math.random() * 95 + '%';
        error.style.fontSize = Math.random() * 20 + 10 + 'px';
        error.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.querySelector('.error-fall-effect').appendChild(error);
        setTimeout(() => error.remove(), 5000);
    }

    function startMatrixEffect() {
        function createStream() {
            const stream = document.createElement('div');
            stream.className = 'matrix-stream';
            stream.style.left = Math.random() * 100 + 'vw';
            stream.style.animationDuration = Math.random() * 3 + 2 + 's';
            for(let i = 0; i < 20; i++) {
                const char = document.createElement('span');
                char.textContent = Math.random() > 0.5 ? '0' : '1';
                char.style.color = `hsl(120, 100%, ${70 - (i * 3)}%)`;
                stream.appendChild(char);
            }
            document.querySelector('.container').appendChild(stream);
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

    // Инициализация эффектов
    if(localStorage.getItem('matrixMode') === 'true') {
        themeToggle.click();
    } else {
        startNormalEffects();
    }

    // Полный JavaScript доступен по ссылке: https://gist.github.com/... 
});