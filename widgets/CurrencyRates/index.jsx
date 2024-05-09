import cl from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import loadCryptocurrencies from '@/app/servises/cryptocurrencies/loadCryptocurrencies';
import Card from '@/shared/ui/Card';
import CurrencyRateItem from '@/shared/ui/CurrencyRateItem';
import { updateRates, updateResponseTime } from '@/slices/currencyRatesSlice';

import styles from './index.module.scss';

const RATES_UPDATE_INTERVAL = 60000;

const CurrencyRates = (props) => {
  const { children, className, hasTitle = true } = props;
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

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    //slidesToShow: 1,
    //slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1, // Установите скорость автопрокрутки на 0
    speed: 5000, // Установите скорость прокрутки здесь
    pauseOnHover: false,
    cssEase: 'linear', // Используйте linear для плавной прокрутки
    variableWidth: true, // Включите переменную ширину слайдов
    centerMode: true, // Включите центральный режим, чтобы текущий слайд был в центре
    centerPadding: '0px', // Установите отступы, если необходимо
    swipeToSlide: false, // Позволяет пользователю перетаскивать для переключения слайдов
  };

  return (
    <div className={cl(className, styles.rates)}>
      <h3 className={styles.ratesTitle}>
        Курсы криптовалют {rates && updateTime.hours}<span className={styles.ratesDots}>:</span>
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
          <Slider {...sliderSettings}>
            {rates.map((rate) => (
              <CurrencyRateItem data={rate} key={rate.shortName} />
            ))}
          </Slider>
        </Card>
      )}
    </div>
  );
};

export default CurrencyRates;
