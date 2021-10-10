import React from 'react';
import Header from '@/Components/Header';
import { usePage } from '@inertiajs/inertia-react';

import { Inertia } from '@inertiajs/inertia';
import { Box, Container, Button, Grid, Typography, styled } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


//for a particular postId, show title of that post, body and image_url

const Item = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(1),
}));

const useStyles = makeStyles((theme) => ({
    root: {
        height: "50px"
    }
}))


function Show() {
    const { auth, post } = usePage().props;
    const classes = useStyles();

    const editButton = () => {
        Inertia.get(route('posts.edit', post.slug));
    };

    const deleteButton = () => {
        Inertia.delete(route('posts.destroy', post.slug));
    };
    const allButton = () => {
        Inertia.get(route('posts.index'));
    };
    return (
        <>


            <Container maxWidth="sm" sx={{ height: '100vh' }}>
                <Item container>
                    <Grid item xs={4}>
                        <Button onClick={allButton}>All Posts</Button>
                    </Grid>
                    {auth.user && auth.user.id === post.user_id &&
                       (<Grid item xs={3}>
                        <Button onClick={editButton}>Edit</Button>
                    </Grid> )
                    }
                    {auth.user && auth.user.id === post.user_id &&
                    <Grid item xs={3}>
                        <Button onClick={deleteButton}>Delete Post</Button>
                    </Grid>}
                </Item>

                <Item >
                    <Box
                        sx={{
                            paddingTop: 2,
                            marginTop: 3,
                            fontWeight: "Bold",
                        }}
                    >
                        <Typography variant="h2">
                            {post.title}
                        </Typography>
                    </Box>
                </Item>

                <Item>
                    <Box sx={{ bgColor: '#ffffff', height: 100 }}
                    >
                        <Typography className='mb-3'>
                            {post.body}
                        </Typography>
                    </Box>
                </Item>
                <Item maxWidth="sm" sx={{ height: 50 }}><img src={post.image_url} /></Item>
            </Container>

        </>
    );
}

export default Show;
