import React, { useRef, useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

interface VideoClipProps {
  file: File;
  onCrop: (file: File) => void;
}

const VideoClip: React.FC<VideoClipProps> = ({ file, onCrop }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && file) {
      const objectUrl = URL.createObjectURL(file);
      videoRef.current.src = objectUrl;

      console.info('file', file, objectUrl);

      return () => {
        console.info('revoke');
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [file]);

  const handleCrop = async () => {
    if (videoRef.current) {
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      ffmpeg.FS('writeFile', file.name, await fetchFile(file));

      const cropFilter = 'crop=in_w/2:in_h/2:in_w/4:in_h/4'; // Example: Crop to 50% of the original size and position the crop area in the center
      await ffmpeg.run('-i', file.name, '-vf', cropFilter, 'output.mp4');

      const data = ffmpeg.FS('readFile', 'output.mp4');
      const croppedFile = new File([data.buffer], 'cropped.mp4', {
        type: 'video/mp4',
      });
      onCrop(croppedFile);
    }
  };

  return (
    <div>
      <video ref={videoRef} controls></video>
      <button onClick={handleCrop}>Crop Video</button>
    </div>
  );
};

export default VideoClip;
