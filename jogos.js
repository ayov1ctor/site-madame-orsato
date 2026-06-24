// ==========================================
// CONFIGURAÇÕES EXISTENTES (QUIZ E CORAÇÕES)
// ==========================================
const quizData = [
    { question: "Qual dessas datas é o aniversário do nosso primeiro beijo?", options: ["24 de Maio", "30 de Maio", "06 de Junho", "12 de Junho"], answer: 2 },
    { question: "Se estivéssemos em Festa no Céu, onde nosso amor estaria escrito?", options: ["No Livro da Vida", "Nas cartas de baralho", "No relógio do Coelho", "Pintado nas rosas"], answer: 0 },
    { question: "Quem manda no coração do criador deste site?", options: ["A Rainha de Copas", "A Madame Orsato", "O Chapeleiro Maluco", "La Muerte"], answer: 1 }
];
let currentQuestionIndex = 0;
function loadQuiz() {
    const questionEl = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    feedbackEl.innerText = ""; optionsContainer.innerHTML = "";
    if (currentQuestionIndex >= quizData.length) {
        questionEl.innerText = "🎉 Parabéns! Você provou que nosso amor desafia qualquer mundo! ❤️"; return;
    }
    let currentQuiz = quizData[currentQuestionIndex]; questionEl.innerText = currentQuiz.question;
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button'); button.innerText = option;
        button.onclick = () => checkAnswer(index); optionsContainer.appendChild(button);
    });
}
function checkAnswer(selectedIndex) {
    const feedbackEl = document.getElementById('quiz-feedback');
    let currentQuiz = quizData[currentQuestionIndex];
    if (selectedIndex === currentQuiz.answer) {
        feedbackEl.innerHTML = "Acertou! 😍 Avançando..."; currentQuestionIndex++; setTimeout(loadQuiz, 1500);
    } else { feedbackEl.innerHTML = "Hmm, o coelho correu e você errou! Tente de novo! ⏳❌"; }
}
loadQuiz();

let score = 0; let gameInterval; const maxScore = 10;
function startCatchGame() {
    score = 0; document.getElementById('score-counter').innerText = score;
    document.getElementById('start-catch-btn').style.display = 'none';
    const catchArea = document.getElementById('catch-area'); catchArea.style.display = 'block'; catchArea.innerHTML = "";
    gameInterval = setInterval(spawnHeart, 800);
}
function spawnHeart() {
    const catchArea = document.getElementById('catch-area');
    if (score >= maxScore) {
        clearInterval(gameInterval);
        catchArea.innerHTML = "<div style='padding-top: 100px; font-weight:bold; color:#ffd700;'>🎉 Você pegou todos os meus corações! ❤️</div>";
        document.getElementById('start-catch-btn').style.display = 'inline-block'; document.getElementById('start-catch-btn').innerText = "Jogar Novamente"; return;
    }
    const heart = document.createElement('div'); heart.classList.add('heart-target'); heart.innerHTML = "❤️";
    const x = Math.random() * (catchArea.clientWidth - 40); const y = Math.random() * (catchArea.clientHeight - 40);
    heart.style.left = x + 'px'; heart.style.top = y + 'px';
    heart.onclick = () => { score++; document.getElementById('score-counter').innerText = score; heart.remove(); };
    catchArea.appendChild(heart);
    setTimeout(() => { if (heart.parentNode) heart.remove(); }, 1500);
}

// ==========================================
// NOVO JOGO 3: QUEBRA-CABEÇA (FESTA NO CÉU)
// ==========================================
const puzzleContainer = document.getElementById('puzzle-container');
let pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let shuffledPieces = [...pieces].sort(() => Math.random() - 0.5); // Sorteia as posições
let selectedPieceIndex = null;

function createPuzzle() {
    puzzleContainer.innerHTML = "";
    shuffledPieces.forEach((pieceValue, index) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        
        // Usa a imagem do Manolo para criar as partes do quebra-cabeça
        piece.style.backgroundImage = "url('festanoceu.jpg')";
        
        // Calcula a fatia correta da imagem para cada peça
        let row = Math.floor(pieceValue / 3);
        let col = pieceValue % 3;
        piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        
        piece.onclick = () => selectPiece(index);
        puzzleContainer.appendChild(piece);
    });
}

