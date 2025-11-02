import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  bsc,
  bscTestnet,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const config = getDefaultConfig({
  appName: "DeFiPulse BSC",
  projectId: "9f4bd472c01ba49282b42e5e1874c2af",
  chains: [bsc, bscTestnet, mainnet],
  ssr: false,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={new QueryClient()}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)