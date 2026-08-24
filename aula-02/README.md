# Paradigmas de Linguagens de Programação: Atividade Aula 02

[← voltar ao índice do repositório](../README.md)

Lista de exercícios: **Evolução das Principais Linguagens de Programação**, com
base no capítulo 2 de Sebesta (*Concepts of Programming Languages*).

20 questões autorais baseadas no capítulo 2; não reproduzem exercícios da
bibliografia.

## Estrutura do repositório

```
.
└── README.md     # este documento (enunciado + respostas)
```

---

## 1. Genealogia das linguagens

**Enunciado:** A genealogia das linguagens não é uma escada de progresso.
Explique essa afirmação e apresente dois fatores históricos que fazem uma
linguagem influenciar outra sem necessariamente substituí-la.

**Resposta:** A história das linguagens é uma árvore, não uma fila: ideias se
espalham, se combinam e coexistem. Fortran segue em uso na computação
científica e COBOL ainda roda sistemas bancários críticos, décadas depois de
surgirem alternativas. "Mais recente" não significa "substitui".

Dois fatores:

1. **Especialização por domínio.** Cada linguagem nasce resolvendo um problema
   específico (Fortran para cálculo numérico, COBOL para processamento
   comercial, Lisp para manipulação simbólica). Uma linguagem nova pode ser
   superior em geral e ainda assim não ser melhor *naquele* domínio.
2. **Custo de troca e base instalada.** Milhões de linhas de código, times
   treinados e ferramentas em torno de uma linguagem tornam a reescrita mais
   cara do que manter o sistema antigo.

*Objetivos: obj01, obj05 · Referência: Sebesta, cap. 2, páginas PDF 50, 51.*

---

## 2. Plankalkül

**Enunciado:** Plankalkül não foi implementada em sua época. Ainda assim, por
que ela é relevante para a história das linguagens? Cite três recursos
antecipados por seu projeto e explique o valor de um deles.

**Resposta:** Zuse projetou Plankalkül entre 1943 e 1945, mas ela só foi
implementada nos anos 2000. Sua relevância está em mostrar que o projeto de
linguagem é um problema conceitual, independente do hardware e da teoria de
compiladores disponíveis na época.

Três recursos antecipados:

- estruturas de dados em formato de **matriz/array**;
- estruturas de dados **hierárquicas** (registros aninhados, próximos do que
  hoje chamamos de `struct`);
- **invariantes/asserções** sobre os valores manipulados.

O valor das estruturas hierárquicas está em reconhecer, ainda nos anos 1940,
que dados reais têm partes relacionadas entre si. A ideia só reapareceu de
forma prática em COBOL (registros) e, depois, em C e nas linguagens orientadas
a objetos.

*Objetivos: obj01, obj02 · Referência: Sebesta, cap. 2, páginas PDF 52, 53.*

---

## 3. Short Code, Speedcoding e A-0/A-1/A-2

**Enunciado:** Compare Short Code, Speedcoding e os sistemas A-0/A-1/A-2
quanto ao problema enfrentado e à estratégia adotada. Por que chamá-los
simplesmente de compiladores modernos seria impreciso?

**Resposta:** Os três atacam o mesmo problema (programar em linguagem de
máquina era lento e propenso a erro) com estratégias diferentes:

- **Short Code** (Mauchly, 1949): expressões matemáticas em notação abreviada,
  *interpretadas* em tempo de execução. Facilitava a escrita, mas cada
  execução pagava o custo da interpretação.
- **Speedcoding** (Backus, IBM 701, 1953): também interpretador, oferecendo
  ponto flutuante como pseudo-instruções. Aceitava ser de 10 a 20 vezes mais
  lento em troca de produtividade do programador.
- **A-0, A-1 e A-2** (Grace Hopper, UNIVAC): concatenavam sub-rotinas
  pré-escritas em linguagem de máquina, referenciadas por código numérico.
  Mais próximo de um *linker* do que de um compilador.

Chamá-los de compiladores modernos é impreciso porque nenhum faz análise
sintática e semântica de uma linguagem de alto nível seguida de geração de
código otimizado. A compilação de fato nasce com o Fortran.

*Objetivos: obj01, obj02 · Referência: Sebesta, cap. 2, páginas PDF 53, 56.*

---

## 4. Fortran e a competição com código de máquina

