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
    console.log(arr)
    let str:string = "";
    let arrLen = arr.length;

    if(arrLen === 0){
        return '*0\r\n';
    }

    for(let i=0; i < arrLen; i++){
        let val = arr[i];
        let len = arr[i].length;
        console.log(val)
        console.log(len)
        if(i === 0){
            console.log('if')
            str += `*${arrLen}\r\n$${len}\r\n${val}\r\n`;
        }else{
            console.log('else')
            str += `$${len}\r\n${val}\r\n`;
        }
    }
    console.log('str', str)
    return str;
}