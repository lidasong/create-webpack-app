import React from 'react';
import styles from './index.module.scss';
import HookMock from '../HookMock'
import { hot } from 'react-hot-loader';

export default hot(module)(class App extends React.Component<any, any> {
  state = {
    count: 1,
  }

  onClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>drive by webpack and react</h1>
        <h2 onClick={this.onClick}>
          start the app
          {this.state.count}
        </h2>
        <p>`npm install`</p>
        <p>`npm start`</p>
        <h2>
          Custom Hook: <HookMock />
        </h2>
      </div>
    );
  }
})
