import * as React from "react";
import { useState, useEffect } from "react";

import logo from "../assets/logo.png";

import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={logo} alt={"Logo"} />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background-color: var(--color-skiddle-1);
  padding: 1rem;
  display: flex;
  align-items: center;
  > img {
    max-width: 300px;
    height: 50px;
  }
`;
