
interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  poster_path: string;
}

export type { Movie };