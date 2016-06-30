import React, {Component} from 'react';
import Relay from 'react-relay';

import QAudio from '../models/audio/qaudio';

class MetronomeApp extends Component {
    getInitialState () {
        return { count: 0 };
    }
  start() {
      /*
      this.setState({
          count: this.state.count + 1,
      });
      */
      QAudio.play();
  }
  componentDidMount() {
      QAudio.initializeSound_onFinishedLoading(()=>console.log("FinishedLoading"));
  }
  render() {
      return (
        <div>
          <button onClick={this.start}>
            Start {'(count: ' + '(this.state.count)' + ')'}
          </button>
        </div>
      )
  }
};

export default Relay.createContainer(MetronomeApp, {
    fragments: {
        viewer: () => Relay.QL`
      fragment on ReindexViewer {
        allBeats(first: 1) {
          count,
          edges {
            node {
              lh,
              rh
            }
          }
        }
      }
    `,
    },
});
