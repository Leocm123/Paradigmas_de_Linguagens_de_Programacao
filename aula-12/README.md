# Paradigmas de Linguagens de Programação: Atividade Aula 12

[← voltar ao índice do repositório](../README.md)

Atividade: **reescrever laços imperativos em estilo funcional**, em quatro
linguagens. Cada exercício traz um laço que acumula resultado passo a passo, e
a tarefa é expressar a mesma intenção como um pipeline de operações sobre a
coleção inteira.

| Item | Valor |
|---|---|
| **Aluno** | Leonardo Camilotti Moreno |
| **RA** | 24015988-2 |
| **Referência** | SEBESTA, R. W. *Conceitos de Linguagens de Programação*, 11. ed., cap. 15 |

## Estrutura do repositório

```
.
├── README.md                # este documento (respostas e comentários)
└── src/
    ├── Exercicio1.java      # laço como pipeline de stream
    ├── exercicio2.js        # laço com filter e map
    ├── exercicio3.py        # laço como compreensão de lista
    └── exercicio4.rs        # laço com iteradores
```

## Resumo

| Exercício | Linguagem | Construção usada | Saída |
|---|---|---|---|
| 1 | Java | `stream().filter().mapToInt().sum()` | `244` |
| 2 | JavaScript | `filter()` e `map()` | `ANA, CARLA, DAVI` |
| 3 | Python | compreensão de lista com condicional | `[50.0, 108.0, 80.0, 180.0]` |
| 4 | Rust | `iter().take_while().sum()` | `49` |

---

## Exercício 1 (Java): laço como pipeline

Antes:

```java
int soma = 0;
for (int n : nums) {
    if (n % 2 == 0) {
        soma += n * n;
    }
}
```

Depois ([src/Exercicio1.java](src/Exercicio1.java)):

```java
int soma = nums.stream()
               .filter(n -> n % 2 == 0)
               .mapToInt(n -> n * n)
               .sum();
```

Saída: `244`, que é 8² + 12² + 6².

O laço original faz três coisas misturadas: decide o que entra, transforma
cada item e acumula. O pipeline separa as três em estágios nomeados, e cada um
é uma função sem estado. A variável `soma`, que era mutável e existia fora do
laço, desaparece: o resultado vem da própria expressão.

O `mapToInt` troca `Stream<Integer>` por `IntStream`, o que evita o
empacotamento de cada valor e dá acesso ao `sum()` direto.

## Exercício 2 (JavaScript): filter e map

Antes:

```js
const aprovados = [];
for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].nota >= 6) {
        aprovados.push(alunos[i].nome.toUpperCase());
    }
}
```

Depois ([src/exercicio2.js](src/exercicio2.js)):

```js
const aprovados = alunos
  .filter((a) => a.nota >= 6)
  .map((a) => a.nome.toUpperCase());
```

Saída: `ANA, CARLA, DAVI`.

Some o índice `i`, que no original só existia para percorrer o vetor e era
fonte clássica de erro de limite. Some também o `push` sobre um vetor que
nascia vazio: `aprovados` passa a ser `const` e já nasce com o valor final.

Cada etapa fica com uma responsabilidade: `filter` decide quem passa, `map`
decide em que cada um se transforma.

## Exercício 3 (Python): compreensão de lista

Antes:

```python
com_desconto = []
for p in precos:
    if p > 100:
        com_desconto.append(p * 0.9)
    else:
        com_desconto.append(p)
```

Depois ([src/exercicio3.py](src/exercicio3.py)):

```python
com_desconto = [p * 0.9 if p > 100 else p for p in precos]
```

Saída: `[50.0, 108.0, 80.0, 180.0]`.

Este caso é diferente dos outros três: o `if` aqui **não filtra**, ele
escolhe entre dois valores. Por isso a condicional vai antes do `for`, como
expressão ternária, e não depois, como cláusula de filtro. A forma com o `if`
ao final (`[... for p in precos if p > 100]`) descartaria os preços baixos, o
que mudaria o resultado.

A lista de saída tem o mesmo tamanho da de entrada, o que confirma que a
operação é um `map`, e não um `filter`.

## Exercício 4 (Rust): iteradores

Antes:

```rust
let mut total = 0;
for &x in leituras.iter() {
    if x < 0 {
        break;
    }
    total += x;
}
```

Depois ([src/exercicio4.rs](src/exercicio4.rs)):

```rust
let total: i32 = leituras
    .iter()
    .take_while(|&&x| x >= 0)
    .sum();
```

Saída: `49`, que é 12 + 7 + 30.

O `break` é o ponto interessante. A tradução ingênua seria `filter(|&&x| x >= 0)`,
mas isso daria 92, porque incluiria o 18 e o 25 que vêm **depois** do
marcador `-1`. O `break` não descarta os negativos, ele encerra a travessia no
primeiro deles, e o operador com essa semântica é o `take_while`.

É o caso que mostra que reescrever em estilo funcional não é trocar laço por
método: é identificar qual operação de ordem superior tem a mesma semântica.

O `|&&x|` carrega dois níveis de desreferência porque `iter()` sobre um vetor
produz `&i32` e o `take_while` recebe o item por referência, chegando a
`&&i32`.

---

## Conclusão

Os quatro exercícios trocam **como fazer** por **o que fazer**, que é a
distinção entre o paradigma imperativo e o funcional. O ganho concreto aparece
em três pontos:

- **Some o estado mutável.** As variáveis acumuladoras (`soma`, `aprovados`,
  `com_desconto`, `total`) existiam só para carregar resultado parcial, e cada
  uma era uma oportunidade de erro.
- **Some o controle explícito.** Índice, incremento e condição de parada
  passam a ser responsabilidade da própria estrutura.
- **Cada estágio fica isolado.** Filtrar, transformar e reduzir viram etapas
  nomeadas, legíveis e testáveis em separado.

O limite aparece no exercício 4: a tradução exige entender a semântica, não só
a forma. Trocar `break` por `filter` compila, roda e dá a resposta errada.

## Verificação

Os quatro exercícios foram executados e todos produziram a saída indicada.

Os exercícios 1 e 2 rodaram localmente (OpenJDK 21.0.11 e Node 22.16), com a
versão funcional conferida lado a lado contra a imperativa original: `244` e
`ANA, CARLA, DAVI` nas duas formas.

Os exercícios 3 e 4 rodaram no OneCompiler, confirmando
`[50.0, 108.0, 80.0, 180.0]` e `49`.
