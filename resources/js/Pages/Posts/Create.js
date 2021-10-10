import React, { useState } from 'react';

import Input from '@/Components/Input';
import Button from '@/Components/Button';


import Header from '../../Components/Header';
import { Inertia } from '@inertiajs/inertia';
import { Link, useForm } from '@inertiajs/inertia-react';
import { Container,makeStyles,Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    
}));

function Create() {
    const { data, setData, errors, post, processing } = useForm({
        title: '',
        body: "",
        image_url: "",
    });

    const onHandleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };
     
    const classes = useStyles();

    return (
        <>
            <Toolbar className={classes.toolbar}>
                <Link href={route('posts.index')} variant="button" underline="none" size="small">
                    ALL POSTS
                </Link>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    New Post
                </Typography>
            </Toolbar>

            <Container maxWidth="sm">
                <div className="mt-2">
                    <form onSubmit={submit} Validate>
                        <Input
                            variant="outlined"
                            margin="normal"
                            className="mt-1 block w-full"
                            required
                            fullWidth
                            label="Title"
                            name="title"
                            type="text"
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

                        <Button

                        >
                            Add Post
                        </Button>

                    </form>
                </div>
            </Container>

        </>
    );
}

export default Create;



