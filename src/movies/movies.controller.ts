import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entities';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  //?year=2020
  @Get('search')
  search(@Query('year') searchingYear: number): Movie[] {
    return this.movieService.search(searchingYear);
  }

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto): Movie {
    return this.movieService.create(movieData);
  }

  @Patch(':id')
  patch(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ): Movie {
    return this.movieService.patch(movieId, updateData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number): boolean {
    return this.movieService.deleteOne(movieId);
  }
}
