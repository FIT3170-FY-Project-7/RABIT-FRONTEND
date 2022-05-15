
import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Theme,
  Typography,
  Hidden,
  Grid,
  Stack,
  Popper,
  Paper
} from '@mui/material';
import { useState } from 'react';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import { styled } from '@mui/material/styles';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import React from 'react';


const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

function DataTitle() {
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const dividerRef = React.createRef<HTMLHRElement>();

  // The event for opening search menu
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

      setAnchorEl(event.target);

      if (event.target.value) {
        if (!openSearchResults) {
          setOpenSearchResults(true);
        }
      } else {
        setOpenSearchResults(false);
      }
    }
    
  };
  
  // event for closing search menu whenever mouse leaves component.
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenSearchResults(false);
  };

  return (
        <Stack sx = {{width:'100%'}}>
          <SearchInputWrapper
            value={searchValue}
            autoFocus={true}
            onChange= {event => setSearchValue(event.target.value)}
            onKeyDown={handleKeyDown}
            
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search terms here..."
            fullWidth
            label="Search"
          />
          <Divider id="search-divider" sx = {{width:'100%'}}/>
          <Popper
            open = {openSearchResults}
            anchorEl={document.getElementById("search-divider") as HTMLElement}
            onMouseLeave={handlePopoverClose}
            placement="bottom-start"
            disablePortal={true}
            >
            <Paper sx={{width:'100%'}}>
              <Box
                sx={{ pt: 0, pb: 1, witdth:'100%' }}
                display="flex"
                justifyContent="space-between"
              >
                <Typography variant="body2" component="span">
                  Search results for{' '}
                  <Typography
                    sx={{ fontWeight: 'bold' }}
                    variant="body1"
                    component="span"
                  >
                    {searchValue}
                  </Typography>
                </Typography>
                <Link href="#" variant="body2" underline="hover">
                  Advanced search
                </Link>
              </Box>
              <Divider sx={{ my: 1 }} />
              <List disablePadding>
                <ListItem button>
                  <Hidden smDown>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          background: (theme: Theme) =>
                            theme.palette.secondary.main
                        }}
                      >
                        <FindInPageTwoToneIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </Hidden>
                  <Box flex="1">
                    <Box display="flex" justifyContent="space-between">
                      <Link href="#" underline="hover" sx={{ fontWeight: 'bold' }} variant="body2">
                        Dashboard for Healthcare Platform
                      </Link>
                    </Box>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: (theme: Theme) =>
                          lighten(theme.palette.secondary.main, 0.5)
                      }}
                    >
                      This page contains all the necessary information for managing all hospital staff.
                    </Typography>
                  </Box>
                  <ChevronRightTwoToneIcon />
                </ListItem>
                <Divider sx={{ my: 1 }} component="li" />
                <ListItem button>
                  <Hidden smDown>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          background: (theme: Theme) =>
                            theme.palette.secondary.main
                        }}
                      >
                        <FindInPageTwoToneIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </Hidden>
                  <Box flex="1">
                    <Box display="flex" justifyContent="space-between">
                      <Link href="#" underline="hover" sx={{ fontWeight: 'bold' }} variant="body2">
                        Example Projects Application
                      </Link>
                    </Box>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: (theme: Theme) =>
                          lighten(theme.palette.secondary.main, 0.5)
                      }}
                    >
                      This is yet another search result pointing to a app page.
                    </Typography>
                  </Box>
                  <ChevronRightTwoToneIcon />
                </ListItem>
                <Divider sx={{ my: 1 }} component="li" />
                <ListItem button>
                  <Hidden smDown>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          background: (theme: Theme) =>
                            theme.palette.secondary.main
                        }}
                      >
                        <FindInPageTwoToneIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </Hidden>
                  <Box flex="1">
                    <Box display="flex" justifyContent="space-between">
                      <Link href="#" underline="hover" sx={{ fontWeight: 'bold' }} variant="body2">
                        Search Results Page
                      </Link>
                    </Box>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: (theme: Theme) =>
                          lighten(theme.palette.secondary.main, 0.5)
                      }}
                    >
                      Choose if you would like to show or not this typography section here...
                    </Typography>
                  </Box>
                  <ChevronRightTwoToneIcon />
                </ListItem>
              </List>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Button color="primary">View all search results</Button>
              </Box>
            </Paper>
          </Popper>
        </Stack>
           
  );
}

export default DataTitle;
