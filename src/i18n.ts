import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import languageDetector from 'i18next-browser-languagedetector'
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend'

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .use(HttpBackend)
  .init<HttpBackendOptions>({
    backend: {
      crossDomain: false
    },
    debug: true,
    fallbackLng: 'en',
    saveMissing: true
  })
