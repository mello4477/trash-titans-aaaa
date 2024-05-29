document.addEventListener('DOMContentLoaded', function() {
    const recyclableTrash = document.getElementById('trash-can-recyclable');
    const compostableTrash = document.getElementById('trash-can-compostable');
    const nonRecyclableTrash = document.getElementById('trash-can-non-recyclable');
    const item = document.getElementById('item');
    const scoreDisplay = document.getElementById('score');
    const errorCountDisplay = document.getElementById('error-count');
    const messageDisplay = document.getElementById('message');
    const tryAgainButton = document.getElementById('try-again');

    let score = 0;
    let errorCount = 0;

    // Função para mover o item aleatoriamente na tela
    function moveItem() {
        const randomX = Math.floor(Math.random() * 550) + 25;
        item.style.left = randomX + 'px';
    }

    // Função para verificar se o item foi descartado corretamente
    function checkDrop(target) {
        const itemX = item.getBoundingClientRect().left;
        const targetX = target.getBoundingClientRect().left;
        const tolerance = 50; // Define uma tolerância de 50 pixels para o descarte

        if (Math.abs(itemX - targetX) <= tolerance) {
            score++;
            scoreDisplay.textContent = 'Pontuação: ' + score;
            moveItem();
            if (score >= 100) {
                showWinMessage();
            }
        } else {
            errorCount++;
            errorCountDisplay.textContent = 'Erros: ' + errorCount;
            if (errorCount >= 50) {
                showLoseMessage();
            }
        }
    }

    // Função para mostrar mensagem de vitória
    function showWinMessage() {
        messageDisplay.textContent = 'Parabéns! Você conseguiu :D';
        tryAgainButton.style.display = 'none';
    }

    // Função para mostrar mensagem de derrota
    function showLoseMessage() {
        messageDisplay.textContent = 'Oops! Você perdeu :(';
        tryAgainButton.style.display = 'block';
        tryAgainButton.addEventListener('click', function() {
            restartGame();
        });
    }

    // Função para reiniciar o jogo
    function restartGame() {
        score = 0;
        errorCount = 0;
        scoreDisplay.textContent = 'Pontuação: 0';
        errorCountDisplay.textContent = 'Erros: 0';
        messageDisplay.textContent = '';
        tryAgainButton.style.display = 'none';
        moveItem();
    }

    // Event listeners para os recipientes de lixo
    recyclableTrash.addEventListener('click', function() {
        checkDrop(recyclableTrash);
    });

    compostableTrash.addEventListener('click', function() {
        checkDrop(compostableTrash);
    });

    nonRecyclableTrash.addEventListener('click', function() {
        checkDrop(nonRecyclableTrash);
    });

    // Iniciar o jogo
    moveItem();
});