**Enunciado:** Explique por que o projeto Fortran precisou convencer
programadores de que código traduzido podia competir com código de máquina
escrito à mão. Relacione desempenho, custo de programação e adoção.

**Resposta:** Nos anos 1950, tempo de computador era caro e escasso, enquanto
tempo de programador era comparativamente barato. Qualquer ineficiência gerada
por um tradutor automático era vista como economicamente inaceitável, e havia
desconfiança de que um compilador igualasse um programador experiente.

A equipe de Backus investiu pesado em otimizações no compilador (alocação de
registradores, otimização de laços) para chegar a poucos pontos percentuais do
código manual. Com isso, a comparação deixou de ser só velocidade de execução
e passou a ser **custo total**: tempo de máquina somado ao tempo de
programação e depuração. Fortran reduzia drasticamente o segundo sem sacrificar
o primeiro, e foi essa combinação que viabilizou a adoção de linguagens de
alto nível.

*Objetivos: obj01, obj02, obj04 · Referência: Sebesta, cap. 2, páginas PDF 56, 60.*

---

## 5. Lisp e Fortran: contextos diferentes

**Enunciado:** Lisp surgiu em um contexto diferente de Fortran. Compare os
domínios, a representação de dados e o estilo de computação favorecido pelas
duas linguagens.

**Resposta:**

| Aspecto | Fortran (1957) | Lisp (1958) |
|---|---|---|
| **Domínio** | Cálculo científico e de engenharia | Inteligência artificial, manipulação simbólica |
| **Representação de dados** | Vetores/matrizes numéricas, escalares com tipo fixo | Listas encadeadas (células *cons*) como estrutura universal, incluindo o próprio código |
| **Estilo favorecido** | Imperativo/iterativo, laços sobre arranjos numéricos | Funcional/recursivo, funções como valores |

Fortran nasceu para calcular fórmulas com eficiência sobre grandes volumes de
números. Lisp nasceu para representar e manipular símbolos, tratando programas
como dados (homoiconicidade), ideia essencial para pesquisa em IA e sem sentido
no domínio numérico do Fortran.

*Objetivos: obj02, obj03 · Referência: Sebesta, cap. 2, páginas PDF 61, 65.*

---

## 6. Contribuições de ALGOL 60

**Enunciado:** Avalie três contribuições de ALGOL 60 que ultrapassaram sua
adoção comercial. Por que uma linguagem pode ser muito influente sem dominar
o mercado?

**Resposta:** ALGOL 60 nunca teve adoção comercial ampla, mas deixou três
legados centrais:

1. **BNF (Backus-Naur Form)**, notação formal criada para descrever sua
   própria gramática e que virou o padrão para especificar sintaxe.
2. **Estrutura de blocos com escopo léxico**, base de praticamente toda
   linguagem imperativa posterior (Pascal, C e herdeiras).
3. **Estruturas de controle bem definidas** (`if`/`then`/`else`, laços) no
   lugar do `goto` indiscriminado, antecipando a programação estruturada.

A influência não depende do número de sistemas em produção, e sim de suas
ideias serem absorvidas pelas linguagens seguintes e de sua notação virar
vocabulário comum da área.

*Objetivos: obj02, obj04 · Referência: Sebesta, cap. 2, páginas PDF 66, 71.*

---

## 7. COBOL: domínio, público e FLOW-MATIC

**Enunciado:** COBOL foi desenhada para processamento comercial. Mostre como
domínio e público influenciaram sua legibilidade, seus registros e sua
relação com FLOW-MATIC.

**Resposta:** O comitê CODASYL projetou COBOL para ser lida também por
gestores e analistas de negócio. Daí a sintaxe verbosa e próxima do inglês
(`ADD A TO B GIVING C`), as divisões fixas e nomeadas (`IDENTIFICATION
DIVISION`, `DATA DIVISION`, `PROCEDURE DIVISION`) e os **registros
hierárquicos**, que espelham a forma como a empresa já organiza a informação
(um cadastro de cliente com campos e subcampos).

FLOW-MATIC, de Grace Hopper, já usava sintaxe baseada em inglês e era
orientada a arquivos comerciais. COBOL herdou essa filosofia e foi além ao ser
projetada por comitê para ser **padronizada entre fornecedores diferentes**,
algo que FLOW-MATIC, restrita à UNIVAC, não oferecia.

