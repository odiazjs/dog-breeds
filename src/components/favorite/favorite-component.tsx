import { useState } from "react";
import { AppState } from "../../redux/AppReducer";
import { favoriteModel } from "./model";

export const FavoriteComponent: React.FC<any> = ({ appState }) => {

    const [state, setState] = useState({...favoriteModel, ...appState.favorite});

    console.log('Favorite State : ', appState.favorite, state)

    return (
        <div className="cards">
            <div className="card favorite-container">
                <div className="grid-container">
                    <div className="grid-items grid-item-title">
                        {appState.favorite ?
                            <div>
                                My favorite breed is {appState.favorite.name.toUpperCase()} !
                            </div> :
                            <div>
                                {state.title}
                                <span className="fav-img">
                                    <img src={`https://freepngimg.com/download/dog/163170-photos-puppy-dog-face-png-image-high-quality.png`} width="45px"></img>
                                </span>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
};



