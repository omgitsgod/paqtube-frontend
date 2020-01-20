import React, {useState, useEffect} from 'react';
import '../css/CardContainer.css'
import Card from './Card'
import paq from '../paq.jpg'
import Icon from '@mdi/react'
import {mdiArrowLeftCircle,mdiArrowRightCircle} from '@mdi/js'


function CardContainer(props) {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('')
  const [prevPageToken, setPrevPageToken] = useState('')

  useEffect(()=>{
    fetch('http://localhost:5000').then(r=>r.json()).then(json => {
      console.log(json);
      setNextPageToken(json.nextPageToken || '')
      setPrevPageToken(json.prevPageToken || '')
      setVideos(json.items.map(vid => <a href={'https://www.youtube.com/watch?v='+vid.id.videoId} target='blank'><Card key={vid.id.videoId} name={vid.snippet.title} text={vid.snippet.description} img={vid.snippet.thumbnails.high.url}/></a>))
    })
  }, [])

  const getNext = (token) => {
    fetch(`http://localhost:5000/page/${token}`).then(r=>r.json()).then(json => {
      console.log(json);
      setNextPageToken(json.nextPageToken || '')
      setPrevPageToken(json.prevPageToken || '')
      setVideos(json.items.map(vid => <a href={'https://www.youtube.com/watch?v='+vid.id.videoId} target='blank'><Card key={vid.id.videoId} name={vid.snippet.title} text={vid.snippet.description} img={vid.snippet.thumbnails.high.url}/></a>))
    })
  }

  const getPrev = (token) => {
    fetch(`http://localhost:5000/page/${token}`).then(r=>r.json()).then(json => {
      console.log(json);
        setNextPageToken(json.nextPageToken || '')
        setPrevPageToken(json.prevPageToken || '')
      setVideos(json.items.map(vid => <a href={'https://www.youtube.com/watch?v='+vid.id.videoId} target='blank'><Card key={vid.id.videoId} name={vid.snippet.title} text={vid.snippet.description} img={vid.snippet.thumbnails.high.url}/></a>))
    })
  }


  return (
    <div>
    <div className='cards'>
      {videos || 'loading!'}
    </div>
    <div className='arrows'>
    {prevPageToken ? <Icon path={mdiArrowLeftCircle} color='white' size={2} onClick={()=>getPrev(prevPageToken)}/> : null}
    {nextPageToken ? <Icon path={mdiArrowRightCircle} color='white' size={2} onClick={()=>getNext(nextPageToken)}/> : null}
    </div>
    </div>
  );
}

export default CardContainer;
