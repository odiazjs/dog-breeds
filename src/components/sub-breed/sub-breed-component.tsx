import { takeRight } from "lodash";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Dog, Favorite, Image } from "../../common/base-model";
import { AppActions } from "../../redux/AppActions";

export const SubBreedComponent: React.FC<any> = ({ dog, favorite }: { dog: Dog, favorite: Favorite }) => {

    const dispatch = useDispatch();
    const [state, setState] = useState({ ...dog });

    console.log('SubBreed State : ', state);

    /** @memoized */
    const setFavorite = useCallback(
        (favorite: Favorite) => {
            return dispatch(AppActions.setFavorite({ favorite }))
        },
        [dispatch]
    );

    const isFavorite = (fav: Favorite) => {
        return fav.id == favorite?.id;
    }

    return (
        <div className="grid-container-lineup">
            {state.subbreeds ? state.subbreeds.map((name: string) => {
                const subbreedKey = `${dog.breed}-${name}`;
                const subBreedImages = dog.images.filter(image => image.url.includes(subbreedKey));
                const topImg = takeRight(subBreedImages, 1);
                const topImgs = takeRight(subBreedImages, 3);
                const fav = {
                    id: name,
                    name: name,
                    imgUrl: topImg[0].url
                }
                return (
                    <div key={name}>
                        <div className="card">
                            <div className="grid-items">{name}</div>
                            <div className="grid-items">
                                <div className={`not-favorite ${isFavorite(fav) ? 'favorite' : ''}`} onClick={() => {
                                    setFavorite(fav);
                                }}>
                                    <img className="no-shadow" src={`./favorite-dog.png`} width="40px"></img>
                                </div>
                            </div>
                            {topImg.map((img: Image) => {
                                return <img key={`img-${name}`} className="no-shadow" src={img.url} width="80px" height="75px"></img>
                            })}
                            <div key={`subimg-${name}`} className="roster-container">
                                <div className="grid-items light">top {name} images: </div>
                                {topImgs.map((img: Image) => {
                                    return <span key={`${img.id}`} style={{ padding: '2rem' }}>
                                        <img className="no-shadow" src={img.url} width="80px" height="75px"></img>
                                    </span>
                                })}
                            </div>
                        </div>
                    </div>
                )
            }) : <div className="light"> No sub-breeds for this dog :( </div>}
        </div>
    )
};



