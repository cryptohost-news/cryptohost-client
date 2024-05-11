import 'swiper/css';

import cl from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import loadCryptocurrencies from '@/app/servises/cryptocurrencies/loadCryptocurrencies';
import Card from '@/shared/ui/Card';
import CurrencyRateItem from '@/shared/ui/CurrencyRateItem';
import { updateRates, updateResponseTime } from '@/slices/currencyRatesSlice';

import styles from './index.module.scss';

const RATES_UPDATE_INTERVAL = 60000;

const CurrencyRates = (props) => {
  const { className, hasTitle = true } = props;
  const dispatch = useDispatch();
  const { rates, updateTime } = useSelector((state) => state.currencyRates);
  const [loading, setLoading] = useState(true); // Состояние загрузки данных
  const [error, setError] = useState(false); // Состояние ошибки загрузки данных

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = { hours, minutes };

        dispatch(updateResponseTime(formattedTime));

        const data = await loadCryptocurrencies();
        dispatch(updateRates(data));
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке валют');
        setLoading(false);
        setError(true);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, RATES_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className={cl(className, styles.rates)}>
      <h3 className={styles.ratesTitle}>
        Курсы криптовалют {rates && updateTime.hours}
        <span className={styles.ratesDots}>:</span>
        {rates ? updateTime.minutes : '—'}
      </h3>
      {loading && !error && (
        <Card isGridded={true} className={styles.ratesCard}>
          <div className={styles.ratesMessage}>Загрузка...</div>
        </Card>
      )}
      {!loading && error && (
        <Card isGridded={true} className={styles.ratesCard}>
          <div className={styles.ratesMessage}>Данные не загружены, что-то пошло не так</div>
        </Card>
      )}
      {!loading && !error && (
        <Card isGridded={true} className={styles.ratesCard}>
          <Swiper
            className="sample-slider"
            modules={[Autoplay]}
            autoplay={{ delay: 0 }}
            loop={true}
            speed={5000}
            slidesPerView={'auto'}
            noSwiping={true}
            noSwipingClass={'swiper-no-swiping'}
          >
            {rates.map((rate) => (
              <SwiperSlide key={rate.shortName}>
                <CurrencyRateItem data={rate} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Card>
      )}
    </div>
  );
};

export default CurrencyRates;
