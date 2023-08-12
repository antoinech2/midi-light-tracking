const sprompt = require('prompt-sync')({ sigint: true });
const { midiPorts } = require('./midi')
const fixturesData = require("../../data/fixtures.json")

function calculateDmxValue(light, position) {
    let x = -(light.x - position.x)
    let y = -(light.y - position.y)
    let z = -(light.z - position.z)
    let rho = Math.sqrt(x ** 2 + y ** 2 + z ** 2)
    let theta = Math.acos(z / rho) * 180 / Math.PI + parseFloat(light.tilt)
    let phi = Math.atan2(y, x) * 180 / Math.PI + parseFloat(light.pan)
    let pan = (phi + 180) / 360 * 171
    let pantrunc = Math.trunc(pan) -1
    let panMidiValue = Math.trunc((phi + 180) / 360 * 127)
    let realPan = Math.floor(panMidiValue/190*255)
    let milli_pan
    if (realPan > pantrunc){
        milli_pan = 0
    }
    else if (realPan < pantrunc){
        milli_pan = 127
    }
    else{
        milli_pan = Math.round(128 * (pan - Math.trunc(pan)))
    }
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
    console.log({ x, y, z, phi, theta, pan, tilt, realPan, realTilt : tiltMidiValue, panMidiValue, milli_pan, tiltMidiValue, milli_tilt })
    return { pan : panMidiValue, milli_pan, tilt : tiltMidiValue, milli_tilt }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function init(){
    midiPorts.Output.send("cc", {
        channel: 2,
        value: 0,
        controller: 0
    })
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

async function test(){
    const x = sprompt("Coord x : ");
    const y = sprompt("Coord y : ");
    const z = sprompt("Coord z : ");
    await track(lights[0], { x, y, z })
    console.log("Succès !")
    test()
}

module.exports = { track }

//const pos = {x:-200, y:800, z:100}
//track(lights[0], pos)


init()
//test()
//close()

