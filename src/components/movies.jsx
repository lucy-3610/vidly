import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import SearchBox from './searchBox';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
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
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    getPageData = () => {
        const { currentPage, pageSize, movies: allMovies, sortColumn, searchQuery, selectedGenre } = this.state;

        let filtered = allMovies
        if (searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { currentPage, pageSize, genres, sortColumn, searchQuery, selectedGenre } = this.state;

        const { totalCount, data: movies } = this.getPageData();

        if (totalCount === 0) return <p>There are no movies in the database.</p>

        return (
            <React.Fragment>
                <Link to="/movies/new" className="btn btn-primary mb-3">New Movie</Link>
                <p>Showing {totalCount} movies in the database.</p>
                <div className="row my-5">
                    <div className="col-2">
                        <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreSelect} />
                    </div>
                    <div className="col">
                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
                        <MoviesTable movies={movies} sortColumn={sortColumn} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} />
                    </div>
                </div>
                <Pagination itemsTotal={totalCount} numPageItems={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
            </React.Fragment >
        );
    }
}

export default Movies;