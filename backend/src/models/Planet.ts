import mongoose, { Document, Schema } from 'mongoose';

export interface IPlanet extends Document {
  name: string;
  diameter: number;
  rotationPeriod: number | string;
  distanceFromSun: number;
  hasRings: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const planetSchema = new Schema<IPlanet>(
  {
    name: {
      type: String,
      required: [true, 'Planet name is required'],
      unique: true,
      trim: true,
    },
    diameter: {
      type: Number,
      required: [true, 'Planet diameter is required'],
    },
    rotationPeriod: {
      type: Schema.Types.Mixed,
      required: [true, 'Rotation period is required'],
    },
    distanceFromSun: {
      type: Number,
      required: [true, 'Distance from sun is required'],
    },
    hasRings: {
      type: Boolean,
      required: [true, 'Information about rings is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Planet image URL is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Planet = mongoose.model<IPlanet>('Planet', planetSchema);

export default Planet; 