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


    // Função de nova posição da maçã
    function newPosApple(posX, posY) {
        // Gera dois valores aleatórios pras posições X e Y
        posX = Math.floor(Math.random() * qtdPontos)
        posY = Math.floor(Math.random() * qtdPontos)

        // Percorre o corpo da cobro
        for (var c = 0; c < trail.length; c++) {
            // Se as posições forem as mesmas de uma parte do corpo da cobra ...
            if (trail[c].x == posX && trail[c].y == posY) {
                // ... chama a função de novo
                posX = newPosApple(posX, posY)[0]
                posY = newPosApple(posX, posY)[1]
                break
            }
        }

        // Se as posições forem válidas, retorna elas
        return [posX, posY]
    }


    // Função do jogo
    function game() {
        posCobraX += velX
        posCobraY += velY

        /* Casos em que a cobra sai da tela --> aparece do outro lado */
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

            /* Fim de jogo */
            // Caso a cobra esteja sobre si própria (se comer)
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
            
            // Nova posição da maçã
            var newPosAppleX = 0
            var newPosAppleY = 0

            posAppleX = newPosApple(newPosAppleX, newPosAppleY)[0]
            posAppleY = newPosApple(newPosAppleX, newPosAppleY)[1]
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
