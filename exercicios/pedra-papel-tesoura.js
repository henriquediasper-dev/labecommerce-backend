// Função para gerar um número aleatório entre min e max (inclusive)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Opções válidas do jogo: pedra, papel, tesoura
const opcoes = ["pedra", "papel", "tesoura"];
// Escolha do jogador obtida a partir dos argumentos da linha de comando
const escolhaJogador = process.argv[2];

if (!escolhaJogador) {
  // Se não houver escolha do jogador, exibe uma mensagem de erro
  console.log("Por favor, informe sua escolha: pedra, papel ou tesoura.");
} else if (!opcoes.includes(escolhaJogador)) {
  // Se a escolha do jogador não estiver entre as opções válidas, exibe uma mensagem de erro
  console.log("Escolha inválida. As opções são: pedra, papel ou tesoura.");
} else {
  // Se a escolha do jogador for válida, continua com o jogo

  // Gera um índice aleatório para escolher a opção do computador
  const indiceComputador = getRndInteger(0, 2);
  const escolhaComputador = opcoes[indiceComputador];

  console.log(
    `Você escolheu ${escolhaJogador} e o computador escolheu ${escolhaComputador}.`
  );

  if (escolhaJogador === escolhaComputador) {
    // Se as escolhas forem iguais, é um empate
    console.log("Empate!");
  } else if (
    // Verifica todas as combinações possíveis de vitória do jogador
    (escolhaJogador === "pedra" && escolhaComputador === "tesoura") ||
    (escolhaJogador === "papel" && escolhaComputador === "pedra") ||
    (escolhaJogador === "tesoura" && escolhaComputador === "papel")
  ) {
    console.log("Você ganhou!");
  } else {
    // Se não houver empate e o jogador não ganhar, significa que o jogador perdeu
    console.log("Você perdeu!");
  }
}

// 1- Define uma função para gerar um número inteiro aleatório entre um valor mínimo e máximo.
// 2- Cria um array opcoes com as opções válidas do jogo: pedra, papel, tesoura.
// 3- Obtém a escolha do jogador a partir dos argumentos da linha de comando.
// 4- Verifica se a escolha do jogador está vazia. Se sim, exibe uma mensagem de erro pedindo para informar a escolha.
// 5- Verifica se a escolha do jogador está incluída no array opcoes. Se não estiver, exibe uma mensagem de erro informando as opções válidas.
// 6- Se a escolha do jogador for válida, continua com o jogo.
// 7- Gera um índice aleatório para escolher a opção do computador.
// 8- Obtém a escolha do computador com base no índice gerado.
// 9- Exibe as escolhas do jogador e do computador.
// 10- Verifica se as escolhas são iguais. Se sim, é um empate.
// 11- Verifica todas as combinações possíveis de vitória do jogador. Se a escolha do jogador corresponder a uma das combinações, o jogador ganha.
// 12- Se não houver empate e o jogador não ganhar, significa que o jogador perdeu.