function selectPiece(index) {
    if (selectedPieceIndex === null) {
        selectedPieceIndex = index;
        puzzleContainer.children[index].style.transform = "scale(0.95)";
        puzzleContainer.children[index].style.border = "2px solid #ffd700";
    } else {
        // Troca os valores de lugar
        let temp = shuffledPieces[selectedPieceIndex];
        shuffledPieces[selectedPieceIndex] = shuffledPieces[index];
        shuffledPieces[index] = temp;
        
        selectedPieceIndex = null;
        createPuzzle();
        checkPuzzleWin();
    }
}

function checkPuzzleWin() {
    const isWin = shuffledPieces.every((val, i) => val === i);
    if (isWin) {
        document.getElementById('puzzle-win-message').innerText = "🎉 Incrível! Você montou perfeitamente a nossa pintura romântica! 🎨✨";
    }
}
createPuzzle();
// ==========================================
// JOGO 4: PLANTE UM JARDIM MÁGICO (CÓDIGO PURO)
// ==========================================

// Banco de dados usando SVGs puros embutidos (NUNCA QUEBRAM!)
const listaDeFlores = {
    "hortensia": { 
        nome: "Hortênsia", 
        svg: `<svg viewBox="0 0 100 150" width="70" height="105"><path d="M50,140 L50,80" stroke="#2e7d32" stroke-width="4" fill="none"/><path d="M50,110 Q30,100 45,90 Z" fill="#2e7d32"/><circle cx="50" cy="65" r="22" fill="#5c6bc0"/><circle cx="42" cy="55" r="10" fill="#7986cb"/><circle cx="58" cy="55" r="10" fill="#7986cb"/><circle cx="50" cy="75" r="12" fill="#3f51b5"/><circle cx="38" cy="68" r="9" fill="#9fa8da"/><circle cx="62" cy="68" r="9" fill="#9fa8da"/></svg>`
    },
    "rosa": { 
        nome: "Rosa Vermelha", 
        svg: `<svg viewBox="0 0 100 150" width="60" height="90"><path d="M50,130 L50,70" stroke="#1b5e20" stroke-width="4" fill="none"/><path d="M50,100 Q70,90 55,80 Z" fill="#1b5e20"/><circle cx="50" cy="50" r="20" fill="#b71c1c"/><circle cx="50" cy="46" r="15" fill="#d32f2f"/><circle cx="50" cy="42" r="10" fill="#f44336"/></svg>`
    },
    "calendula": { 
        nome: "Calêndula de Ouro", 
        svg: `<svg viewBox="0 0 100 150" width="60" height="90"><path d="M50,130 L50,70" stroke="#2e7d32" stroke-width="3" fill="none"/><circle cx="50" cy="50" r="22" fill="#ff6f00"/><circle cx="50" cy="50" r="17" fill="#ffb300"/><circle cx="50" cy="50" r="8" fill="#5d4037"/></svg>`
    },
    "girassol": { 
        nome: "Girassol", 
        svg: `<svg viewBox="0 0 100 150" width="65" height="98"><path d="M50,135 L50,75" stroke="#2e7d32" stroke-width="4" fill="none"/><circle cx="50" cy="50" r="25" fill="#ffeb3b"/><circle cx="50" cy="50" r="12" fill="#5d4037"/></svg>`
    },
    "tulipa": { 
        nome: "Tulipa", 
        svg: `<svg viewBox="0 0 100 150" width="55" height="82"><path d="M50,130 L50,75" stroke="#2e7d32" stroke-width="3" fill="none"/><path d="M35,50 C35,25 65,25 65,50 C65,75 35,75 35,50 Z" fill="#e91e63"/><path d="M42,50 C42,35 58,35 58,50 Z" fill="#ff4081"/></svg>`
    },
    "orquidea": { 
        nome: "Orquídea", 
        svg: `<svg viewBox="0 0 100 150" width="60" height="90"><path d="M50,130 L50,80" stroke="#2e7d32" stroke-width="3" fill="none"/><circle cx="50" cy="55" r="18" fill="#e040fb"/><ellipse cx="50" cy="55" rx="22" ry="8" fill="#ea80fc"/><circle cx="50" cy="55" r="7" fill="#ffff00"/></svg>`
    },
    "lirio": { 
        nome: "Lírio Branco",  
        svg: `<svg viewBox="0 0 100 150" width="60" height="90"><path d="M50,130 L50,75" stroke="#2e7d32" stroke-width="3" fill="none"/><circle cx="50" cy="50" r="20" fill="#ffffff"/><ellipse cx="50" cy="50" rx="25" ry="7" fill="#f5f5f5"/><circle cx="50" cy="50" r="5" fill="#ffeb3b"/></svg>`
    },
    "hibisco": { 
        nome: "Hibisco", 
        svg: `<svg viewBox="0 0 100 150" width="60" height="90"><path d="M50,130 L50,70" stroke="#2e7d32" stroke-width="3" fill="none"/><circle cx="50" cy="50" r="22" fill="#ff1744"/><path d="M50,50 L70,30" stroke="#ffea00" stroke-width="3" fill="none"/><circle cx="70" cy="30" r="3" fill="#ffea00"/></svg>`
    },
    "margarida": { 
        nome: "Margarida", 
        svg: `<svg viewBox="0 0 100 150" width="55" height="82"><path d="M50,130 L50,70" stroke="#2e7d32" stroke-width="3" fill="none"/><circle cx="50" cy="50" r="20" fill="#ffffff"/><circle cx="50" cy="50" r="8" fill="#ffeb3b"/></svg>`
    },
    "lavanda": { 
        nome: "Lavanda", 
        svg: `<svg viewBox="0 0 100 150" width="50" height="100"><path d="M50,140 L50,60" stroke="#2e7d32" stroke-width="3" fill="none"/><ellipse cx="50" cy="70" rx="8" ry="12" fill="#ba68c8"/><ellipse cx="50" cy="50" rx="7" ry="12" fill="#9c27b0"/><ellipse cx="50" cy="32" rx="5" ry="10" fill="#7b1fa2"/></svg>`
    }
};

