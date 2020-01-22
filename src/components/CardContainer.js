import React, {useState, useEffect} from 'react';
import '../css/CardContainer.css';
import Card from './Card';
import Icon from '@mdi/react';
import {mdiArrowLeftCircle,mdiArrowRightCircle} from '@mdi/js';


function CardContainer(props) {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [prevPageToken, setPrevPageToken] = useState('');
  const host = process.env.REACT_APP_HOST || 'http://localhost:5000'

  useEffect(()=>{
    fetch(host).then(r=>r.json()).then(json => {
      setNextPageToken(json.nextPageToken || '');
      setPrevPageToken(json.prevPageToken || '');
      setVideos(json.items.map(vid => <a key={vid.id.videoId} href={'https://www.youtube.com/watch?v='+vid.id.videoId} target='blank'><Card key={vid.id.videoId} name={vid.snippet.title} text={vid.snippet.description} img={vid.snippet.thumbnails.high.url}/></a>));
    })
  }, [host])

  const getNext = (token) => {
    fetch(`${host}/page/${token}`).then(r=>r.json()).then(json => {
      setNextPageToken(json.nextPageToken || '');
      setPrevPageToken(json.prevPageToken || '');
      setVideos(json.items.map(vid => <a key={vid.id.videoId} href={'https://www.youtube.com/watch?v='+vid.id.videoId} target='blank'><Card key={vid.id.videoId} name={vid.snippet.title} text={vid.snippet.description} img={vid.snippet.thumbnails.high.url}/></a>));
      window.scrollTo(0, 0)
    })
  }

  const getPrev = (token) => {
    fetch(`${host}/page/${token}`).then(r=>r.json()).then(json => {
      setNextPageToken(json.nextPageToken || '');
      setPrevPageToken(json.prevPageToken || '');
      setVideos(json.items.map(vid => <a key={vid.id.videoId} href={'https://www.youtube.com/watch?v='+vid.id.videoId} target='blank'><Card key={vid.id.videoId} name={vid.snippet.title} text={vid.snippet.description} img={vid.snippet.thumbnails.high.url}/></a>));
      window.scrollTo(0, 0)
    })
  }


  return (
    <div>
      <div className='cards'>
        {videos}
      </div>
      <div className='arrows'>
        {prevPageToken ? <Icon path={mdiArrowLeftCircle} color='white' size={2} onClick={()=>getPrev(prevPageToken)}/> : null}
        {nextPageToken ? <Icon path={mdiArrowRightCircle} color='white' size={2} onClick={()=>getNext(nextPageToken)}/> : null}
      </div>
    </div>
  );
}

export default CardContainer;
