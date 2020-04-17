// Login 1:
let l1 = { 
    "request": { 
        "id":0,
        "session-id":"0",
        "priority":true,
        "actions": [ 
            { 
                "id":0,
                "method":"logIn",
                "parameters": { 
                    "user":"optus",
                    "persistent":"true",
                    "session-options": { 
                        "nss": [ 
                            { 
                                "name":"gtw",
                                "uri":"http://sagemcom.com/gateway-data"
                            }
                        ],
                        "language":"ident",
                        "context-flags": { 
                            "get-content-name":true,
                            "local-time":true
                        },
                        "capability-depth":2,
                        "capability-flags": { 
                            "name":true,
                            "default-value":false,
                            "restriction":true,
                            "description":false
                        },
                        "time-format":"ISO_8601",
                        "write-only-string":"_XMO_WRITE_ONLY_",
                        "undefined-write-only-string":"_XMO_UNDEFINED_WRITE_ONLY_"
                    }
                }
            }
        ],
        "cnonce":4204282495,
        "auth-key":"97c7fcedded7ed0affc9e851262a386e5f79a9c7f950fcf2cbe6970d97ba545ee2bcd62042ddccb6d4b3531349080977069d9f54ac8abeb124e0e75dd9e76d64"
    }
}

// Login 2:
let l2 = { 
    "request": { 
        "id":0,
        "session-id":"0",
        "priority":true,
        "actions": [ 
            { 
                "id":0,
                "method":"logIn",
                "parameters": { 
                    "user":"optus",
                    "persistent":"true",
                    "session-options": { 
                        "nss": [ 
                            { 
                                "name":"gtw",
                                "uri":"http://sagemcom.com/gateway-data"
                            }
                        ],
                        "language":"ident",
                        "context-flags": { 
                            "get-content-name":true,
                            "local-time":true
                        },
                        "capability-depth":2,
                        "capability-flags": { 
                            "name":true,
                            "default-value":false,
                            "restriction":true,
                            "description":false
                        },
                        "time-format":"ISO_8601",
                        "write-only-string":"_XMO_WRITE_ONLY_",
                        "undefined-write-only-string":"_XMO_UNDEFINED_WRITE_ONLY_"
                    }
                }
            }
        ],
        "cnonce":3432371131,
        "auth-key":"228f5ade8e315706c7e3ced7f07f3a6706746c14033940aecf7b28eafa4725e766d477f53c7203c569af32b3e5c22151e54b34b2510601fd87c0c0a058b2b015"
    }
}

// Login 3:
let l3 = { 
    "request": { 
        "id":0,
        "session-id":"0",
        "priority":true,
        "actions": [ 
            { 
                "id":0,
                "method":"logIn",
                "parameters": { 
                    "user":"optus",
                    "persistent":"true",
                    "session-options": { 
                        "nss": [ 
                            { 
                                "name":"gtw",
                                "uri":"http://sagemcom.com/gateway-data"
                            }
                        ],
                        "language":"ident",
                        "context-flags": { 
                            "get-content-name":true,
                            "local-time":true
                        },
                        "capability-depth":2,
                        "capability-flags": { 
                            "name":true,
                            "default-value":false,
                            "restriction":true,
                            "description":false
                        },
                        "time-format":"ISO_8601",
                        "write-only-string":"_XMO_WRITE_ONLY_",
                        "undefined-write-only-string":"_XMO_UNDEFINED_WRITE_ONLY_"
                    }
                }
            }
        ],
        "cnonce":3737092804,
        "auth-key":"f167f5bcc8d234bfb1791ad2ea3648a49e5082e1f5b81a339e29d81a5ed509ab7fd31a4d2edcfda85785352e745d35a7dec6d512dcf7e44dfd2b8471e7972874"
    }
}

// Response for Login 3:
let rl3 = { 
    "reply": { 
        "uid":0,
        "id":0,
        "error": { 
            "code":16777216,
            "description":"XMO_REQUEST_NO_ERR"
        },
        "actions": [ 
            { 
                "uid":1,
                "id":0,
                "error": { 
                    "code":16777238,
                    "description":"XMO_NO_ERR"
                },
                "callbacks": [ 
                    { 
                        "uid":1,
                        "result":{ 
                            "code":16777238,
                            "description":"XMO_NO_ERR"
                        },
                        "xpath":"Device",
                        "parameters": { 
                            "id":1222645434,
                            "nonce":"2889134907"
                        }
                    }
                ]
            }
        ],
        "events": [ 

        ]
    }
}

// Restart router:
let rr = {
    "request":{ 
        "id":78,
        "session-id":336410319,
        "priority":false,
        "actions": [ 
            { 
                "id":0,
                "method":"reboot",
                "xpath":"Device",
                "parameters":{ 
                    "source":"GUI"
                }
            }
        ],
        "cnonce":3554117563,
        "auth-key":"27ccda718b51b691be9c136dd1741ac345311e0e1f12c52c7dcd4496676f5720046350dafb85f82568d4489f5f83fa2c79a224ff1c262e18453b9f01ac4b1e97"
    }
}



n = c.random(a.UINTMAX);

lNonce = "";
if (g._nonce != undefined && g._nonce != "") {
    lNonce = g._nonce
}

g._ha1 = a.hashEncoder(g.user + ":" + lNonce + ":" + g._hashEncoderPass);
e = a.hashEncoder(g._ha1 + ":" + f + ":" + n + ":JSON:/cgi/json-req");

c.extend(t.request, {
    cnonce: n,
    "auth-key": e
})

//

const user = "optus";
const pass = "PASSWORD";

//

l._nonce = "";
l._ha1 = a.hashEncoder(l.user + "::" + l._hashEncoderPass)

//

g.openSession(h, k, function(o, n) {
    l._sessionId = o;
    if (f) {
        l._password = k
    } else {
        l._nonce = n;
        l._ha1 = a.hashEncoder(h + ":" + n + ":" + l._hashEncoderPass)
    }
    l.saveToCookie();
    c.each(l._connectedPages, function(p, q) {
        q.reload()
    });
    i.call(this, o)
}, e, d);

// known:

let _hashEncoderPass = SHA512(password);
let _ha1 = SHA512(`${username}::${_hashEncoderPass}`);

let cnonce = random(a.UINTMAX);
let auth = SHA512(`${_ha1}:0:${cnonce}:JSON:/cgi/json-req`);

// make request, get back sessionId and nonce
let sessionId;
{
    let nonce;
    _ha1 = SHA512(`${username}:${nonce}:${_hashEncoderPass}`);

    requsetIndex++;
    let auth = SHA512(`${_ha1}:${sessionId}:${nonce}:JSON:/cgi/json-req`);
}

// IMPL

function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
      return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
    });
}

async function login(username, password) {
    if (!username) {
        username = 'optus';
    }

    if (!password) {
        password = 'PASSWORD';
    }

    let _hashEncoderPass = await sha512(password);
    let _ha1 = await sha512(`${username}::${_hashEncoderPass}`);

    let cnonce = Math.random(a.UINTMAX);
    let auth = SHA512(`${_ha1}:0:${cnonce}:JSON:/cgi/json-req`);

    
}
