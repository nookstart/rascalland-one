/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from "@metaplex-foundation/umi";
import { fetchCandyMachine, mintV2, safeFetchCandyGuard, mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { transactionBuilder, generateSigner, Signer } from '@metaplex-foundation/umi';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import dynamic from 'next/dynamic';
import * as bs58 from 'bs58';

import { Program, web3, AnchorProvider } from '@coral-xyz/anchor';
import idl from '../idl/rascalland_rename_util.json';
import { RascallandRenameUtil } from '../types/rascalland_rename_util';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

// const RENAME_PROGRAM_ID = new web3.PublicKey(process.env.NEXT_PUBLIC_RENAME_PROGRAM_ID!);

const MintComponent = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey: walletPublicKey, connected } = wallet;
  const [isMinting, setIsMinting] = useState(false);
  const [candyMachine, setCandyMachine] = useState<any>(null);
  const [candyGuard, setCandyGuard] = useState<any>(null);
  const [mintedCount, setMintedCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(0);
  const [totalCollection, setTotalCollection] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const umi = useMemo(() => {
  if (!connection || !wallet || !wallet.publicKey) return null;
  
    const umiInstance = createUmi(connection.rpcEndpoint);
    umiInstance.use(walletAdapterIdentity(wallet));
    umiInstance.use(mplCandyMachine());
    return umiInstance;
  }, [connection, wallet]);
  
  const renameProgram = useMemo(() => {
    if (!connection || !wallet) return null;
    const provider = new AnchorProvider(connection, wallet as any, { commitment: "confirmed" });
    return new Program<RascallandRenameUtil>(idl as any,  provider);
  }, [connection, wallet]);

  const fetchCandyMachineData = useCallback(async () => {
    if (!umi || !process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) return;
    setIsLoading(true);
    try {
      const candyMachineAddress = publicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID);
      const candyMachineData = await fetchCandyMachine(umi, candyMachineAddress);
      const candyGuardData = await safeFetchCandyGuard(umi, candyMachineData.mintAuthority);
      
      setCandyMachine(candyMachineData);
      setCandyGuard(candyGuardData);
      setTotalCollection(Number(candyMachineData.data.itemsAvailable));
      setMintedCount(Number(candyMachineData.itemsRedeemed));
      setRemainingCount(Number(candyMachineData.data.itemsAvailable) - Number(candyMachineData.itemsRedeemed));
      setError(null);
    } catch (error) {
      console.error('Failed to fetch Candy Machine data:', error);
      setError('Failed to load candy machine data');
    }
    setIsLoading(false);
  }, [umi]);

  useEffect(() => {
    fetchCandyMachineData();
  }, [fetchCandyMachineData]);

  const handleMint = async () => {
    if (!connected || !walletPublicKey || !candyMachine || !candyGuard || !umi || !renameProgram) return;

    setIsMinting(true);
    setError(null);
    setSuccess(null);
    
    let nftMintSigner: Signer | null = null;

    try {
      // --- Step 1: Mint ang NFT (tulad ng dati) ---
      nftMintSigner = generateSigner(umi);
      
      const mintTransaction = transactionBuilder()
        .add(setComputeUnitLimit(umi, { units: 800_000 }))
        .add(mintV2(umi, {
          candyMachine: candyMachine.publicKey,
          candyGuard: candyGuard.publicKey,
          nftMint: nftMintSigner,
          collectionMint: candyMachine.collectionMint,
          collectionUpdateAuthority: candyMachine.authority,
          group: "Public",
          mintArgs: {
            solPayment: { 
              destination: publicKey(process.env.NEXT_PUBLIC_TREASURY as string),
            }
          },
        }));
      // --- DEBUGGING LOGS PARA SA MINT TRANSACTION ---
      console.log("--- [DEBUG] MINT TRANSACTION ---");
      // Ang .items ay isang array ng instructions at signers.
      const instructionsInBuilder = mintTransaction.items;
      console.log("Instructions in Mint Tx Builder:", instructionsInBuilder.length);
      instructionsInBuilder.forEach((item, index) => {
        // I-check kung ang item ay isang instruction
        if ('instruction' in item) {
            const ix = item.instruction;
            console.log(`  [Mint Ix #${index}] Program ID: ${ix.programId}`);
            console.log(`  [Mint Ix #${index}] Keys:`, ix.keys.map(k => ({ pubkey: k.pubkey, isSigner: k.isSigner, isWritable: k.isWritable })));
        }
      });
      console.log("---------------------------------");
      // ---
      
      const { signature: mintSignature } = await mintTransaction.sendAndConfirm(umi, {
        confirm: { commitment: 'confirmed' },
        send: { skipPreflight: true },
      });
      const mintTxid = bs58.encode(mintSignature);
      console.log('NFT minted successfully!', mintTxid);
      setSuccess(`Mint successful! View transaction: ${mintTxid}`);

      // --- Step 2: Gumawa ng Rename Ticket ---
      console.log('Creating rename ticket for new NFT:', nftMintSigner.publicKey);
      
      const createTicketIx = await renameProgram.methods
        .createRenameTicket()
        .accounts({
          nftMint: new web3.PublicKey(nftMintSigner.publicKey),
          owner: wallet.publicKey!,
          // Ang rename_ticket PDA at system_program ay awtomatikong hahanapin ng Anchor
        })
        .instruction();

      const ticketTransaction = new web3.Transaction().add(createTicketIx);
      
      const ticketTxSignature = await wallet
                                      .sendTransaction(ticketTransaction, 
                                                        connection,
                                                      {
                                                        skipPreflight: true,
                                                      });
      await connection.confirmTransaction(ticketTxSignature, 'finalized');

      console.log('Rename ticket created successfully!', ticketTxSignature);
      setSuccess(`Mint successful! Rename ticket created. Mint Address: ${nftMintSigner.publicKey}`);

      // --- Step 3: I-update ang UI ---
      await fetchCandyMachineData();
      
    } catch (error: any) {
      console.error('Minting or Ticket Creation failed:', error);
      // Kung ang error ay dahil kinansela ng user ang pangalawang transaksyon
      if (error.message.includes("Transaction rejected")) {
        setError(`Minting was successful, but rename ticket creation was cancelled. Your NFT Mint Address: ${nftMintSigner?.publicKey}`);
      } else {
        setError(`An error occurred: ${error.message}`);
      }
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-4 sm:p-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Rascal Gang Mint</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Mint your exclusive Solana NFT</p>
      </div>
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 break-all">{success}</div>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-gray-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : totalCollection}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total Collection</div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : remainingCount}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Remaining NFTs</div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : mintedCount}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Minted NFTs</div>
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        {connected ? (
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 break-all">
              Connected: {walletPublicKey?.toString().slice(0, 6)}...{walletPublicKey?.toString().slice(-6)}
            </p>
            <button
              onClick={handleMint}
              disabled={isMinting || remainingCount <= 0}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isMinting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Minting...
                </div>
              ) : (
                `Mint NFT (0.5 SOL)`
              )}
            </button>
            {remainingCount <= 0 && (
              <p className="text-red-500 text-xs sm:text-sm mt-2">All NFTs have been minted!</p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
              Connect your wallet to mint
            </p>
            <div className="w-full flex justify-center">
              <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-500 hover:!from-purple-700 hover:!to-blue-600 !text-xs sm:!text-sm" />
            </div>
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