*Objetivos: obj01, obj02, obj04 · Referência: Sebesta, cap. 2, páginas PDF 72, 76.*

---

## 8. Basic e PL/I

**Enunciado:** Compare Basic e PL/I como respostas ao desejo de ampliar o
acesso ou o alcance da programação. Qual compromisso de projeto aparece em
cada caso?

**Resposta:** As duas ampliam, mas em direções opostas:

- **BASIC** (Dartmouth, Kemeny e Kurtz) ampliou o **acesso**: sintaxe mínima e
  execução interativa em tempo compartilhado para estudantes fora da
  computação. Trocou poder e estrutura por simplicidade, e foi depois criticada
  por incentivar código pouco estruturado (uso extensivo de `GOTO`).
- **PL/I** (IBM) ampliou o **alcance**: unificar os públicos de Fortran e COBOL
  em uma só linguagem, com tipos, exceções e concorrência. Trocou simplicidade
  por abrangência, resultando em uma linguagem volumosa e difícil de
  implementar e aprender.

Em ambos, o ganho em um eixo veio com custo claro no outro.

*Objetivos: obj01, obj04 · Referência: Sebesta, cap. 2, páginas PDF 77, 79.*

---

## 9. APL, SNOBOL e SIMULA 67

**Enunciado:** APL, SNOBOL e SIMULA 67 seguiram direções distintas. Associe
cada linguagem ao seu foco e identifique uma contribuição duradoura de cada
uma.

**Resposta:**

- **APL** (Iverson): foco em computação **vetorial/matricial**, com notação
  densa operando sobre arranjos inteiros de uma vez. Contribuição: o estilo
  orientado a arrays que reaparece em NumPy e MATLAB.
- **SNOBOL**: foco em **manipulação de texto e casamento de padrões**.
  Contribuição: o *pattern matching* com *backtracking* que influenciou
  expressões regulares e linguagens de script como Perl.
- **SIMULA 67**: foco em **simulação de eventos discretos**, para o que
  introduziu classes e objetos com herança. Contribuição: é a origem direta do
  paradigma orientado a objetos, base de Smalltalk e, por ela, de C++ e Java.

*Objetivos: obj02, obj03 · Referência: Sebesta, cap. 2, páginas PDF 85, 87.*

---

## 10. Ortogonalidade e ALGOL 68

**Enunciado:** Defina ortogonalidade no projeto de linguagens e use ALGOL 68
para discutir a diferença entre regularidade e simplicidade. Uma linguagem
muito ortogonal é automaticamente fácil de usar?

**Resposta:** Ortogonalidade é a propriedade de um pequeno conjunto de
construções primitivas poder ser combinado livremente e de forma previsível,
sem casos especiais.

ALGOL 68 levou o princípio ao extremo: qualquer construtor de tipo podia ser
combinado recursivamente com qualquer outro. Isso a tornou muito **regular**,
mas não **simples**: o número de combinações explode, gerando construções
raramente úteis e uma curva de aprendizado (e de implementação) íngreme.

Logo, não. Facilidade de uso depende também de familiaridade, legibilidade e de
a linguagem restringir combinações às que correspondem a idiomas comuns de
programação. Sem esse filtro, a ortogonalidade só multiplica possibilidades,
inclusive as inúteis.

*Objetivos: obj02, obj04 · Referência: Sebesta, cap. 2, páginas PDF 87, 91.*

---

## 11. ALGOL, Pascal, C e o contraste com Prolog

**Enunciado:** Construa uma cadeia de influência que passe por ALGOL, Pascal
e C. Depois contraste essa linhagem imperativa com a proposta declarativa de
Prolog.

**Resposta:** ALGOL 60 introduziu estrutura de blocos, escopo léxico e controle
estruturado. Wirth, insatisfeito com a complexidade de ALGOL 68, projetou
**Pascal** como linguagem mais simples e disciplinada para o ensino,
preservando blocos e tipagem forte. Ritchie criou **C** para programação de
sistemas (Unix), herdando blocos e comandos de controle da mesma linhagem, mas
priorizando proximidade com o hardware, sintaxe tersa e ausência de
verificações em tempo de execução.

As três são **imperativas**: o programador descreve, passo a passo, *como* o
estado muda.

