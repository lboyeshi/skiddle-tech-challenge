import * as React from "react";
import { useState, useEffect } from "react";

import styled from "styled-components";
import Header from "./Header";

const SummaryLayout: React.FC<{
  main: React.ReactNode;
  side: React.ReactNode;
  title: string;
  subtitle: string;
  heroImage: string;
}> = ({ main, side, title, subtitle, heroImage }) => {
  return (
    <>
      <Header />
      <Hero title={title} subtitle={subtitle} backgroundImage={heroImage} />
      <Body>
        <div className="main">{main}</div>
        <aside className="side">{side}</aside>
      </Body>
    </>
  );
};

export default SummaryLayout;

const Body = styled.section`
  display: grid;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
  margin-top: 1rem;
  .main {
    padding: 1rem;
    border-right: 1px solid #ccc;
  }
  .side {
    padding: 1rem;
  }
`;

const Hero: React.FC<{
  title: string;
  subtitle?: string;
  backgroundImage: string;
}> = ({ title, subtitle, backgroundImage }) => {
  return (
    <HeroContainer style={{ backgroundImage: `${backgroundImage})` }}>
      <img className="backgroundImage" src={backgroundImage} />
      <div className="header">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
      <img className={"foregroundImage"} src={backgroundImage} />
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-size: cover;
  position: relative;
  overflow: hidden;

  .backgroundImage {
    position: absolute;
    top: 0;
    left: 0;
    height: 300px;
    width: 100%;
    z-index: -1;
    object-fit: cover;
    transform: scale(110%);
    filter: blur(4px) brightness(1.25);
    opacity: 0.5;
  }

  .foregroundImage {
    height: 100%;
    padding: 1rem;
    @media screen and (max-width: 480px) {
      display: none;
    }
  }

  .header {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 4px;

    > h1 {
      margin: 0;
      padding: 1rem;
      background-color: var(--color-skiddle-1);
      color: white;
      border-radius: 5px;
    }

    > h3 {
      margin: 0;
      padding: 1rem;
      background-color: var(--color-skiddle-2);
      color: white;
      border-radius: 5px;
    }
  }
`;
