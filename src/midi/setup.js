const prompt = require('prompt-async');

async function setupMidiLink() {
    let finished = false;

    lights.forEach(async (value) => {
        for (const key in value.midi) {
            prompt.get([`Assignez le MIDI ${key} du projecteur ${value.name}`], () => { finished = true })
            while (!finished) {
                midiOutput.send("cc", {
                    channel: 1,
                    value: 100,
                    controller: value.midi[key]
                })
                await sleep(500);
            }
            finished = false;
        }
    }
    )
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setupMidiLink()