# Paradigmas de Linguagens de Programação: Atividade Aula 10

[← voltar ao índice do repositório](../README.md)

Laboratório de Concorrência, atividade individual de 1h15 em 9 etapas, sobre o
**capítulo 13 de Sebesta**. A proposta é provocar de propósito os erros
clássicos de programas concorrentes e registrar o que acontece.

| Item | Valor |
|---|---|
| **Aluno** | Leonardo Camilotti Moreno |
| **RA** | 24015988-2 |
| **Turma** | C |
| **Referência** | SEBESTA, R. W. *Conceitos de Linguagens de Programação*, 11. ed., cap. 13 (p. 541-594) |

> As práticas 1, 3, 4 e 7 foram executadas nesta máquina (OpenJDK 21.0.11 e
> Node 22.16), e as saídas abaixo são as obtidas de fato. A prática 2 foi
> reproduzida com a mesma lógica da simulação. As práticas 5 (Go) e 6 (Rust)
> não puderam ser executadas por falta dos compiladores, e estão respondidas
> pela semântica das linguagens.

---

## Preparação: concorrência em cinco minutos

**0.1 Qual é a diferença entre sincronização de cooperação e de competição?**

Cooperação é espera por **ordem**: a tarefa A só pode seguir depois que B
produzir algo de que A precisa. O caso canônico é o produtor e consumidor, em
que o consumidor espera o buffer deixar de estar vazio.

Competição é espera por **exclusividade**: duas tarefas querem o mesmo recurso
que não admite uso simultâneo, e a ordem entre elas é indiferente, desde que
não se sobreponham. O caso canônico são dois caixas alterando o mesmo saldo.

Fora da computação:

- **Cooperação:** numa cozinha, quem monta o prato espera quem frita terminar.
  A ordem importa, e não adianta dois montadores.
- **Competição:** o banheiro de um posto de gasolina. Qualquer ordem serve,
  mas só entra um por vez, e a tranca é o mecanismo de exclusão mútua.

---

## Prática 1 (Java): a condição de corrida

Duas threads somam 1 a um contador compartilhado, 1.000.000 de vezes cada.

**Previsão:** 2.000.000.

Saídas obtidas com `n = 1.000.000`:

| Execução | Esperado | Obtido |
|---|---|---|
| 1ª | 2000000 | **1096227** |
| 2ª | 2000000 | **1759107** |
| 3ª | 2000000 | **1057447** |

Com `n = 1000`, duas execuções:

```
esperado: 2000
obtido:   2000
```

**1.1 Os valores bateram? Foram iguais nas três execuções? Por que mudam?**

Nenhum bateu, e os três foram diferentes entre si. Faltaram de 240 mil a 940
mil incrementos. Mudam porque quem decide a ordem de execução é o escalonador
do sistema operacional, que não consulta o programa. Cada execução recebe um
entrelaçamento diferente das duas threads, e o número de atualizações perdidas
muda junto.

**1.2 Como uma atualização se perde, passo a passo**

`contador++` não é uma operação, são três: ler, somar e gravar. Com o contador
valendo 100:

| Passo | Thread 1 | Thread 2 | Memória |
|---|---|---|---|
| 1 | lê 100 | | 100 |
| 2 | | lê 100 | 100 |
| 3 | soma, registrador 101 | | 100 |
| 4 | | soma, registrador 101 | 100 |
| 5 | grava 101 | | 101 |
| 6 | | grava 101 | **101** |

Duas somas foram executadas e o contador avançou uma unidade só. A gravação da
thread 2 sobrescreveu a da thread 1, usando um valor lido antes dela.

**1.3 Com `n = 1000`, o que aconteceu?**

O resultado foi **2000 nas duas execuções**, ou seja, correto. O laço é tão
curto que a primeira thread costuma terminar antes de a segunda começar, e a
janela de sobreposição quase não existe.

É exatamente isso que torna o erro perigoso. Em teste, com volume pequeno, o
programa passa de forma consistente e o defeito fica invisível. Em produção,
com carga real e mais núcleos disputando, a sobreposição vira regra e o erro
aparece de forma intermitente, sem reprodução confiável. O defeito não surgiu
em produção, ele sempre esteve lá, só não tinha sido exposto.

