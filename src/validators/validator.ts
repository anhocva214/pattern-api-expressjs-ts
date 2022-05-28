import {IErrorValidator, IObjValidate} from "@interfaces/validator.interface";
import IObj from "@interfaces/obj.interface";
import validator from 'validator';
import { model } from "mongoose";
import { User } from "@models/user.model";
import { TLang } from "@interfaces/trans.interface";
import { trans } from "@resources/trans";
import { TFieldname } from "@interfaces/trans.interface";



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
                        else{
                            ruleName = rule
                        }
                        
                        let {msg, error} = await this.rules()[ruleName as any](this.obj, item.field, value, this.lang)
                        if (error){
                            this.addError(item.field as any, msg)
                            // item.rules.length = item.rules.indexOf(rule)
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
    }

    hasError(){
        return Object.keys(this.errors).length > 0
    }

    private async required(obj: IObj, field: string, value: any, lang: TLang) {        
        if (!obj[field]) {
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
        let ignore = values[2];

        let item = await model(value.split(",")[0]).findOne({[fieldCol]: obj[field]})

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

    private rules(): any {
        return {
            required: this.required,
            isNumeric: this.isNumeric,
            isEmail: this.isEmail,
            unique: this.unique
        }
    }
}