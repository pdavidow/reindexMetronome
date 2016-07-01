// browserify -t babelify test_metronome_browser.js | browser-run -p 2222
// http://localhost:2222

import test from 'tape';
import {Metronome} from '../models/metronome';
import {Beat} from '../models/beat';
import {QAudio} from '../models/audio/qaudio';

/*
test('(dummy test for init puropses only)', (assert) => {
    QAudio.initializeSound(() => console.log("Finished Loading Audio"));

    assert.end();
});
*/

// https://simonsmith.io/unit-testing-react-components-without-a-dom/

test('Call same arbitrary function when each tick ends playing', (assert) => {
    let metronome = Metronome({classicTicksPerMinute: 60, classicTicksPerBeat: 1});
    let beat = Beat({rh: 1, lh: 1});
    let count = 0;
    let onEnded = () => count++;
    metronome.playBeatTicks(beat, onEnded);

    let actual = count;
    let expected = 1;
    assert.ok(isEqual(actual, expected), '1 tick total, so increment count once');

    assert.end();
});

// Call same arbitrary function when each tick starts playing