import { Alert } from "react-native";

import {
  useWalletConnect,
  withWalletConnect,
} from "@walletconnect/react-native-dapp";

import Web3 from 'web3';

const [web3] = useState(new Web3())
const [provider] = useState(new Web3.providers.HttpProvider("https://hhanime.live"))
web3.setProvider(provider)
const connector = useWalletConnect();

export const transaction = async () => {
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