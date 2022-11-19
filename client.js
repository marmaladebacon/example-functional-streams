import {get} from 'http';
import { Transform } from 'stream';
const port = process.env.PORT || 5000;
const url = `http://localhost:${port}`;

const getHTTPStream = () =>{
    return new Promise(resolve => get(url, response => resolve(response)));    
}

const stream = await getHTTPStream();
stream
    .pipe(Transform({
        objectMode: true, //force the stream to use string instead of buffers
        transform(chunk, enc, cb){            
            const item = JSON.parse(chunk);            
            cb(null, item);
        }
    }))
    .filter(chunk => {        
        return chunk.id % 2 === 0;
    })
    .map(chunk=>{        
        return `mapped only even: ${JSON.stringify(chunk)} \n`;
    })
    .pipe(process.stdout);

