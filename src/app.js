const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require ('dotenv');
const app = express();
dotenv.config();
const axios = require('axios').default;
const port = process.env.PORT ? process.env.PORT : 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', async (req, res) => {
    try {
        let requestBody = req.body;
        const targetUrl = requestBody.TargetUrl ? requestBody.TargetUrl : requestBody.targetUrl;
        delete requestBody.targetUrl;
        const targetResponse = await axios({
            method: 'post',
            url: targetUrl,
            data: requestBody,
            headers: req.headers
        });
        res.status = targetResponse.status;
        return res.send(targetResponse.data)
    } catch (error) {
        res.status(error.response.status);
        res.send({
            "Error": error.message    
        });
    }
});
app.listen(port, () => {
    console.log("listening on port: ", port);
})