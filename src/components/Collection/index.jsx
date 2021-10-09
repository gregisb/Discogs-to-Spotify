import React, {useState} from 'react'

import { BsSearch } from 'react-icons/bs'
import styles from './home.module.scss'

const axios = require('axios');

const Collection = () => {

    const [url, setUrl] = useState('');
    const [albuns, setAlbuns] = useState({});

    const discogsUrl = 'https://api.discogs.com';

    const onSubmit = (e) => {
        e.preventDefault();
        
        const listId = url.split('/').pop();

        let tempAlbuns = [];

        const getAlbuns = async () => {
            try {
               const resp = await axios.get(`${discogsUrl}/lists/${listId}`);
               const data = resp.data.items
               
               for(let i = 0; i < data.length; i++) {
                   const album = await axios.get(data[i].resource_url)
                   tempAlbuns[album.data.title] = album.data.tracklist
               }
               setAlbuns(tempAlbuns)
               console.log(tempAlbuns)  

               return data
               
            } catch (error) {
                console.log(error)
            } 
        } 
        
        getAlbuns()
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
