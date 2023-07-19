import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';

class Movies extends Component {
    state = {
        movies: getMovies(),
        liked: false
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({ movies })
        console.log(movie);
        // this.state.movies.deleteMovie(movie._id)
        // movie.deleteMovie(movie._id)
    };

    handleLike = movie => {
        console.log("clicked like", movie)
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
        // const currentState = this.state.movie.liked;
        // this.setState({ liked: !currentState });
    };

    render() {
        const { length: numMovies } = this.state.movies;

        if (numMovies === 0) return <p>There are no movies in the database.</p>

        return (
            <React.Fragment>
                <p>Showing {numMovies} movies in the database.</p>
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.state.movies} */}
                        {this.state.movies.map(movie =>
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like onLikeToggle={() => this.handleLike(movie)} liked={movie.liked} /></td>
                                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>)}
                        {/* {() => <td>{this.state.movies.title}</td>} */}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Movies;