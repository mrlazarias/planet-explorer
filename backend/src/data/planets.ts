import { IPlanet } from '../models/Planet';

const planets: Partial<IPlanet>[] = [
  {
    name: 'Mercury',
    diameter: 4879,
    rotationPeriod: '58.6 days',
    distanceFromSun: 57.9,
    hasRings: false,
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=500',
  },
  {
    name: 'Venus',
    diameter: 12104,
    rotationPeriod: '243 days',
    distanceFromSun: 108.2,
    hasRings: false,
    imageUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=500',
  },
  {
    name: 'Earth',
    diameter: 12756,
    rotationPeriod: '24 hours',
    distanceFromSun: 149.6,
    hasRings: false,
    imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=500',
  },
  {
    name: 'Mars',
    diameter: 6792,
    rotationPeriod: '24.7 hours',
    distanceFromSun: 227.9,
    hasRings: false,
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500',
  },
  {
    name: 'Jupiter',
    diameter: 142984,
    rotationPeriod: '9.9 hours',
    distanceFromSun: 778.6,
    hasRings: true,
    imageUrl: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=500',
  },
  {
    name: 'Saturn',
    diameter: 120536,
    rotationPeriod: '10.7 hours',
    distanceFromSun: 1433.5,
    hasRings: true,
    imageUrl: 'https://images.unsplash.com/photo-1614314107768-6018061e5f01?w=500',
  },
  {
    name: 'Uranus',
    diameter: 51118,
    rotationPeriod: '17.2 hours',
    distanceFromSun: 2872.5,
    hasRings: true,
    imageUrl: 'https://images.unsplash.com/photo-1614313913185-062f2e4c4a8c?w=500',
  },
  {
    name: 'Neptune',
    diameter: 49528,
    rotationPeriod: '16.1 hours',
    distanceFromSun: 4495.1,
    hasRings: true,
    imageUrl: 'https://images.unsplash.com/photo-1614732484155-419e4aef2911?w=500',
  },
];

export default planets; 