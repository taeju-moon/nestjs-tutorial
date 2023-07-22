import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entities';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  search(year: number): Movie[] {
    return this.movies.filter((movie) => movie.year === year);
  }

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie: Movie = this.movies.find((movie) => movie.id === id);
    if (!movie) throw new NotFoundException(`Movie not found ${id}`);
    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  create(movieData: CreateMovieDto): Movie {
    const data: Movie = {
      id: this.movies.length + 1,
      ...movieData,
    };
    this.movies.push(data);
    return data;
  }

  patch(id: number, updateData: UpdateMovieDto): Movie {
    const movie: Movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
    return this.getOne(id);
  }
}
