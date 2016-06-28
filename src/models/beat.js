import stampit from 'stampit';
import {lcm} from 'mathjs';

export const Beat = stampit({
    init({rh = 0, lh = 0}) {
        this.rh = rh;
        this.lh = lh;
    },
    methods: {
        tickCount() {
            return lcm(this.rh, this.lh);
        },
        tickIndices(noteCount) {
            const tickCount = this.tickCount();
            const interval = tickCount / noteCount;
            let index = 0;
            let indicies = [];

            while (index < tickCount) {
                indicies.push(index);
                index += interval;
            }
            return indicies;
        },
        rhTickIndices() {
            return this.tickIndices(this.rh);
        },
        lhTickIndices() {
            return this.tickIndices(this.lh);
        }
    }
});
