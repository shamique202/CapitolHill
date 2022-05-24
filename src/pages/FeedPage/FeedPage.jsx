import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import * as mypostApi from '../../utils/mypostApi';
import * as mylikesApi from '../../utils/mylikesApi';
import { Grid, Container, Header } from "semantic-ui-react";

export default function Feed(props) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function addLike(postId) {
        try {
            const data = await mylikesApi.create(postId);
            console.log(data, 'respose from the create')
            getPosts()

        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    async function removeLike(likesId) {
        try {
            const data = await mylikesApi.removeLike(likesId);
            console.log(data, 'respose from the delete')
            getPosts(false)

        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    async function getPosts(showLoading) {
        try {
            showLoading ? setLoading(true) : setLoading(false);
            const data = await mypostApi.getAll();
            setPosts([...data.posts]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err, "here its displaying an error msg");
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (loading) {
        return <Loader />;
    }

    async function removePost(postId) {
        try {
            const data = await mypostApi.removePost(postId);
            console.log(data, "response from deleting function");
            getPosts(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    return (
        <Container>
            <Grid columns={3} centered>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Header
                            as='h1'
                            content='Feed Page'
                            inverted
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: '1em',
                                marginTop: '2em',  }} />
                    </Grid.Column>
                    <Grid.Column width={12} >
                        <PostsFeed
                            posts={posts}
                            isProfile={false}
                            numPhotosCol={2}
                            loading={loading}
                            user={props.user}
                            addLike={addLike}
                            removeLike={removeLike}
                            removePost={removePost} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}