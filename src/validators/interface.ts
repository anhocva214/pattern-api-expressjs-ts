export interface IErrorValidator{
    [key: string]: string[]
}

export interface IObjValidate { field: string, rules: string[] }

export interface IObj{
    [key: string]: string
}