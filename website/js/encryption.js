import config from './config.js';

let keyPromise = null;

async function getKey() {
    if (!keyPromise) {
        keyPromise = new Promise(async (resolve) => {
            const encodedKey = new TextEncoder().encode(config.SECRET_KEY);
            const key = await window.crypto.subtle.importKey(
                'raw',
                encodedKey,
                { name: config.ENC_ALGO },
                false,
                ['encrypt', 'decrypt']
            );
            resolve(key);
        });
    }
    return keyPromise;
}

async function encryptData(data) {
    const encodedData = new TextEncoder().encode(data);
    const key = await getKey();
    const iv = new Uint8Array(config.FIXED_IV.match(/.{2}/g).map(byte => parseInt(byte, 16)));
    const encryptedData = await window.crypto.subtle.encrypt(
        { name: config.ENC_ALGO, iv: iv },
        key,
        encodedData
    );

    const encryptedDataHex = Array.from(new Uint8Array(encryptedData)).map(byte => byte.toString(16).padStart(2, '0')).join('');
    return encryptedDataHex;
}

async function decryptData(encryptedDataHex) {
    const key = await getKey();
    const iv = new Uint8Array(config.FIXED_IV.match(/.{2}/g).map(byte => parseInt(byte, 16)));
    const encryptedData = new Uint8Array(encryptedDataHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const decryptedData = await window.crypto.subtle.decrypt(
        { name: config.ENC_ALGO, iv: iv },
        key,
        encryptedData
    );
    return new TextDecoder().decode(decryptedData);
}

async function hashData(data) {
    const encodedData = new TextEncoder().encode(data);
    const hashBuffer = await window.crypto.subtle.digest(config.HASH_ALGO, encodedData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

export async function encryptUser(userData) {
    const encryptedUserData = {};
    for (const key in userData) {
        let encryptedValue;
        if (key == "role") {
            encryptedValue = userData[key];
        } else if (key != "password") {
            encryptedValue = await encryptData(userData[key]);
        } else {
            encryptedValue = await hashData(userData[key]);
        }
        encryptedUserData[key] = encryptedValue;
    }

    return encryptedUserData;
}

export async function encryptObject(data) {
    const encryptedData = {};
    for (const key in data) {
        const encryptedValue = await encryptData(data[key]);
        encryptedData[key] = encryptedValue;
    }
    return encryptedData;
}

export async function decryptTrans(data) {
    const decryptedData = {};
    for (const key in data) {
        if(key == 'id'){
            decryptedData[key] = data[key];
        }
        else if (key !== 'createdAt' && key !== 'updatedAt') {
            const decryptedValue = await decryptData(data[key]);
            console.log(decryptedValue)
            decryptedData[key] = decryptedValue;
        }
    }
    console.log('Decrypted data:', decryptedData);
    return decryptedData;
}