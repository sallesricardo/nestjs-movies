import { Inject, Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    create(createMovieDto: CreateMovieDto) {
        return this.movieRepository.save(createMovieDto);
    }

    findAll() {
        return this.movieRepository.find();
    }

    async findOne(id: number) {
        const cachedMovie = await this.cacheService.get(id.toString());
        if (cachedMovie) {
            return cachedMovie;
        }
        const movie = await this.movieRepository.findOneBy({ id });
        await this.cacheService.set(id.toString(), movie);
        return movie;
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        return this.movieRepository.update(id, updateMovieDto);
    }

    remove(id: number) {
        return this.movieRepository.delete(id);
    }
}
