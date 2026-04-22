import { lists } from "../main.ts";
import { respArrayWriter } from "../responseWriter.ts";

const LRANGE = (arr:Array<string>) :string => {
    const list:Array<string> | undefined = lists.get(arr[1]);
    let start:number = Number(arr[2]);
    let stop:number = Number(arr[3]);
    console.log('start', start, 'stop', stop);

    if(!list){
        return respArrayWriter([]);
    }

    if(start < 0 && start <= -(list.length)){
        start = 0;
    }
    if(start < 0){
        start = (list.length + start)
    }
    if(stop < 0){
        stop = (list.length + stop);
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
