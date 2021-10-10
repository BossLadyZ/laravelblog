import Header from '@/Components/Header';
import { usePage } from '@inertiajs/inertia-react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import React from 'react';


const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
        height: 200,
    },
});

function Index() {
    const classes = useStyles();
    const { posts } = usePage().props;
    

  
    return (
        <div>
            <Header />
            {posts.map(({ id, slug, title, image_url, created_at, user}) => {
                return (
                    <Grid container key={id} className="ml-10 mt-2">
                        <Grid item xs={9} >
                            < CardActionArea component="a" href={route('posts.show',[slug])} >
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardDetails}>
                                        <Typography component="h2" variant="h5">
                                            {title}
                                        </Typography>
                                        <Typography variant="subtitle1" >
                                            {created_at} by {user.name}
                                        </Typography>
                                        <Typography variant="button" color="primary">
                                            Continue reading...
                                        </Typography>
                                    </CardContent>
                                    <CardMedia
                                        component="img"
                                        className={classes.cardMedia}
                                        image={image_url}
                                    />
                                </Card>
                            </CardActionArea >
                        </Grid>
                    </Grid>
                );
            })}

        </div>
    );
}

export default Index;
