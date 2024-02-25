declare module 'lucia' {
    interface Register {
        Lucia: typeof auth;
        DatabaseUserAttributes: SpotifyUser;
        DatabaseSessionAttributes: {
            id: string;
            userId: string;
            expiresAt: Date;
            fresh: boolean;
            userEmail: string;
        };
    }
}

export interface SpotifyUser {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
    followers: Followers;
    images: Images[];
    country: string;
    product: string;
    explicit_content: ExplicitContent;
    email: string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href: any;
    total: number;
}

export interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
}

export interface Images {
    url: string;
    height: number;
    width: number;
}
