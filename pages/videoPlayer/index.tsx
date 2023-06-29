import { useEffect, useRef } from 'react';
const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const skipButtonsRef = useRef<NodeListOf<HTMLButtonElement> | null>(null);
  const volumeRangeRef = useRef<HTMLInputElement>(null);
  const playbackRateRangeRef = useRef<HTMLInputElement>(null);
  const mousedownRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const progress = progressRef.current;
    const progressBar = progressBarRef.current;
    const toggleButton = toggleButtonRef.current;
    const skipButtons = skipButtonsRef.current;
    const volumeRange = volumeRangeRef.current;
    const playbackRateRange = playbackRateRangeRef.current;

    if (!video || !progress || !progressBar || !toggleButton || !skipButtons || !volumeRange || !playbackRateRange) {
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

    const skip = (e: MouseEvent) => {
      const skipValue = parseFloat((e.target as HTMLButtonElement).dataset.skip!);
      video.currentTime += skipValue;
    };

    const handleVolumeChange = () => {
      video.volume = parseFloat(volumeRange.value);
    };

    const handlePlaybackRateChange = () => {
      video.playbackRate = parseFloat(playbackRateRange.value);
    };

    const handleProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.flexBasis = `${percent}%`;
    };

    const scrub = (e: MouseEvent) => {
      const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
    };

    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);

    toggleButton.addEventListener('click', togglePlay);
    skipButtons.forEach((button) =>
      button.addEventListener('click', skip)
    );
    volumeRange.addEventListener('input', handleVolumeChange);
    playbackRateRange.addEventListener('input', handlePlaybackRateChange);

    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedownRef.current && scrub(e));
    progress.addEventListener('mousedown', () => (mousedownRef.current = true));
    progress.addEventListener('mouseup', () => (mousedownRef.current = false));

    return () => {
      video.removeEventListener('click', togglePlay);
      video.removeEventListener('play', updateButton);
      video.removeEventListener('pause', updateButton);
      video.removeEventListener('timeupdate', handleProgress);

      toggleButton.removeEventListener('click', togglePlay);
      skipButtons.forEach((button) =>
        button.removeEventListener('click', skip)
      );
      volumeRange.removeEventListener('input', handleVolumeChange);
      playbackRateRange.removeEventListener('input', handlePlaybackRateChange);

      progress.removeEventListener('click', scrub);
      progress.removeEventListener('mousemove', (e) => mousedownRef.current && scrub(e));
      progress.removeEventListener('mousedown', () => (mousedownRef.current = true));
      progress.removeEventListener('mouseup', () => (mousedownRef.current = false));
    };
  }, []);

  return (
    <div className="player">
      <video className="player__video viewer" ref={videoRef}>
        <source src="../../src/app/ui/images/652333414.mp4" type="video/mp4" />
      </video>

      <div className="player__controls">
        <div ref={progressRef} className="progress">
          <div ref={progressBarRef} className="progress__filled"></div>
        </div>
        <button ref={toggleButtonRef} className="player__button toggle" title="Toggle Play">
          ►
        </button>
        <input
          type="range"
          name="volume"
          className="player__slider"
          min="0"
          max="1"
          step="0.05"
          defaultValue="1"
          ref={volumeRangeRef}
        />
        <input
          type="range"
          name="playbackRate"
          className="player__slider"
          min="0.5"
          max="2"
          step="0.1"
          defaultValue="1"
          ref={playbackRateRangeRef}
        />
        <button data-skip="-10" className="player__button">
          « 10s
        </button>
        <button data-skip="25" className="player__button">
          25s »
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
