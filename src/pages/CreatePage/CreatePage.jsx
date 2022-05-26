import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import { Grid, Button, Container, Header, Icon } from "semantic-ui-react";
import * as mypostApi from '../../utils/mypostApi';
import { Link } from 'react-router-dom';

export default function CreateForm(props) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  async function handleAddPostForm(post) {
        console.log(post)
        try {
            setLoading(true);
            const data = await mypostApi.create(post);
            console.log(data, "the server responds back now due to the addpostform (handle)");
            setPosts([data.post, ...posts]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err)
        }
    }
return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header
                            as='h1'
                            content='Create a post!'
                            style={{
                                
                                fontSize: '4.5em',
                                fontWeight: 'light',
                                marginBottom: '1em',
                                marginTop: '2', }} />
                        <AddPostForm handleAddPostForm={handleAddPostForm} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    </Container>   
    );
}