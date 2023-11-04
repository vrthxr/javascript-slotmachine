const prompt = require("prompt-sync")(); //package para receber os prompts

// VARIÁVEIS GLOBAIS PARA MODIFICAR O PROGRAMA NO FUTURO

const ROWS = 3; //LINHAS
const COLS = 3; //COLUNAS

const SYMBOLS_COUNT = {
  // símbolos como objetos, associando quantos objetos tem a chance de ter em cada linha
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  //multiplicadores, por exemplo, uma linha só com A: a bet é multiplicada por 5, linha com B: por 4, etc.
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

//variável para armazenar o valor depositado
const deposit = () => {
  // loop para permanecer pedindo ao usário um número válido
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: "); //usuário adiciona a quantidade de depósito e ela é guardada na variável depositAmount
    const numberDepositAmount = parseFloat(depositAmount); // parseFloat transforma a string em um número em float, se o usuário der input em número ela irá retornar = NaN (Not an Number)

    // se o número for NaN (Not an Number), ou menor que zero, o console irá dizer que o valor do número é inválido
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
      // se todas os requisitos acima forem cumpridos (número válido), retorna o número, quebrando o Loop
      return numberDepositAmount;
    }
  }
};

//variável para armazenar o número de linhas que o jogador irá apostar
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines (1-3): "); //usuário adiciona quantidade de linhas
    const numberOfLines = parseFloat(lines); //parsefloat transforma string de linhas em número em float, adicionando NaN caso seja inválido
    // se o número de linhas for inválido ou maior que 3 (número máximo de linhas possíveis para se apostar) console irá dizer que o número é inválido
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again.");
    } else {
      // caso o número seja válido, retorna número de linhas e quebra o loop
      return numberOfLines;
    }
  }
};

// variável getBet pega a variável de balance, pois a aposta não pode maior que o valor que você tem atualmente em sua conta, também pega a variável de lines pois a aposta é dividida pelo número de linhas
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the total bet per line: "); //usuário adiciona a aposta
    const numberBet = parseFloat(bet); //parsefloat transforma a aposta em número float
    //checa se a bet é inválida, caso seja inválida retorna erro e loopa o código novamente
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again.");
    } else {
      //caso a bet seja válida, retorna o número adicionado na bet e quebra o loop
      return numberBet;
    }
  }
};

// o spin gera uma array, seleciona números aleatórios da variável global SYMBOLS_COUNT dentro de uma array na const symbols (utilizando const ao invés de let pois a array pode ser modificada livremente)
const spin = () => {
  const symbols = [];
  //loop para ver todos os simbolos na variável global SYMBOLS_COUNT e logo depois, adicionar eles na array symbols
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    // loop para adicionar os símbolos na array symbols
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  //colunas da máquina de apostas
  const reels = [];
  // loop por todas as reels, representado pelo numero de colunas em COLS
  for (let i = 0; i < COLS; i++) {
    reels.push([]); // pra cada coluna que temos, adicionado uma coluna na array reels
    const reelSymbols = [...symbols]; // copiando os simbolos da array symbols para selecionar randomicamente os símbolos sem excluir eles da array symbols
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length); // gerando variável randomIndex e multiplicando pelo length dos simbolos
      const selectedSymbol = reelSymbols[randomIndex]; //selecionado simbolo randomicamente pelo index
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1); // removendo um elemento para não selecionarmos ele novamente quando formos gerar a reels novamente
    }
  }
  return reels;
};

//transportar a array de forma "vertical" para podermos somar as linhas
const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    //acessando todas as linhas
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      //acessando todas as colunas
      rows[i].push(reels[j][i]); // pega o 1 simbolo de cada coluna e transforma em row
    }
  }
  return rows;
};

//printar as rows de forma claramente visível para o usuário
const printRows = (rows) => {
  //loop para passar por todas as linhas
  for (const row of rows) {
    let rowString = ""; //recebo um array representando aquela linha
    //loop para receber o index de cada array, depois checa se for o último index para não colocar a linha
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// checar se o usuário venceu
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true; // ganhou

    for (const symbol of symbols) {
      // checa se todos os símbolos são iguais ao primeiro símbolo, caso não seja, transforma a variável allSame em falsa e quebra o loop
      if (symbol != symbols[0]) {
        allSame = false; // não ganhou
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]]; //multiplicando pelo primeiro símbolo caso todos os simbolos sejam o mesmo
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit(); // let permite ajustar o valor da variável para no futuro adicionar e remover valor dependendo se o jogador vence ou perde

  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won! $" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }
    const playAgain = prompt("Do you want to play again? (y/n) ");

    if (playAgain != "y") break;
  }
};

game();
