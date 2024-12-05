const SHA256 = require("crypto-js/sha256");
const TARGET_DIFFICULTY =
    BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    const blockHeight = blocks.length;
    const transactions = mempool.slice(0, MAX_TRANSACTIONS);

    const newBlock = {
        id: blockHeight,
        transactions: transactions,
        nonce: 0,
    };

    let hash;
    let hashInt = BigInt(`0x${SHA256(JSON.stringify(newBlock))}`);

    while (hashInt >= TARGET_DIFFICULTY) {
        newBlock.nonce++;
        hash = SHA256(JSON.stringify(newBlock));
        hashInt = BigInt(`0x${hash}`);
    }

    newBlock.hash = hash;
    blocks.push(newBlock);
    mempool.splice(0, transactions.length);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool,
};
