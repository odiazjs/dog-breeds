export interface Base {
	id?: string;
	name?: string;
	description?: string;
	isActive?: string;
	createdOn?: string;
	updatedOn?: string;
}

export interface Dog extends Base {
	breed: string;
	subbreeds: string[];
	displayImage: string;
	images: Image[];
	isFavorite: boolean;
}

export interface Image {
	id: string;
	url: string;
}