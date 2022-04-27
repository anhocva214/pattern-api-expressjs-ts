import {IErrorValidator, IObjValidate} from "@interfaces/validator.interface";
import IObj from "@interfaces/obj.interface";
import validator from 'validator';
import { model } from "mongoose";
import { User } from "@models/user.model";



export default class Validator {
    private obj: IObj
    errors: IErrorValidator

    constructor(obj: IObj) {
        this.obj = obj;
        this.errors = {}
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
                        
                        let {msg, error} = await this.rules()[ruleName as any](this.obj, item.field, value)
                        if (error){
                            this.addError(item.field, msg)
                            // item.rules.length = item.rules.indexOf(rule)
                        }
                    })
                )
            })
        )
    }

    private addError(field: string, message: string) {
        if (Object.keys(this.errors).indexOf(field) < 0) {
            this.errors[field] = []
        }
        this.errors[field].push(message.replace(":field", field))
    }

    hasError(){
        return Object.keys(this.errors).length > 0
    }

    private rules(): any {
        return {
            required: this.required,
            isNumeric: this.isNumeric,
            isEmail: this.isEmail,
            unique: this.unique
        }
    }


    private async required(obj: IObj, field: string, value?: any) {        
        if (!obj[field]) {
            return {
                error: true,
                msg: ":field is required"
            }
        }
        else return {
            error: false,
            msg: ''
        }
    }

    private async unique(obj: IObj, field: string, value?: any) {
        let values = value.split(",")
        let fieldCol = values[1];
        let ignore = values[2];

        let item = await model(value.split(",")[0]).findOne({[fieldCol]: obj[field]})

        if (!!item){
            return {
                error: true,
                msg: ":field is exists"
            }
        }
        else return {
            error: false,
            msg: ""
        }
    }

    private async isNumeric(obj: IObj, field: string, value?: any){
        if (!validator.isNumeric(obj[field])){
            return {
                error: true,
                msg: ":field is not numberic"
            }
        }
        else return {
            error: false,
            msg: ""
        }
    }

    private async isEmail(obj: IObj, field: string, value?: any){
        if (!validator.isEmail(obj[field])){
            return {
                error: true,
                msg: ":field is not email format "
            }
        }
        else return {
            error: false,
            msg: ""
        }
    }
}