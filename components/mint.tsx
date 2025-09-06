"use client";

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Mock data - replace with actual contract calls
const TOTAL_COLLECTION = 10000;
const MINTED_NFTS = 3425;
const REMAINING_NFTS = TOTAL_COLLECTION - MINTED_NFTS;

const MintComponent = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [isMinting, setIsMinting] = useState(false);
  const [mintedCount, setMintedCount] = useState(MINTED_NFTS);
  const [remainingCount, setRemainingCount] = useState(REMAINING_NFTS);

  // In a real app, you would fetch these values from your contract
  useEffect(() => {
    // Simulate fetching data from contract
    const fetchData = async () => {
      // Replace with actual contract calls
      console.log("Fetching mint data...");
    };
    
    if (connected) {
      fetchData();
    }
  }, [connected, connection]);

  const handleMint = async () => {
    if (!connected) return;
    
    setIsMinting(true);
    try {
      // Simulate minting process - replace with actual minting logic
      console.log("Minting NFT...");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transaction
      
      // Update counts
      setMintedCount(prev => prev + 1);
      setRemainingCount(prev => prev - 1);
      
      console.log("NFT minted successfully!");
    } catch (error) {
      console.error("Minting failed:", error);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Rascal Gang Mint</h2>
        <p className="text-gray-600 dark:text-gray-300">Mint your exclusive Solana NFT</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{TOTAL_COLLECTION}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Collection</div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{remainingCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Remaining NFTs</div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{mintedCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Minted NFTs</div>
        </div>
      </div>

      <div className="mb-6">
        {connected ? (
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Connected: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
            </p>
            <button
              onClick={handleMint}
              disabled={isMinting || remainingCount <= 0}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isMinting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Minting...
                </div>
              ) : (
                `Mint NFT (0.5 SOL)`
              )}
            </button>
            {remainingCount <= 0 && (
              <p className="text-red-500 text-sm mt-2">All NFTs have been minted!</p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Connect your wallet to mint
            </p>
            <WalletMultiButton className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600" />
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>Supported wallets: Phantom, Solflare, and more</p>
      </div>
    </div>
  );
};

export default MintComponent;