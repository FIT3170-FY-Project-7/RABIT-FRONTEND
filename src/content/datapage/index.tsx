
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/Footer';

import { Box, Container } from '@mui/material';

function Datapage() {
  return (
    <>
      <Helmet>
        <title>RABIT - Visualise</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
      <Box>
      REPLACE THIS BOX COMPONENT WITH PLOTLY VISUAL :)
      </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Datapage;
