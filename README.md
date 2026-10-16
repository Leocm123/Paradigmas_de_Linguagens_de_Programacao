# Paradigmas de Linguagens de Programação

Repositório de atividades da disciplina **Paradigmas de Linguagens de
Programação**. Cada atividade fica em sua própria pasta, nomeada pela aula a
que se refere, com seu próprio README contendo enunciado, código e/ou
respostas.

## Atividades

| Aula | Tema | Conteúdo |
|---|---|---|
| [aula-00](aula-00/README.md) | "Olá, mundo!" e tabuada em Python | Enunciado, código-fonte e pesquisa sobre vaga, faixa salarial e paradigmas da linguagem |
| [aula-02](aula-02/README.md) | Evolução das principais linguagens de programação | 20 questões (enunciado e respostas) baseadas no capítulo 2 de Sebesta |
| [aula-03](aula-03/README.md) | Derivação de código a partir da gramática da linguagem | Gramática PEG do CPython, produções selecionadas e derivação passo a passo de `total = 2 + 3 * 4` |
| [aula-04](aula-04/README.md) | Análise léxica e sintática em Java (aula exploratória) | 5 estações baseadas no capítulo 4 de Sebesta: lexemas e tokens, palavras reservadas, diagnósticos do compilador, parser descendente e parser ascendente, com o PDF da entrega |
| [aula-06](aula-06/README.md) | Tipos de dados | Exercício "preveja a saída": 6 programas em JavaScript, Python, Go, Java, Rust e C, e em que momento cada problema é detectado |
| [aula-07](aula-07/README.md) | Expressões, atribuição e controle | Exercício "encontre o bug": 6 programas com defeitos de precedência, escopo, conversão de tipo e estrutura de controle |
| [aula-08](aula-08/README.md) | Subprogramas | Exercício sobre o que o subprograma compartilha com o chamador: parâmetros, passagem, fechamentos e tempo de vida |
| [aula-10](aula-10/README.md) | Concorrência | Laboratório de 9 etapas: condição de corrida, impasse, monitores, operações atômicas, canais em Go, posse em Rust e laço de eventos em JavaScript |
| [aula-12](aula-12/README.md) | Programação funcional | 4 laços imperativos reescritos como pipeline: stream em Java, filter e map em JavaScript, compreensão em Python e iteradores em Rust |

> A aula 01 foi pulada por enquanto e será adicionada quando a atividade
> correspondente for definida. As aulas 05 e 09 ainda não têm atividade
> registrada aqui.

## Estrutura do repositório

```
.
├── README.md            # este índice
├── aula-00/
│   ├── README.md
│   └── src/
│       ├── ola_mundo.py
│       └── tabuada.py
├── aula-02/
│   └── README.md
├── aula-03/
│   └── README.md
├── aula-04/
│   ├── README.md
│   └── aula-exploratoria.pdf
├── aula-06/
│   └── README.md
├── aula-07/
│   └── README.md
├── aula-08/
│   └── README.md
├── aula-10/
│   └── README.md
└── aula-12/
    ├── README.md
    └── src/
        ├── Exercicio1.java
        ├── exercicio2.js
        ├── exercicio3.py
        └── exercicio4.rs
```
