const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, async (req, res) => {

    try {

        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            userId: req.user.id
        });

        await post.save();

        res.json(post);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

router.get("/all", async (req, res) => {

    try {

        const posts = await Post.find();

        res.json(posts);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

router.put("/update/:id", authMiddleware, async (req, res) => {

    const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(post);

});

router.delete("/delete/:id", authMiddleware, async (req, res) => {

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post Deleted" });

});

module.exports = router;