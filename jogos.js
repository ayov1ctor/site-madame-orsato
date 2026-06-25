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
// ==========================================
// JOGO 5: O LABIRINTO DO TEMPO E SORRISOS
// ==========================================

let aliceCurrentStage = 1;
let catPathSelected = [];
const correctCatPath = [2, 0, 3, 1]; // O caminho correto pelas ilusões do Gato

function loadAliceStage() {
    const zone = document.getElementById('alice-game-zone');
    const progress = document.getElementById('alice-progress');
    const feedback = document.getElementById('alice-feedback');
    feedback.innerText = "";

    if (aliceCurrentStage === 1) {
        progress.innerText = "Fase 1: O Relógio de Engrenagens do Coelho ⏳";
        zone.innerHTML = `
            <p style="font-size: 0.95rem; margin-bottom: 15px;">O Coelho Branco quebrou seu relógio de bolso principal. Para consertá-lo, as engrenagens precisam somar o valor exato do tempo perdido. Descubra a lógica:</p>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; font-family: monospace; margin-bottom: 15px;">
                Engrenagem A (Horas) = 7 <br>
                Engrenagem B (Minutos) = A x 3 - 5 <br>
                Engrenagem C (Segundos) = (B + A) / 2 <br><br>
                <b>Código de Ativação do Relógio = (A + B) x C</b>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                <input type="number" id="gear-input" placeholder="Digite o Código..." style="padding: 10px; border-radius: 5px; border: 1px solid #ba68c8; background: #111; color: #fff; text-align: center; width: 220px;">
                <div>
                    <button onclick="verifyStage1()" style="background: #ba68c8; padding: 10px 20px;">Encaixar Engrenagens</button>
                    <button onclick="openHatterTip()" style="background: rgba(255, 215, 0, 0.2); border: 1px solid #ffd700; color: #ffd700; margin-left: 10px; padding: 10px 15px; border-radius: 20px; font-size: 0.85rem; cursor: pointer;">💡 Pedir Dica</button>
                </div>
            </div>
        `;
    }
    else if (aliceCurrentStage === 2) {
        progress.innerText = "Fase 2: As Ilusões do Gato de Cheshire 🐱🐾";
        catPathSelected = [];
        zone.innerHTML = `
            <p style="font-size: 0.95rem; margin-bottom: 15px;">O Gato Sorridente se dividiu em 4 caminhos flutuantes. Três caminhos somem no ar e te jogam no início. Apenas a sequência exata das pegadas revela o caminho real!</p>
            <p style="font-size: 0.85rem; color: #ea80fc; font-style: italic; margin-bottom: 15px;">Dica do Sorriso: "O terceiro vem primeiro, o segundo vem por último, e o quarto fica antes do segundo."</p>
            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <button onclick="chooseCatPath(0)" class="path-btn" style="background: rgba(186, 104, 200, 0.2); width: 100px;">Caminho 1</button>
                <button onclick="chooseCatPath(1)" class="path-btn" style="background: rgba(186, 104, 200, 0.2); width: 100px;">Caminho 2</button>
                <button onclick="chooseCatPath(2)" class="path-btn" style="background: rgba(186, 104, 200, 0.2); width: 100px;">Caminho 3</button>
                <button onclick="chooseCatPath(3)" class="path-btn" style="background: rgba(186, 104, 200, 0.2); width: 100px;">Caminho 4</button>
            </div>
            <p style="margin-top: 15px; font-size: 0.85rem; color: #aaa;">Sua sequência atual: <span id="current-path-view">-</span></p>
        `;
    } 
    else if (aliceCurrentStage === 3) {
        progress.innerText = "Fase 3: O Paradoxo do Amor Eterno 🗝️🪞";
        zone.innerHTML = `
            <p style="font-size: 0.95rem; margin-bottom: 15px;">Você cruzou o tempo e as ilusões. Agora, diante do espelho do País das Maravilhas, o cadeado final pede a resposta para o maior mistério de todos.</p>
            <p style="font-size: 0.9rem; color: #ffd700; font-weight: bold; margin-bottom: 15px;">"Quem é a única pessoa capaz de fazer o tempo parar e o sorriso mais lindo deste mundo aparecer?"</p>
            <input type="text" id="final-alice-input" placeholder="Digite o nome dela aqui..." style="padding: 10px; border-radius: 20px; border: 1px solid #ffd700; background: #111; color: #fff; text-align: center; width: 250px;">
            <button onclick="verifyStage3()" style="margin-left: 10px; background: #27ae60; color: white;">Decifrar Destino</button>
        `;
    } 
    else if (aliceCurrentStage === 4) {
        progress.innerText = "❤️ O Labirinto Foi Vencido! ❤️";
        zone.style.textAlign = "left";
        zone.style.lineHeight = "1.8";
        zone.innerHTML = `
            <h3 style="color: #ffd700; text-align: center; margin-bottom: 15px;">✨ A História de Amor Além do Espelho ✨</h3>
            <p>O Coelho Branco correu o mundo inteiro, cruzou os ponteiros do tempo e descobriu que nenhuma engrenagem corre mais rápido do que a batida do meu coração quando te vê. O Gato Sorridente admitiu que todas as suas ilusões e truques perdem a graça perto do brilho real e encantador do seu sorriso.</p>
            <p>Seja no País das Maravilhas, no Além de Festa no Céu, ou em qualquer realidade paralela, nosso amor não é um quebra-cabeça confuso ou um jogo de pressa. Ele é o lugar seguro onde o tempo escolhe parar, onde o impossível ganha forma e onde eu escolho estar, todos os dias, segurando a sua mão.</p>
            <p style="text-align: center; font-weight: bold; font-size: 1.2rem; margin-top: 20px; color: #ea80fc;">Obrigado por ser a minha melhor aventura! 🥰💍</p>
        `;
    }
}

