
export const translations = {
  even: { 
    ro: "Par", 
    en: "Even", 
    de: "Gerade", 
    es: "Par", 
    fr: "Pair", 
    hu: "Páros", 
    it: "Pari", 
    ru: "Четный" 
  },
  odd: { 
    ro: "Impar", 
    en: "Odd", 
    de: "Ungerade", 
    es: "Impar", 
    fr: "Impair", 
    hu: "Páratlan", 
    it: "Dispari", 
    ru: "Нечетный" 
  },
  start_game: { 
    ro: "Începe Jocul", 
    en: "Start Game", 
    de: "Spiel starten", 
    es: "Empezar Juego", 
    fr: "Commencer le jeu", 
    hu: "Játék indítása", 
    it: "Inizia Gioco", 
    ru: "Начать игру" 
  },
  choose_language: { 
    ro: "Alege limba", 
    en: "Choose language", 
    de: "Sprache wählen", 
    es: "Elegir idioma", 
    fr: "Choisir la langue", 
    hu: "Nyelv kiválasztása", 
    it: "Scegli lingua", 
    ru: "Выбрать язык" 
  },
  level_beginner: { 
    ro: "Începător", 
    en: "Beginner", 
    de: "Anfänger", 
    es: "Principiante", 
    fr: "Débutant", 
    hu: "Kezdő", 
    it: "Principiante", 
    ru: "Новичок" 
  },
  level_interactive: { 
    ro: "Interactiv", 
    en: "Interactive", 
    de: "Interaktiv", 
    es: "Interactivo", 
    fr: "Interactif", 
    hu: "Interaktív", 
    it: "Interattivo", 
    ru: "Интерактивный" 
  },
  level_advanced: { 
    ro: "Avansat", 
    en: "Advanced", 
    de: "Fortgeschritten", 
    es: "Avanzado", 
    fr: "Avancé", 
    hu: "Haladó", 
    it: "Avanzato", 
    ru: "Продвинутый" 
  },
  level_pro: { 
    ro: "Pro", 
    en: "Pro", 
    de: "Profi", 
    es: "Pro", 
    fr: "Pro", 
    hu: "Profi", 
    it: "Pro", 
    ru: "Про" 
  },
  group_1: { 
    ro: "Grupa 1", 
    en: "Group 1", 
    de: "Gruppe 1", 
    es: "Grupo 1", 
    fr: "Groupe 1", 
    hu: "1. csoport", 
    it: "Gruppo 1", 
    ru: "Группа 1" 
  },
  group_2: { 
    ro: "Grupa 2", 
    en: "Group 2", 
    de: "Gruppe 2", 
    es: "Grupo 2", 
    fr: "Groupe 2", 
    hu: "2. csoport", 
    it: "Gruppo 2", 
    ru: "Группа 2" 
  },
  drag_items: { 
    ro: "Trage elementele în grupuri pentru a forma perechi!", 
    en: "Drag items into groups to form pairs!", 
    de: "Ziehe Elemente in Gruppen, um Paare zu bilden!", 
    es: "¡Arrastra elementos en grupos para formar pares!", 
    fr: "Glissez les éléments en groupes pour former des paires!", 
    hu: "Húzd az elemeket csoportokba, hogy párokat alkoss!", 
    it: "Trascina gli elementi in gruppi per formare coppie!", 
    ru: "Перетащите элементы в группы, чтобы образовать пары!" 
  },
  great_job: { 
    ro: "Bravo! Numărul este", 
    en: "Great job! The number is", 
    de: "Gut gemacht! Die Zahl ist", 
    es: "¡Buen trabajo! El número es", 
    fr: "Bien joué! Le nombre est", 
    hu: "Szuper! A szám", 
    it: "Ottimo lavoro! Il numero è", 
    ru: "Отличная работа! Число" 
  },
  try_again: { 
    ro: "Încearcă din nou!", 
    en: "Try again!", 
    de: "Versuche es nochmal!", 
    es: "¡Inténtalo de nuevo!", 
    fr: "Essaie encore!", 
    hu: "Próbáld újra!", 
    it: "Riprova!", 
    ru: "Попробуй еще раз!" 
  },
  score: { 
    ro: "Scor", 
    en: "Score", 
    de: "Punkte", 
    es: "Puntuación", 
    fr: "Score", 
    hu: "Pontszám", 
    it: "Punteggio", 
    ru: "Счет" 
  },
  game_title: { 
    ro: "Prietenii Numerelor", 
    en: "Number Friends", 
    de: "Zahlenfreunde", 
    es: "Amigos de los Números", 
    fr: "Amis des Nombres", 
    hu: "Számbarátok", 
    it: "Amici dei Numeri", 
    ru: "Друзья Чисел" 
  },
  game_subtitle: { 
    ro: "Par & Impar", 
    en: "Even & Odd", 
    de: "Gerade & Ungerade", 
    es: "Par e Impar", 
    fr: "Pair et Impair", 
    hu: "Páros és Páratlan", 
    it: "Pari e Dispari", 
    ru: "Четные и Нечетные" 
  }
};

export const getTranslation = (key: string, language: string): string => {
  const translation = translations[key as keyof typeof translations];
  if (!translation) return key;
  return translation[language as keyof typeof translation] || translation.en;
};
