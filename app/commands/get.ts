import { mem } from "../main.ts";
import { respNullWriter, respBulkWriter } from "../responseWriter.ts";

const GET = (arr:Array<string>) :string => {
    const key = arr[1];
    const value = mem.get(key);

    if(!value){
        return respNullWriter();
    }

    if(value.options.expiry === undefined || Date.now() < value.options.expiry){
        return respBulkWriter(value.value);
    } else {
        return respNullWriter();
    }
}

export default GET;