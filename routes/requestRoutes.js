
const express = require("express");
const router = express.Router();
const Request = require("../models/Request");


router.get("/new", async(req,res)=>{
    res.render("./request/new.ejs");
});
// POST route to create new request
router.post("/", async (req, res) => {
    console.log(req.body);
    const { description, location, imageUrl } = req.body;

    const newRequest = new Request({
      description,
      location,
      imageUrl,
    });

    let data=await newRequest.save();
    console.log(data);
    res.send("data insert successfully");

});

router.get("/",async(req,res)=>{
  const requests = await Request.find();
  res.render("./request/allRequest.ejs",{requests});
})

module.exports = router;
