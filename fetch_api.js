const http = require('http');

http.get('http://localhost:8080/api/accountants/approved', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        console.log("Error: " + err.message);
    });
