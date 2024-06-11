import Grid from '@mui/material/Grid';

import { gridSpacing } from 'store/constant';

import EntryCard from './EntryCard';
import { useGetRecords } from 'api/records';
import Loader from 'ui-component/Loader';
import AuthenticatedRoute from 'routes/AuthenticatedRoute';
import Masonry from '@mui/lab/Masonry';
import { useTheme } from '@emotion/react';

const Entries = () => {
  const theme = useTheme();
  const { data, dataLoading } = useGetRecords();

  return (
    <>
      {((dataLoading || data == null) && <Loader />) || (
        <Masonry
          container
          columns={{
            xs: 1,
            sm: 2,
            lg: 3,
            xl: 4
          }}
          spacing={gridSpacing}
        >
          {data.map((entry, key) => (
            <Grid item key={key}>
              <EntryCard entry={entry} />
            </Grid>
          ))}
        </Masonry>
      )}
    </>
  );
};

export default AuthenticatedRoute(Entries);
