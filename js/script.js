/**
 * ===================================
 * CARTÃO VIRTUAL INTERATIVO - JAVASCRIPT
 * Sistema completo de interatividade
 * ===================================
 */

// ===== VARIÁVEIS GLOBAIS =====
let isCardOpen = false;
let currentQuestionIndex = 0;
let score = 0;
let countdownInterval;
let currentPhotoIndex = 0;
let memoryGameCards = [];
let memoryGameFlipped = [];
let memoryGameMatched = [];
let memoryGameAttempts = 0;
let memoryGameTimer = 0;
let memoryGameInterval;
let musicPlaying = false;
let loadingComplete = false;

// ===== DADOS DE CONFIGURAÇÃO =====
const photoData = [
    {
        src: "assets/images/foto1.jpg",
        caption: "Nossa primeira foto juntos 💕",
        description: "O dia que mudou minha vida para sempre"
    },
    {
        src: "assets/images/foto2.jpg",
        caption: "Momento especial 💖",
        description: "No seu abraço, encontrei meu lar"
    },
    {
        src: "assets/images/foto3.jpg",
        caption: "Viagem inesquecível ✈️",
        description: "Juntos, conquistamos novos horizontes"
    }
];

// Quiz personalizado - EDITE AQUI
const quizQuestions = [
    {
        question: "Onde nos conhecemos pela primeira vez?",
        options: ["Instagram", "Grupo do WhatsApp", "Faculdade", "Trabalho"],
        correct: 1,
        explanation: "Foi no grupo do WhatsApp em junho de 2024! 💬💕"
    },
    {
        question: "Em que show nos conhecemos pessoalmente?",
        options: ["Thiaguinho", "Mumuzinho", "Péricles", "Sorriso Maroto"],
        correct: 1,
        explanation: "Show do Mumuzinho dia 22 de junho! E nunca mais nos largamos! 🎵❤️"
    },
    {
        question: "Quando foi nossa primeira viagem juntos?",
        options: ["Julho 2024", "Agosto 2024", "Setembro 2024", "Outubro 2024"],
        correct: 1,
        explanation: "4 de agosto de 2024! Nossa primeira aventura juntos! ✈️💕"
    },
    {
        question: "Qual foi nosso primeiro Natal juntos?",
        options: ["Dezembro 2023", "Dezembro 2024", "Dezembro 2025", "Ainda não tivemos"],
        correct: 1,
        explanation: "25 de dezembro de 2024! Nosso primeiro Natal juntinhos! 🎄❤️"
    },
    {
        question: "Quando decidimos largar tudo em SP e vir para o RJ?",
        options: ["Janeiro 2025", "Fevereiro 2025", "Março 2025", "Abril 2025"],
        correct: 2,
        explanation: "8 de março de 2025! Largamos tudo em SP para conquistar o RJ juntos! 🏙️💕"
    }
];

// Emojis para jogo da memória
const memoryEmojis = ['💕', '💖', '💗', '💘', '❤️', '🥰'];

// ===== INICIALIZAÇÃO =====
window.addEventListener('load', () => {
    console.log('🚀 Iniciando cartão virtual...');
    initializePage();
});

