    import { Carousel } from "react-bootstrap";
    import Image from 'next/image'
    interface ResponsiveCarouselProps {
      files : string [];
    }

const ResponsiveCarousel : React.FC<ResponsiveCarouselProps> =({files})=>{
      return (
        <Carousel >
          {files?.map((item , index) => (
            <Carousel.Item key={index} >
              <Image 
              src={`http://localhost:3000/file/${item}`} 
              alt="slides"
              layout="responsive"
              className="d-block w-100"
              width={200}
              height={200} />
              <Carousel.Caption >
                <h3>Image {index + 1}</h3>
                
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      );
}

export default ResponsiveCarousel
