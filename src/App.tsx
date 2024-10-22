import { useState, useEffect, useRef, useCallback } from 'react';
import { ImageType } from './types';
 
import './App.css'

function App() {
  const [images, setImages] = useState<ImageType[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=20')
      .then(response => response.json())
      .then(data => setImages(data));
  }, []);

  return (
    <div>
      <h1>Im the window</h1>
        <div id="scrollArea" ref={scrollAreaRef} style={{ 
            display: 'flex', 
            height: '50vh', 
            width: '50vw', 
            border: '5px solid red',
            // position: 'fixed',
            //zIndex: 100,
          }}>
            <LazyImageContainer images={images} />
        </div>
    </div>
  )
}

const LazyImageContainer = (props: { images: ImageType[] }) => {
  return <div  style={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start'
  }}>
    {
      props.images.map((image: ImageType) => {
        return <LazyImage key={image.id} {...image} />
      })
    }
  </div>
}

const LazyImage = (props: ImageType) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const options = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 0.1,
    };

    const IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('is intersecting')
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        } 
      })
    }
    
    const observer = new IntersectionObserver(IntersectionObserverCallback, options);

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    console.log('isIntersecting', isIntersecting)

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    }
  }, []);

  return <div ref={imageRef} style={{ width: '33.33%', height: '200px' }}>
    { isIntersecting ? <img 
      src={ props.download_url } 
      width={200} 
      height={200} 
      style={{ objectFit: 'cover' }}
    /> :  (
      <div style={{ width: '100%', height: '100%', background: '#f0f0f0', border: '5px solid blue', }} />
    )}
  </div>
}

export default App
