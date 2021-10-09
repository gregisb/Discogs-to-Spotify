import React, {useState} from 'react'
import axios from 'axios'

import { BsSearch } from 'react-icons/bs'
import styles from './home.module.scss'

const Collection = () => {

    const [url, setUrl] = useState('');
    const [albuns, setAlbuns] = useState({});

    const discogsUrl = 'https://api.discogs.com';

    const onSubmit = (e) => {
        e.preventDefault();
        
        const listId = url.split('/').pop();

        let tempAlbuns = []

        axios.get(discogsUrl + `/lists/${listId}`)
          .then((response) => {
            const data = response.data.items
                .map((item) => axios.get(item.resource_url))
                Promise.all(data).then((albuns) => {
                    console.log(albuns)
                    albuns.forEach((album) => {
                        tempAlbuns[album.data.title] = album.data.tracklist
                    })
                    console.log(tempAlbuns)
                    setAlbuns(tempAlbuns)
            }).catch((error) => {
                console.log(error)
            })
            
        })
        .catch((error) => {
            console.log(error)
        });


    };

    return (
        <>
        <div className={styles.container}>
        <form >
            <label className={styles.label}>Link your Discogs collection</label>
            <input onChange={e => setUrl(e.target.value)} value={url} type="text" />
            <button onClick={onSubmit} >Import list</button>
        </form>
        </div>

        
            {Object.keys(albuns).map((albumTitle, index) => 
               <div key={index}>
               <p>
                {albumTitle}
                </p>
                    
                <ul >{albuns[albumTitle].map((track, index2) => 
                    <li key={index2}>{track.title}</li>)}
                </ul></div>)}
        
        </>
    );
};

export default Collection;
