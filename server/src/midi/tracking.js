const fixturesData = require("../../data/fixtures.json")

let midiPorts

function init(ports){
    midiPorts = ports
}

function calculateDmxValue(light, position) {
    let x = -(light.x - position.x)
    let y = -(light.y - position.y)
    let z = -(light.z - position.z)
    let rho = Math.sqrt(x ** 2 + y ** 2 + z ** 2)
    let theta = Math.acos(z / rho) * 180 / Math.PI + parseFloat(light.tilt)
    let phi = Math.atan2(y, x) * 180 / Math.PI + parseFloat(light.pan)

    if (light.inverted_pan){
        phi = 180 - phi
    }
    else {
        phi += 180
    }
    if (light.inverted_tilt){
        phi -= 180
    }
    if (phi < 0){
        phi += 360
    }
    let panMidi = phi / 360 * 127
    panMidiValue = Math.trunc(panMidi)
    milli_pan = Math.round(128 * (panMidi - panMidiValue))

    let tilt
    let milli_tilt
    if (theta < 55) {
        console.log(`Tilt of ${theta}° is unreachable`)
        tilt = 0
        milli_tilt = 0
    }
    else if (theta == 180){
        tilt = 127
        milli_tilt = 127
    }
    else {
        tilt = (theta - 55) / 125 * 128
        milli_tilt = Math.round(127 * (tilt - Math.trunc(tilt)))
    }

    tiltMidiValue = Math.trunc(tilt)

    console.log(light.name, { x, y, z, phi, theta, /*pan,*/ tilt, /*realPan,*/ realTilt : tiltMidiValue, panMidiValue, milli_pan, tiltMidiValue, milli_tilt })
    return { pan : panMidiValue, milli_pan, tilt : tiltMidiValue, milli_tilt }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function track(position, modifId, modifValue, lights = fixturesData) {
    console.log("\n\n\n\n")
    for (let [index, light] of lights.entries()){
        if (index == modifId){
            let midiLight = light.midi
            light = modifValue
            light.midi = midiLight
        }
        values = calculateDmxValue(light, position)
        for (const key in light.midi) {
            //console.log(values, values[key], light.midi[key], light.midi)
            midiPorts.Output.send("cc", {
                channel: 1,
                value: values[key],
                controller: light.midi[key]
            })
            await sleep(1)
        }
    }
}


module.exports = { track, init, midiPorts }

