export const LESSONS = {
  "Variáveis": {
    title: "Variáveis",
    summary: "Variáveis armazenam valores. Prefira let/const em JS moderno.",
    points: [
      "let: reatribuível; escopo de bloco.",
      "const: não reatribuível; escopo de bloco.",
      "var: escopo de função; evite em código moderno.",
      "Nomes válidos: letra, $, _ no início."
    ],
    code: `let nome = "Ana";
nome = "Bia";

const PI = 3.14; // não pode reatribuir

let idade = 20;   // number
let ok = true;    // boolean`,
    pitfalls: [
      "Reatribuir const gera TypeError.",
      "var pode causar bugs de escopo.",
      "Usar = ao invés de === em condicionais."
    ],
    exercises: [
      "Crie uma const 'ano' com seu ano de nascimento.",
      "Crie um let 'contador' e incremente 3 vezes."
    ]
  },
  "Condicionais": {
    title: "Condicionais (if/else)",
    summary: "Executam um bloco se a condição for verdadeira.",
    points: [
      "if (cond) { ... } else { ... }",
      "=== compara tipo e valor; prefira sobre ==.",
      "Ternário: cond ? a : b"
    ],
    code: `const idade = 18;
console.log(idade >= 18 ? "Maior" : "Menor");`,
    pitfalls: [
      "Trocar === por = dentro do if.",
      "Confiar em coerção de tipos com ==."
    ],
    exercises: [
      "Imprima 'par' se x % 2 === 0.",
      "Use ternário para 'aprovado' ou 'reprovado'."
    ]
  },
  "Loops": {
    title: "Loops",
    summary: "Repete etapas com for, while ou for...of.",
    points: [
      "for (início; condição; passo) { ... }",
      "while (condição) { ... }",
      "for...of percorre itens de arrays e strings."
    ],
    code: `for (let i=0;i<3;i++){ console.log(i); }`,
    pitfalls: [
      "Esquecer de alterar a variável no while (loop infinito).",
      "Acessar índices fora do array retorna undefined."
    ],
    exercises: [
      "Some números de 1 a 5 com for.",
      "Conte letras de uma string com for...of."
    ]
  },
  "Funções": {
    title: "Funções",
    summary: "Encapsulam lógica e podem retornar valores.",
    points: [
      "Declaração: function nome(p) { ... }",
      "Arrow: const f = (p) => { ... }",
      "Use return para devolver um valor."
    ],
    code: `function soma(a,b){ return a+b }`,
    pitfalls: [
      "Esquecer return.",
      "Confundir ordem dos parâmetros."
    ],
    exercises: [
      "Crie 'media(a,b)' que retorna (a+b)/2.",
      "Crie 'saudacao(n)' -> 'Olá, n!'."
    ]
  },
  "Arrays": {
    title: "Arrays",
    summary: "Listas ordenadas com métodos úteis.",
    points: [
      "map transforma e retorna novo array.",
      "filter seleciona itens.",
      "reduce acumula valores."
    ],
    code: `const arr = [1,2,3];
const dobrado = arr.map(x=>x*2);`,
    pitfalls: [
      "forEach não retorna.",
      "push/pop alteram o array original."
    ],
    exercises: [
      "Crie array de 3 nomes e imprima o primeiro.",
      "Use map para quadrados."
    ]
  },
  "Strings": {
    title: "Strings",
    summary: "Sequências imutáveis de caracteres.",
    points: [
      "Template: `Olá, ${nome}`",
      "includes/startsWith/endsWith",
      "toLowerCase/toUpperCase/trim"
    ],
    code: `const s = "Hello";
console.log(s.includes("ell"));`,
    pitfalls: [
      "Esquecer que são imutáveis.",
      "Concatenar muito sem template literals."
    ],
    exercises: [
      "Verifique se 'programar' contém 'gram'.",
      "Monte 'Olá, Mundo!' com template literal."
    ]
  },
  "Objetos": {
    title: "Objetos",
    summary: "Pares chave:valor, com possíveis métodos.",
    points: [
      "Acesso: obj.prop ou obj['prop']",
      "Desestruturação: const { nome } = obj",
      "JSON representa objetos em texto"
    ],
    code: `const pessoa = { nome: "Ana", idade: 20 };
console.log(pessoa.nome);`,
    pitfalls: [
      "Propriedade inexistente retorna undefined.",
      "Esquecer chaves na desestruturação."
    ],
    exercises: [
      "Crie objeto 'aluno' com nome e nota.",
      "Acesse 'nota' por ponto e colchetes."
    ]
  }
};