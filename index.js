const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

   const newPair = new Keypair();
   const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
   const privateKey =  newPair._keypair.secretKey;

   const getWalletBalance = async() =>{
       try{
            const connection =  new Connection(clusterApiUrl("devnet"), "confirmed");
            const wallet = await Keypair.fromSecretKey(privateKey);
            const balance = await connection.getBalance(new PublicKey(wallet.publicKey));   
            console.log(`this is the balance: ${balance}`);
       }
       catch(err){
           console.log(err);

       }
   };

   const airdrop = async() => {
       try{
        const connection =  new Connection(clusterApiUrl("devnet"), "confirmed");
        const wallet = await Keypair.fromSecretKey(privateKey);
        const airdropSignature = await connection.requestAirdrop(
            new PublicKey(wallet.publicKey),
            2*LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(airdropSignature);

       }
       catch(err){
            console.log(err);
       }
   };

   const driver = async() => {
       await getWalletBalance();
       await airdrop();
       await getWalletBalance();
   }

   driver();    