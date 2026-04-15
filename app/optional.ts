type Obj = {
    expiry: number | undefined;
}

export const setCommandArgs =  (arr: Array<string>) :Obj => {
    if(arr.length > 3){
        const command = arr[3].toUpperCase();
        const time = Number(arr[4]);

        switch(command){
            case "PX":
                return { expiry: Date.now() + time }
            case "EX":
                return { expiry: Date.now() + (time * 1000) }
        }
    }
    
    return { expiry: undefined }
}
