import http from 'node:http';
import {Readable} from 'node:stream';
import { randomUUID, randomInt } from 'node:crypto';

function* runGenerator(){
    for(let index = 0; index < 99; index+=1){
        const data = {
            id: index,
            name: `User-${index}`,
            at: Date.now(),
        }
        yield data;
    }
}

function handler(req, res) {
    const readableStream = Readable({
        read() {
            for(const data of runGenerator()){
                this.push(JSON.stringify(data).concat("\n"));                
            }
            //Stream done
            this.push(null);
        }
    });

    readableStream.pipe(res);
}
const port = process.env.PORT || 5000;
http.createServer(handler)
    .listen(port)
    .on('listening', ()=>{console.log(`Serving at http://localhost:${port}`)});