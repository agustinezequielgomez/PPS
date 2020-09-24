import { BuildingAspect } from '../Enums/building-aspect.enum';
export interface Photo {
    photoUrl: string;
    fileName: string;
    takenBy: string;
    takenAt: Date;
    buildingAspect: BuildingAspect;
    votes: number;
}

export interface FirebaseUserDocument {
    photos: Photos;
    voted: string[];
}

export type Photos = Photo[];
