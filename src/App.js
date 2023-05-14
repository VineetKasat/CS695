import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import NFT from './contracts/NFT.json';
import Web3 from 'web3';


function App() {
  const [nft, setNFT] = useState(undefined);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const contractAddress = '0xc2e2B9E55f11f9706ec870227311c498CB1A1AFe';
  const abi=NFT.abi
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const tokenId=0;
  const mintNFT = async() => {
    try{
        const instance = await NFT.deployed();
        const tx = await instance.mint();
        await tx.wait(); // Wait for the transaction to be mined
        console.log('NFT minted!');
        tokenId= tokenId+1;
    } catch(error) {
      console.log("Mint error:",error);
    }
  }

  const transfer = async(from,to,tokenId) => {
    try {
      // const price = Web3.utils.toWei("1", "ether");
      const tx = await NFT.transfer(from, to, tokenId, { value: ethers.utils.parseEther('1') });
  await tx.wait(); // Wait for the transaction to be mined
  console.log('NFT bought!');
    } catch(error) {
      console.log("transfer error:",error);
    }
  }




return (
  <ul className="list-group">
      <li className="list-group-item">Mint a NFT Here<span className="font-weight-bold"></span>
      <button
      type="button"
      className="btn btn-primary float-right"
      onClick={()=> mintNFT}
      >
      Mint
      </button>
      </li>
      <li className="list-group-item">Buy-NFT-Here<span className="font-weight-bold"></span>
      <button
      type="button"
      className="btn btn-primary float-right"
      onClick={()=> transfer(Web3.eth.defaultAccount, '0x96c3cDDEB9179f98929cE964E708E299a39ea1a2', tokenId)}
      >
      Buy
      </button>
      </li>
  </ul>
)
}
export default App;