/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { Program, web3, AnchorProvider } from '@coral-xyz/anchor';

// I-import ang IDL at Types mula sa kinopyang files
import idl from '@/idl/rascalland_rename_util.json';
import { RascallandRenameUtil } from '@/types/rascalland_rename_util';
import { findMetadataPda, mplTokenMetadata, fetchMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { publicKey } from '@metaplex-foundation/umi';
// Kunin ang Program ID mula sa environment variables
const PROGRAM_ID = new web3.PublicKey(process.env.NEXT_PUBLIC_RENAME_PROGRAM_ID!);
const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const LOOKUP_TABLE_ADDRESS = new web3.PublicKey(process.env.NEXT_PUBLIC_LOOKUP_TABLE_ADDRESS as string);

const RenameComponent = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { connected } = wallet;

  const [isRenaming, setIsRenaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // State para sa mga input fields
  const [mintAddress, setMintAddress] = useState('');
  const [newName, setNewName] = useState('');
  const [newUri, setNewUri] = useState('');

  const provider = useMemo(() => {
    if (!connection || !wallet) return null;
    // Tiyakin na ang provider ay isang AnchorProvider
    return new AnchorProvider(connection, wallet as any, { commitment: "confirmed" });
  }, [connection, wallet]);

  // Gumawa ng Anchor Program instance
  const program = useMemo(() => {
    if (!provider) return null;
    return new Program<RascallandRenameUtil>(idl as any, provider);
  }, [provider]);

  // Gumawa ng Umi instance para sa paghahanap ng PDA
  const umi = useMemo(() => {
    if (!connection || !wallet.publicKey) return null;
    const umiInstance = createUmi(connection.rpcEndpoint);
    umiInstance.use(walletAdapterIdentity(wallet));
    umiInstance.use(mplTokenMetadata());
    return umiInstance;
  }, [connection, wallet]);

  const handleRename = async () => {
    if (!connected || !program || !wallet.publicKey || !mintAddress || !newName || !newUri || !umi) {
      setError("Please connect your wallet and fill all fields.");
      return;
    }
    
    setIsRenaming(true);
    setError(null);
    setSuccess(null);

    try {
      // --- [DEBUG] I-VERIFY ANG MGA PROGRAM IDs ---
      console.log(`[VERIFY] Program ID from .env: ${PROGRAM_ID.toBase58()}`);
      console.log(`[VERIFY] Program ID from loaded program object: ${program.programId.toBase58()}`);
      if (PROGRAM_ID.toBase58() !== program.programId.toBase58()) {
        throw new Error("CRITICAL ERROR: Program ID mismatch between .env and IDL file!");
      }
      // ---
       // Gamitin ang 'publicKey' function ng Umi para sa Umi operations.
      const umiMintPublicKey = publicKey(mintAddress); 
      
      console.log(`Fetching metadata for UMI public key: ${umiMintPublicKey}`);
      
      // 1. Hanapin ang Metadata PDA gamit ang Umi.
      const metadataPdaTuple = findMetadataPda(umi, { mint: umiMintPublicKey });
      
      // 2. I-fetch ang data gamit ang Umi. Ang 'metadataPdaTuple' ay ang tamang type na inaasahan nito.
      const initialMetadata = await fetchMetadata(umi, metadataPdaTuple);
      console.log(`Original Update Authority: ${initialMetadata.updateAuthority}`);

      // --- WEB3.JS / ANCHOR WORLD ---
      // Ngayon, gumawa tayo ng mga Web3.js versions para sa Anchor program.
      const mintPublicKeyWeb3 = new web3.PublicKey(mintAddress);
      const metadataPublicKeyWeb3 = new web3.PublicKey(metadataPdaTuple[0]); // Kunin ang address mula sa tuple

      // 3. Hanapin ang Ticket PDA gamit ang Web3.js.
      const [ticketPdaWeb3] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("ticket"), mintPublicKeyWeb3.toBuffer()],
        program.programId
      );
      console.log(`Found Ticket PDA: ${ticketPdaWeb3.toBase58()}`);
      console.log(`[DEBUG] Calculated Ticket PDA: ${ticketPdaWeb3.toBase58()}`);

      // 2. I-FETCH ANG TICKET ACCOUNT MULA SA BLOCKCHAIN.
      console.log("[VERIFY] Fetching ticket account from the blockchain...");
      const ticketAccount = await program.account.renameTicket.fetch(ticketPdaWeb3);
      
      if (!ticketAccount) {
        throw new Error(`Rename Ticket account not found at address ${ticketPdaWeb3.toBase58()}. Please ensure the ticket was created successfully.`);
      }
      console.log("[VERIFY] Ticket account found! Data:", {
        nftMint: ticketAccount.nftMint.toBase58(),
        owner: ticketAccount.owner.toBase58(),
        bump: ticketAccount.bump,
      });

      // 3. Ikumpara ang data.
      if (ticketAccount.owner.toBase58() !== wallet.publicKey.toBase58()) {
        throw new Error(`Wallet (${wallet.publicKey.toBase58()}) is not the owner of the ticket (${ticketAccount.owner.toBase58()}).`);
      }
      if (ticketAccount.nftMint.toBase58() !== mintAddress) {
        throw new Error(`Ticket is for a different NFT (${ticketAccount.nftMint.toBase58()}).`);
      }
      console.log("[VERIFY] Ticket data is valid.");
      
      // 4. Ihanda ang lahat ng accounts gamit ang Web3.js PublicKeys.
      
      const accounts = {
        owner: wallet.publicKey,
        renameTicket: ticketPdaWeb3,
        nftMint: mintPublicKeyWeb3,
        metadata: metadataPublicKeyWeb3,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
      };
      
      console.log("[DEBUG] Accounts being passed to instruction:", 
        Object.fromEntries(Object.entries(accounts).map(([key, value]) => [key, value.toString()]))
      );
      /*
      const renameIx = await program.methods
        .renameWithTicket(newName, newUri)
        .accounts(accounts) // Ipasa ang kumpletong listahan
        .instruction();
      */
      console.log("[DEBUG] Creating Versioned Transaction...");
      
      console.log("[DEBUG] Fetching Lookup Table...");
      const lookupTableAccount = await connection
        .getAddressLookupTable(LOOKUP_TABLE_ADDRESS)
        .then((res) => res.value);

      if (!lookupTableAccount) {
        throw new Error("Lookup Table not found. Please create one.");
      }
      console.log("[DEBUG] Lookup Table found.");
      
      // --- SIMULA NG FINAL, PRODUCTION-READY FIX ---

      const computeUnitLimitIx = web3.ComputeBudgetProgram.setComputeUnitLimit({
        units: 400_000,
      });
      console.log("[COMPUTE] Requested compute unit limit of 400,000.");

      const priorityFeeIx = web3.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 100_000,
      });
      console.log("[PRIORITY] Added priority fee instruction.");
      // 1. Kunin ang pinakabagong blockhash.
      // const latestBlockhash = await connection.getLatestBlockhash("finalized");
      
      // 2. Buuin ang mensahe at transaksyon.
      const transaction = await program.methods
        .renameWithTicket(newName, newUri)
        .accounts(accounts)
        .preInstructions([computeUnitLimitIx, priorityFeeIx]) // Idagdag ang budget instructions dito
        .transaction();

      // 2. Manu-manong i-simulate ang transaction na ito.
      console.log("[SIMULATE] Manually simulating transaction before sending to wallet...");
      try {
          await provider!.simulate(transaction);

      } catch (err) {
        console.log(err);

      }
      

      // I-log ang resulta ng simulation.
     

      // 3. Hilingin sa wallet na pirmahan lang.
      console.log("[ANCHOR] Sending transaction via AnchorProvider.sendAndConfirm...");
      const txSignature = await provider!.sendAndConfirm(transaction, [], {
        commitment: "finalized",
        skipPreflight: false, // Hayaan ang Anchor na mag-simulate
      });

      // --- WAKAS NG FINAL, SIMPLEST FIX ---


      setSuccess(`Rename successful! Transaction: ${txSignature}`);
      
    } catch (error: any) {
      console.error('Renaming failed:', error);
      const errorLogs = error.logs?.join('\n') || 'No logs available.';
       setError(`An error occurred: ${error.message}\n\nOn-Chain Logs:\n${errorLogs}`);
    } finally {
      setIsRenaming(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-4 sm:p-6 my-8">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">NFT Rename Utility</h2>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 break-all">{success}</div>}

      <div className="space-y-4">
        <div>
          <label htmlFor="mintAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">NFT Mint Address</label>
          <input
            type="text"
            id="mintAddress"
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Enter NFT Mint Address"
          />
        </div>
        <div>
          <label htmlFor="newName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Name</label>
          <input
            type="text"
            id="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Enter new NFT name"
          />
        </div>
        <div>
          <label htmlFor="newUri" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Metadata URI</label>
          <input
            type="text"
            id="newUri"
            value={newUri}
            onChange={(e) => setNewUri(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus-border-purple-500 sm:text-sm"
            placeholder="Enter new metadata JSON URL"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleRename}
          disabled={!connected || isRenaming}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRenaming ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" size={18} />
              Renaming...
            </div>
          ) : (
            'Rename NFT'
          )}
        </button>
        {!connected && <p className="text-center text-sm text-yellow-500 mt-2">Please connect your wallet.</p>}
      </div>
    </div>
  );
};

export default RenameComponent;