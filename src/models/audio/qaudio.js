import BufferLoader from './buffer_loader';

const QAudio = { // todo STAMPIT
    initializeSound_onFinishedLoading: function(finishedLoadingFunction) {
        QAudio.finishedLoadingFunction = finishedLoadingFunction;

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
            QAudio.context = new contextClass();
        } else {
            alert('Web Audio API is not supported in current browser (try Chrome).');
        }
        const bufferLoader = new BufferLoader(QAudio.context, QAudio.toneSounds, QAudio.finishedLoading);
        bufferLoader.load();
    },
    get toneSounds() {
        return [
            '../../../sounds/tone_1000hz.mp3',
            ]
    },
    finishedLoading: function(buffers) {
        QAudio.assignTones(buffers);
        if (QAudio.finishedLoadingFunction) QAudio.finishedLoadingFunction.apply();
    },
    assignTones: function(buffers) {
        QAudio.tone_1000hz = buffers[0];
    },
    startBufferAtTime: function(buffer, time) {
        const source = QAudio.context.createBufferSource();
        source.buffer = buffer;
        source.connect(QAudio.context.destination);
        source.start(time);
        return source;
    },
    play: function () {
        console.log("...play");
        QAudio.startBufferAtTime(QAudio.tone_1000hz, 0);
    },
    currentTime: function () {
        return QAudio.context.currentTime;
    }
};

export default QAudio;