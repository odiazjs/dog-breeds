import React, { useState } from "react";
import { AppState } from "../../redux/AppReducer";
import { favoriteModel } from "./model";

export const FavoriteComponent: React.FC<any> = ({ appState }: { appState: AppState }) => {

    const [state, setState] = useState({ ...favoriteModel, ...appState.favorite });

    console.log('Favorite State : ', appState.favorite, state)

    return (
        <div className="cards">
            <div className="card favorite-container">
                <div className="grid-container">
                    <div className="grid-items grid-item-title">
                        {appState.favorite ?
                            <React.Fragment>
                                <div>
                                    My favorite breed is {appState?.favorite?.name?.toUpperCase()} !
                                </div>
                                <div className="fav-img">
                                    <img src={appState?.favorite?.imgUrl} width="115px" height="90px"></img>
                                </div>
                            </React.Fragment>
                            : <div>
                                {state.title}
                                <span className="fav-img img-dot">
                                    <img src={`./favorite-dog.png`} width="45px"></img>
                                </span>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
};