**Prolog** é **declarativo**: o programador escreve fatos e regras (o *quê* é
verdade) e a consulta pede ao interpretador que descubra, por unificação e
retrocesso, quais valores satisfazem essa lógica. O "como" cabe ao motor de
inferência, não ao programador.

*Objetivos: obj02, obj03 · Referência: Sebesta, cap. 2, páginas PDF 88, 93.*

---

## 12. Uma base Prolog em linguagem natural

**Enunciado:** Modele em linguagem natural uma pequena base Prolog com dois
fatos, uma regra e uma consulta. Explique por que isso representa programação
lógica, não apenas armazenamento de dados.

**Resposta:**

- Fato 1: "Maria é mãe de João."
- Fato 2: "João é pai de Ana."
- Regra: "X é avó/avô de Z se X é pai ou mãe de Y, e Y é pai ou mãe de Z."
- Consulta: "Quem é avó ou avô de Ana?"

Resposta derivada: **Maria**, pois é mãe de João, que é pai de Ana.

Isso é programação lógica porque o fato "Maria é avó de Ana" nunca foi
armazenado. Ele é **derivado em tempo de consulta** pelo motor de inferência,
aplicando a regra sobre os fatos por unificação e busca. Um banco de dados
devolveria apenas o que foi gravado; aqui a resposta é fruto de um raciocínio
sobre o conhecimento declarado.

*Objetivos: obj02, obj03 · Referência: Sebesta, cap. 2, páginas PDF 93, 94.*

---

## 13. Ada: requisitos, confiabilidade e domínio crítico

**Enunciado:** Ada resultou de requisitos e projeto em grande escala. Analise
como confiabilidade, tipos, pacotes e concorrência se relacionam ao domínio
de sistemas críticos.

**Resposta:** Ada foi encomendada pelo Departamento de Defesa dos EUA para
unificar as linguagens usadas em sistemas embarcados e de missão crítica
(aviônica, armamentos, controle industrial). Cada decisão reflete esse domínio:

- **Confiabilidade**: verificações extensivas em compilação e tratamento de
  exceções nativo, porque falhas ali custam vidas, não reinicializações.
- **Tipos**: sistema estrito, com subtipos e faixas explícitas, impede que
  valores inválidos cheguem às variáveis em execução.
- **Pacotes**: encapsulamento e interfaces claras permitem que equipes grandes,
  muitas vezes de contratantes diferentes, integrem com previsibilidade.
- **Concorrência**: um modelo de tarefas (*rendezvous*) embutido na linguagem
  atende sensores, atuadores e temporizadores sem depender de soluções ad hoc
  de cada sistema operacional.

*Objetivos: obj02, obj04 · Referência: Sebesta, cap. 2, páginas PDF 94, 98.*

---

## 14. Objetos em Smalltalk, C++ e Java

**Enunciado:** Compare o papel dos objetos em Smalltalk, C++ e Java. Inclua
na resposta o compromisso de C++ com C e a estratégia de portabilidade de
Java.

**Resposta:**

- **Smalltalk**: objetos são o único conceito. Até inteiros e classes são
  objetos, toda comunicação é por passagem de mensagens e a tipagem é dinâmica.
  Mais que uma linguagem, é uma proposta de ambiente computacional (Alan Kay).
- **C++**: objetos são uma camada **opcional** sobre C, e código puramente
  procedural continua válido. É consequência do compromisso de Stroustrup com a
  compatibilidade com C, que atraiu a base existente ao preço de herdar a
  gestão manual de memória e a complexidade de C.
- **Java**: disciplina de objetos próxima de Smalltalk (herança simples,
  interfaces, nada fora de uma classe) com tipagem estática como C++. A
  diferença central é a **portabilidade**: compila para bytecode executado pela
  JVM, viabilizando "escreva uma vez, execute em qualquer lugar", problema que
  C++, compilado nativamente por plataforma, não endereça.

*Objetivos: obj02, obj03 · Referência: Sebesta, cap. 2, páginas PDF 98, 103.*

---

## 15. Java: da aplicação original à Web

**Enunciado:** A primeira aplicação de Java não foi a Web, mas a Web
impulsionou sua adoção. Explique como mudanças de contexto podem reposicionar
uma linguagem.

**Resposta:** Java nasceu do projeto Green/Oak, na Sun, para programar
eletrônicos de consumo interativos. Esse mercado não decolou.

