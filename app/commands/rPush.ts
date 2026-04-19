import { respIntWriter } from "../responseWriter.ts";

const lists:Map<string, string[]> = new Map();

const handleRpush = (arr: Array<string>) :string => { 
    let key = arr[1];
    let value = arr[2];

    let list = lists.get(key);
    if(!list){
        list = [];
        lists.set(key, list);
    }

    list.push(value);
    return respIntWriter(list.length);
}

export default handleRpush;