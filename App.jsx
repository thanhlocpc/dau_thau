import { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import * as React from "react";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useWalletConnect,
  withWalletConnect,

} from "@walletconnect/react-native-dapp";

import Web3 from 'web3';



const App = () => {
  const [wcUri, setWcUri] = useState(null);


  const [web3] = useState(new Web3())
  const [provider] = useState(new Web3.providers.HttpProvider("http://localhost:7545"))

  const getAccounts = async () => {
    try {
      web3.setProvider(provider)
      const acc = await web3.eth.personal.getAccounts()
      console.log(acc);

      // const trans = await web3.currentProvider.
      // console.log(trans);

      web3.eth.getTransactionCount("0x5aB82333be5a6d59418Bd7679cb0D625959765C1")
        .then((b = console.log) => {
          // console.log(b)
          for (var i = 0; i < b; i++) {
            web3.eth.getBlock(b - i).then((Block) => {

              a = [
                Block.hash
              ]
              console.log(a);
              var iterator = a.values()
              for (let elements of iterator) {
                web3.eth.getTransactionFromBlock(elements).then(console.log)


              }
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  const connector = useWalletConnect();
  if (!connector.connected) {

    /**
     *  Connect! 🎉
     */
    return <>
      <TouchableOpacity title="Connect" onPress={() => connector.connect()} style={{ padding: 15 }}>
        <Text>Kết nối</Text>
      </TouchableOpacity>

      <TouchableOpacity title="Connect" onPress={async () => await getAccounts()} style={{ padding: 15 }}>
        <Text>Kết nối</Text>
      </TouchableOpacity>
    </>
  }
  return (
    <TouchableOpacity onPress={() => connector.killSession()} style={{ padding: 15 }}>
      {/* <Text>Đã liên kết</Text> */}
      <Text>{connector.accounts[0]}</Text>
      {/* <Text>{connector.chainId}</Text>
      <Text>{connector.clientId}</Text> */}
      <Text>{connector.clientMeta.name}</Text>

    </TouchableOpacity>
  );
};
export default withWalletConnect(App, {
  redirectUrl:
    Platform.OS === "web" ? window.location.origin : "http://localhost:7545",
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});

// if (console && console.isOpen) {
//   console.log("The console is open!");
// } else {
//   console.log("The console is closed.");
// }
