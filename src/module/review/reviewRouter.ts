import { Router } from 'express';
import reviewController from './reviewController';

const router = Router();

router.post('/', reviewController.createReview);
router.get('/:id', reviewController.getReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

// Additional routes as needed

export default router;
