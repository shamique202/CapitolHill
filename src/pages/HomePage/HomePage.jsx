import React from "react";
import { Link } from 'react-router-dom';
import { Grid, Container, Header, Button, Icon } from "semantic-ui-react";
import "./HomePage.css";

export default function CreateButton() {
    return (
        <Container>
            <Grid columns={2} centered>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header
                            as='h1'
                            content='Capitol Hill'
                            inverted
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: '1em',
                                marginTop: '2em',
                            }} />
                        <h2>Clothing</h2>
                        <h2>Individuality</h2>
                        <h2>Networking</h2>
                        
                    </Grid.Column>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header
                            as='h1'
                            content='Operating Since 1994,'
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: '1em',
                                marginTop: '2em',
                            }} />
                        <h2>this is your number one fashion source for the latest news in styles and fashion trends, celebrity photos, news, and tips. </h2>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
                <Grid.Row>
                    <Link to="/form">
                        <Button primary size='huge'>
                            Make your post!
                            <Icon name='right arrow' />
                        </Button>
                    </Link>
                </Grid.Row>
            </Grid>
        </Container>
    );
}