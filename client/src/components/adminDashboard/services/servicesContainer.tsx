/* eslint-disable no-nested-ternary */
import { Typography, Button, message } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import '../../../App/style.css';
import axios from 'axios';
import { InferServicesModel } from '../../../Models/services';
import { Loading, NoData } from '../../index';

const columns: ColumnsType<InferServicesModel> = [
  {
    title: 'اسم الخدمة',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h3 style={{ color: 'rgb(21 111 193)' }}>{text}</h3>,
  },
  {
    title: 'السعر ثابت/متغير',
    dataIndex: 'is_fixed',
    key: 'is_fixed',
    render: (text) => <p>{text ? 'ثابت' : 'متغير'}</p>,
  },
  {
    title: 'وصف الخدمة',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'السعر',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'تعديل',
    dataIndex: 'edit',
    key: 'edit',
    render: () => <EditOutlined />,
  },
  {
    title: 'تفعيل / الغاء التفعيل',
    dataIndex: 'is_open',
    key: 'is_open',
    render: (text) => <Button type="primary">{text ? 'تفعيل' : 'الغاء التفعيل'}</Button>,

  },
];
const { Title } = Typography;

const ServicesContainer: React.FC = () => {
  const [service, setService] = useState<Array<InferServicesModel>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = (signal : AbortSignal) => {
    axios.get('/api/v1/services/', { signal })
      .then(({ data: { data } }) => {
        setService(data as Array<InferServicesModel>);
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
    <>
      <div className="headerOfServices">
        <Title className="titleAdmin">الخدمات</Title>
        <Button type="primary">
          {' '}
          <PlusCircleOutlined />
          اضافة خدمة
        </Button>
      </div>
      {
        (loading) ? <Loading /> : ((service.length > 0) ? <Table columns={columns} dataSource={service} /> : <NoData />)
      }
    </>
  );
};
export default ServicesContainer;
