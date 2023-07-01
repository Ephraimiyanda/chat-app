import { useEffect, useRef, useState } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const volumeRangeRef = useRef<HTMLInputElement | null>(null);
  const playbackRateRangeRef = useRef<HTMLSelectElement | null>(null);
  const mousedownRef = useRef(false);

  const [playbackRateOptions] = useState([0.5, 1, 1.5, 2]);

  useEffect(() => {
    const video = videoRef.current;
    const range = rangeRef.current;
    const toggleButton = toggleButtonRef.current;
    const volumeRange = volumeRangeRef.current;
    const playbackRateRange = playbackRateRangeRef.current;

    if (!video || !range || !toggleButton || !volumeRange || !playbackRateRange) {
      return;
    }
 
    const togglePlay = () => {
      const method = video.paused ? 'play' : 'pause';
      video[method]();
    };

    const updateButton = () => {
      const icon = video.paused ? '►' : '❚ ❚';
      toggleButton.textContent = icon;
    };

    const handleVolumeChange = () => {
      video.volume = parseFloat(volumeRange.value);
    };

    const handlePlaybackRateChange = () => {
      video.playbackRate = parseFloat(playbackRateRange.value);
    };

    const handleProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      range.value = String(percent);
    };

    const handleRangeChange = () => {
      const scrubTime = (parseFloat(range.value) / 100) * video.duration;
      video.currentTime = scrubTime;
    };

    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);

    toggleButton.addEventListener('click', togglePlay);
    volumeRange.addEventListener('input', handleVolumeChange);
    playbackRateRange.addEventListener('input', handlePlaybackRateChange);

    range.addEventListener('input', handleRangeChange);
    range.addEventListener('mousedown', () => (mousedownRef.current = true));
    range.addEventListener('mouseup', () => (mousedownRef.current = false));

    return () => {
      video.removeEventListener('click', togglePlay);
      video.removeEventListener('play', updateButton);
      video.removeEventListener('pause', updateButton);
      video.removeEventListener('timeupdate', handleProgress);

      toggleButton.removeEventListener('click', togglePlay);
      volumeRange.removeEventListener('input', handleVolumeChange);
      playbackRateRange.removeEventListener('input', handlePlaybackRateChange);

      range.removeEventListener('input', handleRangeChange);
      range.removeEventListener('mousedown', () => (mousedownRef.current = true));
      range.removeEventListener('mouseup', () => (mousedownRef.current = false));
    };
  }, []);

  return (
    <div className="player w-fit ml-auto mr-auto h-full flex">
      <div className='h-fit m-auto'>
      <video className="player__video viewer" ref={videoRef} src="/652333414.mp4" autoPlay loop />

<div className="player__controls">
<div className='flex w-full '>
<button ref={toggleButtonRef} className="w-[3%]" title="Toggle Play">
❚ ❚
  </button>

    <input
      type="range"
      className="w-[98%] cursor-pointer"
      min="0"
      max="100"
      step="0.01"
      defaultValue="0"
      ref={rangeRef}
    />

</div>
  <div className="volume">
    <label htmlFor="volume">Volume:</label>
    <input
      type="range"
      name="volume"
      className="cursor-pointer"
      min="0"
      max="1"
      step="0.05"
      defaultValue="0.3"
      ref={volumeRangeRef}
    />
  </div>

  <div className="playback-rate">
    <label htmlFor="playbackRate">Playback Speed:</label>
    <select
      name="playbackRate"
      className="player__select"
      defaultValue="1"
      ref={playbackRateRangeRef}
    >
      {playbackRateOptions.map((option) => (
        <option key={option} value={option}>
          {option}x
        </option>
      ))}
    </select>
  </div>
</div>
      </div>
    </div>
  );
};

export default VideoPlayer;
