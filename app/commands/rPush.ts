import { respIntWriter } from "../responseWriter.ts";
import { lists } from "../main.ts";

const RPUSH = (arr: Array<string>) :string => { 
    let key = arr[1];
    let value:Array<string> = arr.slice(2);

    let list = lists.get(key);
    if(!list){
        list = [];
        lists.set(key, list);
    }

    list.push(...value);
    return respIntWriter(list.length);
}

export default RPUSH;