import videoService from "../services/videos";
import YouTube from "react-youtube";

export const getTrailer = async (e, title, releaseDate, setIsOpen, setVideoID, renderVideo, videoID) => {
    e.preventDefault();
    const trailerInfo = await videoService.getTrailer(title, releaseDate)
    setIsOpen(true)
    setVideoID(trailerInfo.id.videoId)
    renderVideo(videoID)
}

export const renderVideo = (videoID) => {
    const opts = {
        height: '400',
        width: '640',
        playerVars: {
            autoplay: 1
        }
    }
    const _onReady = (event) => {
        event.target.pauseVideo()
    }

    return (
        <div>
            <YouTube videoId={videoID} opts={opts} onReady={_onReady}/>
        </div>
    )
}
