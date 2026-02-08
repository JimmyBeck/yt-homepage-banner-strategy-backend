import React, { useEffect, useState } from 'react';
import { Table, Card, Form, Input, Select, DatePicker, Button, Space, Tag, Modal, message, Tooltip } from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, StopOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useStore } from '../store/useStore';
import { Banner, BannerStatus } from '../types';

const { RangePicker } = DatePicker;
const { Option } = Select;

const BannerList: React.FC = () => {
  const navigate = useNavigate();
  const { banners, loading, fetchBanners, deleteBanner, batchUpdateStatus } = useStore();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSearch = (values: any) => {
    // Client-side filtering simulation
    fetchBanners(values);
  };

  const handleReset = () => {
    form.resetFields();
    fetchBanners();
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '删除后无法恢复，确定要删除吗？',
      okType: 'danger',
      onOk: async () => {
        await deleteBanner(id);
        message.success('删除成功');
      },
    });
  };

  const handleStatusChange = async (id: string, status: BannerStatus) => {
    await batchUpdateStatus([id], status);
    message.success(`已${status === 'online' ? '上线' : '下线'}Banner`);
  };

  const handleBatchStatus = (status: BannerStatus) => {
    if (selectedRowKeys.length === 0) return;
    
    Modal.confirm({
      title: `确认批量${status === 'online' ? '上线' : '下线'}`,
      content: `确定要${status === 'online' ? '上线' : '下线'}选中的 ${selectedRowKeys.length} 个Banner吗？`,
      onOk: async () => {
        await batchUpdateStatus(selectedRowKeys as string[], status);
        message.success('批量操作成功');
        setSelectedRowKeys([]);
      },
    });
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Banner) => (
        <Space>
          <img src={record.imageUrl} alt={text} className="w-10 h-6 object-cover rounded" />
          <span className="font-medium">{text}</span>
        </Space>
      ),
    },
    {
      title: '位置',
      dataIndex: 'position',
      key: 'position',
      render: (pos: string) => {
        const map: Record<string, string> = {
          homepage_top: '首页顶部',
          homepage_middle: '首页中部',
          homepage_bottom: '首页底部',
        };
        return map[pos] || pos;
      },
    },
    {
      title: '展示时间',
      key: 'time',
      render: (_: any, record: Banner) => (
        <div className="text-xs text-gray-500">
          <div>{dayjs(record.startTime).format('YYYY-MM-DD HH:mm')}</div>
          <div>{dayjs(record.endTime).format('YYYY-MM-DD HH:mm')}</div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          online: 'green',
          offline: 'default',
          draft: 'orange',
          pending: 'blue',
          rejected: 'red',
        };
        const textMap: Record<string, string> = {
          online: '已上线',
          offline: '已下线',
          draft: '草稿',
          pending: '待审核',
          rejected: '已拒绝',
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      },
    },
    {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a: Banner, b: Banner) => a.weight - b.weight,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Banner) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              className="text-blue-600"
              onClick={() => navigate(`/banners/${record.id}`)}
            />
          </Tooltip>
          
          {record.status !== 'online' && (
            <Tooltip title="上线">
              <Button 
                type="text" 
                icon={<CheckCircleOutlined />} 
                className="text-green-600"
                onClick={() => handleStatusChange(record.id, 'online')}
              />
            </Tooltip>
          )}
          
          {record.status === 'online' && (
            <Tooltip title="下线">
              <Button 
                type="text" 
                icon={<StopOutlined />} 
                className="text-orange-500"
                onClick={() => handleStatusChange(record.id, 'offline')}
              />
            </Tooltip>
          )}
          
          <Tooltip title="删除">
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              danger
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Card bordered={false} className="shadow-sm">
        <Form form={form} layout="inline" onFinish={handleSearch} className="gap-y-4">
          <Form.Item name="keyword">
            <Input placeholder="输入标题搜索" prefix={<SearchOutlined />} />
          </Form.Item>
          <Form.Item name="status">
            <Select placeholder="状态" style={{ width: 120 }} allowClear>
              <Option value="online">已上线</Option>
              <Option value="offline">已下线</Option>
              <Option value="draft">草稿</Option>
              <Option value="pending">待审核</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dateRange">
            <RangePicker placeholder={['开始时间', '结束时间']} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button onClick={handleReset} icon={<ReloadOutlined />}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card 
        bordered={false} 
        className="shadow-sm"
        title="Banner列表"
        extra={
          <Space>
            {selectedRowKeys.length > 0 && (
              <>
                <Button onClick={() => handleBatchStatus('online')}>批量上线</Button>
                <Button onClick={() => handleBatchStatus('offline')}>批量下线</Button>
              </>
            )}
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/banners/new')}>
              新增Banner
            </Button>
          </Space>
        }
      >
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          columns={columns}
          dataSource={banners}
          rowKey="id"
          loading={loading}
          pagination={{
            total: banners.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  );
};

export default BannerList;
