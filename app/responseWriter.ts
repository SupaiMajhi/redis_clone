export const respSimpleWrite = (data:string) : string => {
    return `+${data}\r\n`;
}

export const respBulkWrite = (data:string) : string => {
    return `$${data.length}\r\n${data}\r\n`;
}

export const respNullWrite = () : string => {
    return '$-1\r\n';
}

export const respIntWriter = (num:number) : string => {
    return `:${num}\r\n`;
}