import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from 'axios';
import Overview from '../Overview/Overview';
function Banner() {
    const [banner, setBanner] = useState('');

    var img_url = `https://image.tmdb.org/t/p/original${banner.backdrop_path}`;

    useEffect(() => {
        //runs when the component is mounted
        var page = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        var x = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=5a0394d6b2bf56d802c8239e64c596dc&sort_by=popularity.desc&page=${page}&with_watch_monetization_types=flatrate`).then(result => {
            console.log(result.data.results[x]);
            setBanner(result.data.results[x])
        });

        return () => console.log('unmounting...');
    }, []); //empty array to specify run only once

    return (
        <div>
            <div className='banner' style={{backgroundImage:`url(${banner ? img_url : ''})`}}>
                <center>
                <div className='content' >
                    <h2 >Random Movie Suggestion</h2>
                    <h1 className='title'>{banner.title}</h1>
                    <br/>
                    <br/>
                    <a className="button">Rating : {banner.vote_average}</a>
                </div>
                </center>
            <div className="fade_bottom">
                <Overview overview={banner.overview}></Overview>
            </div>
            </div>
        </div>
    )
}

export default Banner
