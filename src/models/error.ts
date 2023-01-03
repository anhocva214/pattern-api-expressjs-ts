import i18n from '@config/i18n.config'
import { StatusCodes } from 'http-status-codes'
export class FieldError {
    id: string
    message: string
    constructor(data: { id: string }) {
        this.id = data.id
        this.message = data.id
    }
}

interface IAppError{
    where: string
    message: string
    detail: any
    errors?: { [x: string]: FieldError[] }
    statusCode: StatusCodes
}

export class AppError {
    where: string
    message: string
    detail: string
    errors?: { [x: string]: FieldError[] }
    statusCode: StatusCodes
    constructor(data: IAppError) {
        this.where = data.where
        this.message = data.message
        this.detail = data.detail || ''
        this.errors = data.errors
        this.statusCode = data.statusCode
    }

    translate = (locale: 'vi' | 'en') => {
        this.message = i18n.__({ phrase: this.message, locale })
        if (this.errors) {
            for (const param in this.errors) {
                this.errors[param].forEach((field) => {
                    field.message = i18n.__({ phrase: field.id, locale })
                })
            }
        }
    }
}
