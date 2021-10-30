import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    position: fixed;
    z-index: 99;
    height: 100vh;
    width: 100vw;
    background: black;
    opacity: 0.9;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Loader = () => {
    return (
        <Wrapper>
            <CircularProgress size={40} style={{ color: "#fff" }} />;
        </Wrapper>
    );
};
