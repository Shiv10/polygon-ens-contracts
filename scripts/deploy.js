const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("exe");
    await domainContract.deployed();

    console.log("Contract deployed to: ", domainContract.address);

    let txn = await domainContract.register("application", {value: hre.ethers.utils.parseEther("0.1")});
    await txn.wait();
    console.log("Minted domain application.exe");

    txn = await domainContract.setRecord("application", "This is my first domain.");
    await txn.wait();
    console.log("Set record for application domain.");

    const address = await domainContract.getAddress("application");
    console.log("Owner of domain application: ", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(balance));

}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

runMain();