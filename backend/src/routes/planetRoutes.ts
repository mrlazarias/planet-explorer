import express from 'express';
import { getPlanets, getPlanetById, createPlanet } from '../controllers/planetController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getPlanets)
  .post(protect, createPlanet);

router.route('/:id')
  .get(protect, getPlanetById);

export default router; 