import { Container, Header, Form, Image, Button } from 'semantic-ui-react';
import React from 'react';
import 'firebase/firestore';
import 'firebase/storage';
import { useHistory } from 'react-router-dom';
import firebase from '../utils/firebase';


function NewPost()
{
    const history = useHistory();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [topics, setTopics] = React.useState([]);
    const [topicName, setTopicName] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() =>
    {
        firebase
            .firestore()
            .collection('topics')
            .get()
            .then((collectionSnapshot) => 
            {
                const data = collectionSnapshot.docs.map(
                (doc) => 
                    {
                    return doc.data();
                    }
                );
                setTopics(data);    
            }

            );
    }, []);

    const options = topics.map((topic) =>{
        return{
            text: topic.name,
            value: topic.name,
        };
    }
    );

    const previewUrl = file 
        ? URL.createObjectURL(file) 
        : "https://react.semantic-ui.com/images/wireframe/image.png" ;

    function onSubmit()
    {
        setIsLoading(true);
        const documentRef = firebase.firestore().collection("posts").doc();
                documentRef.set({
                    title,
                    content,
                    topic: topicName,
                    createdAt: firebase.firestore.Timestamp.now(),
                    author:{
                        displayName: firebase.auth().currentUser.displayName || "",
                        photoURL: firebase.auth().currentUser.photoURL || '',
                        uid: firebase.auth().currentUser.uid,
                        email: firebase.auth().currentUser.email,
                    },
                }).then(() => {
                    setIsLoading(false);
                    history.push('/');
                }
                );

    }

    return ( 
    <Container>
        <Header>????????????</Header>
        <Form onSubmit={onSubmit}>
            <Image 
                src={previewUrl}
                size="small"
                floated="left"
            />
            <Button basic as="label" htmlFor="post-image">??????????????????</Button>
            <Form.Input
                type="file"
                id="post-image"
                style={{display: 'none'}}
                onChange={(e) => setFile(e.target.files[0])}
            />
            <Form.Input 
            placeholder="??????????????????" 
            value={title} 
            onChange={(e)=> setTitle(e.target.value)} 
            />
            <Form.TextArea 
            placeholder="??????????????????" 
            value={content} 
            onChange={(e)=> setContent(e.target.value)} 
            />
            <Form.Dropdown
                placeholder="??????????????????"
                options={options}
                selection
                value={topicName}
                onChange={(e, {value}) => setTopicName(value)}
            />
            <Form.Button loading={isLoading}>??????</Form.Button>
        </Form>
    </Container>
    );
}

export default NewPost;