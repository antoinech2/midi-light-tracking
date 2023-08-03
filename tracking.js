const prompt = require('prompt');
const sprompt = require('prompt-sync')({ sigint: true });
const { midiOutput, close } = require('./midi')

const lights = [{
    name: "Fixture1",
    x: -100,
    y: 900,
    z: 500,
    pan: 0,
    tilt: 0,
    midi: {
        pan: 1,
        milli_pan: 2,
        tilt: 3,
        milli_tilt: 4
    }
}]


async function setupMidiLink() {
    let finished = false;

    //function waitingMidi(name, key){
    //    return new Promise((resolve, reject) => {
    //        prompt.get([`Assignez le MIDI ${key} du projecteur ${name}`]).then(() => {finished = true;resolve();})
    //    })
    //}

    lights.forEach(async (value) => {
        for (const key in value.midi) {
            //waitingMidi(value.name, key)
            //prompt.start();
            prompt.get([`Assignez le MIDI ${key} du projecteur ${value.name}`], () => { finished = true })
            while (!finished) {
                midiOutput.send("cc", {
                    channel: 1,
                    value: 100,
                    controller: value.midi[key]
                })
                //wait(500)
                await sleep(500);
            }
            finished = false;
        }
    }
    )
}

function calculateDmxValue(light, position) {
    let x = -(light.x - position.x)
    let y = -(light.y - position.y)
    let z = -(light.z - position.z)
    let rho = Math.sqrt(x ** 2 + y ** 2 + z ** 2)
    let theta = Math.acos(z / rho) * 180 / Math.PI + light.tilt
    let phi = Math.atan2(y, x) * 180 / Math.PI + light.pan
    let pan = (phi + 180) / 360 * 171 + 43
    let milli_pan = Math.round(255 * (pan - Math.trunc(pan)))
    pan = Math.trunc(pan)
    if (theta < 55) {
        console.log(`Tilt of ${theta}° is unreachable`)
        theta = 55;
    }
    let tilt = (theta - 55) / 125 * 128.5
    let milli_tilt = Math.round(255 * (tilt - Math.trunc(tilt)))
    tilt = Math.trunc(tilt)
    console.log({ phi, theta, pan, milli_pan, tilt, milli_tilt })
    return { pan, milli_pan, tilt, milli_tilt }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve(), ms));
}

function wait(ms) {
    const start = Date.now();
    let now = start;
    while ((now - start) < ms) { now = Date.now(); }
}

function track(light, position) {
    values = calculateDmxValue(light, position)
    for (const key in light.midi) {
        midiOutput.send("cc", {
            channel: 1,
            value: values[key],
            controller: light.midi[key]
        })
    }
}

setupMidiLink()
//const pos = {x:-200, y:800, z:100}
//track(lights[0], pos)
// while (true) {
//     const x = sprompt("Coord x : ");
//     const y = sprompt("Coord y : ");
//     const z = sprompt("Coord z : ");
//     track(lights[0], { x, y, z })
//     console.log("Succès !")
// }
//close()

