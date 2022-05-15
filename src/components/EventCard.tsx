import * as React from "react";
import styled from "styled-components";
import { SearchResult } from "../types";

import { format } from "date-fns";
import { CalendarTime, MapPin } from "tabler-icons-react";

const EventCard: React.FC<{
  searchResult: SearchResult;
  [key: string]: any;
}> = ({ searchResult, ...rest }) => {
  return (
    <StyledCard onMouseMove={handleMouseMove} {...rest}>
      <div className="container">
        <img className="card-image" src={searchResult.largeimageurl} />
        <div className="details-section">
          <p className="description">
            {searchResult.description.length > 120
              ? searchResult.description.substring(0, 118) + "..."
              : searchResult.description}
          </p>
          <DetailEntry
            icon={<CalendarTime color={"var(--color-dark-gray)"} />}
            text={format(new Date(searchResult.startdate), "PPPP")}
          />
          <DetailEntry
            icon={<MapPin color={"var(--color-dark-gray)"} />}
            text={searchResult.venue.name}
          />
        </div>
        <div className="button-section">
          <BuyButton href={`/event/${searchResult.id}`} target={"_blank"}>
            Buy Tickets
          </BuyButton>
        </div>
      </div>
    </StyledCard>
  );
};

export default EventCard;

const DetailEntry: React.FC<{ text: string; icon: React.ReactNode }> = ({
  text,
  icon,
}) => {
  return (
    <DetailEntryStyles>
      {icon}
      <span>{text}</span>
    </DetailEntryStyles>
  );
};

const BuyButton = styled.a`
  border: none;
  background-color: white;
  color: var(--color-skiddle-1);
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  font-weight: 500;
`;

const DetailEntryStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  > span {
    color: var(--color-dark-gray);
    font-size: 12px;
  }
`;

const StyledCard = styled.div`
  .container {
    cursor: pointer;
    border-radius: var(--border-radius-1);
    box-shadow: var(--box-shadow-1);
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 420px) {
      width: 270px;
    }
    @media screen and (max-width: 420px) {
      width: 94vw;
    }
    height: 400px; // width * 40/27

    position: relative;
    overflow: hidden;
    transform: scale(100%);
    transition: transform 120ms;
    border: 2px solid rgba(0, 0, 0, 0);
    transition: border-color 120ms;
  }

  .container:hover {
    transform: scale(101%);
    border: 2px solid var(--color-skiddle-1);
  }

  .container::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.16),
      transparent 40%
    );
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0px;
    top: 0px;
    position: absolute;
    opacity: 0;
    transition: opacity 500ms;
    width: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .container:hover::before {
    opacity: 1;
  }

  .card-image {
    background-color: var(--color-dark-gray);
    object-fit: cover;
    height: 45%;
    width: 100%;
  }

  .details-section {
    height: 40%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 8px;
  }

  .description {
    font-size: 12px;
    font-weight: 300;
  }

  .button-section {
    width: 100%;
    height: 15%;
    background-color: var(--color-skiddle-1);
    display: grid;
    place-items: center;
  }
`;

// Style Helpers

const handleMouseMove: React.MouseEventHandler = (e: any) => {
  const { currentTarget: target } = e;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};
