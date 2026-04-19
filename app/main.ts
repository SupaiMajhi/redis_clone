import * as net from "net";
import { decode, encode } from "./parser.ts";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
    connection.on('data', (data: Buffer) => {
        const arr = decode(data.toString());
        const val = encode(arr);
        connection.write(val);       
    });
});

server.listen(6379, "127.0.0.1");