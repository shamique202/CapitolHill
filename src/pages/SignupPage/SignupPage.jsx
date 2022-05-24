import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { Button, Form, Grid, Image, Segment, Message } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    bio: '',
    location: '',
  });

  const [selectedFile, setSelectedFile] = useState('');

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value })
  }
  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo',selectedFile)

    for (let key in state) {
      console.log(key, state[key])
      formData.append(key, state[key])
    }
console.log(formData.forEach((item) => console.log(item)))
try {
  await userService.signup(formData);
  props.handleSignUpOrLogin()
  navigate('/')
  // redirects back to the home page
} catch (err) {
  console.log(err.message)
  setError(err.message)
}
  }
function handleFileInput(e) {
console.log(e.target.files)
setSelectedFile(e.target.files)
}
return (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Image src="https://i.imgur.com/12PBKfs.jpg" size="large" centered/>
      <Message
            attached
            header='Hello!'
            content='Welcome to Capitol Hill, a fashion blog for displaying your creativity. Signup to view our content!' /> 
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input
            fluid 
            icon="user"
            iconPosition="left"
            name="username"
            placeholder="Username"
            value={state.username}
            onChange={handleChange}
            required />
          <Form.Input
            fluid
            icon="mail"
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
          <Form.Input
            name="passwordConf"
            type="password"
            placeholder="Confirm Password"
            value={state.passwordConf}
            onChange={handleChange}
            required />
          <Form.TextArea
            label="Bio"
            name="bio"
            placeholder="Please share your experience with our team at Capitol Hill and we you love our application!"
            onChange={handleChange} />
          <Form.Input
            fluid
            icon="location arrow"
            iconPosition="left"
            name="location"
            placeholder="City, State"
            value={state.location}
            onChange={handleChange}
            required />
          <Form.Field>
            <Form.Input
              type="file"
              name="photo"
              placeholder="upload image"
              onChange={handleFileInput} />
          </Form.Field>
          <Button color="blue" type="submit" className="btn">
            Signup
          </Button>
        </Segment>
        {error ? <ErrorMessage error={error} /> : null}
      </Form>
    </Grid.Column>
  </Grid>
 );

}
