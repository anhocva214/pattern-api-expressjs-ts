import validator from 'validator';
import { model } from "mongoose";
import { User } from "@models/user.model";
import { trans } from "@resources/trans";
import { TFieldname, TLang } from "@resources/trans/interface";
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
                    item.rules.map( async rule => {
                        let value, ruleName;
                        if (rule.indexOf(":") >= 0) {
                            value = rule.split(":")[1];
                            ruleName = rule.split(":")[0]
                        }
                        else {
                            ruleName = rule
                        }

                        if ((rule != 'required' && !!this.obj?.[item.field]) || rule == 'optional') {
                            let { msg, error } = await this.rules()[ruleName as any](this.obj, item.field, value, this.lang)
                            if (error) {
                                this.addError(item.field as any, msg)
                            }
                        }
                        else{
                            let { msg, error } = await this.rules()['required'](this.obj, item.field, value, this.lang)
                            if (error) {
                                this.addError(item.field as any, msg)
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

    hasError(){
        return Object.keys(this.errors).length > 0
    }

    private async required(obj: IObj, field: string, value: any, lang: TLang) {        
        if (!obj?.[field]) {
            return {
                error: true,
                msg: `:field ${trans.validator[lang].message.is_required}`
            }
        }
        else return {
            error: false,
            msg: ''
        }
    }

    private async unique(obj: IObj, field: string, value: any, lang: TLang) {
        let values = value.split(",")
        let fieldCol = values[1];
        let tableName = value.split(",")[0];
        // let ignore = values[2];

        let item = await model(tableName).findOne({[fieldCol]: obj[field]})

        if (!!item){
            return {
                error: true,
                msg: `:field ${trans.validator[lang].message.is_exists}`
            }
        }
        else return {
            error: false,
            msg: ""
        }
    }

    private async isNumeric(obj: IObj, field: string, value: any, lang: TLang){
        if (!validator.isNumeric(obj[field])){
            return {
                error: true,
                msg: `:field ${trans.validator[lang].message.is_not_numberic}`
            }
        }
        else return {
            error: false,
            msg: ""
        }
    }

    private async isEmail(obj: IObj, field: string, value: any, lang: TLang){
        if (!validator.isEmail(obj[field])){
            return {
                error: true,
                msg: `:field ${trans.validator[lang].message.is_not_email_format}`
            }
        }
        else return {
            error: false,
            msg: ""
        }
    }

    private async only(obj: IObj, field: string, value: any, lang: TLang){
        let inputValue = obj[field];
        let onlyValues: string[] = value.split(",");

        if (onlyValues.indexOf(inputValue) < 0){
            return {
                error: true,
                msg: `:field ${trans.validator[lang].message.is_not_exist}`
            }
        }
        else return {
            error: false,
            msg: ""
        }
    }

    private async optional(obj: IObj, field: string, value: any, lang: TLang){
        if (Object.keys(obj).indexOf(field) < 0 ){
            return {
                error: true,
                msg: `:field ${trans.validator[lang].message.is_undefined}`
            }
        }
        else return {
            error: false,
            msg: ""
        }
    }

    private rules(): any {
        return {
            required: this.required,
            isNumeric: this.isNumeric,
            isEmail: this.isEmail,
            unique: this.unique,
            only: this.only,
            optional: this.optional
        }
    }
}