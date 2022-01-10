import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    home: {
      title: "Website title"
    }
  },
  fr: {
    home: {
      title: "Titre du site"
    }
  }
}



export const i18n = createI18n({
  // something vue-i18n options here ...
  locale: navigator.language.indexOf('fr') !== -1 ? 'fr' : 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})