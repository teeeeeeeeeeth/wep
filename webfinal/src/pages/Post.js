import React from "react";
import {useParams} from 'react-router-dom';
import {Container, Grid, Image, Header, Segment, Icon} from 'semantic-ui-react';

import Topics from "../components/Topics";
import firebase from "../utils/firebase";

function Post()
{
    const {postId} = useParams();
    const [post, setPost] = React.useState({
        author:{},
    });
    

    function toggleCollected() {
        const uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection('posts').doc(postId).update({
            collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),

        });
    }

    const isCollected = post.collectedBy?.include(firebase.auth().currentUser.uid) 

    return (
    <Container>
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Topics />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Image src={post.author.photoURL} />{post.author.displayName}
                    <Header>
                        {post.title}
                        <Header.Subheader>
                            {post.topic}·{post.createdAt?.toDate().toLocaleDateString()}
                        </Header.Subheader>
                    </Header>
                    <Segment basic vertical>
                        {post.content}
                    </Segment >
                    <Segment basic vertical>
                        留言 0·讚 0·
                        <Icon name="thumbs up outline" color="grey" link onClick/>·
                        <Icon name='bookmark' color={isCollected? 'red' : 'grey'} 
                        link onClick='toggleCollected' />
                    </Segment>
                    </Grid.Column>
                <Grid.Column width={3}>空白</Grid.Column>

            </Grid.Row>
        </Grid>
    </Container>
    );
}
export default Post;
