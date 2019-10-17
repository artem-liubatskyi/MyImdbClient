import { MovieList } from './movie-list';

export class MoviePerson {
    id: number;
    fullName: string;
    dateOfBirth: string;
    movies: MovieList[];
    biography: string;
    gender: string;
    country: string;
    imageUrl: string;
}
