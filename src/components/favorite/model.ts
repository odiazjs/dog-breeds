export const favoriteModel: FavoriteModel = {
    title: 'Pick a favorite dog breed by clicking on the',
    favorite: null
}

export interface FavoriteModel {
    title?: string;
    favorite?: { id?: string, name?: string } | null;
}