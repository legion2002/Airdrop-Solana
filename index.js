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
   const privateKey = new newPair._keypair.secretKey;

   const getWalletBalance = async() =>{
       try{
            const connection =  new Connection(clusterApiUrl("devnet"), "confirmed");
            const wallet = await Keypair.fromSecretKey(privateKey);
            const balance = await connection.getBalance()(new PublicKey(wallet.publicKey));   
            console.log("this is the balance: $(balance)");
       }
       catch(err){
           console.log(err);

       }
   }