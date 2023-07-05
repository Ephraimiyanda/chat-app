import { useEffect, useRef, useState } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const playbackRateRangeRef = useRef<HTMLSelectElement | null>(null);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [playbackRateOptions] = useState([0.5, 1, 1.5, 2]);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const range = rangeRef.current;
    const toggleButton = toggleButtonRef.current;
    const playbackRateRange = playbackRateRangeRef.current;

    if (!video || !range || !toggleButton || !playbackRateRange) {
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

    const handleProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      range.value = String(percent);
    };

    const handleRangeChange = () => {
      const scrubTime = (parseFloat(range.value) / 100) * video.duration;
      video.currentTime = scrubTime;
    };

    video.addEventListener('click', ()=>{
      togglePlay();
      handleMouseEnter();
    });
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);

    toggleButton.addEventListener('click', togglePlay);

    range.addEventListener('input', handleRangeChange);

    return () => {
      video.removeEventListener('click', togglePlay);
      video.removeEventListener('play', updateButton);
      video.removeEventListener('pause', updateButton);
      video.removeEventListener('timeupdate', handleProgress);

      toggleButton.removeEventListener('click', togglePlay);

      range.removeEventListener('input', handleRangeChange);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTime > 3000) {
        setControlsVisible(false);
      }
    }, 3000);

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
    <div className="player w-fit m-auto h-full relative">
      <video
        ref={videoRef}
        src="/652333414.mp4"
        autoPlay
        loop
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        
      />

      <div
        className={`relative bottom-0 left-0 w-full  -mt-16 ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300 ease-in-out`}
        
        onMouseEnter={handleMouseEnter}
      >
        <div className="flex justify-end mb-2 mr-2">
          <div className="playback-rate -mt-16 mb-[70px]">
            <select
              className="bg-slate-800 text-white p-1 rounded-md "
              defaultValue="1"
              ref={playbackRateRangeRef}
            >
              {playbackRateOptions.map((option) => (
                <option key={option} value={option} className="text-white p-0 min-h-0">
                  {option}x
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex">
          <button
            ref={toggleButtonRef}
            className="w-[25px] text-white"
            title="Toggle Play"
          >
            ❚ ❚
          </button>

          <input
            type="range"
            className="w-full bg-white cursor-pointer"
            min="0"
            max="100"
            step="0.01"
            defaultValue="0"
            ref={rangeRef}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
