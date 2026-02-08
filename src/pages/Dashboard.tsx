import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { PictureOutlined, CheckCircleOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useStore } from '../store/useStore';

const Dashboard: React.FC = () => {
  const { banners } = useStore();

  const total = banners.length;
  const online = banners.filter(b => b.status === 'online').length;
  const pending = banners.filter(b => b.status === 'pending').length;
  const views = 12345; // Mock data

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">工作台</h2>
      
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="总Banner数"
              value={total}
              prefix={<PictureOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="在线Banner"
              value={online}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="待审核"
              value={pending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="今日曝光量"
              value={views}
              prefix={<EyeOutlined />}
              suffix="+"
            />
          </Card>
        </Col>
      </Row>

      <Card title="系统公告" bordered={false}>
        <p className="text-gray-500">欢迎使用Banner策略管理后台。本系统支持Banner的全生命周期管理，包括创建、审核、上线、下线等操作。</p>
        <p className="text-gray-500 mt-2">当前为演示模式，所有数据均为模拟数据，刷新页面后部分状态可能会重置（取决于Mock实现）。</p>
      </Card>
    </div>
  );
};

export default Dashboard;
