import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';

export default function AddPostForm(props) {
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        description: '',
    });
    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }
    function handleChange(e) {
        console.log(e.target.value)
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    function handleSubmit(e) {
        e.preventDefault() 
        console.log(state, selectedFile)  

        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('description', state.description);
        console.log(formData)
        props.handleAddPostForm(formData);
    }
    return (
        <Grid textAlign='left' style={{ height: '25vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Segment>
                    <Form color='red' autoComplete="off" onSubmit={handleSubmit}>
                        <Form.Input
                            className="form-control"
                            name="description"
                            value={state.description}
                            placeholder="Talk about your experience with our company!"
                            onChange={handleChange}
                            required />
                        <Form.Input 
                            className="form-control"
                            type="file" 
                            name="photo"
                            placeholder="upload photos"
                            onChange={handleFileInput} />
                        <Button color='blue' 
                            type="submit"
                            className="btn"
                            size='mini'>
                        Add Post
                        </Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}