Ao mesmo tempo, a Web criou a necessidade de código capaz de circular pela rede
e rodar com segurança em máquinas desconhecidas (os *applets*). As propriedades
que Java já tinha, portabilidade via bytecode e *sandboxing*, encaixavam quase
perfeitamente nessa demanda, sem terem sido desenhadas para ela.

O caso mostra que o sucesso de uma linguagem depende tanto de suas
propriedades técnicas quanto de encontrar um contexto em que elas se tornem
valiosas. Java não mudou de design; mudou o problema que o mundo precisava
resolver.

*Objetivos: obj01, obj02, obj04 · Referência: Sebesta, cap. 2, páginas PDF 103, 107.*

---

## 16. Perl, JavaScript, PHP, Python, Ruby e Lua

**Enunciado:** Compare Perl, JavaScript, PHP, Python, Ruby e Lua usando três
eixos: domínio inicial, estruturas de dados e estratégia de implementação.
Evite concluir que todas são iguais por serem chamadas de scripting.

**Resposta:**

| Linguagem | Domínio inicial | Estruturas de dados centrais | Estratégia de implementação |
|---|---|---|---|
| **Perl** | Texto e administração de sistemas Unix, scripts CGI | Escalares, arrays e hashes distinguidos por sigilos (`$`, `@`, `%`) | Interpretada, por muito tempo sem especificação formal |
| **JavaScript** | Scripts de cliente no navegador, manipulação do DOM | Objetos baseados em prototype e arrays dinâmicos | Interpretada na origem; motores modernos (V8) usam compilação *just-in-time* |
| **PHP** | Geração dinâmica de HTML no servidor | Um único tipo de array que serve como lista e mapa associativo ordenado | Interpretada por requisição no servidor Web, depois otimizada com cache de opcode e JIT |
| **Python** | Uso geral e ensino, hoje forte em ciência de dados | Listas, dicionários, tuplas e conjuntos embutidos | CPython interpreta bytecode em máquina virtual, com GIL |
| **Ruby** | Uso geral, popularizada na Web via Rails | Tudo é objeto, com arrays e hashes de métodos ricos | Interpretador MRI, com bytecode (YARV) desde a versão 1.9 |
| **Lua** | Scripting embutido em aplicações hospedeiras (jogos, software extensível) | Um único tipo *table*, que serve como array, mapa e objeto | Máquina virtual compacta, feita para inicialização rápida e pouca memória |

"Linguagem de scripting" é uma etiqueta ampla demais para significar algo
sozinha: os domínios de origem divergem, as estruturas de dados centrais também,
e as implementações vão de interpretadores simples a JITs de alta performance.

*Objetivos: obj01, obj03 · Referência: Sebesta, cap. 2, páginas PDF 107, 113.*

---

## 17. C# frente a Java e C++

**Enunciado:** C# foi apresentada como evolução no ambiente .NET. Compare
duas decisões de C# com suas correspondentes em Java ou C++ e explique o
problema que pretendem resolver.

**Resposta:**

1. **Propriedades (`get`/`set`) como recurso da linguagem**, em vez da
   convenção manual `getX()`/`setX()` de Java. Resolve o acesso e a validação
   de atributos de forma integrada ao sistema de tipos, sem a verbosidade e as
   inconsistências de nomenclatura da convenção manual.
2. **Structs (tipos por valor) ao lado de classes (tipos por referência)**,
   diferente de Java, onde tudo relacionado a objetos era referência. Resolve o
   custo de desempenho e memória de dados pequenos e frequentes, permitindo
   alocação em pilha. C++ já permitia algo semelhante, porém de forma mais
   manual e sem um runtime unificado como o .NET.

*Objetivos: obj02, obj04 · Referência: Sebesta, cap. 2, páginas PDF 113, 116.*

---

## 18. XSLT e JSP

**Enunciado:** Diferencie XSLT e JSP quanto a entrada, processamento e saída.
Por que ambas podem ser chamadas de linguagens híbridas de marcação e
programação?

**Resposta:**

| Aspecto | XSLT | JSP |
|---|---|---|
| **Entrada** | Um documento XML e uma folha de estilo XSLT (também em XML) | Uma requisição HTTP |
| **Processamento** | Um processador casa padrões de nós da árvore XML com templates declarativos | O servidor executa código Java e tags misturados à marcação HTML |
| **Saída** | Outro documento (XML, HTML ou texto) | Uma página, geralmente HTML, enviada ao cliente |

