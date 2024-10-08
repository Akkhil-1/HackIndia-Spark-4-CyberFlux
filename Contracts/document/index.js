const express = require('express');
const bodyParser = require('body-parser');
const {Web3} = require('web3');
const Tesseract = require('tesseract.js');
const contract = require('./build/contracts/DocumentVerification.json');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });

const web3 = new Web3('http://127.0.0.1:7545'); 
const contractAddress = '0x67d49D3d3a4c9Ca94A3bB2b7392DcEF3Cf67A151'; 
const documentVerification = new web3.eth.Contract(contract.abi, contractAddress);

// Endpoint to verify document and add student to blockchain
app.post('/verify-and-add-student', upload.single('document'), async (req, res) => {
  try {
    const { studentId, studentName, studentDetails } = req.body;
    const documentPath = req.file.path;

    // Log the input for debugging
    // console.log('Input Data:', { studentId, studentName, studentDetails });
    // console.log('Document Path:', documentPath);

    // Use Tesseract.js to extract text from the uploaded document
    const ocrResult = await Tesseract.recognize(documentPath, 'eng');
    const extractedText = ocrResult.data.text;
    console.log("aandr111111");

    // Log the extracted text for debugging
    console.log('Extracted Text:', extractedText);

    // Simulate verification logic
    if (extractedText.includes(studentId)) {
      console.log("aandr");
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      const owner = accounts[0]; 
      console.log(owner);

      // Add student data to the blockchain
      await documentVerification.methods
        .addStudent(studentId, studentName, studentDetails, owner)
        .send({ from: owner,gas: 3000000 });

      res.send('Student added to the blockchain successfully.');
    } else {
      res.status(400).send('Document verification failed.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred: ' + error.message);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
