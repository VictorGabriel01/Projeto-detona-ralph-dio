// variável view: variáveis que manipulamos algo visual
// variável value: variáveis que são valores como cálculos 

const state = {
    /**
     * Elementos HTML do jogo.
     */
    view: {
      /**
       * Lista de elementos HTML dos quadrados.
       * @type {NodeList}
       */
      squares: document.querySelectorAll(".square"),
      
      /**
       * Elemento HTML do inimigo.
       * @type {Element}
       */
      enemy: document.querySelector(".enemy"),
      
      /**
       * Elemento HTML do temporizador.
       * @type {Element}
       */
      timeLeft: document.querySelector("#time-left"),
      
      /**
       * Elemento HTML da pontuação.
       * @type {Element}
       */
      score: document.querySelector("#score"),
    },
    
    /**
     * Valores numéricos do jogo.
     */
    values: {
      /**
       * Velocidade do jogo em milissegundos.
       * @type {number}
       */
      gameVelocity: 1000,
      
      /**
       * Posição do inimigo.
       * @type {number}
       */
      hitPosition: 0,
      
      /**
       * Pontuação atual.
       * @type {number}
       */
      result: 0,
      
      /**
       * Tempo restante em segundos.
       * @type {number}
       */
      currentTime: 60,
    },
    
    /**
     * IDs de intervalos.
     */
    actions: {
      /**
       * ID do intervalo do temporizador.
       * @type {number}
       */
      timerId: setInterval(randomSquare, 1000),
      
      /**
       * ID do intervalo do contador.
       * @type {number}
       */
      countDownTimerId: setInterval(countDown, 1000),
    }
  };

  /**
 * Decrementa o tempo restante a cada segundo.
 */
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if (state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      alert("Game Over! O seu resultado foi: " + state.values.result);
    }
  }

  /**
 * Toca um som específico.
 * @param {string} audioName - Nome do arquivo de som.
 */
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }

  /**
 * Escolhe um quadrado aleatório para ser o inimigo.
 */
function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
    
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }

  /**
 * Adiciona um listener para detectar cliques nos quadrados.
 */
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        }
      });
    });
  }

  /**
 * Inicia o jogo.
 */
function initialize() {
    addListenerHitBox();
  }
  
  initialize();