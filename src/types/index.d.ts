import { userTable } from '@/lib/db/schema/user';
import { z } from 'zod';

declare module 'lucia' {
    interface Register {
        Lucia: typeof auth;
        DatabaseUserAttributes: SpotifyUser;
        DatabaseSessionAttributes: Session;
    }
}

export interface Session {
    id: string;
    userId: string;
    expiresAt: Date;
    fresh: boolean;
    userEmail: string;
    accessToken: string;
    refreshToken: string;
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

export interface QueryArtists {
    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
    previous: any;
    total: number;
}

export interface Item {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href: any;
    total: number;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}

export interface Recommendations {
    seeds: Seed[];
    tracks: Track[];
}

export interface Seed {
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
}

export interface Track {
    album: Album;
    artists: Artist2[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls4;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: LinkedFrom;
    restrictions: Restrictions2;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}

export interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: Restrictions;
    type: string;
    uri: string;
    artists: Artist[];
}

export interface ExternalUrls {
    spotify: string;
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export interface Restrictions {
    reason: string;
}

export interface Artist {
    external_urls: ExternalUrls2;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ExternalUrls2 {
    spotify: string;
}

export interface Artist2 {
    external_urls: ExternalUrls3;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image2[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface ExternalUrls3 {
    spotify: string;
}

export interface Followers {
    href: string;
    total: number;
}

export interface Image2 {
    url: string;
    height: number;
    width: number;
}

export interface ExternalIds {
    isrc: string;
    ean: string;
    upc: string;
}

export interface ExternalUrls4 {
    spotify: string;
}

export interface LinkedFrom { }

export interface Restrictions2 {
    reason: string;
}
