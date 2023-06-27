// Função para gerar um número aleatório entre min e max (inclusive)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Obter a escolha do jogador e o número do jogador a partir dos argumentos da linha de comando
const escolhaJogador = process.argv[2];
const numeroJogador = parseInt(process.argv[3]);

let escolhaComputador;
// Escolher aleatoriamente "par" ou "ímpar" para o computador
// Garantir que a escolha do computador seja diferente da escolha do jogador
do {
  escolhaComputador = getRndInteger(0, 1) === 0 ? "par" : "ímpar";
} while (escolhaComputador === escolhaJogador);

// Gerar um número aleatório para o computador entre 0 e 5
const numeroComputador = getRndInteger(0, 5);
// Calcular o resultado somando o número do jogador e o número do computador
const resultado = numeroJogador + numeroComputador;

// Exibir as escolhas do jogador e do computador, e o resultado da jogada
console.log(
  `Você escolheu ${escolhaJogador} e o computador escolheu ${escolhaComputador}. O resultado foi ${resultado}.`
);

// Verificar se o jogador ganhou ou perdeu com base na escolha e no resultado
if (
  (escolhaJogador === "par" && resultado % 2 === 0) ||
  (escolhaJogador === "ímpar" && resultado % 2 !== 0)
) {
  console.log("Você ganhou!");
} else {
  console.log("Você perdeu!");
}

// 1- Define uma função para gerar um número inteiro aleatório entre um valor mínimo e máximo.
// 2- Obtém a escolha do jogador e o número do jogador a partir dos argumentos da linha de comando.
// 3- Escolhe aleatoriamente "par" ou "ímpar" para o computador, garantindo que seja diferente da escolha do jogador.
// 4- Gera um número aleatório entre 0 e 5 para o computador.
// 5- Calcula o resultado somando o número do jogador e o número do computador.
// 6- Exibe as escolhas do jogador e do computador, e o resultado da jogada.
// 7- Verifica se o jogador ganhou ou perdeu com base na escolha e no resultado, exibindo o resultado final.
