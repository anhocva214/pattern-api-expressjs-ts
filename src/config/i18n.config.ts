import { I18n } from 'i18n'
import path from 'path'

let i18n: I18n = new I18n()

i18n.configure({
    locales: ['vi', 'en'],
    directory: path.dirname(__dirname).concat('/resources/i18n/response'),
})

export default i18n