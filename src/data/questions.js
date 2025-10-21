export const QUESTIONS = [
  {
    topic: "Variáveis",
    prompt: "Qual opção declara uma variável em JavaScript corretamente?",
    code: "",
    choices: [
      "var 1nome = 'Ana'",
      "let nome = 'Ana'",
      "const = nome 'Ana'",
      "def nome := 'Ana'"
    ],
    answer: 1,
    explanation: "Em JS usamos var, let ou const seguidos pelo identificador. 'let nome = \"Ana\"' é válido."
  },
  {
    topic: "Variáveis",
    prompt: "O que acontece aqui?",
    code: "const x = 10;\nx = 20;",
    choices: [
      "x passa a ser 20",
      "Erro: não é possível reatribuir uma const",
      "x vira 10.20 (concatenação)",
      "Nada acontece"
    ],
    answer: 1,
    explanation: "Constantes não podem ser reatribuídas. Isso gera um TypeError."
  },
  {
    topic: "Condicionais",
    prompt: "Qual expressão é verdadeira?",
    code: "const a = '5';\nconst b = 5;",
    choices: [
      "a == b e a === b",
      "a == b e a !== b",
      "a != b e a === b",
      "a !== b e a === b"
    ],
    answer: 1,
    explanation: "== faz coerção de tipo ('5' == 5 é true). Já === considera tipo e valor (false)."
  },
  {
    topic: "Condicionais",
    prompt: "Complete a condição para imprimir 'maior'.",
    code: "const x = 7;\nif (/* ? */) {\n  console.log('maior');\n}",
    choices: [
      "x > 10",
      "x >= 7",
      "x = 7",
      "x < 0"
    ],
    answer: 1,
    explanation: "x >= 7 é true, portanto imprime 'maior'. 'x = 7' seria atribuição e não condição."
  },
  {
    topic: "Loops",
    prompt: "Quantas vezes isso imprime?",
    code: "for (let i = 0; i < 3; i++) {\n  console.log(i);\n}",
    choices: [
      "0 vezes",
      "2 vezes",
      "3 vezes",
      "4 vezes"
    ],
    answer: 2,
    explanation: "i = 0,1,2. Três iterações com i < 3."
  },
  {
    topic: "Loops",
    prompt: "Qual é a saída?",
    code: "let s = 0;\nfor (let i = 1; i <= 4; i++) { s += i; }\nconsole.log(s);",
    choices: [
      "4",
      "6",
      "10",
      "24"
    ],
    answer: 2,
    explanation: "Soma de 1+2+3+4 = 10."
  },
  {
    topic: "Funções",
    prompt: "Como declarar uma função tradicional?",
    code: "",
    choices: [
      "function soma(a,b){ return a+b }",
      "soma(a,b) => a+b",
      "def soma(a,b) = a+b",
      "fn soma(a,b) { a+b }"
    ],
    answer: 0,
    explanation: "A sintaxe clássica em JS é function nome(params) { corpo }."
  },
  {
    topic: "Funções",
    prompt: "Qual chamada retorna 9?",
    code: "const dup = (n) => n * 2;\nconst inc = (n) => n + 1;",
    choices: [
      "dup(inc(4))",
      "inc(dup(4))",
      "dup(inc(3))",
      "inc(dup(3))"
    ],
    answer: 1,
    explanation: "inc(dup(4)) = inc(8) = 9. Já dup(inc(4)) = dup(5) = 10."
  },
  {
    topic: "Correção",
    prompt: "Há um erro nesta função. Qual é a correção?",
    code: "function media(a, b) {\n  return a + b / 2;\n}",
    choices: [
      "return (a + b) / 2;",
      "return a + (b / 2) + 2;",
      "return a + b // 2;",
      "return a + b; // média é soma"
    ],
    answer: 0,
    explanation: "Ordem de operações: precisamos somar primeiro e depois dividir: (a + b)/2."
  },
  {
    topic: "Arrays",
    prompt: "Qual método cria um novo array com transformação?",
    code: "const arr = [1,2,3];",
    choices: [
      "arr.push(x => x*2)",
      "arr.map(x => x*2)",
      "arr.forEach(x => x*2)",
      "arr.pop(x => x*2)"
    ],
    answer: 1,
    explanation: "map retorna um novo array transformado. forEach não retorna."
  },
  {
    topic: "Strings",
    prompt: "Como verificar se 'Hello' contém 'ell'?",
    code: "const s = 'Hello';",
    choices: [
      "s.includes('ell')",
      "s.contains('ell')",
      "includes(s, 'ell')",
      "'ell' in s"
    ],
    answer: 0,
    explanation: "String.prototype.includes é o método correto."
  },
  {
    topic: "Objetos",
    prompt: "Como acessar a propriedade 'nome' de obj?",
    code: "const obj = { nome: 'Ana', idade: 20 };",
    choices: [
      "obj['nome'] ou obj.nome",
      "obj->nome",
      "obj(nome)",
      "get(obj, 'nome')"
    ],
    answer: 0,
    explanation: "Acesso por notação de ponto ou colchetes."
  }
];