---

## Prática 2 (simulador e Python): todas as respostas possíveis

`TOTAL` vale 3, a tarefa A faz `TOTAL + 1` e a B faz `TOTAL * 2`, cada uma em
três passos.

Saída obtida:

```
AAABBB -> 8
BBBAAA -> 7
ABABAB -> 6
Ordens possíveis: 20
TOTAL = 4:  9 ordens, por exemplo AABBBA
TOTAL = 6:  9 ordens, por exemplo AABABB
TOTAL = 7:  1 ordens, por exemplo BBBAAA
TOTAL = 8:  1 ordens, por exemplo AAABBB
```

**2.1 Quantas ordens e quantos resultados?**

São **20 ordens** possíveis, que é a quantidade de maneiras de escolher as 3
posições de A entre 6 passos. Aparecem **4 resultados distintos**: 4, 6, 7 e 8.

Só **1 ordem** dá o resultado 8, que o livro assume como correto, o mesmo
tanto que dá 7. As outras 18 ordens, ou 90% dos casos, dão 4 ou 6. A chance de
acertar por acaso é de 1 em 20.

**2.2 Uma ordem que dá 4**

Tomando `AABBBA`:

| Passo | Tarefa | Ação | TOTAL | reg A | reg B |
|---|---|---|---|---|---|
| 1 | A | lê TOTAL | 3 | 3 | - |
| 2 | A | calcula 3+1 | 3 | 4 | - |
| 3 | B | lê TOTAL | 3 | 4 | 3 |
| 4 | B | calcula 3×2 | 3 | 4 | 6 |
| 5 | B | grava | **6** | 4 | 6 |
| 6 | A | grava | **4** | 4 | 6 |

O que aconteceu com a operação de B: ela foi **completamente perdida**. B leu,
dobrou e gravou 6, mas A gravou logo depois um valor calculado a partir do 3
original, apagando o 6. O resultado 4 é como se B nunca tivesse existido.

---

## Prática 3 (Java): corrigindo a corrida

Saídas obtidas, duas execuções:

```
--- execução 1 ---
esperado:          2000000
sem sincronizacao: 1575274 em 44 ms
synchronized:      2000000 em 39 ms
AtomicInteger:     2000000 em 24 ms

--- execução 2 ---
esperado:          2000000
sem sincronizacao: 1043939 em 14 ms
synchronized:      2000000 em 47 ms
AtomicInteger:     2000000 em 44 ms
```

**3.1 Quais versões deram o valor correto? E os tempos?**

`synchronized` e `AtomicInteger` acertaram 2.000.000 nas duas execuções. A
versão sem sincronização errou nas duas, e com valores diferentes.

Sobre os tempos, a versão errada foi a mais rápida na segunda execução, com 14
ms contra 47 e 44. A correta é mais lenta porque paga por serialização: o
`synchronized` obriga uma thread por vez na seção crítica, então a outra fica
bloqueada, e ainda há custo de aquisição e liberação do monitor. O
`AtomicInteger` é mais barato, porque usa uma instrução de comparação e troca
do processador em vez de bloquear, mas ainda assim repete a tentativa quando
há disputa.

Vale registrar que os tempos oscilaram bastante entre as duas execuções, com o
`AtomicInteger` indo de 24 a 44 ms. Com um laço de 1 milhão, a medição é muito
sensível ao JIT e ao escalonamento, então o que importa é a ordem de grandeza,
não o número exato. A conclusão honesta é que correção custa desempenho, e não
que uma das duas soluções corretas seja sempre mais rápida.

**3.2 Um `AtomicInteger` em cada saldo resolve a transferência bancária?**

Não. Cada operação isolada fica atômica, mas a transferência são **duas**
operações que precisam ser atômicas **em conjunto**: debitar de A e creditar
em B. Entre uma e outra existe um instante em que o dinheiro não está em
nenhuma das contas, e qualquer leitura nesse intervalo vê um total errado. Pior,
se a segunda falhar, o débito já aconteceu.

O que seria preciso é tornar o par indivisível, com uma trava que cubra as duas
contas, sempre adquirida na mesma ordem para não cair no impasse da prática 4,
ou uma transação com confirmação e desfazimento. O conceito é a seção crítica
abranger a operação inteira, não cada acesso.

