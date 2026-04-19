import { respBulkWriter, respSimpleWriter } from "./responseWriter.ts";
import RPUSH from "./commands/rPush.ts";
import GET from "./commands/get.ts";
import SET from "./commands/set.ts";
import LRANGE from "./commands/lRange.ts";

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
    const command:string = arr[0].toUpperCase();

    switch(command){
        case "ECHO":
            return respBulkWriter(arr[1]);
        case "SET":
            return SET(arr);
        case "GET":
            return GET(arr);
        case "RPUSH":
            return RPUSH(arr);
        case "LRANGE":
            return LRANGE(arr);
        default:
            return respSimpleWriter('PONG');
    }
}