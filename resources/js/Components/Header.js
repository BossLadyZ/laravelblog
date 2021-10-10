import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Inertia } from '@inertiajs/inertia';
import { Toolbar, Button, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));







function Header() {

    //for every text term, 
    const classes = useStyles();
    const [values, setValues] = useState({
        term: "",
    });



    const handleKeyUp = () => {
        Inertia.replace(route('posts.index', { term: values.term }));
    };


    const onHandleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const addNew = () => {
        Inertia.get(route('posts.create'));
    };

    const toDash = () => {
        Inertia.get(route('dashboard'));
    };
    return (
        <>
            <Toolbar className={classes.toolbar}>
                <Button onClick={addNew} size="small">
                    Add New
                </Button>
                <Button
                    component="h2"
                    align="center"
                    onClick={toDash}
                    className={classes.toolbarTitle}
                >
                    Dashboard
                </Button>


                <TextField
                    variant="outlined"
                    margin="normal"
                    className="mt-1 mr-3"
                    size="small"
                    type="text"
                    label="Search"
                    name="term"
                    value={values.term}
                    onChange={onHandleChange}
                    onKeyUp={handleKeyUp}


                />

            </Toolbar>

        </>
    );
}



export default Header;
