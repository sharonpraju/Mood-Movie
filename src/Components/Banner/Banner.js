import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from 'axios';
import Overview from '../Overview/Overview';

var genres = [];
axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=5a0394d6b2bf56d802c8239e64c596dc&language=en-US`).then(result => {
genres = result.data.genres;
});



function Banner() {

    const [banner, setBanner] = useState('');
    const [genre, setGenre] = useState('');

    function movieRandom()
    {
        var page = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        var x = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=5a0394d6b2bf56d802c8239e64c596dc&page=${page}`).then(result => {
            console.log(result.data.results[x]);
            setBanner(result.data.results[x])
        });
    }

    function movieGenre()
    {
        var page = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        var x = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=5a0394d6b2bf56d802c8239e64c596dc&page=${page}${genre}`).then(result => {
            console.log(result.data.results[x]);
            setBanner(result.data.results[x])
        });
       
    }

    var img_url = `https://image.tmdb.org/t/p/original${banner.backdrop_path}`;

    useEffect(() => {
        //runs when the component is mounted
        movieRandom();

        //return () => console.log('unmounting...');
    }, []); //empty array to specify run only once

    return (
        <div>
            <div className='banner' style={{backgroundImage:`url(${banner ? img_url : ''})`}}>
                <div className='content' >
                    <center>
                        <h2 >Random Movie Suggestion</h2>
                        <h1 className='title'>{banner.title}</h1>
                        <br/>
                        <br/>
                        <a className="button">Rating : {banner.vote_average}</a>
                        <br/>
                        <div className="select_div">
                            <select className="select" onChange={(e)=>{setGenre(`&with_genre=${e.target.value}`);}}>
                                <option selected disabled>Select Category</option>
                                {
                                    genres && genres.map((obj, index)=>{
                                        return (<option key={index} value={obj.id}>{obj.name}</option>)
                                    })
                                }
                            </select>
                            <a className="button-x" onClick={movieGenre}>Search</a>
                        </div>
                        <br/><br/>
                        <a className="button-x" onClick={movieRandom}>Get Random Movie</a>
                    </center>
                    <Overview overview={banner.overview}></Overview>
                </div>
                <div className="fade_bottom"></div>
            </div>
        </div>
    )
}

export default Banner
