
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation } from 'react-router-dom';
import RoutConfig from '../Environment/Environment';


export function NavTabs() {
  const { pathname } = useLocation();
  const main = RoutConfig.Main.children[0].path;
  const sneek = RoutConfig.Main.children[1].path;
  const releases = RoutConfig.Main.children[2].path;

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={pathname}
        aria-label="nav tabs example"
        role="navigation"
        centered
      >
        <Tab label="Home" href={main} value={main}/>
        <Tab label="Coming Soon" href={sneek} value={sneek}/>
        <Tab label="SneakPeek" href={releases} value={releases}/>
      </Tabs>
    </Box>
  );
}


export default function CustomHeader(){
    return (<>
        <NavTabs/>
    </>);
}