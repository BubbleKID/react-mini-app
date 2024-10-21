import { useState, useEffect } from 'react';
import { ImageType } from './types';
 
import './App.css'

function App() {
  const [images, setImages] = useState<ImageType[]>([])

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=10')
      .then(response => response.json())
      .then(data => setImages(data));
  }, []);

  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', width: '50vw', border: '1px solid red' }}>
          <h1>Im the viewport</h1>
          <LazyImageContainer images={images} />
        </div>
      </div>
    </>
  )
}

const LazyImageContainer = (props: { images: ImageType[] }) => {
  return <>
    {
      props.images.map((image: ImageType) => {
        return <LazyImage key={image.id} {...image} />
      })
    }
  </>
}

const LazyImage = (props: ImageType) => {
  return <img src={props.download_url} width={200} height={200} />
}

export default App
