/*
 Classic ticks per minute' (CTPM) is the classic metronome setting where 60 gives one 'classic' tick per second. (The time signature for the piece is irrelevant.)</p>
 Example: For CTPM=60 and 'Classic ticks per beat' (CTPB)=1, each beat has 1 classic-tick, each spaced 1 second a part; for 60 and 2, each beat has 2 classic-ticks, each also spaced 1 second a part (the beat is now twice as long).</p>
 Example: For CTPB=3, and a beat with 8 notes for right and 3 for left, 24 ticks are generated, with a classic-tick falling every 8th tick, starting on the 1st.</p>
 */

import stampit from 'stampit';
import {range} from 'lodash';
import QAudio from './audio/qaudio';

export const Metronome = stampit({
    init({classicTicksPerMinute = 60, classicTicksPerBeat = 1}) {
        this.classicTicksPerMinute = classicTicksPerMinute;
        this.classicTicksPerBeat = classicTicksPerBeat;
    },
    methods: {
        tickDurationForBeat(beat) { // sec
            return this.classicTicksPerBeat / ((beat.tickCount() * this.ticksPerSec()));
        },
        ticksPerSec() {
            return (this.classicTicksPerMinute / 60);
        },
        tickStartTimeOffsetsForBeat(beat) { // sec
            const duration = this.tickDurationForBeat(beat);
            let offset = 0;

            return range(beat.tickCount()).map(() => {
                const result = offset;
                offset += duration;
                return result;
            });
        },
        playBeat(beat) {
            const timeAtStart = QAudio.currentTime();
            const buffer = QAudio.tone_1000hz;

            this.tickStartTimeOffsetsForBeat(beat).forEach((offset) => {
                QAudio.startBufferAtTime(buffer, timeAtStart + offset);
            })
        }
    }
});
