import { Helmet } from 'react-helmet-async'
import Footer from '../../../../components/Footer'

import { Container, Grid } from '@mui/material'

import Addresses from './Addresses'
import Feed from './Feed'
import MyCards from './MyCards'
import PopularTags from './PopularTags'
import ProfileCover from './ProfileCover'
import RecentActivity from './RecentActivity'

import Avatar4 from 'assets/images/avatars/avatar4.jpg'
import Cover5 from 'assets/images/placeholders/covers/cover5.jpg'

function ManagementUserProfile() {
    const user = {
        savedCards: 7,
        name: 'Catherine Pike',
        coverImg: Cover5,
        avatar: Avatar4,
        description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
        jobtitle: 'Web Developer',
        location: 'Barcelona, Spain',
        followers: '465'
    }

    return (
        <>
            <Helmet>
                <title>User Details - Management</title>
            </Helmet>
            <Container sx={{ mt: 3 }} maxWidth='lg'>
                <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} md={8}>
                        <ProfileCover user={user} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <RecentActivity />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Feed />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularTags />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <MyCards />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Addresses />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

export default ManagementUserProfile
