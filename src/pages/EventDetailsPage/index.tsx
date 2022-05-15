import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import useSkiddleAPI from "../../utils/skiddle/useSkiddleAPI";
import SummaryLayout from "../../components/SummaryLayout";
import { SkiddleArtistSummary, SkiddleEvent } from "../../types";
import { format } from "date-fns";
import { BrandSpotify } from "tabler-icons-react";
import { spotifyArtistUriToUrl } from "../../utils/misc/spotify";

const EventDetailsPage = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useSkiddleAPI(
    `/events/${id}/?api_key=${import.meta.env.VITE_SKIDDLE_API_KEY}`
  );

  if (data && data.results) {
    return (
      <SummaryLayout
        title={data.results.eventname}
        subtitle={"Event"}
        heroImage={data.results.largeimageurl}
        main={<MainDetails event={data} />}
        side={<ArtistDetails artists={data.results.artists} />}
      />
    );
  } else {
    return <span>Todo</span>;
  }
};

export default EventDetailsPage;

const MainDetails: React.FC<{ event: SkiddleEvent }> = ({ event }) => {
  return (
    <MainDetailsContainer>
      <span className="title">Event Details</span>
      <span className="date">
        {format(new Date(event.results.startdate), "PPPP")}
      </span>
      <span className="location">{event.results.venue.name}</span>
      <p className="description">{event.results.description}</p>
    </MainDetailsContainer>
  );
};

/*
  
*/

const ArtistDetails: React.FC<{ artists: Array<SkiddleArtistSummary> }> = ({
  artists,
}) => {
  return (
    <ArtistDetailsContainer>
      <span className="title">Artists</span>
      {artists.length ? (
        artists.map((artist) => (
          <div
            className="artistContainer"
            style={{ background: `url(${artist.image})` }}
          >
            <div>
              <a href={`/artist/${artist.artistid}`} target={"_blank"}>
                {artist.name}
              </a>
              {artist.spotifyartisturl ? (
                <a
                  href={spotifyArtistUriToUrl(artist.spotifyartisturl)}
                  target={"_blank"}
                >
                  <BrandSpotify />
                </a>
              ) : null}
            </div>
            <img src={artist.image} />
          </div>
        ))
      ) : (
        <span>No artists for this event</span>
      )}
    </ArtistDetailsContainer>
  );
};

const ArtistDetailsContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .artistContainer {
    width: 100%;
    height: 150px;
    background-size: cover;
    border-radius: var(--border-radius-1);
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.7);
    padding: 1rem;
    > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      > a {
        text-decoration: none;
        font-size: 16px;
        color: white;
        font-weight: 500;
      }
    }
    img {
      height: 90%;
      border-radius: 5px;
    }
  }
`;

const MainDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .date {
    font-size: 16px;
  }
  .location {
    font-size: 15px;
  }
  .description {
    font-size: 12px;
  }
`;
