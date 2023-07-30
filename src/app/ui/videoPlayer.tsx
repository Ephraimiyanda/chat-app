import { useEffect, useRef, useState } from 'react';
interface video{
  src: string
}
const VideoPlayer = ({src}:video) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const playbackRateRangeRef = useRef<HTMLSelectElement | null>(null);
  const [controlsVisible, setControlsVisible] = useState(false);

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


  return (
    <div className="player w-fit m-0 h-full z-[2] relative" onMouseEnter={()=>{
      setControlsVisible(true);
      setTimeout(()=>{
        setControlsVisible(false)
      },5000)
    }} onMouseLeave={()=>{
      setTimeout(()=>{
        setControlsVisible(false)
      },5000)
    }}
    onMouseMove={()=>{
      setControlsVisible(true)
      setTimeout(()=>{
        setControlsVisible(false)
      },5000)
      }}
      onClick={()=>{
        setControlsVisible(!controlsVisible)
      }}
    >
      <video
      className='w-full h-full  object-contain m-auto z-[2] relative'
        ref={videoRef}
        src={src}
        autoPlay
        loop
       
      />

      <div
        className={`left-0 w-full  -mt-16 absolute bottom-[25%]  z-10 ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300 ease-in-out`}
      >
        <div className=" justify-end mb-2 hidden">
          <div className="playback-rate -mt-16 mb-[70px]">
            <select
              className="bg-slate-800 text-white p-1 rounded-md "
              defaultValue="1"
              ref={playbackRateRangeRef}
            >
              
            </select>
          </div>
        </div>

        <div className="flex ">
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
            onFocus={()=>{setControlsVisible(true)}}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
