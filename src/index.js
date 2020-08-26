import { Component, createElement, render } from './react/index.js';

window.creatElement = createElement;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }

  add() {
    this.setState({ count: this.state.count++ })
  }

  render() {
    return (
      <div>
        12345
        {this.children}
        <div onClick={() => { this.add().bind(this)}}>{this.count}</div>
      </div>
    )
  }
}



render((
  <App id="123" class="ccc">
    751232
     <div>7777777</div>
  </App>
), document.getElementById('app'))