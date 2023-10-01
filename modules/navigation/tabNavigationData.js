import HomeScreen from '../home/HomeViewContainer';
import FridgeScreen from '../fridge/FridgeViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconFridge = require('../../../assets/images/tabbar/fridge.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Fridge',
    component: FridgeScreen,
    icon: iconFridge,
  },
  {
    name: 'Components',
    component: ComponentsScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;