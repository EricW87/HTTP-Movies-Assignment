import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from "axios";

const UpdateMovie = props => {
    const [movie, setMovie] = useState(null);
    //console.log(props);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setMovie(res.data);
                //console.log(res.data);
            })
            .catch(err => console.log(err.response));
    }, [props.match.params.id]);

    const handleUpdate = update => {
        setMovie({
            ...movie,
            ...update
        });
    }

    const handleActorsUpdate = (name, index) => {
        let temp_stars = movie.stars;
        temp_stars[index] = name;
        console.log(temp_stars, name, index)
        setMovie({
            ...movie,
            stars: temp_stars
        });
    }

    const handleUpdatePost = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                console.log(res.data);
                setMovie(null);
                props.history.push(`/movies/${props.match.params.id}`);
                // return <Redirect to={`/movies/${props.match.params.id}`}/>

            })
            .catch(err => console.log(err.response));
    }

    if(!movie)
        return <h4>Loading...</h4>

    return (
        <>
            <h3>Update Movie Information</h3>
            <form onSubmit={e => handleUpdatePost(e)}>
                <label>Title</label>
                <input id="title" type="text" placeholder="Title" value={movie.title} onChange={e => handleUpdate({title: e.target.value})}/> 
                <label >Director</label>
                <input id="director" type="text" placeholder="Director" value={movie.director} onChange={e => handleUpdate({director: e.target.value})}/>
                <label >Metascore</label>
                <input id="metascore" type="text" placeholder="Metascore" value={movie.metascore} onChange={e => handleUpdate({metascore: e.target.value})}/>
                <label>Stars</label>
                {movie.stars && movie.stars.map((star, index) => <input key={index}  id="stars" type="text" placeholder="Star" value={star} onChange={e => handleActorsUpdate(e.target.value, index)}/>)}
                <button type="submit">Update</button>
            </form>
        </>
    );
};

export default UpdateMovie;