import { useState } from "react";
import { DogComponent } from '../dog/dog-component';

export const DogListComponent: React.FC<any> = ({ dogs, favorite }) => {

    const [state, setState] = useState({});
    console.log('DogListComponent State : ', favorite);

    return dogs.map((dog: any) => {
        return <DogComponent key={dog.id} dog={dog} favorite={favorite} ></DogComponent>
    })
};



