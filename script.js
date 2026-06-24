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