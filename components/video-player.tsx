import  MuxPlayer  from '@mux/mux-player-react';

const VideoPlayer = ({ playbackId }: { playbackId: string }) => {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{ video_title: 'My Video' }}
      streamType="on-demand"
      autoPlay="muted"
      loop={true}
      noVolumePref={true}
      muted={true}
    />
  );
};

export default VideoPlayer;