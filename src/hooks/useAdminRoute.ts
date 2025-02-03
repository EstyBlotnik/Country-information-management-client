import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/user';

export const useAdminRoute = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  return user && user.role === 'admin';
};
