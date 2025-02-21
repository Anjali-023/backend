const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid request format" });
        }

        // Separate numbers and alphabets
        let numbers = [];
        let alphabets = [];

        data.forEach(item => {
            if (/^\d+$/.test(item)) {
                numbers.push(item);
            } else if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
            }
        });

        // Find the highest alphabet (case insensitive sorting)
        let sortedAlphabets = [...alphabets].sort((a, b) => a.localeCompare(b));
        let highestAlphabet = sortedAlphabets.length > 0 ? [sortedAlphabets[sortedAlphabets.length - 1]] : [];

        // Response JSON
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers,
            alphabets: alphabets, // ✅ Fixed to include all alphabets
            highest_alphabet: highestAlphabet // ✅ Highest alphabet correctly selected
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

// GET endpoint for operation_code
router.get("/", (req, res) => {
    return res.status(200).json({ operation_code: 1 });
});

module.exports = router;
