import React, { Component } from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import TokenInfo from '../../models/tokens.json';


var web3 = new Web3('http://localhost:8545');

// DEBUG
web3.extend({
    property: 'debug',
    methods:
    [
        new web3.extend.Method({
            name: 'traceTransaction',
            call: 'debug_traceTransaction',
            params: 2,
           // inputFormatter: [web3.extend.formatters.formatInputString, web3.extend.formatters],
           // outputFormatter: web3.extend.formatters.formatOutputString
        }),
    ]
});

let transaction = web3.debug.traceTransaction("0xde8838f525cd3846820120a89d9247b7c7e8ed710942e4b40bfb06ade04fbf0c", {});



class Debug extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
        }
      }

     

  
      render() {
          var data = [];
          transaction.then( x => console.log(x));
    //   _.each(this.state.data, (token, index) => {
    //       tokenList.push(
    //           <div onClick={this.getTokenInfo} key={index} id={token}>
    //             <img className="token" src={`./icons/${token.Icon}`} id={token.Address}/>
    //             <p>{token.Symbol}</p>  
    //           </div>
    //       )});
  
  
  
      return (
      <div className="debug">
        {data}
      </div>
      )
      }
  }
  // <Canvas transactions={this.state.tokenTransactions}/>
  export default Debug;