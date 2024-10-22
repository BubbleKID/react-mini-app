import { useState, useEffect } from 'react';
import { ImageType } from './types';
 
import './App.css'

function App() {
  const [images, setImages] = useState<ImageType[]>([])

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=20')
      .then(response => response.json())
      .then(data => setImages(data));
  }, []);

  return (
    <div>
      <h1>Im the window</h1>
        <div style={{ 
            display: 'flex', 
            height: '50vh', 
            width: '50vw', 
            border: '5px solid red',
            position: 'fixed',
            zIndex: 200,
          }}>
        </div>
        <div style={{
          height: '50vh', 
          width: '50vw', 
        }}>
          <LazyImageContainer images={images} />
        </div>
    </div>
  )
}

const LazyImageContainer = (props: { images: ImageType[] }) => {
  return <div style={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    
  }}>
    {
      props.images.map((image: ImageType) => {
        return <LazyImage key={image.id} {...image} />
      })
    }
  </div>
}

const LazyImage = (props: ImageType) => {
  return <img 
    src={props.download_url} 
    width={200} 
    height={200} 
    style={{ objectFit: 'cover', zIndex: 100 }}
  />
}

export default App
