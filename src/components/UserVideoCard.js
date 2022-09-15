import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import videoService from '../services/videos';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import {customStyles} from "../utils/modalStyles";
import {getTrailer, renderVideo} from "../utils/getTrailerHelper";
import {messageUpdateHelper} from "../utils/messageUpdateHelper";

const UserVideoCard = ({trendingData, setMessage, setMessageStatus}) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [videoID, setVideoID] = useState(null)

    const removeFromWatchList = async (e) => {
        e.preventDefault();
        const res = await videoService.removeFromWatchList(trendingData);
        messageUpdateHelper(res.message, res.messageStatus, setMessage, setMessageStatus);
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
                        onClick={(e) => removeFromWatchList(e)}
                >Remove From List</Button>
                <Button size="small"
                        onClick={(e) => getTrailer(e, trendingData.title || trendingData.name,
                            trendingData.release_date || trendingData.first_air_date, setVideoID, setIsOpen, renderVideo, videoID)}
                >Watch Trailer</Button>
            </CardActions>
        </Card>
    );
}

export default UserVideoCard;
