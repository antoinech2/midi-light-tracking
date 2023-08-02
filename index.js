const easymidi = require('easymidi');
const prompt = require('prompt-sync')({ sigint: true });

const { exec } = require('child_process');

const VIRTUAL_PORT = "test"
const DEVICE_PORT = "APC MINI"
const EXIT_NOTE = 0

//C:/Program Files (x86)/Tobias Erichsen/loopMIDI/loopMIDI.exe
const midivirtual = exec('exit', (error, stderr) => {
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

  var output = new easymidi.Output(VIRTUAL_PORT);
  var input = new easymidi.Input(VIRTUAL_PORT);
  var APCIn = new easymidi.Input(DEVICE_PORT);
  var APCOut = new easymidi.Output(DEVICE_PORT);

  APCIn.on('noteon', (msg) => {
    output.send('noteon', {
    note: msg.note,
    velocity: msg.velocity,
    channel: msg.channel
  })
    console.log(msg);
})

  input.on('noteon')


  //const next = prompt('Appuyez sur une touche pour continuer...');


  APCIn.on('noteon', (msg) => {
    if (msg.note == EXIT_NOTE){
      output.close();
      APCIn.close();
      APCOut.close();
      midivirtual.kill('SIGHUP'); 
      console.log("End.");
    }
  })

})