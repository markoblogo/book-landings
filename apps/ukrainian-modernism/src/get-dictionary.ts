import 'server-only'

const dictionaries = {
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  uk: () => import('./dictionaries/uk.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'fr' | 'uk') => {
  if (dictionaries[locale]) {
    return dictionaries[locale]();
  }
  return dictionaries['fr']();
}
