import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, Typography } from '@mui/material'

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'

import Avatar1 from 'assets/images/avatars/avatar1.jpg'
import Avatar2 from 'assets/images/avatars/avatar2.jpg'
import Avatar3 from 'assets/images/avatars/avatar3.jpg'
import Avatar4 from 'assets/images/avatars/avatar4.jpg'
import Avatar5 from 'assets/images/avatars/avatar5.jpg'
import Avatar6 from 'assets/images/avatars/avatar6.jpg'

function Feed() {
    const feed = [
        {
            name: 'Munroe Dacks',
            jobtitle: 'Senior Cost Accountant',
            company: 'Trudoo',
            avatar: Avatar1
        },
        {
            name: 'Gunilla Canario',
            jobtitle: 'Associate Professor',
            company: 'Buzzdog',
            avatar: Avatar2
        },
        {
            name: 'Rowena Geistmann',
            jobtitle: 'Pharmacist',
            company: 'Yozio',
            avatar: Avatar3
        },
        {
            name: 'Ede Stoving',
            jobtitle: 'VP Product Management',
            company: 'Cogibox',
            avatar: Avatar4
        },
        {
            name: 'Crissy Spere',
            jobtitle: 'Social Worker',
            company: 'Babbleblab',
            avatar: Avatar5
        },
        {
            name: 'Michel Greatbanks',
            jobtitle: 'Research Assistant III',
            company: 'Aimbu',
            avatar: Avatar6
        }
    ]

    return (
        <Card>
            <CardHeader title='Followers Feed' />
            <Divider />
            <Box p={2}>
                <Grid container spacing={0}>
                    {feed.map(_feed => (
                        <Grid key={_feed.name} item xs={12} sm={6} lg={4}>
                            <Box p={3} display='flex' alignItems='flex-start'>
                                <Avatar src={_feed.avatar} />
                                <Box pl={2}>
                                    <Typography gutterBottom variant='subtitle2'>
                                        {_feed.company}
                                    </Typography>
                                    <Typography variant='h4' gutterBottom>
                                        {_feed.name}
                                    </Typography>
                                    <Typography color='text.primary' sx={{ pb: 2 }}>
                                        {_feed.jobtitle}
                                    </Typography>
                                    <Button variant='outlined' size='small' startIcon={<AddTwoToneIcon />}>
                                        Follow
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Card>
    )
}

export default Feed
