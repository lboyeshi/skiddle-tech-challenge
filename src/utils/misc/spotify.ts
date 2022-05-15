export const spotifyArtistUriToUrl = (artistUri: string): string => {
  if (!artistUri) return "";
  const arr = artistUri.split(":");
  return `https://open.spotify.com/artist/${arr[2]}`;
};
