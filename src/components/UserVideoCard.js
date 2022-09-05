import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import YouTube from 'react-youtube';
import videoService from '../services/videos';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';

const customStyles = {
    content: {
        backgroundColor: '#000',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}
const UserVideoCard = ({user, trendingData}) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [videoID, setVideoID] = useState(null)

    const getTrailer = async (e, title, releaseDate) => {
        e.preventDefault();
        const trailerInfo = await videoService.getTrailer(title, releaseDate)
        setIsOpen(true)
        setVideoID(trailerInfo.id.videoId)
        renderVideo()
    }

    const renderVideo = () => {
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

    return (
        <Card sx={{maxWidth: 400, minWidth: 250, backgroundColor: "black", mx: 'auto'}}>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
            >
                <Button
                    startIcon={<CloseIcon/>}
                    variant="outlined"
                    onClick={() => setIsOpen(false)}
                >
                    close
                </Button>
                <div>{videoID && renderVideo()}</div>
            </Modal>
            <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w342/${trendingData.poster_path}`}
                alt="Poster"
            />
            <CardContent sx={{maxHeight: 200, minHeight: 200, overflow: 'auto'}}>
                <Typography gutterBottom variant="h5" component="div" color="floralwhite">
                    {trendingData.title || trendingData.name}
                </Typography>
                <Typography variant="body2" color="white">
                    {trendingData.overview}
                </Typography>
                <Typography variant="h6" color="whitesmoke">
                    {trendingData.userReviews === 0
                        ? 'No Reviews Yet'
                        : `Rating: ${trendingData.vote_average} based on ${trendingData.vote_count} votes`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"
                        onClick={() => videoService.removeFromWatchList(trendingData, user)}
                >Remove From List</Button>
                <Button size="small"
                        onClick={(e) => getTrailer(e, trendingData.title || trendingData.name,
                            trendingData.release_date || trendingData.first_air_date
                        )}>Watch Trailer</Button>
            </CardActions>
        </Card>
    );
}

export default UserVideoCard;
