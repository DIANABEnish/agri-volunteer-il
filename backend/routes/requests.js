const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/', requestController.createRequest);
router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getVolunteerRequest, requestController.getRequestById);
router.patch('/:id', requestController.getVolunteerRequest, requestController.updateRequest);
router.delete('/:id', requestController.getVolunteerRequest, requestController.deleteRequest);

module.exports = router;