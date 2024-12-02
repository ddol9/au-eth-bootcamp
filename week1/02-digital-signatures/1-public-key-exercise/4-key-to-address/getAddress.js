const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const publicKeyHash = keccak256(publicKey.slice(1));
    const address = publicKeyHash.slice(-20);

    return address;
}

module.exports = getAddress;
