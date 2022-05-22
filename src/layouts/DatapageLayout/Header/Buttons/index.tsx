import { Button, Box, Badge, alpha} from '@mui/material';

import { styled } from '@mui/material/styles';

import ShareIcon from '@mui/icons-material/Share';
import DiscussionIcon from './DiscussionIcon';


const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <Button sx={{ mr: 1}}
          variant="outlined"
          size="small"
          startIcon = {<DiscussionIcon/>}>
      Discussion
      </Button>
      <Button sx={{ mr: 1 }}
          variant="outlined"
          size="small"
          startIcon={<ShareIcon />}>
      Share
      </Button>
    </Box>
  );
}

export default HeaderButtons;