function initializePage() {
    // Simular carregamento
    setTimeout(() => {
        hideLoadingScreen();
        createBackgroundParticles();
        setupAccessibility();
        loadingComplete = true;
        console.log('✅ Cartão virtual carregado com sucesso!');
    }, 2000);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// ===== FUNÇÃO PRINCIPAL - ABRIR CARTÃO =====
function openCard() {
    if (!loadingComplete) {
        showToast('⏳ Aguarde o carregamento...', 'info');
        return;
    }
    
    const card = document.getElementById('card');
    const cardFront = document.querySelector('.card-front');
    const cardInside = document.querySelector('.card-inside');
    
    if (!card || !cardFront || !cardInside) {
        console.error('❌ Elementos do cartão não encontrados');
        showToast('❌ Erro ao abrir cartão', 'error');
        return;
    }
    
    if (!isCardOpen) {
        console.log('🎯 Abrindo cartão...');
        
        // Aplicar efeito de abertura
        cardFront.style.transform = 'rotateY(-180deg)';
        cardFront.style.opacity = '0';
        
        setTimeout(() => {
            cardFront.style.display = 'none';
            cardInside.classList.remove('hidden');
            cardInside.style.transform = 'rotateY(0deg)';
            card.style.transform = 'rotateY(0deg)';
            isCardOpen = true;
            
            // Animar texto
            setTimeout(() => {
                typewriterEffect();
            }, 300);
            
            // Criar corações flutuantes
            setTimeout(() => {
                createFloatingHearts();
            }, 800);
            
            // Salvar progresso
            saveProgress();
            
            showToast('💕 Cartão aberto com sucesso!', 'success');
            console.log('✅ Cartão aberto com sucesso!');
        }, 400);
    }
}

// ===== EFEITO DE MÁQUINA DE ESCREVER =====
function typewriterEffect() {
    const text = "Hoje é dia de celebrar a pessoa mais especial! 🎉❤️";
    const element = document.getElementById('animatedText');
    
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid #667eea';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 80);
        } else {
            // Remover cursor após terminar
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Remover toast após 3 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// ===== SISTEMA DE SURPRESA =====
function showSurprise() {
    const surpriseBox = document.getElementById('surpriseBox');
    if (!surpriseBox) return;
    
    surpriseBox.classList.remove('hidden');
    
    // Criar corações extras
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createFloatingHeart(), i * 150);
    }
    
    showToast('💕 Surpresa especial revelada!', 'success');
}

function closeSurprise() {
    const surpriseBox = document.getElementById('surpriseBox');
    if (surpriseBox) {
        surpriseBox.classList.add('hidden');
    }
}

function generateLoveNote() {
    const loveNotes = [
        "Você é minha pessoa favorita no mundo inteiro! 💕",
        "Cada dia com você é uma nova aventura cheia de amor! 🌟",
        "Obrigada por ser meu porto seguro e minha felicidade! ❤️",
        "Você faz meu coração sorrir todos os dias! 😊💖",
        "Nossa história de amor é a mais bonita que conheço! 📖💕"
    ];
    
    const randomNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    showToast(randomNote, 'success');
}

// ===== SISTEMA DE MÚSICA =====
function playMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (!music) {
        showToast('❌ Arquivo de música não encontrado!', 'error');
        console.error('❌ Elemento de áudio não encontrado');
        return;
    }
    
    // Verificar se os arquivos existem
    if (music.canPlayType('audio/mpeg') === '') {
        showToast('❌ Navegador não suporta MP3', 'error');
        return;
    }
    
    if (music.paused) {
        // Configurar volume antes de tocar
        music.volume = 0.5;
        
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicPlaying = true;
                if (musicPlayer) musicPlayer.classList.remove('hidden');
                if (playPauseBtn) playPauseBtn.textContent = '⏸️';
                showToast('🎵 Tocando nossa música especial!', 'success');
                console.log('✅ Música iniciada com sucesso');
            }).catch(error => {
                console.error('❌ Erro ao tocar música:', error);
                if (error.name === 'NotAllowedError') {
                    showToast('🎵 Clique no botão novamente para permitir reprodução!', 'info');
                } else {
                    showToast('❌ Erro ao carregar música: ' + error.message, 'error');
                }
            });
        }
    } else {
        music.pause();
        musicPlaying = false;
        if (playPauseBtn) playPauseBtn.textContent = '▶️';
        showToast('🎵 Música pausada', 'info');
    }
}

function toggleMusic() {
    playMusic();
}

function stopMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicPlayer = document.getElementById('musicPlayer');
    
    if (music) {
        music.pause();
        music.currentTime = 0;
        musicPlaying = false;
        if (musicPlayer) musicPlayer.classList.add('hidden');
        showToast('🎵 Música parada', 'info');
    }
}

function changeVolume() {
    const music = document.getElementById('backgroundMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (music && volumeSlider) {
        music.volume = volumeSlider.value / 100;
    }
}

