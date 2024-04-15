import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
    ) {}

    create(createMovieDto: CreateMovieDto) {
        return this.movieRepository.save(createMovieDto);
    }

    findAll() {
        return this.movieRepository.find();
    }

    findOne(id: number) {
        return this.movieRepository.findOneBy({ id });
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        return this.movieRepository.update(id, updateMovieDto);
    }

    remove(id: number) {
        return this.movieRepository.delete(id);
    }
}
