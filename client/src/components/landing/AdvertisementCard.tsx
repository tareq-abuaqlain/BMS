import { Card, Col, Button } from 'antd';
import React from 'react';

const { Meta } = Card;
type AdsType = {
  id:number;
  image: string;
  title: string;
  description: string;
};
  type AdProps = { info:AdsType };
const AdvertisementCard: React.FC<AdProps> = ({ info }) => (
// export default function App({ info } : AdProps) {
//   return (
  <Col span={8}>
    <Card
      style={{ width: 300, height: 400 }}
      cover={(
        <img
          style={{ height: 200 }}
          alt="Advertisement"
          src={info.image}
        />
          )}
      actions={[
        <Button
          style={{
            backgroundColor: '#475E6B',
            color: 'white',
            borderRadius: '5px',
          }}
        >
          انقر للمزيد
        </Button>,
      ]}
    >
      <Meta
        style={{ height: 120 }}
        title={info.title}
        description={info.description}
      />
    </Card>
  </Col>
);
export default AdvertisementCard;
