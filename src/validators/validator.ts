import validator from 'validator';
import { model } from "mongoose";
import { User } from "@models/user.model";
import { trans } from "@resources/i18n";
import { TFieldname, TLang } from "@resources/i18n/interface";
import { IErrorValidator, IObj, IObjValidate } from "./interface";



export default class Validator {
    private obj: IObj
    errors: IErrorValidator
    private lang: TLang

    constructor(obj: IObj, lang: any) {
        this.obj = obj;
        this.errors = {}
        this.lang = lang
    }

    async validate(objValidate: IObjValidate[]) {
        await Promise.all(
            objValidate.map(async item => {
                await Promise.all(
                    item.rules.map(async rule => {
                        let value = '', ruleName='';
                        if (rule.indexOf(":") >= 0) {
                            value = rule.split(":")[1];
                            ruleName = rule.split(":")[0]
                        }
                        else {
                            ruleName = rule
                        }

                        if ((rule != 'required' && !!this.obj?.[item.field]) || rule == 'optional') {
                            let rules = new Rules({
                                key: item.field,
                                value: this.obj?.[item.field],
                                params: value,
                                lang: this.lang
                            })
                            await rules.check(ruleName)
                            let {error, message} = rules.result()
                            if (error) {
                                this.addError(item.field as any, message)
                            }
                        }
                        else {
                            let rules = new Rules({
                                key: item.field,
                                value: this.obj?.[item.field],
                                params: value,
                                lang: this.lang
                            })
                            await rules.check('required')
                            let {error, message} = rules.result()
                            if (error) {
                                this.addError(item.field as any, message)
                            }
                        }
                    })
                )
            })
        )
    }

    private addError(field: TFieldname, message: string) {
        if (Object.keys(this.errors).indexOf(field) < 0) {
            this.errors[field] = []
        }
        this.errors[field].push(message.replace(":field", trans.validator[this.lang].fieldname[field] || field))
        let messages = this.errors[field];
        let messagesSet = new Set(messages)
        this.errors[field] = Array.from(messagesSet)
    }

    hasError() {
        return Object.keys(this.errors).length > 0
    }
}



class Rules {

    error: boolean;
    message: string;
    key: string;
    value: string;
    params: string;
    lang: TLang;

    constructor(data: {
        key: string,
        value: string,
        params: string,
        lang: TLang
    }) {
        this.error = false;
        this.message = ''
        this.key = data.key;
        this.value = data.value;
        this.params = data.params;
        this.lang = data.lang;
    }

    async check(ruleName: string) {
        switch (ruleName) {
            case 'required':
                await this.required()
                break;
            case 'isNumeric':
                await this.isNumeric()
                break;
            case 'isEmail':
                await this.isEmail()
                break;
            case 'only':
                await this.only()
                break;
            case 'optional':
                await this.optional()
                break;
            case 'unique':
                await this.unique()
                break;
        }
    }

    private async required() {
        if (!this.value) {
            this.error = true;
            this.message = `:field ${trans.validator[this.lang].message.is_required}`
        }
    }

    private async unique() {
        let paramsList = this.params.split(",")
        let fieldCol = paramsList[1];
        let tableName = paramsList[0];
        // let ignore = values[2];

        let item = await model(tableName).findOne({ [fieldCol]: this.value })
        if (!!item) {
            this.error = true;
            this.message = `:field ${trans.validator[this.lang].message.is_exists}`
        }
    }

    private async isNumeric() {
        if (!validator.isNumeric(this.value)) {
            this.error = true
            this.message = `:field ${trans.validator[this.lang].message.is_not_numberic}`
        }
    }

    private async isEmail() {
        if (!validator.isEmail(this.value)) {
            this.error = true
            this.message = `:field ${trans.validator[this.lang].message.is_not_email_format}`
        }

    }

    private async only() {
        let onlyValues: string[] = this.params.split(",");

        if (onlyValues.indexOf(this.value) < 0) {
            return {
                error: true,
                msg: `:field ${trans.validator[this.lang].message.is_not_exist}`
            }
        }
        else return {
            error: false,
            msg: ""
        }
    }

    private async optional() {
        if (this.value == undefined) {
            this.error = true
            this.message = `:field ${trans.validator[this.lang].message.is_undefined}`
        }
    }

    result(){
        return {
            error: this.error,
            message: this.message
        }
    }
}