// Validação da Fase 1 (Matemática: A=7, B=16, C=11.5 -> (7+16)*11.5 = 264.5, arredondando lógica para 264)
function verifyStage1() {
    const val = document.getElementById('gear-input').value;
    const feedback = document.getElementById('alice-feedback');
    if (parseInt(val) === 264 || parseInt(val) === 265) {
        feedback.style.color = "#27ae60";
        feedback.innerText = "✨ Click! As engrenagens giraram e o relógio voltou a funcionar! Avançando...";
        setTimeout(() => {
            aliceCurrentStage = 2;
            loadAliceStage();
        }, 2000);
    } else {
        feedback.style.color = "#ff4a4a";
        feedback.innerText = "O relógio travou! O tempo está correndo errado, refaça as contas.";
    }
}

// Validação da Fase 2 (Sequência lógica do Gato)
function chooseCatPath(pathNum) {
    const feedback = document.getElementById('alice-feedback');
    catPathSelected.push(pathNum);
    
    document.getElementById('current-path-view').innerText = catPathSelected.map(p => p + 1).join(" → ");

    // Verifica se errou o passo atual da sequência
    const currentStepIndex = catPathSelected.length - 1;
    if (catPathSelected[currentStepIndex] !== correctCatPath[currentStepIndex]) {
        feedback.style.color = "#ff4a4a";
        feedback.innerText = "🐱 *Puff!* O Gato sumiu e o caminho desapareceu! Recomece o labirinto.";
        setTimeout(() => {
            catPathSelected = [];
            loadAliceStage();
        }, 1500);
        return;
    }

    // Se completou os 4 passos certos
    if (catPathSelected.length === 4) {
        feedback.style.color = "#27ae60";
        feedback.innerText = "🐱 O Gato sorriu por inteiro e revelou o espelho secreto! Avançando para o portal final...";
        setTimeout(() => {
            aliceCurrentStage = 3;
            loadAliceStage();
        }, 2000);
    }
}

// Validação da Fase 3 (O nome dela)
function verifyStage3() {
    const input = document.getElementById('final-alice-input').value.toLowerCase().trim();
    const feedback = document.getElementById('alice-feedback');

    if (input.length > 2) { // Aceita o nome dela desde que digitado
        feedback.style.color = "#27ae60";
        feedback.innerText = "🔓 O espelho se quebrou em mil pétalas! O segredo do universo foi revelado...";
        setTimeout(() => {
            aliceCurrentStage = 4;
            loadAliceStage();
        }, 2000);
    } else {
        feedback.style.color = "#ff4a4a";
        feedback.innerText = "O espelho continua embaçado. O amor exige o nome real da dona dele.";
    }
}