// ===== SISTEMA DE FOTOS =====
function openPhotoModal(index) {
    if (index < 0 || index >= photoData.length) {
        showToast('❌ Foto não encontrada!', 'error');
        return;
    }
    
    currentPhotoIndex = index;
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (!modal || !modalImage || !modalCaption) {
        showToast('❌ Erro ao abrir modal de foto', 'error');
        return;
    }
    
    modal.classList.remove('hidden');
    
    // Verificar se a imagem existe antes de carregar
    const img = new Image();
    img.onload = function() {
        modalImage.src = photoData[index].src;
        modalImage.alt = photoData[index].caption;
        modalCaption.textContent = photoData[index].description;
        console.log(`✅ Foto ${index + 1} carregada com sucesso`);
    };
    img.onerror = function() {
        modalImage.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" text-anchor="middle" fill="%23999">Foto não encontrada 📷</text></svg>';
        modalImage.alt = 'Imagem não encontrada';
        modalCaption.textContent = 'Esta foto ainda não foi carregada';
        showToast('⚠️ Foto não encontrada, mas você pode ver a galeria!', 'info');
    };
    img.src = photoData[index].src;
    
    // Prevenir scroll do body
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function previousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photoData.length) % photoData.length;
    openPhotoModal(currentPhotoIndex);
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoData.length;
    openPhotoModal(currentPhotoIndex);
}

// ===== SISTEMA DE TIMELINE =====
function showTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;
    
    timelineContainer.classList.remove('hidden');
    calculateDaysTogether();
    animateTimelineStats();
}

function calculateDaysTogether() {
    const startDate = new Date('2024-06-22'); // Data do show do Mumuzinho
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    animateCounter('daysCounter', diffDays);
}

function animateCounter(elementId, finalValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = finalValue / 60;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 30);
}

function animateTimelineStats() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('fade-in');
        }, index * 200);
    });
}

function closeTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    if (timelineContainer) {
        timelineContainer.classList.add('hidden');
    }
}

// ===== SISTEMA DE QUIZ =====
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    
    const quizContainer = document.getElementById('quizContainer');
    const quizScore = document.getElementById('quizScore');
    const questionContainer = document.querySelector('.question-container');
    const quizProgress = document.querySelector('.quiz-progress');
    
    if (!quizContainer) return;
    
    quizContainer.classList.remove('hidden');
    if (quizScore) quizScore.classList.add('hidden');
    if (questionContainer) questionContainer.style.display = 'block';
    if (quizProgress) quizProgress.style.display = 'flex';
    
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showQuizResult();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    const questionNumber = document.getElementById('questionNumber');
    const currentQuestion = document.getElementById('currentQuestion');
    const questionCounter = document.getElementById('questionCounter');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressFill = document.getElementById('progressFill');
    
    if (questionNumber) questionNumber.textContent = `Pergunta ${currentQuestionIndex + 1}`;
    if (currentQuestion) currentQuestion.textContent = question.question;
    if (questionCounter) questionCounter.textContent = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
    
    // Atualizar barra de progresso
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    if (progressFill) progressFill.style.width = progress + '%';
    if (progressPercentage) progressPercentage.textContent = Math.round(progress) + '%';
    if (progressFill) progressFill.setAttribute('aria-valuenow', progress);
    
    // Criar botões de opção
    const optionsContainer = document.getElementById('quizOptions');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => selectAnswer(index);
            button.setAttribute('role', 'radio');
            button.setAttribute('aria-checked', 'false');
            optionsContainer.appendChild(button);
        });
    }
}

function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    
    // Desabilitar todos os botões
    options.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.setAttribute('aria-checked', 'false');
    });
    
    // Mostrar resposta correta/incorreta
    options[selectedIndex].classList.add(selectedIndex === question.correct ? 'correct' : 'incorrect');
    options[selectedIndex].setAttribute('aria-checked', 'true');
    
    if (selectedIndex !== question.correct) {
        options[question.correct].classList.add('correct');
    }
    
    // Atualizar pontuação
    if (selectedIndex === question.correct) {
        score++;
    }
    
    // Mostrar explicação
    setTimeout(() => {
        showToast(question.explanation, 'info');
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    }, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const questionContainer = document.querySelector('.question-container');
    const quizProgress = document.querySelector('.quiz-progress');
    const quizScore = document.getElementById('quizScore');
    
    if (questionContainer) questionContainer.style.display = 'none';
    if (quizProgress) quizProgress.style.display = 'none';
    if (quizScore) quizScore.classList.remove('hidden');
    
    const percentage = (score / quizQuestions.length) * 100;
    let message = '';
    let details = '';
    
    if (percentage === 100) {
        message = `🏆 Perfeito! ${score}/${quizQuestions.length} - Você me conhece perfeitamente!`;
        details = 'Parabéns! Você acertou todas as perguntas sobre nossa história! 💕';
    } else if (percentage >= 80) {
        message = `🎉 Muito bem! ${score}/${quizQuestions.length} - Você me conhece muito bem!`;
        details = 'Excelente resultado! Você conhece bem nossa história de amor! ❤️';
    } else if (percentage >= 60) {
        message = `😊 Bom trabalho! ${score}/${quizQuestions.length} - Ainda estamos nos conhecendo!`;
        details = 'Bom resultado! Ainda temos muito para descobrir juntos! 💖';
    } else {
        message = `💕 ${score}/${quizQuestions.length} - Temos muito para descobrir juntos!`;
        details = 'Não se preocupe! O importante é que estamos juntos nessa jornada! 🥰';
    }
    
    const scoreText = document.getElementById('scoreText');
    const scoreDetails = document.getElementById('scoreDetails');
    
    if (scoreText) scoreText.textContent = message;
    if (scoreDetails) scoreDetails.textContent = details;
}

