import { Container, Grid } from "@material-ui/core";
import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const ContactItem = styled.a`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Box = styled.div`
    padding: 3rem 2rem;
    @media screen and (max-width: 425px) {
        padding: 3rem 0rem;
    }
`;

const FooterGrid = styled.div`
    padding: 2rem;
`;

const Footer = () => {
    return (
        <Container>
            <Box>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <FooterGrid>
                            <Logo>J STORE</Logo>
                            <Desc>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don’t look even slightly
                                believable.
                            </Desc>
                            <SocialContainer>
                                <SocialIcon color="3B5999">
                                    <Facebook />
                                </SocialIcon>
                                <SocialIcon color="E4405F">
                                    <Instagram />
                                </SocialIcon>
                                <SocialIcon color="55ACEE">
                                    <Twitter />
                                </SocialIcon>
                                <SocialIcon color="E60023">
                                    <Pinterest />
                                </SocialIcon>
                            </SocialContainer>
                        </FooterGrid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FooterGrid>
                            <Title>Contact</Title>
                            <ContactItem>
                                <Phone style={{ marginRight: "10px" }} /> +1 234
                                56 78
                            </ContactItem>
                            <ContactItem>
                                <MailOutline style={{ marginRight: "10px" }} />
                                jawadrafique07@gmail.com
                            </ContactItem>
                        </FooterGrid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Footer;
