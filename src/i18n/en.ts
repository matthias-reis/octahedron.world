export const en = {
  home: {
    tagline: 'Ephemeral Thoughts about Life, the Universe and Everything...',
  },
  dica: {
    help: 'Help',
    progress: 'Progress',
    clues: 'Clues',
    openQuest: '🧐 Open Quest',
    finishedQuest: '✅ Finished Quest',
    failedQuest: '❌ Failed Quest',
    submit: 'Submit',
    attempt: 'Attempt',
    answer: 'Your answer...',
    solutionsFound: {
      one: '{{count}} solution found',
      other: '{{count}} solutions found',
    },
    solutionsFoundWithMax: '{{count}} of {{max}} solutions found',
    itemsCount: '{{count}} of {{sum}} items',
    wrongAttempts: {
      one: '{{count}} wrong attempt',
      other: '{{count}} wrong attempts',
    },
    deviation: 'Deviation',
    score: 'Score',
  },
  footer: {
    imprint: 'Imprint',
    imprint_href: '/imprint',
    privacy: 'Privacy Policy',
    privacy_href: '/privacy',
    about: 'About',
    about_href: '/about',
    copyright: 'All rights reserved.',
  },
  switcher: {
    label: 'Language',
    de: 'Deutsch',
    en: 'English',
  },
};

export type Dictionary = typeof en;
