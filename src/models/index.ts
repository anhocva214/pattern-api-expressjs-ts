

export default class BaseModel{
    _id: string;
    created_at: string;
    updated_at: string;
    
    constructor(obj?: {
        _id: string;
        created_at: string;
        updated_at: string;
    }){
        this._id = obj?._id || '';
        this.created_at = obj?.created_at || "";
        this.updated_at = obj?.updated_at || "";
    }
}