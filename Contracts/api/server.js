const express = require("express");
const bodyParser = require("body-parser");
const { Web3 } = require("web3");
const path = require("path");
const contractData = require("../my_smart_contracts/build/contracts/DataStorage.json");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x84727F3aE86866c58cD15c2cc7dED1455B496Ec8";
const contract = new web3.eth.Contract(contractData.abi, contractAddress);
async function getAccounts() {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
}
app.post("/data", async (req, res) => {
  const { name, email } = req.body;

  try {
    const account = await getAccounts();
    await contract.methods
      .setData(name, email)
      .send({ from: account, gas: 3000000 });
    const id = await contract.methods.getDataCount().call();
    res
      .status(200)
      .send({ message: "Data added successfully!", id: id.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding data" });
  }
});
app.get("/data/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await contract.methods.getData(id).call();
    res.status(200).send({
      name: data[0],
      email: data[1],
      owner: data[2],
      id: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching data" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
