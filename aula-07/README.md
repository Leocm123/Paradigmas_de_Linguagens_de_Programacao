# Paradigmas de Linguagens de Programação: Atividade Aula 07

[← voltar ao índice do repositório](../README.md)

Exercício "encontre o bug" da pasta `10_exercicio`, sobre **expressões,
atribuição e estruturas de controle** (capítulos 7 e 8 de Sebesta). Para cada
programa: qual é a saída e onde está o defeito.

| Item | Valor |
|---|---|
| **Aluno** | Leonardo Camilotti Moreno |
| **RA** | 24015988-2 |
| **Referência** | SEBESTA, R. W. *Conceitos de Linguagens de Programação*, 11. ed., caps. 7 e 8 |

## Resumo

| Questão | Linguagem | Saída | Defeito |
|---|---|---|---|
| 1 | JavaScript | `Total: 0012` | `for...in` percorre chaves, não valores |
| 2 | Python | `180.0` | `or` confunde 0 com ausência |
| 3 | Java | `inválido` | `switch` sem `break` |
| 4 | C | `saldo insuficiente` e `fim` | ponto e vírgula solto no `if` |
| 5 | Go | `dentro: 20` e `fora: 10` | `:=` cria variável nova no bloco |
| 6 | Java | `0.0%` | divisão inteira antes da conversão |

---

## Questão 1 (JavaScript): `for...in` em vetor

```js
const precos = [10, 20, 30];
let total = 0;
for (const p in precos) total += p;
console.log("Total: " + total);
```

Saída:

```
Total: 0012
```

`for...in` percorre as **chaves** do objeto, e num vetor as chaves são as
strings `"0"`, `"1"` e `"2"`. Como `total` começa em 0, a primeira soma
`0 + "0"` já converte tudo para string, e as seguintes só concatenam.

Correção: usar `for (const p of precos)`, que percorre os valores, ou
`precos.reduce((a, b) => a + b, 0)`.

## Questão 2 (Python): valor falso tratado como ausente

```python
def desconto(preco, d=None):
    d = d or 10
    return preco * (100 - d) / 100

print(desconto(200, 0))
```

Saída:

```
180.0
```

A chamada pede desconto de 0%, mas `0` é um valor falso em Python, então
`d or 10` descarta o zero e usa o padrão 10. O resultado deveria ser `200.0` e
sai `180.0`.

Correção: testar a ausência de forma explícita, com `if d is None: d = 10`. O
`or` só é seguro quando nenhum valor válido do domínio é falso.

## Questão 3 (Java): `switch` sem `break`

```java
int dia = 2;
switch (dia) {
    case 1: nome = "domingo";
    case 2: nome = "segunda";
    case 3: nome = "terça";
    default: nome = "inválido";
}
```

Saída:

```
inválido
```

O `switch` do C e do Java usa *fall through*: ao casar com `case 2`, a
execução segue por todos os ramos seguintes. Cada um sobrescreve `nome`, e o
último a executar é o `default`.

Correção: `break` ao fim de cada ramo, ou a forma com seta
(`case 2 -> nome = "segunda";`), que não tem fall through.

## Questão 4 (C): ponto e vírgula solto

```c
if (saque > saldo);
    printf("saldo insuficiente\n");
printf("fim\n");
```

Saída:

```
saldo insuficiente
fim
```

O `;` logo após o `if` é o corpo do comando, um comando vazio. O `printf`
indentado não pertence ao `if` e executa sempre. Com saldo 100 e saque 50 a
mensagem não deveria aparecer.

Correção: remover o `;`. A indentação enganosa é o ponto do exercício, já que
em C ela não tem valor sintático. Usar sempre chaves evita a classe inteira
desse erro.

## Questão 5 (Go): sombreamento com `:=`

```go
x := 10
if x > 5 {
    x := x * 2
    fmt.Println("dentro:", x)
}
fmt.Println("fora:", x)
```

Saída:

```
dentro: 20
fora: 10
```

Dentro do bloco, `x :=` **declara uma nova** variável, que oculta a externa. A
atribuição não alcança o `x` de fora, que continua 10.

Correção: usar `x = x * 2`, que atribui à variável existente. O compilador de
Go não acusa, porque o novo `x` é usado logo em seguida e não fica sem uso.

## Questão 6 (Java): divisão inteira e modo misto

```java
int acertos = 7, total = 10;
double taxa = acertos / total * 100;
```

Saída:

```
0.0%
```

`acertos / total` é divisão entre dois `int`, então o resultado é `0` com
truncamento, antes de qualquer conversão. O `* 100` opera sobre 0, e só na
atribuição o valor é alargado para `double`.

Correção: forçar ponto flutuante antes da divisão, com
`acertos * 100.0 / total` ou `(double) acertos / total * 100`, chegando a
`70.0%`.

---

## Conclusão

Os seis defeitos se agrupam em três origens:

- **Semântica de operador** (questões 1, 2 e 6): o operador faz o que foi
  definido, só que não o que o programador imaginou. Divisão inteira,
  conversão implícita para string e `or` sobre zero são os casos clássicos;
- **Estrutura de controle** (questões 3 e 4): a sintaxe permite escrever algo
  diferente do que a indentação sugere;
- **Escopo** (questão 5): a declaração cria um nome novo onde se pretendia
  reaproveitar o existente.

Nenhum dos seis é erro de compilação, e todos produzem um programa que roda e
entrega resultado errado em silêncio. É o argumento de Sebesta para
legibilidade como critério de projeto, já que o custo aparece na manutenção.

## Verificação

As questões 1, 3 e 6 foram executadas localmente (Node 22.16 e OpenJDK
21.0.11) e produziram exatamente a saída acima. As questões 2, 4 e 5 não
puderam ser executadas, por falta de Python, gcc e Go nesta máquina, e as
saídas foram deduzidas da semântica de cada linguagem.
