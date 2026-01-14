const Case = require('../models/Case');

// @desc    Get all cases
// @route   GET /api/cases
// @access  Public
const getCases = async (req, res) => {
    try {
        const cases = await Case.find();
        res.json(cases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a case
// @route   POST /api/cases
// @access  Private
const createCase = async (req, res) => {
    // Allow arbitrary body
    try {
        const newCase = await Case.create(req.body);
        res.status(201).json(newCase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get case by ID
// @route   GET /api/cases/:id
// @access  Public
const getCaseById = async (req, res) => {
    try {
        const foundCase = await Case.findById(req.params.id);
        if (foundCase) {
            res.json(foundCase);
        } else {
            res.status(404).json({ message: 'Case not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update case
// @route   PUT /api/cases/:id
// @access  Private
const updateCase = async (req, res) => {
    try {
        // findByIdAndUpdate with { new: true } returns the updated document
        // strict: false in model should allow new fields
        const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true // Note: might need to be careful with strict validators if any
        });

        if (updatedCase) {
            res.json(updatedCase);
        } else {
            res.status(404).json({ message: 'Case not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete case
// @route   DELETE /api/cases/:id
// @access  Private
const deleteCase = async (req, res) => {
    try {
        const foundCase = await Case.findById(req.params.id);

        if (foundCase) {
            await foundCase.deleteOne();
            res.json({ message: 'Case removed' });
        } else {
            res.status(404).json({ message: 'Case not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCases,
    createCase,
    getCaseById,
    updateCase,
    deleteCase,
};
