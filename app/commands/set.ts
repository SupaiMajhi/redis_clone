import { mem } from "../main.ts";
import { respSimpleWriter } from "../responseWriter.ts";
import { setCommandArgs } from "../optional.ts";

const SET = (arr:Array<string>) :string => {
    const key = arr[1];
    const val = {
        value: arr[2],
        options: setCommandArgs(arr)
    }
    mem.set(key, val);
    return respSimpleWriter('OK');
}

export default SET;