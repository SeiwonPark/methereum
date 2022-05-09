import React from 'react';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';

interface YoutubeViewerProps {
  url: URL;
}

export function YoutubeViewer({ url }: YoutubeViewerProps) {
  const id = url.searchParams.get('v') as string;
  const onPlayerReady: YouTubeProps['onReady'] = (event: YouTubeEvent) => {
    event.target.pauseVideo();
  };

  // https://developers.google.com/youtube/player_parameters
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <YouTube
      videoId={id}
      opts={opts}
      onReady={onPlayerReady}
    />
  );
}
