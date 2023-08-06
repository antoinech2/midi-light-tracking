const easymidi = require('easymidi');
const { exec } = require('child_process');

const VIRTUAL_PORT = "test"
const DEVICE_PORT = "APC MINI"
const EXIT_NOTE = 0
const MIDI_MESSAGE_TYPES = ['noteon', 'noteoff', 'cc']

let midiOutput = new easymidi.Output(VIRTUAL_PORT);
let midiInput = new easymidi.Input(VIRTUAL_PORT);
let APCIn = new easymidi.Input(DEVICE_PORT);
let APCOut = new easymidi.Output(DEVICE_PORT);

function start() {
  
    MIDI_MESSAGE_TYPES.forEach((value) => {
      APCIn.on(value, (msg) => {
        midiOutput.send(value, {
        note: msg.note,
        velocity: msg.velocity,
        channel: msg.channel,
        value : msg.value,
        controller : msg.controller
      })
        console.log(`Recieved from ${DEVICE_PORT} :`, msg);
    })
    })
  
    MIDI_MESSAGE_TYPES.forEach((value) => {
        midiInput.on(value, (msg) => {
        APCOut.send(value, {
        note: msg.note,
        velocity: msg.velocity,
        channel: msg.channel,
        value : msg.value,
        controller : msg.controller
      })
        console.log(`Recieved from ${VIRTUAL_PORT} :`, msg);
    })
    })
  
    //const next = prompt('Appuyez sur une touche pour continuer...');
  
  
    APCIn.on('noteon', (msg) => {
      if (msg.note == EXIT_NOTE){
        close()
        midivirtual.kill('SIGHUP'); 
        console.log("End.");
      }
    })
  
  }

function close(){
  midiInput.close();
  midiInput.close();
  APCIn.close();
  APCOut.close();
}

exec('exit', (error, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  
    console.log("Starting");
  
    console.log("Inputs :", easymidi.getInputs())
    console.log("Outputs :", easymidi.getOutputs())
  
}
)

module.exports = { midiOutput, start, close }