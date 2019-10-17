export class Review {
    id: number;
    userId: number;
    movieId: number;
    userName: string;
    text: string;
    added: string;
    likesCount: number;
    dislikesCount: number;
    likedByCurrentUser: boolean;
}
