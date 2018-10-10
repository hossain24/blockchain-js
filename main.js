const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.data)
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBook()];
  }

  createGenesisBook() {
    return new Block(0, "01/01/2018", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let hillCoin = new BlockChain();
hillCoin.addBlock(new Block(1, "10/10/2018", { amount: 5 }));
hillCoin.addBlock(new Block(2, "11/10/2018", { amount: 10 }));

console.log(JSON.stringify(hillCoin, null, 5));
