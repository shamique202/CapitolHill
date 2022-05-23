import React, { useState, useEffect } from "react";
import { Grid, Container } from "semantic-ui-react";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import * as mylikesApi from "../../utils/mylikesApi";
import * as mypostApi from '../../utils/mypostApi';
import "./ProfilePage.css";

export default function ProfilePage(props) {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const { username } = useParams(); // using the params ID here makes a reference to the username ID

    useEffect(() => {
        getProfile();
    }, [username]);

    async function getProfile() {
        try {
            const data = await userService.getProfile(username);
            setPosts(data.posts);
            setUser(data.user);
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }
    }
    async function addLike(postId) {
        try { const data = await mylikesApi.create(postId);
            console.log(data, "respose from the create");
            getProfile();
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }
    async function removeLike(likesId) {
        try { const data = await mylikesApi.removeLike(likesId);
            console.log(data, "response from the delete");
            getProfile(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }
    async function removePost(postId) {
        try { const data = await mypostApi.removePost(postId);
            console.log(data, "the data from post delete");
            getProfile(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }
    if (error) {
        return <ErrorMessage error={error} />;
    }
    if (loading) {
        return <Loading />;
    }
    return (
        <Container>
            <Grid columns={2} centered>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <ProfileBio float="left" user={user} />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <PostsFeed
                            isProfile={false}
                            posts={posts}
                            numPhotosCol={2}
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