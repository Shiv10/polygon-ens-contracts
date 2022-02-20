const main = async () => {

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("exe");
    await domainContract.deployed();

    console.log(`Contract deployed to address: ${domainContract.address}`);
    console.log(`Contract is deployed by: ${owner.address}`);

    let txn = await domainContract.register("doom", { value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();

    const domainOwner = await domainContract.getAddress("doom");
    console.log(`Owner of domain doom is: ${domainOwner}`);

    // txn = await domainContract.setRecord("doom", "I am doctor doom.");
    // await txn.wait();
    // const record = await domainContract.getRecord("doom");
    // console.log(`Got records for domain : doom => ${record}`);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
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