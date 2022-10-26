import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Title, Loading, NoData } from '../index';
import FlatCard from '../FlatCard';

import './style.css';

type FreeFlatType = {
  id: number,
  area:number,
  notes: string
};
const FlatContainer: React.FC = () => {
  const [flats, setFlats] = useState<Array<FreeFlatType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = (signal : AbortSignal) => {
    axios.get('/api/v1/flats/', { signal })
      .then(({ data: { data } }) => {
        setFlats(data as Array<FreeFlatType>);
        setLoading(false);
      }).catch(() => message.error('حدث خطأ , اعد المحاولة'));
  };
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => controller.abort();
  }, []);
  return (

    <div className="flatContainerComponent" id="flats">
      <Title>الشقق المتاحة</Title>
      <div className="flatContainer">
        {
          // eslint-disable-next-line no-nested-ternary
          (loading) ? <Loading /> : (flats.length !== 0) ? (flats.map((flatCard) => (<FlatCard key={flatCard.id} info={flatCard} />))) : (<NoData />)
        }
      </div>
    </div>
  );
};

export default FlatContainer;
