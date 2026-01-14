const express = require('express');
const router = express.Router();
const {
    getCases,
    createCase,
    getCaseById,
    updateCase,
    deleteCase,
} = require('../controllers/caseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCases)
    .post(protect, createCase);

router.route('/:id')
    .get(getCaseById)
    .put(protect, updateCase)
    .delete(protect, deleteCase);

module.exports = router;
