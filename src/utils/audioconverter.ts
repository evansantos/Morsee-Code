const convertCodeToMorseeAudio = ({
  value = null,
  shouldPlay = false
}: {
  value?: string;
  shouldPlay?: boolean;
}) => {
  if (!value || !shouldPlay) {
    return false;
  }

  const AudioContext: any = window.AudioContext || window.webkitAudioContext;
  const ctx: AudioContext = new AudioContext();
  const dot: number = 1.2 / 15;

  let t: number = ctx.currentTime;

  const oscillator: any = ctx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = 600;

  const gainNode: any = ctx.createGain();
  gainNode.gain.setValueAtTime(0, t);

  value.split('').forEach(function(letter: String) {
    switch (letter) {
      case '.':
        gainNode.gain.setValueAtTime(1, t);
        t += dot;
        gainNode.gain.setValueAtTime(0, t);
        t += dot;
        break;
      case '-':
        gainNode.gain.setValueAtTime(1, t);
        t += 3 * dot;
        gainNode.gain.setValueAtTime(0, t);
        t += dot;
        break;
      case ' ':
        t += 7 * dot;
        break;
    }
  });

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();

  return false;
};

const convertCodeToNPLAudio = ({
  value = null,
  shouldPlay = false
}: {
  value?: string;
  shouldPlay?: boolean;
}) => {
  if (!value || !shouldPlay) {
    return false;
  }

  const msg: any = new SpeechSynthesisUtterance(value);
  window.speechSynthesis.speak(msg);

  return false;
};

export { convertCodeToMorseeAudio, convertCodeToNPLAudio };