// Inicia o jogo assim que a página carrega
loadAliceStage();
// CONTROLE DA INTERVENÇÃO DO CHAPELEIRO MALUCO
function openHatterTip() {
    const modal = document.getElementById('hatter-tip-modal');
    const text = document.getElementById('hatter-text');
    
    // Seu recado carinhoso provocando ela e dando a resposta mastigada pelo Chapeleiro
    text.innerHTML = `
        "Lindinha! Eu já sabia que você faria biquinho e se perderia um pouco nesses cáuculos, então deixei um aliado de prontidão para te salvar! 😉<br><br>
        O Chapeleiro Maluco tomou um gole de chá, fez os cálculos malucos dele e sussurrou no meu ouvido: <br><br>
        <b>A engrenagem B vale 16 e a C vale 11.5. Multiplicando tudo direitinho, o código final que abre o relógio é exatamente <span style='color:#ffd700; font-size:1.2rem;'>264</span>!</b><br><br>
        Digita lá e vamos continuar nossa jornada pelo labirinto!"
    `;
    
    modal.classList.add('active');
}

function closeHatterTip() {
    document.getElementById('hatter-tip-modal').classList.remove('active');
}
// ... Todo o resto do seu código antigo dos jogos anteriores fica aqui para cima ...

// ==========================================
// JOGO 5: O LABIRINTO DO TEMPO E SORRISOS
// ==========================================
aliceCurrentStage = 1;
catPathSelected = [];
// correctCatPath = [2, 0, 3, 1];
// ... (resto das funções da fase da Alice) ...

// CONTROLE DA INTERVENÇÃO DO CHAPELEIRO MALUCO (DICA FASE 1)
window.openHatterTip = function() {
    const modal = document.getElementById('hatter-tip-modal');
    const text = document.getElementById('hatter-text');
    
    if (modal && text) {
        text.innerHTML = `
            "Lindinha! Eu já sabia que você faria biquinho e se perderia nessas continhas, então deixei um aliado de prontidão para te salvar! 😉<br><br>
            O Chapeleiro Maluco tomou um gole de chá, fez os cálculos malucos dele e sussurrou no meu ouvido: <br><br>
            <b>A engrenagem B vale 16 e a C vale 11.5. Multiplicando tudo direitinho, o código final que abre o relógio é exatamente <span style='color:#ffd700; font-size:1.2rem;'>264</span>!</b><br><br>
            Digita lá e vamos continuar nossa jornada pelo labirinto!"
        `;
        modal.classList.add('active');
    } else {
        console.error("Modal ou texto da dica não foram encontrados no HTML.");
    }
};

window.closeHatterTip = function() {
    const modal = document.getElementById('hatter-tip-modal');
    if (modal) {
        modal.classList.remove('active');
    }
};
// ==========================================
// ANIMAÇÕES ESPECIAIS DO GATO DE CHESHIRE (FASE 5)
// ==========================================
const hatterSection = document.getElementById('enigma-alice-section');
const catFace = document.getElementById('cheshire-interactive-face');
const pupilL = document.getElementById('cat-pupil-l');
const pupilR = document.getElementById('cat-pupil-r'); // <-- Corrigido para R maiúsculo

if (hatterSection && catFace) {
    hatterSection.addEventListener('mousemove', (e) => {
        const rect = hatterSection.getBoundingClientRect();
        
        // Posição do mouse relativa ao centro da seção do jogo
        const mouseX = e.clientX - rect.left - (rect.width / 2);
        const mouseY = e.clientY - rect.top - (rect.height / 2);
        
        // Limita a inclinação do rosto para um efeito sutil 3D
        const angleX = (mouseY / rect.height) * 25; 
        const angleY = (mouseX / rect.width) * 25;
        
        catFace.style.transform = `translate(${-angleY * 0.4}px, ${-angleX * 0.4}px) rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
        
        // Desloca as pupilas para dar o efeito de olhar direcionado
        const pupilX = (mouseX / rect.width) * 5;
        const pupilY = (mouseY / rect.height) * 4;
        
        if (pupilL && pupilR) {
            pupilL.setAttribute('cx', 30 + pupilX);
            pupilL.setAttribute('cy', 30 + pupilY);
            pupILR = pupilR.setAttribute('cx', 70 + pupilX);
            pupilR.setAttribute('cy', 30 + pupilY);
        }
    });

    hatterSection.addEventListener('mouseleave', () => {
        // Adicione ou mude apenas esta linha dentro do evento de movimento do mouse:
catFace.style.transform = `translate(${-angleY * 0.5}px, ${(-angleX * 0.5) + (window.scrollY * 0.15)}px) rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
        if (pupilL && pupilR) {
            pupilL.setAttribute('cx', 30); pupilL.setAttribute('cy', 30);
            pupilR.setAttribute('cx', 70); pupilR.setAttribute('cy', 30);
        }
    });
}

