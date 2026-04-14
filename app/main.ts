import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
    connection.on('data', (data: Buffer) => {
        console.log(data)
        const arr = parseRESP(data.toString("utf-8"));
        const val = encodeRESP(arr);
        connection.write(val);       
    });
});

const parseRESP = (data: string) :Array<string> => {
    console.log(data)
   let i = 0;

   function readLine(){
       const end = data.indexOf("\r\n", i);
       const line = data.slice(i, end);

       i = end + 2;
       return line;
   }

    const first = readLine();
    console.log(first)
    const count = parseInt(first.slice(1));

    const result = [];

    for(let j=0; j < count; j++){
        const lenLine = readLine();
        const len = parseInt(lenLine.slice(1));

        const value = data.slice(i, i+len);
        i += len + 2;
        result.push(value);
    }
    return result;
}

const encodeRESP = (arr:Array<string>) :string => {
    const command = arr[0].toUpperCase();

    if(command === "ECHO"){
        return `$${arr[1].length}\r\n${arr[1]}\r\n`;
    }else {
        return `+PONG\r\n`;
    }
}

server.listen(6379, "127.0.0.1");
