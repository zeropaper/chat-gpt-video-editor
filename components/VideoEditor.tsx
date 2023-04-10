import React, { useState } from 'react';
import VideoRecorder from './VideoRecorder';
import VideoClip from './VideoClip';
import Timeline from './Timeline';

interface VideoEditorProps {}

const VideoEditor: React.FC<VideoEditorProps> = () => {
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClipSaved = (file: File) => {
    setVideoFiles([...videoFiles, file]);
    setSelectedFile(file);
  };

  const handleCrop = (file: File) => {
    const updatedFiles = videoFiles.map((videoFile) =>
      videoFile === selectedFile ? file : videoFile
    );
    setVideoFiles(updatedFiles);
    setSelectedFile(file);
  };

  const handleTimelineClipClick = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <div>
      <VideoRecorder onClipSaved={handleClipSaved} />
      {selectedFile && <VideoClip file={selectedFile} onCrop={handleCrop} />}
      <Timeline files={videoFiles} onClipClick={handleTimelineClipClick} />
    </div>
  );
};

export default VideoEditor;