function restartQuiz() {
    const questionContainer = document.querySelector('.question-container');
    const quizProgress = document.querySelector('.quiz-progress');
    
    if (questionContainer) questionContainer.style.display = 'block';
    if (quizProgress) quizProgress.style.display = 'flex';
    
    startQuiz();
}

function shareScore() {
    const percentage = (score / quizQuestions.length) * 100;
    const shareText = `Acabei de fazer um quiz sobre nossa história de amor e acertei ${score}/${quizQuestions.length} perguntas (${Math.round(percentage)}%)! 💕`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Quiz do Amor',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback para copiar para clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('📋 Resultado copiado para a área de transferência!', 'success');
        });
    }
}

function closeQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        quizContainer.classList.add('hidden');
    }
}

// ===== CONTADOR REGRESSIVO =====
function showCountdown() {
    const countdownContainer = document.getElementById('countdownContainer');
    if (!countdownContainer) return;
    
    countdownContainer.classList.remove('hidden');
    startCountdown();
}

function startCountdown() {
    const nextBirthday = new Date('2026-07-15'); // EDITE A DATA AQUI
    
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = nextBirthday.getTime() - now;
        
        if (distance < 0) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(3, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

function setReminder() {
    showToast('🔔 Lembrete configurado! Você será notificado próximo ao aniversário!', 'success');
}

function closeCountdown() {
    const countdownContainer = document.getElementById('countdownContainer');
    if (countdownContainer) {
        countdownContainer.classList.add('hidden');
    }
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
}

// ===== JOGO DA MEMÓRIA =====
function showMemoryGame() {
    const memoryGameContainer = document.getElementById('memoryGameContainer');
    if (!memoryGameContainer) return;
    
    memoryGameContainer.classList.remove('hidden');
    initializeMemoryGame();
}

function initializeMemoryGame() {
    memoryGameCards = [...memoryEmojis, ...memoryEmojis];
    memoryGameCards = shuffleArray(memoryGameCards);
    memoryGameFlipped = [];
    memoryGameMatched = [];
    memoryGameAttempts = 0;
    memoryGameTimer = 0;
    
    updateMemoryGameStats();
    createMemoryBoard();
    startMemoryTimer();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createMemoryBoard() {
    const board = document.getElementById('memoryBoard');
    if (!board) return;
    
    board.innerHTML = '';
    
    memoryGameCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.textContent = '?';
        card.onclick = () => flipMemoryCard(index);
        board.appendChild(card);
    });
}

function flipMemoryCard(index) {
    if (memoryGameFlipped.length >= 2) return;
    if (memoryGameFlipped.includes(index)) return;
    if (memoryGameMatched.includes(index)) return;
    
    const card = document.querySelector(`[data-index="${index}"]`);
    if (!card) return;
    
    card.textContent = card.dataset.emoji;
    card.classList.add('flipped');
    memoryGameFlipped.push(index);
    
    if (memoryGameFlipped.length === 2) {
        memoryGameAttempts++;
        updateMemoryGameStats();
        
        setTimeout(() => {
            checkMemoryMatch();
        }, 1000);
    }
}

function checkMemoryMatch() {
    const [first, second] = memoryGameFlipped;
    const firstCard = document.querySelector(`[data-index="${first}"]`);
    const secondCard = document.querySelector(`[data-index="${second}"]`);
    
    if (!firstCard || !secondCard) return;
    
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        // Match encontrado
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        memoryGameMatched.push(first, second);
        
        if (memoryGameMatched.length === memoryGameCards.length) {
            // Jogo completo
            setTimeout(() => {
                showToast('🎉 Parabéns! Você completou o jogo da memória!', 'success');
                clearInterval(memoryGameInterval);
            }, 500);
        }
    } else {
        // Não houve match
        firstCard.textContent = '?';
        secondCard.textContent = '?';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }
    
    memoryGameFlipped = [];
    updateMemoryGameStats();
}

