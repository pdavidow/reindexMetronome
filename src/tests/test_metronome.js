// babel-node test_metronome.js | faucet

import test from 'tape';
import {Metronome} from '../models/metronome';
import {Beat} from '../models/beat';
import {isEqual, range} from 'lodash';

test('Given a beat and a metronome-setting, calc tick duration (sec)', (assert) => {
    let metronome = Metronome({classicTicksPerMinute: 60, classicTicksPerBeat: 12});
    let beat = Beat({rh: 3, lh: 4});
    let actual = metronome.tickDurationForBeat(beat);
    let expected = 1;
    assert.equal(actual, expected, '1 tick every 1 sec');

    metronome = Metronome({classicTicksPerMinute: 30, classicTicksPerBeat: 12});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickDurationForBeat(beat);
    expected = 2;
    assert.equal(actual, expected, '1 tick every 2 sec');

    metronome = Metronome({classicTicksPerMinute: 120, classicTicksPerBeat: 12});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickDurationForBeat(beat);
    expected = 0.5;
    assert.equal(actual, expected, '1 tick every 1/2 sec');

    metronome = Metronome({classicTicksPerMinute: 60, classicTicksPerBeat: 24});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickDurationForBeat(beat);
    expected = 2;
    assert.equal(actual, expected, '1 tick every 2 sec');

    metronome = Metronome({classicTicksPerMinute: 60, classicTicksPerBeat: 6});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickDurationForBeat(beat);
    expected = 0.5;
    assert.equal(actual, expected, '1 tick every 1/2 sec');

    metronome = Metronome({classicTicksPerMinute: 30, classicTicksPerBeat: 6});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickDurationForBeat(beat);
    expected = 1;
    assert.equal(actual, expected, '1 tick every 1 sec');

    metronome = Metronome({classicTicksPerMinute: 120, classicTicksPerBeat: 24});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickDurationForBeat(beat);
    expected = 1;
    assert.equal(actual, expected, '1 tick every 1 sec');

    metronome = Metronome({classicTicksPerMinute: 30, classicTicksPerBeat: 3});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickDurationForBeat(beat);
    expected = 0.5;
    assert.equal(actual, expected, '1 tick every 1/2 sec');

    metronome = Metronome({classicTicksPerMinute: 10, classicTicksPerBeat: 24});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickDurationForBeat(beat);
    expected = 12;
    assert.equal(actual, expected, '1 tick every 12 sec');

    metronome = Metronome({classicTicksPerMinute: 120, classicTicksPerBeat: 4});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickDurationForBeat(beat);
    expected = 1/6;
    assert.equal(actual, expected, '1 tick every 1/6 sec');

    assert.end();
});

test('Given a beat and a metronome-setting, calc tick start time offset (sec)', (assert) => {
    let metronome = Metronome({classicTicksPerMinute: 60, classicTicksPerBeat: 12});
    let beat = Beat({rh: 3, lh: 4});
    let actual = metronome.tickStartTimeOffsetsForBeat(beat);
    let expected = range(0, 12, 1);
    assert.ok(isEqual(actual, expected), '12 ticks, 1 tick every 1 sec, for 12 sec');

    metronome = Metronome({classicTicksPerMinute: 30, classicTicksPerBeat: 12});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickStartTimeOffsetsForBeat(beat);
    expected = range(0, 24, 2);
    assert.ok(isEqual(actual, expected), '12 ticks, 1 tick every 2 sec, for 24 sec');

    metronome = Metronome({classicTicksPerMinute: 120, classicTicksPerBeat: 12});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickStartTimeOffsetsForBeat(beat);
    expected = range(0, 6, 0.5);
    assert.ok(isEqual(actual, expected), '12 ticks, 1 tick every 1/2 sec, for 6 sec');

    metronome = Metronome({classicTicksPerMinute: 60, classicTicksPerBeat: 24});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickStartTimeOffsetsForBeat(beat);
    expected = range(0, 24, 2);
    assert.ok(isEqual(actual, expected), '12 ticks, 1 tick every 2 sec, for 24 sec');

    metronome = Metronome({classicTicksPerMinute: 60, classicTicksPerBeat: 6});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickStartTimeOffsetsForBeat(beat);
    expected = range(0, 6, 0.5);
    assert.ok(isEqual(actual, expected), '12 ticks, 1 tick every 1/2 sec, for 6 sec');

    metronome = Metronome({classicTicksPerMinute: 120, classicTicksPerBeat: 4});
    beat = Beat({rh: 3, lh: 4});
    actual = metronome.tickStartTimeOffsetsForBeat(beat);
    expected = range(0, 2, 1/6);
    assert.ok(isEqual(actual, expected), '12 ticks, 1 tick every 1/6 sec, for 2 sec');

    assert.end();
});