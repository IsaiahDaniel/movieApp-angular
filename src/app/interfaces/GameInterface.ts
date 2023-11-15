interface Genre {
    name: string;
}

interface ParentPlatforms {
    platform: {
        name: string;
    }
}

interface Publishers {
    name: string;
}

interface Rating {
    id: number;
    count: number;
    title: string;
}

interface Screenshots {
    image: string;
}

interface Trailer {
    data: {
        max: string
    }
}

export interface IGame {
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: string;
    genres: Array<Genre>;
    parent_platforms: Array<ParentPlatforms>;
    publishers: Array<Publishers>;
    rating: Array<Rating>;
    screenshots: Array<Screenshots>;
    trailers: Array<Trailer>;
}
