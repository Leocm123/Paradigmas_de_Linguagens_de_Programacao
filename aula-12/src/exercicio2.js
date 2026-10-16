// Aula 12 - Exercício 2: laço reescrito com filter e map
// Online: https://onecompiler.com/nodejs  (cole o código inteiro)
// Local:  node exercicio2.js
const alunos = [
  { nome: "Ana", nota: 8.5 },
  { nome: "Bruno", nota: 5.0 },
  { nome: "Carla", nota: 7.0 },
  { nome: "Davi", nota: 9.5 },
];

const aprovados = alunos
  .filter((a) => a.nota >= 6)          // seleciona
  .map((a) => a.nome.toUpperCase());   // transforma

console.log(aprovados.join(", "));     // ANA, CARLA, DAVI
