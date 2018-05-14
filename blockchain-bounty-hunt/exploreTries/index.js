//Just importing the requirements
var Trie = require('merkle-patricia-tree/secure');
var levelup = require('levelup');
var leveldown = require('leveldown');
var RLP = require('rlp');
var assert = require('assert');

//Connecting to the leveldb database
var db = levelup(leveldown('/Users/alex/Library/Ethereum/geth/chaindata'));

//Adding the "stateRoot" value from the block so that we can inspect the state root at that block height.
var stateRoot = '0x2b01f32347e54f4c2fe144f34e53ffbfd8e60d84a012257b75f3071779820d9d';
var transactionsRoot = '0xcd76b6574d82dc6aa0092f0c5c77eda1e03e3d5f7aa6538e22396bd307c15ccb';
var receiptsRoot = '0xa09fb4d4fcff56cebbe72ee8281d5219efeb73284be36c3a54566c92d4a9a70c';

//Creating a trie object of the merkle-patricia-tree library
var stateTrie = new Trie(db, stateRoot);
var transactionsTrie = new Trie(db, transactionsRoot);
var receiptsTrie = new Trie(db, receiptsRoot);

//Creating a nodejs stream object so that we can access the data
var stateStream = stateTrie.createReadStream();
//var trasnactionsStream = transactionsTrie.createReadStream();
//var receiptsStream = receiptsTrie.createReadStream();

//Turning on the stream (because the node js stream is set to pause by default)
stateStream.on('data', function (data){
  //printing out the keys of the "state trie"
  console.log(data);
});

stateStream.on('error', function(err){ console.log(err); });