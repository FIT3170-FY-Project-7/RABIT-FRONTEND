
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/Footer';
import PlotsPage from '../plots/PlotsPage';

import { Box, Container } from '@mui/material';

function Datapage() {
  return (
    <>
      <Helmet>
        <title>RABIT - Visualise</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
      <Box>
      <PlotsPage/>
      </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Datapage;
