import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    home: {
      title: `Website title`
    },
    reveal: {
      instruction: {
        text: {
          default: `Drag and drop on the screen to discover our baby's&nbsp;gender...`,
          1: `Instruction text 1`,
          2: `Instruction text 2`,
        }
      },
      pulse: {
        text1: {
          default: `Baby's heartbeat`,
          1: `text1`, 
          2: `text2` 
        },
        text2: {
          default: `Tap to reveal<br>the gender`,
          1: `text1`,
          2: `text2`
        }
      },
      step: {
        text1: {
          default: ``,
          1: `Is it a girl...`,
          2: `Is it a boy...`
        },
        text2: {
          default: ``,
          1: `or a boy?`,
          2: `or a girl?`
        },
      },
      result: {
        text: {
          default: `We're having a baby!!!`,
          1: `We're having a baby girl!!!`,
          2: `We're having a baby boy!!!`,
        },
        subtitleText: {
          default: `A little bubble`,
          1: `A beautiful blue smurfette`,
          2: `a Pink Floyd newcomer?`,
        },
      },
      thanks: {
        text: {
          default: `Thank you for participating!`,
          1: `Hope you enjoyed the reveal!`,
          2: `See you soon!`
        }
      },
      support: {
        text: `This is a free project made by A French Couple.<br>Support us to help us making more free project like this one`,
        share: `"Share, like, follow, and see you tomorrow!"`,
      }
    }
  },
  fr: {
    home: {
      title: `Titre du site`
    },
    reveal: {
      pulse: {
        text1: {
          default: `Baby's heartbeat`,
          1: `text1`, 
          2: `text2`
        },
        text2: {
          default: `Touche pour<br>découvrir le genre`,
          1: `text1` 
        }
      }
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