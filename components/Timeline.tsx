import React from 'react';

interface TimelineProps {
  files: File[];
  onClipClick: (file: File) => void;
}

const Timeline: React.FC<TimelineProps> = ({ files, onClipClick }) => {
  return (
    <div style={{ display: 'flex', overflowX: 'scroll', marginTop: '20px' }}>
      {files.map((file, index) => (
        <div
          key={file.name}
          onClick={() => onClipClick(file)}
          style={{
            border: '1px solid #ccc',
            padding: '5px',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          <span>Clip {index + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
