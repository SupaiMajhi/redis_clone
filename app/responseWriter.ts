export const respSimpleWriter = (data:string) :string => {
    return `+${data}\r\n`;
}

export const respBulkWriter = (data:string) :string => {
    return `$${data.length}\r\n${data}\r\n`;
}

export const respNullWriter = () :string => {
    return '$-1\r\n';
}

export const respIntWriter = (num:number) :string => {
    return `:${num}\r\n`;
}

export const respArrayWriter = (arr:Array<string>) :string => {
    let str:string = "";
    let arrLen = arr.length;

    if(arrLen === 0){
        return '*0\r\n';
    }

    for(let i=0; i < arrLen; i++){
        let val = arr[i];
        let len = arr[i].length;
        if(i === 0){
            str += `*${arrLen}\r\n$${len}\r\n${val}\r\n`;
        }else{
            str += `$${len}\r\n${val}\r\n`;
        }
    }
    return str;
}
