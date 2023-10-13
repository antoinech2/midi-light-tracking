const easymidi = require('easymidi');
const { exec } = require('child_process');

const VIRTUAL_PORT = "Tracking"
const DEVICE_PORT = "APC MINI"
const EXIT_NOTE = 0
const MIDI_MESSAGE_TYPES = ['noteon', 'noteoff', 'cc']

const LOOPMIDI_PATH = '"C:/Program Files (x86)/Tobias Erichsen/loopMIDI/loopMIDI.exe"'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
  exec(LOOPMIDI_PATH, async (error, stdout, stderr) => {
    if (error) {
      throw new Error('Unable to run virtual midi software. Is it installed on the computer ?\n' + error)
    }
  })
  await sleep(1000)
  let midiPorts = {
    Output: new easymidi.Output(VIRTUAL_PORT),
    Input: new easymidi.Input(VIRTUAL_PORT),
  }
  midiPorts.Output.send("cc", {
    channel: 2,
    value: 0,
    controller: 0
  })
  return midiPorts
}

// function startTunnel() {

//   MIDI_MESSAGE_TYPES.forEach((value) => {
//     APCIn.on(value, (msg) => {
//       midiPorts.Output.send(value, {
//         note: msg.note,
//         velocity: msg.velocity,
//         channel: msg.channel,
//         value: msg.value,
//         controller: msg.controller
//       })
//       console.log(`Recieved from ${DEVICE_PORT} :`, msg);
//     })
//   })

//   MIDI_MESSAGE_TYPES.forEach((value) => {
//     midiPorts.Input.on(value, (msg) => {
//       APCOut.send(value, {
//         note: msg.note,
//         velocity: msg.velocity,
//         channel: msg.channel,
//         value: msg.value,
//         controller: msg.controller
//       })
//       console.log(`Recieved from ${VIRTUAL_PORT} :`, msg);
//     })
//   })

//   //const next = prompt('Appuyez sur une touche pour continuer...');


//   APCIn.on('noteon', (msg) => {
//     if (msg.note == EXIT_NOTE) {
//       close()
//       midivirtual.kill('SIGHUP');
//       console.log("End.");
//     }
//   })

// }

function close() {
  midiPorts.Input.close();
  midiPorts.Ouput.close();
}

// exec('exit', (error, stderr) => {
//     if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//     }

//     console.log("Starting");

//     console.log("Inputs :", easymidi.getInputs())
//     console.log("Outputs :", easymidi.getOutputs())

// }
// )


module.exports = { close, init }