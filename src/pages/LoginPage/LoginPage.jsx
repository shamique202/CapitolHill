import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import {useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

export default function LoginPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(state);
      props.handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <>
   <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Image src="https://i.imgur.com/12PBKfs.jpg" size="small" centered/>
          <Message
              attached
              header='Greetings!'
              content='Welcome to Capitol Hill, a fashion blog for displaying your creativity. Signup to view our content!'/> 
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid 
                icon="user"
                iconPosition="left"
                type="email"
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={handleChange}
                required />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
                required />
              <Button
                color="pink"
                fluid
                size="medium"
                type="submit"
                className="btn">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Are you new? <Link to="/signup">Sign Up Here!</Link>
          </Message>
          {error ? <ErrorMessage error={error} /> : null} </Grid.Column>
      </Grid>
    </>
  );
}