import React, { useState } from 'react';
import { Card, Form, Input, Button, Table, InputNumber, message, Divider, Upload, Alert } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { useStore } from '../store/useStore';
import { Banner } from '../types';

const StrategyConfig: React.FC = () => {
  const { banners, updateBanner, loading } = useStore();
  const [defaultImageUrl, setDefaultImageUrl] = useState('https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Default%20fallback%20banner%2C%20simple%20brand%20logo%2C%20minimalist&image_size=landscape_16_9');

  // Filter only online banners for priority management
  const activeBanners = banners.filter(b => b.status === 'online');

  const handleWeightChange = async (id: string, weight: number) => {
    try {
      await updateBanner(id, { weight });
      message.success('权重更新成功');
    } catch (error) {
      message.error('更新失败');
    }
  };

  const handleDefaultImageUpload = (info: any) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
        setDefaultImageUrl('https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=New%20default%20banner%2C%20placeholder&image_size=landscape_16_9');
        message.success('兜底图片上传成功 (模拟)');
    }
  };

  const columns = [
    {
      title: 'Banner标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '当前位置',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '权重值',
      dataIndex: 'weight',
      key: 'weight',
      render: (weight: number, record: Banner) => (
        <InputNumber
          min={0}
          max={1000}
          defaultValue={weight}
          onBlur={(e) => handleWeightChange(record.id, Number(e.target.value))}
          onStep={(value) => handleWeightChange(record.id, Number(value))}
        />
      ),
      sorter: (a: Banner, b: Banner) => a.weight - b.weight,
      defaultSortOrder: 'descend' as const,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => text ? new Date(text).toLocaleString() : '-',
    },
  ];

  return (
    <div className="space-y-6">
      <Alert
        message="策略说明"
        description="系统优先展示高权重Banner；当所有定向规则均未命中时，将展示兜底配置的默认图片。"
        type="info"
        showIcon
      />

      <Card title="兜底策略配置" bordered={false} className="shadow-sm">
        <div className="flex items-start gap-8">
          <div className="w-1/2">
            <Form layout="vertical">
              <Form.Item label="默认兜底图片" extra="当用户不满足任何Banner的定向条件时展示此图">
                <div className="flex gap-4">
                  <Upload
                    action="https://run.mocky.io/v3/mock"
                    maxCount={1}
                    onChange={handleDefaultImageUpload}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>更换图片</Button>
                  </Upload>
                  <Button type="primary" icon={<SaveOutlined />} onClick={() => message.success('兜底配置已保存')}>
                    保存配置
                  </Button>
                </div>
              </Form.Item>
              <Form.Item label="默认跳转链接">
                <Input defaultValue="https://example.com" />
              </Form.Item>
            </Form>
          </div>
          <div className="w-1/2">
            <div className="text-gray-500 mb-2">预览：</div>
            <img 
              src={defaultImageUrl} 
              alt="Default Banner" 
              className="w-full rounded border shadow-sm"
            />
          </div>
        </div>
      </Card>

      <Card title="在线Banner权重管理" bordered={false} className="shadow-sm">
        <Table
          dataSource={activeBanners}
          columns={columns}
          rowKey="id"
          pagination={false}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default StrategyConfig;
