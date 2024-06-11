import { jwtDecode } from 'jwt-decode';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// eslint-disable-next-line react/display-name
const AuthenticatedRoute = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const route = '/login';

    const logout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate(route);
    };

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        logout();
      } else {
        try {
          const jwtUserAccessInfo = jwtDecode(accessToken);
          const jwtUserRefreshInfo = jwtDecode(refreshToken);
          const now = Date.now() / 1000;

          if (jwtUserAccessInfo.exp < now && jwtUserRefreshInfo.exp < now) {
            logout();
          } else {
          }
        } catch (e) {
          logout();
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default AuthenticatedRoute;
