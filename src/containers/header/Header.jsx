import React from 'react'
import './header.css';

const Header = () => {
  return (
    <div className='resume__header section__padding'>
        <div className='resume__header-content'>
            <div className='resume__header-content__title'>
                <h1 className='resume__header-content__title-name'>
                    Abel de Wit
                </h1>
                <h2 className='resume__header-content__title-subtitle'>
                    AI Engineer | Tinkerer
                </h2>
            </div>
            <div className='resume__header-content__about'>
                <p>
                I am currently following the Artificial Intelligence master at Maastricht University. 
                Within this field I am mainly interested in Natural Language Processing, Computer Vision, 
                Anomaly Detection, and Image Classification & Generation. 
                
                Next to that I am active in the Machine Learning Club, a group of enthusiastic students that discuss 
                papers for a better understanding of the state of the art Machine Learning techniques.
                I am also active within my student association by filling positions in multiple committees, 
                that are active in public relations and multi-media.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Header