---

## Prática 4 (Java): impasse

Saída obtida, antes da correção:

```
IMPASSE: 2 threads presas
```

As mensagens `A terminou` e `B terminou` não apareceram.

Depois da correção, com a thread B pegando X antes de Y:

```
A terminou
B terminou
sem impasse
```

**4.1 Por que as duas ficaram presas?**

A thread A adquiriu X e, após a pausa de 100 ms, pediu Y. A thread B fez o
inverso: adquiriu Y e pediu X. Cada uma segurava exatamente o recurso que a
outra esperava, e nenhuma libera o que tem antes de obter o que falta. A espera
é circular e permanente.

A pausa de 100 ms serve para garantir que as duas peguem o primeiro recurso
antes de qualquer uma pedir o segundo, tornando o impasse determinístico num
programa que, sem ela, às vezes passaria.

**4.2 Por que a ordem fixa elimina o impasse?**

Porque quebra a espera circular, uma das quatro condições necessárias para o
impasse. Com todos pedindo X antes de Y, quem conseguir X segue até o fim e
libera os dois. Quem não conseguir espera, mas espera alguém que não depende
dela. Não há ciclo possível.

Exemplo real: um sistema de reservas que bloqueia o registro do voo e o do
hotel. Se uma transação trava voo e depois hotel, e outra trava hotel e depois
voo, duas reservas simultâneas travam o sistema. A convenção de sempre travar
em ordem alfabética de recurso, ou por ordem de identificador, resolve sem
nenhuma estrutura nova.

---

## Prática 5 (Go): mensagens em vez de memória compartilhada

> Não executada: Go não está instalado nesta máquina.

**5.1 Os três tempos e por que não há `synchronized` nem trava**

O programa tem três marcos temporais: o instante em que os trabalhadores são
lançados, o instante em que cada um devolve seu resultado pelo canal, e o
instante em que o coletor termina de receber tudo. Os trabalhadores rodam em
paralelo, então o tempo total se aproxima do mais lento e não da soma.

Não há trava porque **não há memória compartilhada para proteger**. Cada
goroutine trabalha sobre dados próprios e comunica o resultado por um canal, e
o canal já é, ele mesmo, sincronizado: a entrega de uma mensagem é uma operação
atômica da linguagem. Sem dado compartilhado, não existe seção crítica, e sem
seção crítica não há condição de corrida. É o lema da linguagem, não comunicar
compartilhando memória, e sim compartilhar memória comunicando.

**5.2 Por que o primeiro programa trava e o canal com espaço para 1 resolve**

Um canal sem buffer em Go é **síncrono**: o envio só se completa quando alguém
recebe, e o recebimento só se completa quando alguém envia. Se a mesma
goroutine envia e não há ninguém do outro lado, ela bloqueia para sempre, e o
programa trava com `all goroutines are asleep, deadlock`.

Com espaço para 1 mensagem, o canal passa a ter buffer: o envio deposita o
valor e segue, sem esperar receptor. A trava desaparece porque o produtor não
depende mais de um consumidor simultâneo. O segundo envio, sem ninguém ler,
voltaria a bloquear, já que o buffer estaria cheio.

---

## Prática 6 (Rust): o compilador como guarda

> Não executada: Rust não está instalado nesta máquina.

**6.1 Com `move`, o programa compila mas imprime 0. Por quê?**

Porque `i32` implementa `Copy`. O `move` transfere para a thread uma **cópia**
do número, não o original. A thread incrementa a própria cópia, que morre com
ela, e a variável da `main` nunca é tocada, continuando com o valor inicial.

O compilador aceita porque não há violação de posse nem acesso concorrente: as
duas threads mexem em dados distintos. O resultado errado não é um erro de
memória, é um erro de modelagem, e para compartilhar de verdade seria preciso
`Arc<Mutex<i32>>`, com o `Arc` dando posse compartilhada e o `Mutex` a exclusão
mútua.

**6.2 Em que momento o erro foi descoberto em Java e em Rust?**

Em Java, **nunca**. O programa da prática 1 compila, roda, termina sem exceção
e entrega um número errado. Descobrir exigiu executar várias vezes e comparar
com o esperado.

