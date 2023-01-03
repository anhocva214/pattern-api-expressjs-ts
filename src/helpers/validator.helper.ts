export function getField(field: string | string[]){
    return typeof field == 'string' ? field : field[0]
}

export function isNestedField(field: string | string[]){
    return typeof field == 'string' ? false : true
}

export function fieldToKey(field: string | string[]){
    if (typeof field != 'string'){
        return field.join(".")
    }else{
        return field
    }
}

export function getValue(o: any, a: string[] | string){
    if (isNestedField(a)){
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }
    else return o[a as any]
    // s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    // s = s.replace(/^\./, '');           // strip a leading dot
    // var a = s.split('.');
}