import * as net from "net";
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
const server = net.createServer((connection) => {
    connection.on('data', (data) => {
        console.log(data.toString());
    });
});
const parseRESP = (data) => {
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
};
server.listen(6379, "127.0.0.1");