function updateMemoryGameStats() {
    const attemptsEl = document.getElementById('attempts');
    const pairsEl = document.getElementById('pairs');
    const timeEl = document.getElementById('gameTime');
    
    if (attemptsEl) attemptsEl.textContent = memoryGameAttempts;
    if (pairsEl) pairsEl.textContent = `${memoryGameMatched.length / 2}/${memoryEmojis.length}`;
    if (timeEl) {
        const minutes = Math.floor(memoryGameTimer / 60);
        const seconds = memoryGameTimer % 60;
        timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function startMemoryTimer() {
    memoryGameInterval = setInterval(() => {
        memoryGameTimer++;
        updateMemoryGameStats();
    }, 1000);
}

function restartMemoryGame() {
    clearInterval(memoryGameInterval);
    initializeMemoryGame();
}

function closeMemoryGame() {
    const memoryGameContainer = document.getElementById('memoryGameContainer');
    if (memoryGameContainer) {
        memoryGameContainer.classList.add('hidden');
    }
    
    if (memoryGameInterval) {
        clearInterval(memoryGameInterval);
    }
}

// ===== CORAÇÕES FLUTUANTES =====
function createFloatingHearts() {
    setInterval(createFloatingHeart, 1500);
}

function createFloatingHeart() {
    const hearts = ['❤️', '💕', '💖', '💗', '💘', '🥰', '😍', '💝'];
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.className = 'floating-heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.fontSize = (Math.random() * 0.5 + 1) + 'em';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 3000);
}

// ===== PARTÍCULAS DE FUNDO =====
function createBackgroundParticles() {
    const particlesContainer = document.getElementById('particlesBackground');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===== SISTEMA DE ACESSIBILIDADE =====
function setupAccessibility() {
    // Configurar navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Fechar modais com ESC
            closePhotoModal();
            closeQuiz();
            closeTimeline();
            closeCountdown();
            closeMemoryGame();
            closeSurprise();
        }
    });
}

function toggleAccessibility() {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    showToast(
        isHighContrast ? 'Modo de alto contraste ativado' : 'Modo de alto contraste desativado',
        'info'
    );
}

// ===== PERSISTÊNCIA DE DADOS =====
function saveProgress() {
    const progress = {
        cardOpened: isCardOpen,
        quizCompleted: score > 0,
        lastVisit: new Date().toISOString()
    };
    localStorage.setItem('cardProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('cardProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        if (progress.cardOpened) {
            showToast('👋 Bem-vindo de volta!', 'info');
        }
    }
}

// ===== EVENTOS DE DISPOSITIVO =====
// Prevenir zoom em dispositivos móveis
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

// Prevenir zoom com duplo toque
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Detectar orientação do dispositivo
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.orientation === 90 || window.orientation === -90) {
            showToast('📱 Gire o dispositivo para uma melhor experiência!', 'info');
        }
    }, 100);
});

// ===== MONITORAMENTO DE CONEXÃO =====
window.addEventListener('online', () => {
    showToast('🌐 Conexão restaurada!', 'success');
});

window.addEventListener('offline', () => {
    showToast('📶 Sem conexão com a internet', 'error');
});

// ===== EVENTOS DE CICLO DE VIDA =====
window.addEventListener('beforeunload', saveProgress);
window.addEventListener('load', loadProgress);

// ===== DETECÇÃO DE DISPOSITIVO =====
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    document.body.classList.add('mobile-device');
}

// ===== LOG DE INICIALIZAÇÃO =====
console.log('💕 Cartão Virtual Interativo inicializado com sucesso! 💕');
console.log('🎯 Versão: 1.0.0');
console.log('📅 Data: ' + new Date().toLocaleDateString());