import React from 'react'
import styles from './index.module.scss'

export default class App extends React.Component {
    render() {
        return <div className={styles.wrapper}>
            <h1>drive by webpack and react</h1>
            <h2>start the app</h2>
            <p>`npm install`</p>
            <p>`npm start`</p>
        </div>
    }
}