Em Rust, em **tempo de compilação**. A tentativa de compartilhar a variável
entre threads sem proteção é recusada pelo verificador de posse, e o programa
não chega a existir.

A vantagem é que a classe inteira de condições de corrida sobre memória deixa
de ser possível em tempo de execução, o que em sistemas concorrentes vale
muito, já que são justamente os erros mais difíceis de reproduzir. O custo é a
rigidez: o programador precisa aprender posse, empréstimo e tempo de vida, e
construções que seriam triviais em Java exigem `Arc` e `Mutex` explícitos. Rust
troca tempo de depuração por tempo de escrita.

---

## Prática 7 (JavaScript): uma thread só e o laço de eventos

Saída obtida:

```
A
D
C
B
E: timer de 10 ms rodou depois de 301 ms
```

**7.1 Em que ordem as letras saíram e por que B ficou depois de C e D?**

A ordem foi **A, D, C, B**.

`A` e `D` são código síncrono e executam direto, na ordem em que aparecem. Tudo
que é assíncrono só roda depois que a pilha esvazia, e aí entram duas filas com
prioridades diferentes: as microtarefas, onde ficam as promessas, e as
macrotarefas, onde fica o `setTimeout`. As microtarefas são drenadas primeiro,
então `C` precede `B`.

O `0` do `setTimeout` não significa imediatamente, significa o quanto antes
depois de a pilha esvaziar e as microtarefas terminarem. É um piso, não um
prazo.

**7.2 Por que o timer de 10 ms rodou depois de 301 ms?**

Porque a função `ocupado(300)` é um laço que não devolve o controle. Como há
uma única thread, enquanto esse laço gira o laço de eventos está parado e
nenhuma fila é consultada. O timer de 10 ms venceu durante o bloqueio, mas só
pôde ser executado 301 ms depois, quando a thread ficou livre.

Para um servidor Node.js a consequência é direta: um cálculo pesado no
caminho da requisição não atrasa só aquele cliente, ele congela **todos**, já
que todas as conexões compartilham a mesma thread. Por isso trabalho pesado vai
para `worker_threads`, para um processo separado ou para uma fila externa, e o
laço de eventos fica reservado a operações de entrada e saída, que são as que
devolvem o controle enquanto esperam.

---

## Fechamento

**8.1 Site de ingressos, 1 lugar restante, duas pessoas clicam ao mesmo tempo**

É exatamente a condição de corrida da prática 1. As duas requisições leem
"1 lugar disponível" antes de qualquer uma gravar, as duas concluem que há
lugar, e as duas gravam "0 lugares" após vender. Dois ingressos vendidos para
uma vaga, e o contador nem fica negativo, o que esconde o problema.

Para evitar, a verificação e a gravação precisam ser uma operação só. Na
prática, isso significa resolver no banco de dados, com uma atualização
condicional do tipo `UPDATE ... SET vagas = vagas - 1 WHERE id = ? AND vagas > 0`,
conferindo quantas linhas foram afetadas, ou uma transação com o registro
travado. A solução correta fica na camada que detém o dado, e não na aplicação,
porque podem existir vários servidores atendendo em paralelo, e uma trava na
memória de um deles não impede o outro.

**8.2 O que mais surpreendeu**

A prática 1 com `n = 1000` dando o resultado certo nas duas execuções. O mesmo
código com o mesmo defeito passou no teste pequeno e falhou feio no grande, o
que mostra que, em concorrência, teste que passa não é evidência de ausência de
erro.

---

## Síntese

| Situação | Quem impede a corrida |
|---|---|
| Contador com `synchronized` (prática 3) | a linguagem, com o monitor |
| Contador com `AtomicInteger` (prática 3) | o processador, com instrução atômica |
| Trabalhadores com canais em Go (prática 5) | o projeto, que elimina o dado compartilhado |
| Threads em Rust (prática 6) | o compilador, antes de rodar |
| Laço de eventos em JavaScript (prática 7) | o modelo de execução, com uma thread só |
| Venda de ingressos (fechamento) | o banco de dados, com transação |

O fio que liga tudo: condição de corrida não se resolve testando mais, se
resolve eliminando a possibilidade, seja por exclusão mútua, por ausência de
compartilhamento ou por verificação estática.
