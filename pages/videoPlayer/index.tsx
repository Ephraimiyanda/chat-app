import { useEffect, useRef, useState } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const volumeRangeRef = useRef<HTMLInputElement | null>(null);
  const playbackRateRangeRef = useRef<HTMLSelectElement | null>(null);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [playbackRateOptions] = useState([0.5, 1, 1.5, 2]);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(0);

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

    return () => {
      video.removeEventListener('play', updateButton);
      video.removeEventListener('pause', updateButton);
      video.removeEventListener('timeupdate', handleProgress);

      toggleButton.removeEventListener('click', togglePlay);
      volumeRange.removeEventListener('input', handleVolumeChange);
      playbackRateRange.removeEventListener('input', handlePlaybackRateChange);

      range.removeEventListener('input', handleRangeChange);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTime > 3000) {
        setControlsVisible(false);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lastInteractionTime]);

  const handleMouseEnter = () => {
    setControlsVisible(true);
    setLastInteractionTime(Date.now());
  };

  const handleMouseLeave = () => {
    setLastInteractionTime(Date.now());
  };

  return (
    <div className="player w-full h-full relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <video className="player__video viewer" ref={videoRef} src="/652333414.mp4" autoPlay loop />

      <div
        className={`player__controls absolute bottom-0 left-0 w-full ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300 ease-in-out`}
      >
        <div className="flex justify-end mb-2 mr-2">
          <div className="playback-rate">
            <select
              className="bg-slate-800 text-white p-1 rounded-md"
              defaultValue="1"
              ref={playbackRateRangeRef}
            >
              {playbackRateOptions.map((option) => (
                <option key={option} value={option} className="text-white p-1 w-3">
                  {option}x
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex">
          <button
            ref={toggleButtonRef}
            className="w-[20px] text-white"
            title="Toggle Play"
          >
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

        <div className="flex">
          <div className="-rotate-90 flex">
            <label htmlFor="volume" className="w-fit rotate-90 m-0">
              🔊
            </label>
            <input
              type="range"
              name="volume"
              className="cursor-pointer w-28"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.3"
              ref={volumeRangeRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
