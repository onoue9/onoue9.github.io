import { useState } from 'react';

const carousel = [
  {title: 'project', image: 'https://picsum.photos/id/1/200/300'},
  {title: 'project', image: 'https://picsum.photos/id/1/200/300'},
  {title: 'project', image: 'https://picsum.photos/id/1/200/300'},
  {title: 'project', image: 'https://picsum.photos/id/1/200/300'},
  {title: 'project', image: 'https://picsum.photos/id/1/200/300'},
  {title: 'project', image: 'https://picsum.photos/id/1/200/300'},
];


const Project = () => {
  const [carouselIndex, setCarouselIndex] = useState(0)
  
  const handleNextButton = () => {
    if (carouselIndex + 1 >= carousel.length) {
      return setCarouselIndex(0)
    }
    return setCarouselIndex(carouselIndex + 1)
  }

  const handlePrevButton = () => {
    if (carouselIndex - 1 <= 0) {
      return setCarouselIndex(carousel.length - 1)
    }
    return setCarouselIndex(carouselIndex - 1)
  }

  return (
  <div className="flex flex-col justify-center w-auto h-screen">
    <div className="flex flex-col justify-center items-center h-1/2">
      <h2 className='p-2'>{carousel[carouselIndex].title}{carouselIndex + 1}</h2>
      <div className="flex justify-center w-80">
        <img className="p-2 w-auto h-auto"src={carousel[carouselIndex].image} alt={carousel[carouselIndex].title}/>
      </div>
    </div>
    <div className="flex content-center items-center justify-center p-2">
      <button
        className='p-2'
        onClick={() => handlePrevButton() }
      >Prev</button>
      <span className='p-2'>{carouselIndex + 1}</span>
      <button
        className='p-2'
        onClick={() => handleNextButton() }
      >Next</button>
    </div>
  </div>
  )
}

export default Project;
