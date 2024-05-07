import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import routes from '@/routes';
import { showNotification } from '@/shared/lib/userNotifications';

const useContentLoader = (entityName, pathName, itemsPerPage, setLoadedCount, addEntities, additionalParams = {}) => {
  const { loaded } = useSelector((state) => state[`${entityName}Data`]);

  const [loadedAmount, setLoadedAmount] = useState(loaded);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoadedAmount(loaded);
  }, [loaded]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: newData } = await axios.get(routes.getAll(pathName), {
        params: {
          page: Math.floor(loadedAmount / itemsPerPage) + 1,
          pageSize: itemsPerPage,
          ...additionalParams,
        },
      });

      setLoadedAmount(loadedAmount + newData[entityName].length);
      setLoadedCount(loadedAmount + newData[entityName].length);
      addEntities(newData);
    } catch (err) {
      showNotification('error', '😩 Что-то пошло не так, попробуйте еще раз');
    } finally {
      setLoading(false);
    }
  };

  return { loading, loadData };
};

export default useContentLoader;
