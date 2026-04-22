import { lists } from "../main.ts";
import { respIntWriter } from "../responseWriter.ts"; 

const LPUSH = (arr:Array<string>) :string => {
    let key = arr[1];
    let value = arr.slice(2);

    let list = lists.get(key);
    if(!list){
        list = [];
        lists.set(key, list);
    }   
    return respIntWriter(list.unshift(...value.toReversed())); 
}

export default LPUSH;
