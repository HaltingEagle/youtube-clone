import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
const PlayVideo = () => {
    const {videoId} = useParams();
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    
    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url)
        .then(res => res.json())
        .then(data => setApiData(data.items[0]))
    }

    const fetchChannelData = async () => {
        const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelDetails_url)
        .then(res => res.json())
        .then(data => setChannelData(data.items[0]))

        //fetching Comment Data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url)
        .then(res => res.json())
        .then(data => setCommentData(data.items))
    }

    useEffect(() => {
        fetchVideoData();
    }, [videoId])

    useEffect(() => {
        fetchChannelData();
    }, [apiData])

    return (
        <div className='play-video'>
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1` } allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen>

            </iframe>
            <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
                <div className="">
                    <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):""}</span>
                    <span><img src={dislike} alt="" />{apiData?apiData.statistics.dislikeCount:""}</span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData?channelData.snippet.thumbnails.default.url:jack} alt="" />
                <div className="">
                    <p>{apiData?apiData.snippet.channelTitle:"Channel Title Here"}</p>
                    <span>{channelData?value_converter(channelData.statistics.subscriberCount):"10000"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData?apiData.snippet.description.slice(0, 250):"Description Here"}</p>
                <hr />
                <h4>{apiData?value_converter(apiData.statistics.commentCount):100} Comments</h4>
                {commentData.map((comment, index) => {
                    return (
                    <div key={index} className="comment">
                        <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{comment.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{value_converter(comment.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />
                                <span>{comment.snippet.topLevelComment.snippet.dislikeCount}</span>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayVideo
