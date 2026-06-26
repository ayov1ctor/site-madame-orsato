function changeBackground(theme) {
    const body = document.body;
    const container = document.getElementById('particles-container');
    
    // Reseta animações do fundo e limpa estrelas caidoras anteriores
    body.style.animation = "none";
    container.innerHTML = ""; 
    void body.offsetHeight; // Força o navegador a resetar o estado visual

    if (theme === 'starry') {
        // Mudar para um azul bem mais escuro (azul-noite profundo)
        body.style.background = "radial-gradient(circle at bottom, #050814 0%, #020308 100%)";
        body.style.backgroundAttachment = "fixed";
        
        // Ativa a chuva de estrelinhas lentas
        startStarFall();
    } 
    else if (theme === 'alice') {
        body.style.background = "linear-gradient(rgba(15, 19, 34, 0.45), rgba(15, 19, 34, 0.65)), url('alice.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
        body.style.animation = "panBackground 40s infinite alternate ease-in-out";
    } 
    else if (theme === 'sunset') {
        body.style.background = "linear-gradient(rgba(15, 19, 34, 0.2), rgba(15, 19, 34, 0.5)), url('./festanoceu.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
        body.style.animation = "panBackground 45s infinite alternate ease-in-out";
    } 
    else if (theme === 'cats') {
        body.style.background = "linear-gradient(rgba(15, 19, 34, 0.75), rgba(15, 19, 34, 0.75)), url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1920') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
    }
}

// Função para criar a chuva de estrelinhas lentas
function startStarFall() {
    const container = document.getElementById('particles-container');
    
    // Cria 40 estrelinhas cadentes lentas
    for (let i = 0; i < 40; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        
        // Espalha pelo topo e lados da tela
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * -20 + 'px';
        
        // Tamanhos bem delicados
        let size = Math.random() * 3 + 1.5 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.backgroundColor = "#ffffff";
        star.style.boxShadow = "0 0 8px #ffffff"; // Leve brilho
        
        // Configura a animação para cair de forma bem lenta e suave
        star.style.animation = "fallAndBlink linear infinite";
        star.style.animationDuration = Math.random() * 6 + 8 + 's'; // Entre 8 e 14 segundos para cair (bem lento)
        star.style.animationDelay = Math.random() * 8 + 's';
        
        container.appendChild(star);
    }
}

// Faz o tema Céu Estrelado iniciar automaticamente assim que o site abre
window.onload = function() {
    changeBackground('starry');
};
// ==========================================
// SISTEMA DE CARTAS DE AMOR MÁGICAS
// ==========================================
function showLoveLetter(type) {
    const letterBox = document.getElementById('love-letter-box');
    const letterText = document.getElementById('love-letter-text');
    
    // Banco de dados com as frases de amor personalizadas de cada tema
    const frasesDeAmor = {
        "copas": "Nem mesmo todo o exército da Rainha de Copas conseguiria me afastar de você. No baralho da vida, meu coração tirou a sua carta e, desde então, você se tornou a dona de todas as minhas jogadas e o meu prêmio mais bonito. ♥️",
        
        "tempo": "O Coelho Branco vive correndo contra o relógio no País das Maravilhas, mas quando estou com você, o tempo parece parar. Cada segundo ao seu lado vale mais do que uma eternidade inteira. Meu presente, passado e futuro pertencem a você. ⏳✨",
        
        "festa": "Se o nosso amor estivesse escrito no Livro da Vida de Festa no Céu, ele seria a história mais linda de todas. Nem mundos diferentes, nem a distância e nem o tempo podem apagar a música que meu coração toca toda vez que penso em você. Você é a minha melodia favorita. 🌅🎸"
    };

    if (frasesDeAmor[type]) {
        letterText.innerText = frasesDeAmor[type];
        letterBox.style.display = "block"; // Faz a caixinha aparecer em tela
        
        // Efeito sutil de rolagem automática para a frase aparecer no foco da tela dela
        letterBox.scrollIntoView({ behavior: 'smooth' });
    }
}
// ==========================================
// MECÂNICA DO JARDIM / MIMOS VIRTUAIS
// ==========================================
const gifts = {
    flower: [
        "🌹 Você pintou as rosas brancas de vermelho com o seu sorriso!", 
        "🌹 Uma rosa vermelha mágica brotou para você!", 
        "🌹 'Se você conhecer o caminho tanto quanto eu, colheria rosas para mim'"
    ],
    marigold: [
        "🌼 Uma Calêndula dourada do Além surgiu para iluminar seu dia!", 
        "🌼 Você recebeu a benção do amor eterno!", 
        "🌼 Pétalas douradas guiam meu coração até o seu."
    ],
    present: [
        "🎁 Você abriu o baú e ganhou: A Chave de Ouro do meu coração! 🔑", 
        "🎁 Surpresa! Você ganhou 1000 beijos virtuais válidos para sempre.", 
        "🎁 Um relógio do Coelho Branco parando o tempo só para nós dois. ⏳"
    ]
};

function receiveGift(type) {
    // Procura a caixinha de texto onde a frase do mimo deve aparecer na tela
    const giftBox = document.getElementById('gift-result-box');
    const giftText = document.getElementById('gift-result-text');
    
    if (gifts[type]) {
        // Sorteia uma das 3 frases disponíveis na lista do mimo clicado
        const randomIndex = Math.floor(Math.random() * gifts[type].length);
        const fraseSorteada = gifts[type][randomIndex];
        
        // Injeta a frase e exibe a caixinha em tela
        giftText.innerText = fraseSorteada;
        giftBox.style.display = "block";
        
        // Efeito visual suave de rolagem automática para o texto
        giftBox.scrollIntoView({ behavior: 'smooth' });
    }
}