Ambas são híbridas porque combinam uma camada de marcação (XML em XSLT, HTML em
JSP) com construções de programação embutidas nela: templates declarativos e
casamento de padrões em XSLT, *scriptlets* e tags imperativas em JSP. Nos dois
casos o documento deixa de ser estático e passa a conter lógica sobre o que
exibir.

*Objetivos: obj02, obj03 · Referência: Sebesta, cap. 2, páginas PDF 116, 118.*

---

## 19. Linha do tempo com oito linguagens e quatro paradigmas

**Enunciado:** Crie uma linha do tempo com oito linguagens de pelo menos
quatro paradigmas. Para cada ligação, escreva o tipo de influência; não use
apenas setas cronológicas.

**Resposta:**

1. **Fortran (1957, imperativo)**
2. **Lisp (1958, funcional)**: *reação por contraste*, nasce para uma
   necessidade (símbolos, IA) que Fortran não atendia.
3. **ALGOL 60 (1960, imperativo)**: *influência conceitual*, formaliza
   estrutura de blocos e sintaxe (BNF) com rigor inédito.
4. **SIMULA 67 (1967, orientado a objetos)**: *extensão sintática de ALGOL*,
   acrescenta classes e objetos à base de blocos.
5. **Prolog (1972, lógico/declarativo)**: *ruptura de paradigma*, propõe fatos,
   regras e inferência no lugar de comandos sequenciais.
6. **Smalltalk (1980, orientado a objetos)**: *influência conceitual de SIMULA
   67*, leva a ideia de objetos ao extremo de "tudo é objeto".
7. **C++ (1983, orientado a objetos)**: *herança sintática de C somada a
   influência conceitual de Simula/Smalltalk*, por compromisso de
   compatibilidade.
8. **Java (1995, orientado a objetos)**: *reação de simplificação frente a
   C++*, remove herança múltipla e aritmética de ponteiros e acrescenta
   portabilidade via máquina virtual.

Paradigmas representados: imperativo (Fortran, ALGOL 60), funcional (Lisp),
orientado a objetos (Simula 67, Smalltalk, C++, Java) e lógico/declarativo
(Prolog).

*Objetivos: obj03, obj05 · Referência: Sebesta, cap. 2, páginas PDF 50, 118.*

---

## 20. Estudo de caso: escolha de linguagens por domínio

**Enunciado:** Estudo de caso: uma equipe precisa escolher tecnologias para
cálculo científico, regras declarativas, aplicação Web interativa e firmware
restrito. Proponha famílias de linguagens, justifique historicamente cada
escolha e explicite dois trade-offs.

**Resposta:**

- **Cálculo científico** → família **Fortran**, incluindo seu ecossistema atual
  (Python com NumPy sobre LAPACK e BLAS). Desde 1957 essa família é otimizada
  para operações numéricas em larga escala, com décadas de bibliotecas já
  validadas.
- **Regras declarativas** → família **Prolog** e motores lógicos (Datalog). É a
  linhagem que desde os anos 1970 formaliza expressar "o que" é verdadeiro em
  vez de "como" calcular.
- **Aplicação Web interativa** → **JavaScript** no cliente com uma linguagem de
  servidor madura (Java ou Python). Desde os anos 1990, JavaScript é a única
  linguagem executada nativamente em todos os navegadores.
- **Firmware restrito** → **C**, ou **Ada** quando o sistema for crítico à
  segurança. C foi desenhada nos anos 1970 para controle fino de memória com
  baixíssimo overhead; Ada, nos anos 1980, para embarcados críticos com
  exigência de confiabilidade.

Dois trade-offs:

1. **Desempenho versus segurança.** C dá controle total de memória sem proteção
   automática; Ada troca parte dessa liberdade por garantias em compilação.
2. **Maturidade de ecossistema versus elegância.** Escolher Fortran ou C
   prioriza bibliotecas testadas em produção sobre a ergonomia de linguagens
   mais novas.

*Objetivos: obj01, obj02, obj03, obj04, obj05 · Referência: Sebesta, cap. 2, páginas PDF 49, 118.*

---

## Fontes

- Sebesta, Robert W. *Concepts of Programming Languages*, capítulo 2
  ("Evolution of the Major Programming Languages").
