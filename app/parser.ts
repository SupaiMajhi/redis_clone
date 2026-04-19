import { respBulkWrite, respSimpleWrite, respNullWrite } from "./responseWriter.ts";
import { setCommandArgs } from "./optional.ts";
import handleRpush from "./commands/rPush.ts";

const mem = new Map<string, any>();

export const decode = (data: string): Array<string> => {
    let i = 0;

    function readLine() {
        const end = data.indexOf("\r\n", i);
        const line = data.slice(i, end);

        i = end + 2;
        return line;
    }

    const first = readLine();
    const count = parseInt(first.slice(1));

    const result = [];

    for (let j = 0; j < count; j++) {
        const lenLine = readLine();
        const len = parseInt(lenLine.slice(1));

        const value = data.slice(i, i + len);
        i += len + 2;
        result.push(value);
    }

    return result;
}


export const encode = (arr:Array<string>) :string => {
    const command = arr[0].toUpperCase();

    if(command === "ECHO"){
        return respBulkWrite(arr[1]);
    } else if(command === "SET"){
        const key = arr[1];
        const val = {
            value: arr[2],
            options: setCommandArgs(arr)
        }
        mem.set(key, val);
        return respSimpleWrite('OK');
    } else if(command === "GET"){
        const key = arr[1];
        const value = mem.get(key);

        if(!value){
            return respNullWrite();
        }

        if(value.options.expiry === undefined || Date.now() < value.options.expiry){
            return respBulkWrite(value.value);
        } else {
            return respNullWrite();
        }
    } else if(command === "RPUSH"){
        return handleRpush(arr);
    } else {
        return respSimpleWrite('PONG');
    }
}