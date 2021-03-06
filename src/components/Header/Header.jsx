import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';

export default function PageHeader({ user, handleLogout }) {
    return ( <Segment clearing>
            <Header as='h3' floated='right'>
                <Link to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></Image></Link>
                <Link to="/"><Icon color='black' name="university"></Icon></Link>
                <Link to="/feed"><Icon color='black' name='camera retro'></Icon></Link>
                <Link to='' color='black' onClick={handleLogout}>Logout</Link>
            </Header>
            <Header as='h4' floated='left'>
                <Link to="/"><Image src="https://i.imgur.com/12PBKfs.jpg" size="small"></Image></Link>
            </Header>
        </Segment>
    );
}