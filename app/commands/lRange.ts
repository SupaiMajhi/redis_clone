import { lists } from "../main.ts";
import { respArrayWriter } from "../responseWriter.ts";

const LRANGE = (arr:Array<string>) :string => {
    const list:Array<string> | undefined = lists.get(arr[1]);
    const start:number = Number(arr[2]);
    const stop:number = Number(arr[3]);

    if(!list){
        return respArrayWriter([]);
    }

    if(start >= list.length){
        return respArrayWriter([]);
    }

    if(stop >= list.length){
        return respArrayWriter(list.slice(start, list.length));
    }

    if(start > stop){
        return respArrayWriter([]);
    }

    return respArrayWriter(list.slice(start, stop + 1));
}

export default LRANGE;