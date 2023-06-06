import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useWalletConnect,
  withWalletConnect,
} from "@walletconnect/react-native-dapp";

import Web3 from 'web3';



const TestScreen = () => {
  const [wcUri, setWcUri] = useState(null);


  const [web3] = useState(new Web3())
  const [provider] = useState(new Web3.providers.HttpProvider("https://hhanime.live"))
  web3.setProvider(provider)

  const getAccounts = async () => {
    try {
      web3.setProvider(provider)
      const acc = await web3.eth.personal.getAccounts()
      console.log(acc);

      // const trans = await web3.currentProvider.
      // console.log(trans);

      web3.eth.getTransactionCount("0xdb21B4F88944B4b2e7D1F06C9a64101e44aDEcFF")
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

  const getTransaction = async (hash) => {
    try {
      return await web3.eth.getTransaction(hash)
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  const transaction = async () => {
    try {
      await connector.sendTransaction({
        from: connector.accounts[0],
        gas: 21000, // add gas to the transaction
        to: "0xFF063e948230c81D77bCa270aa2d99286e142721",
        value: web3.utils.toWei("0.01", "ether"),
        // data: "0x",

      }).then((result) => {
        // Returns transaction id (hash)
        console.log(result);
        Alert.alert(result)
      })
        .catch((error) => {
          // Error returned when rejected
          console.error(error);
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
    <>
      <TouchableOpacity onPress={() => connector.killSession()} style={{ padding: 15 }}>
        {/* <Text>Đã liên kết</Text> */}
        <Text>{connector.accounts[0]}</Text>
        {/* <Text>{connector.chainId}</Text>
      <Text>{connector.clientId}</Text> */}
        {/* <Text>{web3.eth.getBalance(connector.accounts[0])}</Text> */}

        <Text>{connector.clientMeta.name}</Text>

      </TouchableOpacity>

      <TouchableOpacity title="Connect" onPress={async () => await transaction()} style={{ padding: 15 }}>
        <Text>Chuyển tiền demo</Text>
      </TouchableOpacity>
    </>

  );
};
export default withWalletConnect(TestScreen, {
  redirectUrl:
    Platform.OS === "web" ? window.location.origin : "https://hhanime.live",
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});

// export default TestScreen;