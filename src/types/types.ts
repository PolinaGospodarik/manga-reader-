export type AuthResponse = {
    access_token: string;
    refresh_token: string;
}

export type UsersState = {
    // access_token: string | null;
    // refresh_token: string | null;
    loading: boolean;
    error: string | null;
    permissions: string[];
}


//initialState MANGALIST
export type MangaState = {
    mangaList: Manga[];
    loading: boolean;
    error: string | null;
};

export type Manga = {
    id: string;
    attributes: MangaAttributes;
    relationships: Relationship[];
};

export type MangaAttributes = {
    title: {
        en: string;
    };
    description: {
        en: string;
    };
    tags: Tag[];
};

export type Tag = {
    id: string;
    type: "tag";
    attributes: TagAttributes;
};

export type TagAttributes = {
    name: TagName;
    description: TagName;
    group: string;
    version: number;
};

export type TagName = {
    en: string;
};

export type Relationship = {
    id: string;
    type: string;
    attributes: RelationshipAttributes;
}

export type RelationshipAttributes = {
	// description: string;
	// volume?: any;
    name: string;
	fileName?: string | undefined;
	// locale: string;
	// createdAt: string;
	// updatedAt: string;
	// version: number;
}


