import stampit from 'stampit';
import {BufferLoader} from './buffer_loader';

export const QAudio = stampit({
    statics: {
        initializeSound (onFinishedLoading) {
            this.onFinishedLoading = onFinishedLoading;

            // http://chimera.labs.oreilly.com/books/1234000001552/ch01.html#s01_2
            const contextClass = (
                window.AudioContext ||
                window.webkitAudioContext ||
                window.mozAudioContext ||
                window.oAudioContext ||
                window.msAudioContext
            );
            if (contextClass) {
                // Web Audio API is available.
                this.context = new contextClass();
            } else {
                alert('Web Audio API is not supported in current browser (try Chrome).');
            }
            const bufferLoader = new BufferLoader(this.context, this.toneSounds(), (this.finishedLoading).bind(this));
            bufferLoader.load();
        },
        toneSounds() {
            return [
                '../../../sounds/tone_1000hz.mp3',
            ]
        },
        finishedLoading(buffers) {
            this.assignTones(buffers);
            if (this.onFinishedLoading) this.onFinishedLoading.apply();
        },
        assignTones(buffers) {
            this.tone_1000hz = buffers[0];
        },
        startBufferAtTime(buffer, time) {
            const source = this.context.createBufferSource();
            source.buffer = buffer;
            source.connect(this.context.destination);
            source.start(time);
            return source;
        },
        play() {
            console.log("...play");
            this.startBufferAtTime(this.tone_1000hz, 0);
        },
        currentTime() {
            return this.context.currentTime;
        }
    }
})