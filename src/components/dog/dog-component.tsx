import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Dog, Favorite } from "../../common/base-model";
import { AppActions } from "../../redux/AppActions";
import { SubBreedComponent } from "../sub-breed/sub-breed-component";
import { dogCompnentProps } from "./model";

export const DogComponent: React.FC<{ dog: Dog, favorite: Favorite }> = ({ dog, favorite }) => {

    const dispatch = useDispatch();
    const [state, setState] = useState({ ...dog, ...dogCompnentProps });

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
                            const favorite: Favorite = {
                                id: dog.id,
                                name: dog.breed,
                                imgUrl: dog.displayImage
                            }
                            setFavorite(favorite);
                        }}>
                            <img className="no-shadow" src={`./favorite-dog.png`} width="40px"></img>
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
                        setState({ ...state, showSubBreeds: !state.showSubBreeds })
                    }}
                        className="grid-items grid-item-title">
                        {state.showSubBreedsTitle}
                    </div>
                </div>
            </div>
            {state.showSubBreeds ? <div key={dog.id} className="card">
                <SubBreedComponent dog={dog} favorite={favorite}></SubBreedComponent>
            </div> : null}
        </div>
    )
};



