import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres })
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    getPageData = () => {
        const { currentPage, pageSize, movies: allMovies, sortColumn, selectedGenre } = this.state;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { currentPage, pageSize, genres, sortColumn, selectedGenre } = this.state;

        const { totalCount, data: movies } = this.getPageData();

        if (totalCount === 0) return <p>There are no movies in the database.</p>

        return (
            <React.Fragment>
                <p>Showing {totalCount} movies in the database.</p>
                <div className="row my-5">
                    <div className="col-2">
                        <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreSelect} />
                    </div>
                    <div className="col">
                        <MoviesTable movies={movies} sortColumn={sortColumn} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} />
                    </div>
                </div>
                <Pagination itemsTotal={totalCount} numPageItems={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
            </React.Fragment>
        );
    }
}

export default Movies;