const Request = require("../models/Request");

const createRequest = async (req, res) => {
    const { description, location, imageUrl } = req.body;

    const newRequest = new Request({
      description,
      location,
      imageUrl,
    });

    let data=await newRequest.save();
    console.log(data);
    res.send("data insert successfully");

};

module.exports = { createRequest };



