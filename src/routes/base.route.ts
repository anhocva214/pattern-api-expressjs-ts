import { Router } from "express";


export default class BaseRouter {
    protected pathBase: string;
    protected router: Router;

    constructor(data: {pathBase: string, router: Router}){
        this.pathBase = data.pathBase;
        this.router = data.router;
    }
    
    protected path(p: string) {
        return this.pathBase + p
    }

    instance(){

    }

}