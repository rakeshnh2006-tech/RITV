"use client";

export interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export class VoiceController {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
      }
    }
  }

  public isSupported(): boolean {
    return Boolean(this.recognition);
  }

  public isCurrentlyListening(): boolean {
    return this.isListening;
  }

  public startListening(
    onResult: (result: SpeechRecognitionResult) => void,
    onError: (error: string) => void,
    onEnd: () => void,
    lang: string = "en-US"
  ): void {
    if (!this.recognition) {
      onError("Voice recognition is not supported in this browser.");
      return;
    }

    try {
      this.recognition.lang = lang;
      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        onResult({
          transcript: finalTranscript || interimTranscript,
          isFinal: Boolean(finalTranscript),
        });
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        const errMsg =
          event.error === "not-allowed"
            ? "Microphone access was denied. You can continue by typing."
            : `Voice input error: ${event.error}`;
        onError(errMsg);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
    } catch (err: any) {
      this.isListening = false;
      onError(err.message || "Could not start voice recognition.");
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListening = false;
    }
  }

  // Text-To-Speech
  public speakText(text: string, onEnd?: () => void): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel(); // Stop prior speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // Calm, respectful pacing
      utterance.pitch = 1.0;
      if (onEnd) {
        utterance.onend = onEnd;
      }
      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  public stopSpeaking(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const voiceController = new VoiceController();
