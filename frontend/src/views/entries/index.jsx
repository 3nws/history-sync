import Grid from '@mui/material/Grid';

import { gridSpacing } from 'store/constant';

// assets
import EntryCard from './EntryCard';
import { useGetRecords } from 'api/records';
import Loader from 'ui-component/Loader';
import AuthenticatedRoute from 'routes/AuthenticatedRoute';

const Entries = () => {
  const { data, dataLoading } = useGetRecords();

  return (
    <>
      {((dataLoading || data == null) && <Loader />) || (
        <Grid container spacing={gridSpacing}>
          {data.map((entry, key) => (
            <Grid item key={key}>
              <EntryCard entry={entry} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default AuthenticatedRoute(Entries);
