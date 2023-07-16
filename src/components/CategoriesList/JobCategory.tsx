import React from 'react';
import { Typography, Grid, ListItem, ListItemText, SvgIcon, Box } from '@mui/material';
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
];

const JobCategory = () => {
    const commonStyles = useStyles({} as StylesProps);
    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" component="h4" sx={{ display: 'flex', alignItems: 'center'}}>
                <SvgIcon viewBox="0 0 24 24" sx={{ mr: 1 }}>
                    <path d="M17,10 L3,10 M21,6 L3,6 M21,14 L3,14 M17,18 L3,18" />
                </SvgIcon>
                <h3>Job Category</h3>
            </Typography>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category.id}>
                        <ListItem
                            component="a"
                            href={`/CIS/Candidates/${category.id}`}
                            className="job-category-item"
                        >
                            <ListItemText className={commonStyles.jobCategoryItem} primary={category.name} secondary={`(${category.count})`} />
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default JobCategory;
