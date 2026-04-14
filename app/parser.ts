const m = new Map();

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
        return `$${arr[1].length}\r\n${arr[1]}\r\n`;
    } else if(command === "SET"){
        m.set(arr[1], arr[2]);
        return '+OK\r\n';
    } else if(command === "GET"){
        const value = m.get(arr[1]);

        if(!value){
            return '$-1\r\n';
        }
        return `$${value.length}\r\n${value}\r\n`;
    } else {
        return `+PONG\r\n`;
    }
}