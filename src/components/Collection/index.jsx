import React from 'react'

import styles from './home.module.scss'

const Collection = () => {
    return (
        <div className={styles.container}>
        <form >
            <label className={styles.label}>Link your Discogs collection</label>
            <input type="text" />
            <button type="submit">Import</button>
        </form>
        </div>
    )
}

export default Collection;
