import { useState } from "react";
import { Dog } from "../common/base-model";

export const DogComponent: React.FC<{dog: Dog, fun: any}> = ({ dog, fun }) => {

    const newDog = {...dog, isFavorite: false }
    const [state, setState] = useState(newDog as Dog);

    console.log('Dog State : ', dog, fun)

    return (
        <div key={dog.id}>
            <div className="card">
                <div className="grid-container">
                    <div className="grid-items">

                    </div>
                    <div className="grid-items">
                        <img src={dog.displayImage} width="200px" height="auto" style={{ border: '1px solid' }}></img>
                    </div>
                    <div className="grid-items">
                        <div className={`not-favorite ${dog.isFavorite ? 'favorite' : ''}`} onClick={() => {
                            console.log('favorite! ', dog.breed);
                            setState({ ...dog, isFavorite: true })
                            fun.toggleFavorites(state);
                        }}>
                            <div>Favorite</div>
                            <img src={`https://freepngimg.com/download/dog/163170-photos-puppy-dog-face-png-image-high-quality.png`} width="45px"></img>
                        </div>
                    </div>
                    <div className="grid-items grid-item-title">
                        {dog.breed}
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="grid-container-roster">
                    <div onClick={() => {

                    }}
                        className="grid-items grid-item-title">
                        Show sub-breeds
                    </div>
                </div>
            </div>
        </div>
    )
};



