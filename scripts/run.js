const main = async () => {

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("exe");
    await domainContract.deployed();

    console.log(`Contract deployed to address: ${domainContract.address}`);
    console.log(`Contract is deployed by: ${owner.address}`);

    let txn = await domainContract.register("doom", { value: hre.ethers.utils.parseEther('100')});
    await txn.wait();

    // txn = await domainContract.setRecord("doom", "I am doctor doom.");
    // await txn.wait();
    // const record = await domainContract.getRecord("doom");
    // console.log(`Got records for domain : doom => ${record}`);
    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Owner wallet balance is: ", hre.ethers.utils.formatEther(ownerBalance));
    let balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log(`Contract balance is: ${hre.ethers.utils.formatEther(balance)}`);

    txn = await domainContract.withdraw();
    await txn.wait();
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Owner wallet balance is: ", hre.ethers.utils.formatEther(ownerBalance));
    balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log(`Contract balance is: ${hre.ethers.utils.formatEther(balance)}`);

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