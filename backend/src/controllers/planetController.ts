import { Request, Response } from 'express';
import Planet, { IPlanet } from '../models/Planet';

// @desc    Get all planets
// @route   GET /api/planets
// @access  Private
export const getPlanets = async (req: Request, res: Response): Promise<void> => {
  try {
    const planets = await Planet.find({});
    res.json(planets);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get single planet
// @route   GET /api/planets/:id
// @access  Private
export const getPlanetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const planet = await Planet.findById(req.params.id);
    
    if (planet) {
      res.json(planet);
    } else {
      res.status(404).json({ message: 'Planet not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create a planet
// @route   POST /api/planets
// @access  Private
export const createPlanet = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      diameter,
      rotationPeriod,
      distanceFromSun,
      hasRings,
      imageUrl,
    } = req.body;

    const planet = await Planet.create({
      name,
      diameter,
      rotationPeriod,
      distanceFromSun,
      hasRings,
      imageUrl,
    });

    res.status(201).json(planet);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Invalid planet data' });
  }
}; 