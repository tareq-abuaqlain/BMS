/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  DeleteOutlined, EditOutlined, PlusCircleOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  notification,
  Table, Typography,
  Image,
  Modal,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface UserAdvs {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  image: string;
}

const GetAnns = (signal: AbortSignal) => new Promise<AnnResponse>((resolve, reject) => {
  axios.get('/api/v1/advertisements', { signal })
    .then(resolve)
    .catch(reject);
});

type NotificationType = 'success' | 'error';
const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
  notification[type]({
    message,
    description,
  });
};

const App: React.FC = () => {
  const [advs, setAdvs] = useState<UserAdvs[]>([]);
  const [deleted, setDeleted] = useState<boolean>(false);
  const { confirm } = Modal;

  const handleDelete = (record: any) => {
    const confirmDelete = () => {
      axios({
        method: 'DELETE',
        url: `/api/v1/advertisements/${record.id}`,
      })
        .then(() => {
          const newAdvs = advs.filter((e) => e.id !== record.id);
          setAdvs(newAdvs);
          openNotificationWithIcon('success', 'تم', 'تم حذف الاعلان');
          setDeleted(!deleted);
          if (advs.length) {
            setAdvs((prev) => prev.map((ele) => {
              if (ele.id === record.id) return { ...record };
              return ele;
            }));
          }
        }).catch(() => message.error('حدث خطأ , اعد المحاولة'));
    };
    confirm({
      title: 'هل أنت واثق من حذف هذا الاعلان ؟',
      icon: <ExclamationCircleOutlined />,
      content: 'انتبه، حذف هذا الاعلان يعني حذفها بشكلٍ نهائي',
      okText: 'نعم',
      okType: 'danger',
      cancelText: 'لا',
      onOk() {
        confirmDelete();
      },
    });
  };

  const columns: ColumnsType<UserAdvs> = [
    {
      title: 'الإعلان',
      dataIndex: 'title',
      key: 'id',
      render: (value) => (
        <p style={{
          width: '200px',
        }}
        >
          {value}
        </p>
      ),
    },
    {
      title: 'الصورة',
      dataIndex: 'image',
      key: 'id',
      render: (_, { image }) => (
        <Image
          width={100}
          src={image}
          preview={{
            src: image,
          }}
        />
      ),
    },
    {
      title: 'تاريخ البدء',
      dataIndex: 'start_date',
      key: 'id',
    },
    {
      title: 'تاريخ الانتهاء',
      dataIndex: 'end_date',
      key: 'id',
    },
    {
      title: 'تعديل',
      key: 'edit',
      render: (_, { id }) => (
        <Link to={`edit/${id}`}>
          <EditOutlined style={{ cursor: 'pointer' }} />
        </Link>
      ),
    },
    {
      title: 'حذف',
      key: 'delete',
      render: (_, record) => (
        <DeleteOutlined
          type="primary"
          style={{ color: 'red' }}
          onClick={() => handleDelete(record)}
        >
          حذف الإعلان
        </DeleteOutlined>
      ),
    },
  ];

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    GetAnns(signal)
      .then(({ data }) => {
        setAdvs(data.data);
      })
      .catch(() => openNotificationWithIcon('error', 'خطأ', 'حدث خطأ ما'));
  }, []);

  return (
    <>
      <div className="topContainer">
        <Title>الإعلانات</Title>
        <Link to="new">
          <Button type="primary" style={{ fontSize: '18px', height: '40px' }}>
            <PlusCircleOutlined />
            اضافة إعلان
          </Button>
        </Link>
      </div>
      {' '}
      <Table columns={columns} dataSource={advs} pagination={{ defaultPageSize: 3 }} />
    </>
  );
};

export default App;

interface AnnResponse {
  data: AnnResult;
}
interface AnnResult {
  data: UserAdvs[];
}
