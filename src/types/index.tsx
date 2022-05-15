// Relevant features for tech challenge highlighted only
export interface SearchResult {
  startdate: string;
  description: string;
  venue: SkiddleVenue;
  openingtimes: {
    doorsopen: string;
    doorsclose: string;
    lastentry: string;
  };
  minage: string;
  id: string;
  imageurl: string;
  largeimageurl: string;
  tickets: boolean;
  /* Descriptive string */
  entryprice: string;
  uniquelistingidentifier: string;
  [key: string]: any;
}

export interface SearchResultDataObject {
  results: Array<SearchResult>;
  [key: string]: any;
}

// Only semi-relevant fields listed
export interface SkiddleEvent {
  results: {
    artists: Array<SkiddleArtist>;
    startdate: string;
    description: string;
    entryprice: PerformanceServerTiming;
    eventname: string;
    genres: Array<{
      genreid: string;
      name: string;
    }>;
    id: string;
    imageurl: string;
    largeimageurl: string;
    venue: SkiddleVenue;
  };
}

export interface SkiddleVenue {
  address: string;
  country: string;
  name: string;
  postcode: string;
  phone: string;
  town: string;
}

export interface SkiddleArtistSummary {
  artistid: string;
  name: string;
  image: string;
  spotifyartisturl: string;
}

export interface SkiddleArtist {
  results: {
    description: string;
    favourite: number;
    favouritesCount: number;
    id: string;
    imageurl: string;
    link: string;
    mix: any;
    name: string;
    spotifyPopularity: string;
    spotifyartisturl: string;
    spotifymp3url: string;
    twitter: string;
  };
}