// Sistema de Patinhas Fantasmas andando pelo cenário
function spawnCatPaws() {
    if (!hatterSection) return;
    // Só gera patinhas se a seção do jogo estiver visível na tela
    if (hatterSection.getBoundingClientRect().top > window.innerHeight || hatterSection.getBoundingClientRect().bottom < 0) return;

    const rect = hatterSection.getBoundingClientRect();
    let startX = Math.random() * (rect.width - 100) + 50;
    let startY = Math.random() * (rect.height - 100) + 50;
    
    const randomRotation = Math.floor(Math.random() * 360);

    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const paw = document.createElement('div');
            paw.classList.add('cat-paw-print');
            paw.innerHTML = '🐾';
            
            const stepX = startX + (i * 25 * Math.cos(randomRotation * Math.PI / 180));
            const stepY = startY + (i * 25 * Math.sin(randomRotation * Math.PI / 180));
            
            paw.style.left = stepX + 'px';
            paw.style.top = stepY + 'px';
            paw.style.setProperty('--paw-rot', `${randomRotation + 90}deg`);

            hatterSection.appendChild(paw);

            setTimeout(() => paw.remove(), 2500);
        }, i * 400);
    }

// ==========================================
// MOTOR DE MOVIMENTO: CAMINHADA TOTALMENTE LIVRE NO FUNDO
// ==========================================
const catContainer = document.getElementById('cheshire-interactive-face');
const pupilLeft = document.getElementById('cat-pupil-l');
const pupilRight = document.getElementById('cat-pupil-r');

// Força o contêiner a iniciar no zero absoluto da tela para o cálculo não quebrar
if (catContainer) {
    catContainer.style.left = '0px';
    catContainer.style.top = '45vh';
}

let catPosX = 10;
let catSpeedX = 1.2; 
let walkingDirection = 1; 
let mouseXGlobal = 0;
let mouseYGlobal = 0;

window.addEventListener('mousemove', (e) => {
    if (!catContainer) return;
    const rect = catContainer.getBoundingClientRect();
    mouseXGlobal = e.clientX - rect.left - (rect.width / 2);
    mouseYGlobal = e.clientY - rect.top - (rect.height / 2);
});

function walkCheshireCat() {
    if (!catContainer) return;

    // Faz o gato andar de acordo com a direção atual
    catPosX += catSpeedX * walkingDirection;

    // Pegamos a largura real da tela de ponta a ponta
    const larguraRealTela = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const limiteDireito = larguraRealTela - 170; // Desconto do corpinho dele

    // Se bater na borda direita real do monitor, vira para a esquerda
    if (catPosX >= limiteDireito) {
        catPosX = limiteDireito;
        walkingDirection = -1;
    } 
    // Se bater na borda esquerda real do monitor, vira para a direita
    else if (catPosX <= 10) {
        catPosX = 10;
        walkingDirection = 1;
    }

    // Define o espelhamento do rosto (1 olha para a direita, -1 olha para a esquerda)
    const virarRosto = walkingDirection === 1 ? 1 : -1;

   // Aplica o movimento e a inversão perfeitamente usando apenas propriedades 2D estáveis
    catContainer.style.transform = `translate3d(${catPosX}px, 0px, 0px) scaleX(${virarRosto})`;
    // Movimentação das pupilas olhando pro mouse
    if (pupilLeft && pupilRight) {
        const pX = Math.max(-4, Math.min(4, (mouseXGlobal / larguraRealTela) * 8));
        const pY = Math.max(-3, Math.min(3, (mouseYGlobal / window.innerHeight) * 6));
        const directionFix = walkingDirection === 1 ? 1 : -1;
        
        pupilLeft.setAttribute('cx', 33 + (pX * directionFix));
        pupilLeft.setAttribute('cy', 40 + pY);
        pupilRight.setAttribute('cx', 67 + (pX * directionFix));
        pupilRight.setAttribute('cy', 40 + pY);
    }

    requestAnimationFrame(walkCheshireCat);
}

