window.onload = function() {
    // Contexto do <canvas>
    var stage = document.getElementById("stage")
    var ctx = stage.getContext("2d")
    document.addEventListener("keydown", keyPress)
    
    // Configurações do jogo
    setInterval(game, 80)  // Tempo em ms que a função 'game' será chamada (atualizará)
    var txtPontos = document.getElementById("pontos")
    var txtPontosMax = document.getElementById("pontosMax")
    var pontos = pontosMax = 0
    
    const velocidade = 1
    var velX = 0         // Velocidade no eixo X
    var velY = 0         // Velocidade no eixo Y
    var posCobraX = 2    // Cabeça da cobra (posição inicial X)
    var posCobraY = 2    // Cabeça da cobra (posição inicial Y)
    var sizePontos = 30  // Tamanho dos pontos na tela
    var qtdPontos = 20   // Quantidade de pontos na tela vertical e horizontalmente (começa em 0)
    var posAppleX = 10   // Posição inicial X da maçã 
    var posAppleY = 10   // Posição inicial Y da maçã
    var trail = []       // Corpo da cobra
    var sizeCobra = 3    // Tamanho inicial da cobra

    // Função do jogo
    function game() {
        posCobraX += velX
        posCobraY += velY

        if (posCobraX < 0) {
            posCobraX = qtdPontos - 1
        }

        if (posCobraX > qtdPontos - 1) {
            posCobraX = 0
        }

        if (posCobraY < 0) {
            posCobraY = qtdPontos - 1
        }

        if (posCobraY > qtdPontos - 1) {
            posCobraY = 0
        }

        /* Estilo do jogo */
        // Tela de fundo
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, stage.width, stage.height)  // (xInicial, yInicial, largura, altura)

        // Maçã
        ctx.fillStyle = "red"
        ctx.fillRect(posAppleX * sizePontos, posAppleY * sizePontos, sizePontos, sizePontos)

        // Cobra
        ctx.fillStyle = "green"
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * sizePontos, trail[i].y * sizePontos, sizePontos - 1, sizePontos - 1)

            // Fim de jogo
            if (trail[i].x == posCobraX && trail[i].y == posCobraY) {
                velX = velY = 0
                sizeCobra = 3

                // Pontuação
                if (pontos > pontosMax) {
                    txtPontosMax.innerHTML = pontos
                    pontosMax = pontos
                }
                pontos = 0
                txtPontos.innerHTML = pontos
            }
        }

        trail.push({x: posCobraX, y: posCobraY})  // Coloca 'x' e 'y' em cada posição de trail
        while (trail.length > sizeCobra) {
            trail.shift()  // Tira um ponto da cobra depois de andar
        }

        if (posAppleX == posCobraX && posAppleY == posCobraY) {
            sizeCobra++

            // Pontuação
            pontos = sizeCobra - 3
            txtPontos.innerHTML = pontos
            
            posAppleX = Math.floor(Math.random() * qtdPontos)  // random() --> nº entre 0 e 1
            posAppleY = Math.floor(Math.random() * qtdPontos)
        }
    }

    // Função de movimento
    function keyPress(event) {
        switch (event.keyCode) {
            case 37:  // Esquerda
                velX = -velocidade
                velY = 0
                break
        
            case 38:  // Cima
                velX = 0
                velY = -velocidade
                break
            
            case 39:  // Direita
                velX = velocidade
                velY = 0
                break
            
            case 40:  // Baixo
                velX = 0
                velY = velocidade
                break

            default:
                break
        }
    }
}
