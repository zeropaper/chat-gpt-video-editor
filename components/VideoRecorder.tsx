import React, { useRef, useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { v4 as uuidv4 } from 'uuid';

interface VideoRecorderProps {
  onClipSaved: (file: File) => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ onClipSaved }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (!videoRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    mediaRecorderRef.current = new MediaRecorder(stream);
    recordedChunksRef.current = [];

    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      (event: BlobEvent) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      }
    );

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();

    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
    const id = uuidv4();
    const file = new File([blob], `${id}.webm`, { type: 'video/webm' });
    onClipSaved(file);

    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setRecording(false);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted></video>
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </div>
  );
};

export default VideoRecorder;