// Inicializa a caminhada no plano de fundo
if (catContainer) {
    requestAnimationFrame(walkCheshireCat);
}
}
// ==========================================
// JOGO 6: LÓGICA UNIFICADA E BLINDADA
// ==========================================
(function() { // Usamos uma IIFE para isolar as variáveis e evitar conflitos
    const phrase = "Qual a semelhança entre um corvo e uma escrivaninha?";
    let index = 0;
    let typewriterStarted = false;

    // 1. Efeito Typewriter
    function type() {
        const textSpan = document.getElementById('riddle-text');
        if (textSpan && index < phrase.length) {
            textSpan.innerHTML += phrase.charAt(index);
            index++;
            setTimeout(type, 60);
        }
    }

    // Inicia quando a seção do Jogo 6 aparecer na tela (Otimização)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typewriterStarted) {
                typewriterStarted = true;
                setTimeout(type, 500);
            }
        });
    }, { threshold: 0.5 });

    const target = document.getElementById('enigma-hatter-section');
    if (target) observer.observe(target);

    // 2. Sistema de Fogos (Canvas)
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let p_list = [];

    function res() {
        if (canvas && canvas.parentElement) {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
    }

    function create() {
        if (!ctx) return;
        res();
        const colors = ['#00e5ff', '#ff007f', '#9b5de5', '#fee440'];
        for (let i = 0; i < 150; i++) {
            p_list.push({
                x: canvas.width / 2, y: canvas.height / 2,
                r: Math.random() * 3 + 1, c: colors[Math.floor(Math.random() * colors.length)],
                s: Math.random() * 6 + 2, a: Math.random() * Math.PI * 2,
                f: 0.95, g: 0.12, o: 1, d: Math.random() * 0.02 + 0.01
            });
        }
        if (p_list.length > 0) anim();
    }

    function anim() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        p_list.forEach((p, i) => {
            p.s *= p.f;
            p.x += Math.cos(p.a) * p.s;
            p.y += Math.sin(p.a) * p.s + p.g;
            p.o -= p.d;
            ctx.globalAlpha = p.o;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.c; ctx.fill();
            if (p.o <= 0) p_list.splice(i, 1);
        });
        if (p_list.length > 0) requestAnimationFrame(anim);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // 3. Verificação (Definida globalmente para o onclick funcionar)
    window.checkGame6Answer = function() {
        const inpt = document.getElementById('game6-input');
        const fb = document.getElementById('game6-feedback');
        const cont = document.getElementById('game6-content');
        
        if (!inpt || !fb || !cont) return;

        const answer = inpt.value.trim().toLowerCase();

        if (answer === "fora cabeçuda") {
            fb.style.color = "#00e5ff";
            fb.innerHTML = "🎯 CORRETO! PREPARE-SE...";
            
            cont.style.transition = "all 0.6s ease";
            cont.style.transform = "scale(0) rotate(10deg)";
            cont.style.opacity = "0";

            setTimeout(() => {
                cont.style.display = "none";
                create(); // Chama a explosão
                
                setTimeout(() => {
                    document.getElementById('enigma-hatter-section').innerHTML = `
                        <div style="text-align: center; padding: 40px; animation: blink 1s ease; position: relative; z-index: 20;">
                            <h1 style="color: #ffd700; font-size: 3rem; text-shadow: 0 0 20px #ffd700; margin: 0;">👑 VITÓRIA!</h1>
                            <p style="color: #fff; font-size: 1.3rem; margin-top: 20px;">Você decifrou o enigma, derrotou a Rainha e escapou do Labirinto!</p>
                        </div>
                    `;
                }, 1200);
            }, 600);
        } else {
            fb.style.color = "#ff3333";
            fb.innerHTML = "❌ O Chapeleiro riu... tente novamente!";
            inpt.style.border = "1px solid #ff3333";
            setTimeout(() => inpt.style.border = "1px solid #00e5ff", 1000);
        }
    };
})();
// Ativa o ciclo das patinhas a cada 6 segundos
setInterval(spawnCatPaws, 6000);