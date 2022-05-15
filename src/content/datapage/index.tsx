import { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid, Box, Stack, Divider } from '@mui/material';
import Footer from '../../components/Footer';
import { styled } from '@mui/material/styles';

import DataTab from './DataTab';
import CommentsTab from './CommentsTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings() {

  const [currentTab, setCurrentTab] = useState<string>('data');

  const tabs = [
    { value: 'data', label: 'Data' },
    { value: 'comments', label: 'Comments' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>User Settings - Applications</title>
      </Helmet>

      <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={10} >
              <PageHeader />
              <Box>
                <TabsWrapper
                  onChange={handleTabsChange}
                  value={currentTab}
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </TabsWrapper>
              </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider/>
            <Box sx={{height:30}}></Box>
          </Grid>
          <Grid item xs={10} >
              
              <Box >
                {currentTab === 'data' && <DataTab />}
                {currentTab === 'comments' && <CommentsTab />}
              </Box>
          </Grid>
          
      </Grid>
      
      <Footer />
    </>
  );
}

export default ManagementUserSettings;
