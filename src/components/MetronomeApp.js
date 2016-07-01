import React, {Component} from 'react';
import Relay from 'react-relay';

import {QAudio} from '../models/audio/qaudio';
import {Metronome} from '../models/metronome';
import {Beat} from '../models/beat';

class MetronomeApp extends Component {
    state = {
        count: 0,
        beat: Beat({rh: 3, lh: 4}),
        metronome: Metronome({classicTicksPerMinute: 60, classicTicksPerBeat: 12})
    };

    start = () => {
        this.setState({
            count: this.state.count + 1,
        });
        this.state.metronome.playBeat(this.state.beat);
    };

    componentDidMount = () => {
      QAudio.initializeSound(() => console.log("Finished Loading Audio"));
    };

    render = () => {
      return (
        <div>
          <button onClick={this.start}>
            Start {'(count: ' + (this.state.count) + ')'}
          </button>
        </div>
      )
    };
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
