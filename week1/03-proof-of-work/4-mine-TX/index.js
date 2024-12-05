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

    const newBlock = { id: blockHeight, transactions: transactions };

    const blockHash = SHA256(JSON.stringify(newBlock));
    newBlock.hash = blockHash;
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
