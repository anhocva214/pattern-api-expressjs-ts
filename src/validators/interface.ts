export interface IErrorValidator{
    [key: string]: string[]
}

export interface IObjValidate { field: string | string[], rules: string[] }

export interface IObj{
    [key: string]: string
}