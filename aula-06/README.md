# Paradigmas de Linguagens de Programação: Atividade Aula 06

[← voltar ao índice do repositório](../README.md)

Exercício "preveja a saída" da pasta `08_exercicio`, sobre **tipos de dados**
(capítulo 6 de Sebesta). Para cada programa: qual é a saída e em que momento o
problema é detectado, na compilação, na execução ou nunca.

| Item | Valor |
|---|---|
| **Aluno** | Leonardo Camilotti Moreno |
| **RA** | 24015988-2 |
| **Referência** | SEBESTA, R. W. *Conceitos de Linguagens de Programação*, 11. ed., cap. 6 |

## Resumo

| Questão | Linguagem | Saída | Detecção |
|---|---|---|---|
| 1 | JavaScript | `false` e `9007199254740992` | nunca |
| 2 | Python | `4 6` | nunca, é o comportamento correto |
| 3 | Go | `0` | nunca |
| 4 | Java | `0` e exceção | execução |
| 5 | Rust | não compila | compilação |
| 6 | C | `1065353216` | nunca |

---

## Questão 1 (JavaScript): ponto flutuante e inteiro seguro

```js
console.log(0.1 * 3 === 0.3);
console.log(9007199254740993);
```

Saída:

```
false
9007199254740992
```

A primeira linha é a representação binária IEEE 754: nem `0.1` nem `0.3` têm
representação exata em base 2, e o produto acumula erro, então a comparação
falha. A segunda é o limite de inteiro seguro: todo número em JavaScript é um
`double`, com 53 bits de mantissa, e `9007199254740993` (2^53 + 1) não cabe,
sendo arredondado para o par mais próximo.

Detecção: nunca. Não há erro, apenas um resultado diferente do esperado.
Comparar floats exige tolerância, e inteiros grandes exigem `BigInt`.

## Questão 2 (Python): caracteres e bytes

```python
palavra = "maçã"
print(len(palavra), len(palavra.encode()))
```

Saída:

```
4 6
```

`len` sobre a string conta **caracteres** (pontos de código), e são 4. O
`encode()` produz bytes em UTF-8, onde `m` e `a` ocupam 1 byte cada, mas `ç` e
`ã` ocupam 2, totalizando 6.

Detecção: nunca, porque não é erro. O ponto é que cadeia de caracteres e
sequência de bytes são tipos diferentes, e tratá-los como o mesmo quebra
qualquer texto fora do ASCII.

## Questão 3 (Go): estouro de inteiro sem sinal

```go
var b byte = 255
b++
```

Saída:

```
0
```

`byte` é apelido de `uint8`, cujo intervalo é 0 a 255. O incremento estoura e
dá a volta para 0, por aritmética modular. Go só acusa estouro em constantes
avaliadas na compilação, nunca em variáveis durante a execução.

Detecção: nunca. É o caso mais perigoso dos seis, porque o programa segue com
um valor errado e sem nenhum sinal.

## Questão 4 (Java): limites de índice

```java
int[] v = new int[3];
System.out.println(v[0]);
System.out.println(v[3]);
```

Saída:

```
0
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
```

A primeira linha mostra que Java inicializa os elementos com o valor padrão do
tipo, zero. A segunda tenta o índice 3 num vetor de tamanho 3, cujos índices
válidos vão de 0 a 2.

Detecção: execução. Java verifica os limites em tempo de execução, e é por
isso que o erro vira exceção em vez de leitura de memória alheia, como
aconteceria em C.

## Questão 5 (Rust): posse e movimento

```rust
let s = String::from("oi");
let t = s;
println!("{} {}", s, t);
```

Não compila. O erro é o `E0382`, *borrow of moved value*.

`String` não implementa `Copy`, então `let t = s` **move** a posse em vez de
copiar. A partir dali `s` deixa de ser válida, e usá-la no `println!` é o erro.

Detecção: compilação. É o oposto da questão 3: o custo é a rigidez do
compilador, e o benefício é que a classe inteira de erros de uso após
liberação deixa de existir em tempo de execução.

## Questão 6 (C): união livre

```c
union { int i; float f; } u;
u.f = 1.0f;
printf("%d\n", u.i);
```

Saída:

```
1065353216
```

Os dois campos compartilham a mesma memória. Gravar em `f` e ler em `i`
reinterpreta os 32 bits do `float` como inteiro. O valor `1.0f` em IEEE 754 é
`0x3F800000`, que em decimal é exatamente 1065353216.

Detecção: nunca. A união em C é **livre**, ou seja, não guarda qual campo foi
escrito por último, e o compilador não tem como checar. Uniões discriminadas,
como o `enum` de Rust, carregam essa etiqueta e tornam o erro impossível.

---

## Conclusão

Os seis casos se separam por **quando** o problema aparece:

- **Compilação** (questão 5): o programa nem roda, o custo é do programador;
- **Execução** (questão 4): o erro é detectado e sinalizado, com custo de
  verificação a cada acesso;
- **Nunca** (questões 1, 3 e 6): o programa termina normalmente com um valor
  errado, e o custo recai sobre quem for depurar depois.

A terceira categoria é a mais cara, e é justamente a que linguagens com
tipagem forte e verificação estática tentam eliminar.

## Verificação

As questões 1 e 4 foram executadas localmente (Node 22.16 e OpenJDK 21.0.11) e
produziram exatamente a saída acima. As questões 2, 3, 5 e 6 não puderam ser
executadas nesta máquina, por falta de Python, Go, Rust e gcc, e as saídas
foram deduzidas da semântica de cada linguagem. O `README.md` da pasta de
exemplos confirma que `q5.rs` falha com `E0382`.
