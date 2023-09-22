import React from 'react';
import { Typography, Grid, ListItem, ListItemText } from '@mui/material';
import { useStyles, StylesProps } from '../../styles/common';

const categories = [
    {
        id: 1,
        name: 'South Indian (Breakfast/Tiffins)',
        count: 138
    },
    {
        id: 2,
        name: 'Dosa Maker (Specialist)',
        count: 41
    },
    {
        id: 3,
        name: 'Upma Maker (Specialist)',
        count: 32
    },
    {
        id: 4,
        name: 'Idly Maker (Specialist)',
        count: 47
    },
    {
        id: 5,
        name: 'Chinese',
        count: 47
    },
];

const JobCategory = () => {

    const commonStyles = useStyles({} as StylesProps);

    return (
        <Grid container justifyContent='flex-start' alignItems='center'>
            <Grid item>
                <Typography variant="h4" fontWeight='bold'>
                    Chef's Category
                </Typography>
            </Grid>
            <Grid container item justifyContent='flex-start' alignItems='flex-start'>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category.id}>
                        <ListItem
                            component="a"
                            // href={`/CIS/Candidates/${category.id}`}
                            href={`/find-my-chef/`}
                        >
                            <ListItemText className={commonStyles.jobCategoryItem} primary={category.name} secondary={`(${category.count})`} />
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default JobCategory;
