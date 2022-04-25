import {IErrorValidator, IObjValidate} from "@interfaces/validator.interface";
import IObj from "@interfaces/obj.interface";


export default class Validator {
    private obj: IObj
    errors: IErrorValidator

    constructor(obj: IObj) {
        this.obj = obj;
        this.errors = {}
    }

    validate(objValidate: IObjValidate[]) {
        objValidate.forEach(item => {
            item.rules.forEach(rule => {
                let value, ruleName;
                if (rule.indexOf(":") >= 0) {
                    value = rule.split(":")[1]; 
                    ruleName = rule.split(":")[0]
                }
                else{
                    ruleName = rule
                }
                
                let {msg, error} = this.rules()[ruleName as any](this.obj, item.field, value)
                if (error){
                    this.addError(item.field, msg)
                }
            })
        })
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
            required: this.required
        }
    }

    private required(obj: IObj, field: string, value?: any) {        
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
}