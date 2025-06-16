export const translations = {
  drag_items: {
    en: 'Drag items to form pairs',
    ro: 'Trage elementele pentru a forma perechi'
  },
  group_1: {
    en: 'Group 1',
    ro: 'Grupa 1'
  },
  group_2: {
    en: 'Group 2',
    ro: 'Grupa 2'
  },
  game_title: {
    en: 'Even and Odd Numbers',
    ro: 'Numere Pare și Impare'
  },
  game_subtitle: {
    en: 'Learn even and odd numbers through fun and interactive gameplay!',
    ro: 'Învață numerele pare și impare prin joc și distracție!'
  },
  game_description: {
    en: 'Un joc educațional interactiv pentru învățarea numerelor pare și impare prin joc și distracție!',
    ro: 'Un joc educațional interactiv pentru învățarea numerelor pare și impare prin joc și distracție!'
  },
  game_instructions: {
    en: 'Drag and drop the numbers into the correct trays to match them.',
    ro: 'Trage și lasă numerele în tavă pentru a le potrivi.'
  },
  game_instructions_2: {
    en: 'Drag and drop the numbers into the correct trays to match them.',
    ro: 'Trage și lasă numerele în tavă pentru a le potrivi.'
  },
  odd_number_message: {
    en: "This is an odd number, which means one item remains alone. Pairs cannot be formed.",
    ro: "Acesta este un număr impar, adică trist. Un element a rămas singur, deci nu se pot forma perechi.",
    es: "Este un número impar, lo que significa que un elemento queda solo. No se pueden formar pares.",
    fr: "C'est un nombre impair, ce qui signifie qu'un élément reste seul. Les paires ne peuvent pas être formées.",
    de: "Dies ist eine ungerade Zahl, was bedeutet, dass ein Element allein bleibt. Paare können nicht gebildet werden.",
    it: "Questo è un numero dispari, il che significa che un elemento rimane solo. Non si possono formare coppie.",
    pt: "Este é um número ímpar, o que significa que um elemento fica sozinho. Os pares não podem ser formados.",
    nl: "Dit is een oneven getal, wat betekent dat één element alleen blijft. Paren kunnen niet worden gevormd."
  },
  single_item_message: {
    en: "One item remains alone",
    ro: "Un element a rămas singur",
    es: "Un elemento queda solo",
    fr: "Un élément reste seul",
    de: "Ein Element bleibt allein",
    it: "Un elemento rimane solo",
    pt: "Um elemento fica sozinho",
    nl: "Één element blijft alleen"
  },
  even_number_message: {
    en: "This is an even number, which means a happy number, because all items have pairs and can play together.",
    ro: "Acesta este un număr par, adică un număr vesel, pentru că toți au pereche și se pot juca împreună.",
    es: "Este un número par, lo que significa un número feliz, porque todos los elementos tienen pares y pueden jugar juntos.",
    fr: "C'est un nombre pair, ce qui signifie un nombre heureux, car tous les éléments ont des paires et peuvent jouer ensemble.",
    de: "Dies ist eine gerade Zahl, was eine glückliche Zahl bedeutet, da alle Elemente Paare haben und zusammen spielen können.",
    it: "Questo è un numero pari, il che significa un numero felice, perché tutti gli elementi hanno coppie e possono giocare insieme.",
    pt: "Este é um número par, o que significa um número feliz, porque todos os elementos têm pares e podem brincar juntos.",
    nl: "Dit is een even getal, wat een gelukkig getal betekent, omdat alle elementen paren hebben en samen kunnen spelen."
  }
};

export const getTranslation = (key: string, language: string): string => {
  const translation = translations[key as keyof typeof translations];
  if (!translation) return key;
  return translation[language as keyof typeof translation] || translation.en;
};

export const happyAnimals = [
  '🐶', // câine
  '🐱', // pisică
  '🐰', // iepure
  '🐼', // panda
  '🐨', // koala
  '🐺', // vulpe
  '🐯', // tigru
  '🦁', // leu
  '🐮', // vacă
  '🐷', // porc
  '🐸', // broască
  '🐙', // caracatiță
  '🦄', // unicorn
  '🦒', // girafă
  '🦘', // cangur
  '🦥', // leneș
  '🦢', // vidră
  '🦨', // sconcs
  '🦡', // bursuc
  '🦫'  // castor
];

