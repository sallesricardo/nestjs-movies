import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    BadRequestException,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        const { title, category, year, rating } = createMovieDto;
        if (
            !title ||
            !category ||
            typeof year !== 'number' ||
            typeof rating !== 'number'
        ) {
            throw new BadRequestException();
        }
        return this.moviesService.create(createMovieDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.moviesService.findAll();
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(CacheInterceptor)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.moviesService.findOne(+id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(+id, updateMovieDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.moviesService.remove(+id);
    }
}
