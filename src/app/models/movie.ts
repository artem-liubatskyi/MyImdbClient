import { Person } from './person';
import { Review } from './review';

export class Movie {
    id: number;
    title: string;
    year: number;
    imageUrl: string;
    description: string;
    averageRate: number;
    usersRate: number;
    genres: string[];
    directors: Person[];
    stars: Person[];
    countries: string[];
    isInWatchlist: boolean;
    runtime: number;
    budget: number;
    trailerUrl: string;
    reviews: Review[];
}
