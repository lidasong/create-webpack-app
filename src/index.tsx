import React from 'react'
import ReactDom from 'react-dom'
import './index.module.scss'

class App extends React.Component {
    render() {
        return <div className="wrapper">
            <h1>webpack build for react app</h1>
            <p>`npm run start`</p>
        </div>
    }
}

export default {
    start: () => ReactDom.render(<App />, document.getElementById("app"))
}
