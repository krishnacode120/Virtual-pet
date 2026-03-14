export function speak(text: string, voiceName: string, volume: number) {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.volume = volume;
  
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find(v => v.name === voiceName);
  
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function listen(onResult: (text: string) => void, onError: (err: any) => void) {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    onError("Speech recognition not supported in this browser.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    onError(event.error);
  };

  recognition.start();
  return recognition;
}
