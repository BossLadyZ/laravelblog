import Header from '@/Components/Header';
import Button from '@/Components/Button';
import Input from '@/Components/Input';

import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';

import { Container, makeStyles, styled, Typography } from '@material-ui/core';




 const useStyles = makeStyles((theme) => ({
     toolbar: {
         borderBottom: `1px solid ${theme.palette.divider}`,
     },
     toolbarTitle: {
         flex: 1,
     },
 }))


function Edit() {
    const classes = useStyles();
    const { post } = usePage().props;

    const { data, setData, put, processing } = useForm({
        title: post.title || '',
        body: post.body || '',
        image_url: post.image_url || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('posts.update', post.slug));
    };

    const onHandleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <Container  maxWidth="xs">
                <div className="mt-2">
                    <Typography className={classes.toolbarTitle} variant="h3">
                        Edit Post
                    </Typography>


                    <form onSubmit={handleSubmit} noValidate>
                        <Input
                            variant="outlined"
                            margin="normal"
                            className="mt-1 block w-full"
                            required
                            fullWidth
                            label="Title"
                            name="title"
                            value={data.title}
                            handleChange={onHandleChange}


                        />
                        <Input
                            variant="outlined"
                            margin="normal"
                            className="mt-1 block w-full"
                            required
                            multiline={true}
                            rows={4}
                            fullWidth
                            name="body"
                            label="Body"
                            type="text"
                            value={data.body}
                            handleChange={onHandleChange}
                        />
                        <Input
                            variant="outlined"
                            margin="normal"
                            className="mt-1 block w-full"
                            required
                            fullWidth
                            name="image_url"
                            label="Image Link"
                            type="text"
                            value={data.image_url}
                            handleChange={onHandleChange}
                        />

                        <Button>
                            Update Post
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default Edit;