const sugestoesIniciais = ["hortensia", "rosa", "calendula", "girassol", "tulipa", "orquidea", "lirio", "hibisco", "margarida", "lavanda"];
let currentSelectedFlowerSvg = listaDeFlores["hortensia"].svg; 
let currentSelectedFlowerNome = listaDeFlores["hortensia"].nome;
const jardimCanvas = document.getElementById('jardim-canvas');

function carregarSugestoes() {
    const container = document.getElementById('suggested-flowers');
    container.innerHTML = "";
    sugestoesIniciais.forEach(key => {
        const flor = listaDeFlores[key];
        const btn = document.createElement('button');
        btn.innerText = flor.nome;
        btn.onclick = () => selectFlower(flor.svg, flor.nome);
        container.appendChild(btn);
    });
}

function selectFlower(svg, nome) {
    currentSelectedFlowerSvg = svg;
    currentSelectedFlowerNome = nome;
    document.getElementById('current-flower-badge').innerText = `🌱 ${nome}`;
    document.getElementById('search-feedback').innerText = "";
}

function searchFlower() {
    const input = document.getElementById('search-flower-input').value.toLowerCase().trim();
    const feedback = document.getElementById('search-feedback');
    const buscaTratada = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (listaDeFlores[buscaTratada]) {
        const florEncontrada = listaDeFlores[buscaTratada];
        selectFlower(florEncontrada.svg, florEncontrada.nome);
        feedback.style.color = "#27ae60";
        feedback.innerText = `✨ ${florEncontrada.nome} encontrada!`;
    } else if (buscaTratada === "") {
        feedback.innerText = "Digite o nome de uma flor.";
    } else {
        feedback.style.color = "#ff4a4a";
        feedback.innerText = "Flor não encontrada. Tente 'Margarida' ou 'Lavanda'!";
    }
}

jardimCanvas.addEventListener('click', function(e) {
    if(e.target.id !== 'jardim-canvas' && !e.target.classList.contains('jardim-solo')) return;

    const rect = jardimCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left - 30; // Centraliza o vaso/caule no clique
    const randomBottom = Math.floor(Math.random() * 15) + 20; 

    // Cria um container para o bloco SVG
    const wrapper = document.createElement('div');
    wrapper.classList.add('flower-planted');
    wrapper.innerHTML = currentSelectedFlowerSvg;
    
    wrapper.style.left = x + 'px';
    wrapper.style.bottom = randomBottom + 'px';

    // Vento individual e orgânico para cada uma
    const tempoVento = (Math.random() * 1.5 + 2.5).toFixed(2) + 's';
    wrapper.style.setProperty('--tempo-vento', tempoVento);

    jardimCanvas.appendChild(wrapper);
});

function clearGarden() {
    document.querySelectorAll('.flower-planted').forEach(f => f.remove());
}

function saveGardenImage() {
    html2canvas(jardimCanvas).then(canvas => {
        const link = document.createElement('a');
        link.download = 'nosso-jardim-magico.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

carregarSugestoes();