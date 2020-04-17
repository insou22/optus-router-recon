const crypto = require('crypto');
const axios  = require('axios');
const util   = require('util');

let loginRequest = { 
    "request": { 
        "id": 0,
        "session-id": "0",
        "priority": true,
        "actions": [ 
            { 
                "id" :0,
                "method": "logIn",
                "parameters": { 
                    "user": "optus",
                    "persistent": "true",
                    "session-options": { 
                        "nss": [ 
                            { 
                                "name": "gtw",
                                "uri": "http://sagemcom.com/gateway-data"
                            }
                        ],
                        "language": "ident",
                        "context-flags": { 
                            "get-content-name": true,
                            "local-time": true
                        },
                        "capability-depth": 2,
                        "capability-flags": { 
                            "name": true,
                            "default-value": false,
                            "restriction": true,
                            "description": false
                        },
                        "time-format": "ISO_8601",
                        "write-only-string": "_XMO_WRITE_ONLY_",
                        "undefined-write-only-string": "_XMO_UNDEFINED_WRITE_ONLY_"
                    }
                }
            }
        ],
        "cnonce": 4204282495,
        "auth-key": "97c7fcedded7ed0affc9e851262a386e5f79a9c7f950fcf2cbe6970d97ba545ee2bcd62042ddccb6d4b3531349080977069d9f54ac8abeb124e0e75dd9e76d64"
    }
};

let resetRequest = {
    "request": { 
        "id": 78,
        "session-id": 336410319,
        "priority": false,
        "actions": [ 
            { 
                "id": 0,
                "method": "reboot",
                "xpath": "Device",
                "parameters": { 
                    "source": "GUI"
                }
            }
        ],
        "cnonce": 3554117563,
        "auth-key": "27ccda718b51b691be9c136dd1741ac345311e0e1f12c52c7dcd4496676f5720046350dafb85f82568d4489f5f83fa2c79a224ff1c262e18453b9f01ac4b1e97"
    }
}

let requestId = 0;

function getRequestId() {
    const ret = requestId;

    requestId++;

    return ret;
}

function sha512(str) {
    return crypto.createHash('sha512').update(str).digest('hex');
}

async function login(username, password) {
    if (!username) {
        username = 'optus';
    }

    if (!password) {
        password = 'PASSWORD';
    }

    let serverNonce = '';

    let _hashEncoderPass = sha512(password);
    let _ha1 = sha512(`${username}:${serverNonce}:${_hashEncoderPass}`);

    let cnonce = 4070594866; //Math.floor(Math.random() * 65535);
    let auth = sha512(`${_ha1}:${getRequestId()}:${cnonce}:JSON:/cgi/json-req`);

    console.log(`_hashEncoderPass: ${_hashEncoderPass}`);
    console.log(`_ha1: ${_ha1}`);
    console.log(`cnonce: ${cnonce}`);
    console.log(`auth: ${auth}`);

    console.log('\n\n');

    loginRequest.request.actions[0].parameters.user = username;
    loginRequest.request.cnonce = cnonce;
    loginRequest.request['auth-key'] = auth;

    console.log(`loginRequest: ${JSON.stringify(loginRequest, undefined, 4)}\n\n\n`);

    const resp = await axios.post(`http://192.168.0.1/cgi/json-req`, 
        loginRequest, 
        {
            headers: {
                
            },
            transformRequest: [
                function (data, headers) {
                    return 'req=' + JSON.stringify(data);
                }
            ]
        }
    ).catch(err => {
        console.log(`Err login: ${JSON.stringify(err, null, 4)}`);
    });

    console.log(`Response: ${JSON.stringify(resp.data, null, 4)}`);

    const sessionId = resp.data.reply.actions[0].callbacks[0].parameters.id;
    serverNonce = resp.data.reply.actions[0].callbacks[0].parameters.nonce;
    _ha1 = sha512(`${username}:${serverNonce}:${_hashEncoderPass}`);

    cnonce = Math.floor(Math.random() * 2147483647);
    const reqId = getRequestId();

    auth = sha512(`${_ha1}:${reqId}:${cnonce}:JSON:/cgi/json-req`);

    resetRequest.request.id = reqId;
    resetRequest.request['session-id'] = sessionId;
    resetRequest.request.cnonce = cnonce;
    resetRequest.request['auth-key'] = auth;

    console.log(`resetRequest: ${JSON.stringify(resetRequest, undefined, 4)}\n\n\n`);

    const resetResp = await axios.post(`http://192.168.0.1/cgi/json-req`, 
        resetRequest, 
        {
            headers: {
                
            },
            transformRequest: [
                function (data, headers) {
                    return 'req=' + JSON.stringify(data);
                }
            ]
        }
    ).catch(err => {
        console.log(`Err login: ${JSON.stringify(err, null, 4)}`);
    });

    console.log(`Reset response: ${JSON.stringify(resetResp.data, null, 4)}`);
}

login();
