// assets
import HistoryIcon from '@mui/icons-material/History';

// constant
const icons = { HistoryIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const entries = {
  id: 'default',
  type: 'group',
  children: [
    {
      id: 'entries',
      title: 'Entries',
      type: 'item',
      url: '/entries',
      icon: icons.HistoryIcon,
      breadcrumbs: false
    }
  ]
};

export default entries;
