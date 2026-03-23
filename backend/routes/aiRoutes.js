const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/generate", async (req, res) => {

    try {

        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({ message: "Topic required" });
        }

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `Write a short blog about ${topic}`
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        console.log("AI ERROR:", error.response?.data || error.message);

        res.status(500).json({
            message: "AI generation failed"
        });

    }

});

module.exports = router;