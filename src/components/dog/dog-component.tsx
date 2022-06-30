import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Dog, Favorite } from "../../common/base-model";
import { AppActions } from "../../redux/AppActions";

export const DogComponent: React.FC<{ dog: Dog, favorite: Favorite }> = ({ dog, favorite }) => {

    const dispatch = useDispatch();
    const [state, setState] = useState(dog);

    /** @memoized */
    const setFavorite = useCallback(
        (favorite: Favorite) => {
            return dispatch(AppActions.setFavorite({ favorite }))
        },
        [dispatch]
    );

    const isFavorite = (dog: Dog) => {
        return dog.id == favorite?.id;
    }

    return (
        <div>
            <div className="card">
                <div className="grid-container">
                    <div className="grid-items">

                    </div>
                    <div className="grid-items">
                        <img src={dog.displayImage} width="200px" height="auto" style={{ border: '1px solid' }}></img>
                    </div>
                    <div className="grid-items">
                        <div className={`not-favorite ${isFavorite(dog) ? 'favorite' : ''}`} onClick={() => {
                            const favorite: Favorite = { id: dog.id, name: dog.breed } as any
                            setFavorite(favorite);
                        }}>
                            <img src={`https://freepngimg.com/download/dog/163170-photos-puppy-dog-face-png-image-high-quality.png`} width="40px"></img>
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



