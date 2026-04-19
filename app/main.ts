import * as net from "net";
import { decode, encode } from "./parser.ts";

export const lists:Map<string, string[]> = new Map();
export const mem = new Map<string, any>();

const server: net.Server = net.createServer((connection: net.Socket) => {
    connection.on('data', (data: Buffer) => {
        const arr = decode(data.toString());
        const val = encode(arr);
        connection.write(val);       
    });
});

server.listen(6379, "127.0.0.1");