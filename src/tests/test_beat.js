// babel-node test_beat.js | faucet

// browserify -t babelify test_beat.js | browser-run -p 2222
// http://localhost:2222

import test from 'tape';
import {Beat} from '../models/beat';

test('Beat tick count', (assert) => {
    const msg = 'Beat tick count should equal lowest common multiple of rh and lh';

    let actual = Beat({rh: 3, lh: 4}).tickCount();
    let expected = 12;
    assert.equal(actual, expected, msg);

    actual = Beat({rh: 8, lh: 6}).tickCount();
    expected = 24;
    assert.equal(actual, expected, msg);

    assert.end();
});

test('Beat rh tick indices', (assert) => {
    const msg = 'Beat should know its rh tick indices';

    let actual = Beat({rh: 3, lh: 1}).rhTickIndices();
    let expected = [0,1,2];
    assert.same(actual, expected, msg);

    actual = Beat({rh: 3, lh: 4}).rhTickIndices();
    expected = [0,4,8];
    assert.same(actual, expected, msg);

    actual = Beat({rh: 8, lh: 6}).rhTickIndices();
    expected = [0,3,6,9,12,15,18,21];
    assert.same(actual, expected, msg);

    assert.end();
});

test('Beat lh tick indices', (assert) => {
    const msg = 'Beat should know its lh tick indices';

    let actual = Beat({rh: 3, lh: 1}).lhTickIndices();
    let expected = [0];
    assert.same(actual, expected, msg);

    actual = Beat({rh: 3, lh: 4}).lhTickIndices();
    expected = [0,3,6,9];
    assert.same(actual, expected, msg);

    actual = Beat({rh: 8, lh: 6}).lhTickIndices();
    expected = [0,4,8,12,16,20];
    assert.same(actual, expected, msg);

    assert.end();
});