import React from 'react';
import styles from './index.module.scss';
import HookMock from '../HookMock'

export default class App extends React.Component<any, any> {
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
        <HookMock />
      </div>
    );
  }
}
