import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Select, DatePicker, Button, InputNumber, Radio, Upload, message, Space, Divider } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useStore } from '../store/useStore';
import { Banner } from '../types';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const BannerEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { banners, addBanner, updateBanner, loading } = useStore();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit && id) {
      const banner = banners.find(b => b.id === id);
      if (banner) {
        form.setFieldsValue({
          ...banner,
          timeRange: [dayjs(banner.startTime), dayjs(banner.endTime)],
        });
        setImageUrl(banner.imageUrl);
      } else {
        message.error('Banner不存在');
        navigate('/banners');
      }
    }
  }, [id, isEdit, banners, form, navigate]);

  const onFinish = async (values: any) => {
    const bannerData = {
      ...values,
      startTime: values.timeRange[0].toISOString(),
      endTime: values.timeRange[1].toISOString(),
      imageUrl: imageUrl || 'https://via.placeholder.com/800x400', // Fallback
      cityCodes: values.cityCodes || ['all'],
    };
    delete bannerData.timeRange;

    try {
      if (isEdit && id) {
        await updateBanner(id, bannerData);
        message.success('更新成功');
      } else {
        await addBanner({
          ...bannerData,
          status: 'draft',
        });
        message.success('创建成功');
      }
      navigate('/banners');
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleImageUpload = (info: any) => {
    // Simulate upload
    if (info.file.status === 'done' || info.file.status === 'uploading') {
        // Just mocking a URL for demo
        setImageUrl('https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Banner%20placeholder%2C%20abstract%20design%2C%20blue%20colors&image_size=landscape_16_9');
        message.success('图片上传成功 (模拟)');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/banners')}>
          返回列表
        </Button>
      </div>

      <Card title={isEdit ? '编辑Banner' : '新增Banner'} bordered={false} className="shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            position: 'homepage_top',
            channel: 'all',
            userType: 'all',
            loginStatus: 'all',
            weight: 0,
            cityCodes: ['all'],
          }}
        >
          <Divider>基础信息</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label="Banner标题"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input placeholder="请输入标题" />
            </Form.Item>

            <Form.Item
              name="position"
              label="展示位置"
              rules={[{ required: true, message: '请选择展示位置' }]}
            >
              <Select>
                <Option value="homepage_top">首页顶部</Option>
                <Option value="homepage_middle">首页中部</Option>
                <Option value="homepage_bottom">首页底部</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="图片上传"
              required
            >
               <Space direction="vertical" style={{ width: '100%' }}>
                <Upload
                  action="https://run.mocky.io/v3/435ba68c-f2a8-4945-8503-e62933860549" // Mock endpoint
                  listType="picture"
                  maxCount={1}
                  onChange={handleImageUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>点击上传</Button>
                </Upload>
                {imageUrl && (
                  <img src={imageUrl} alt="preview" className="w-full max-h-40 object-cover rounded border" />
                )}
              </Space>
            </Form.Item>

            <Form.Item
              name="linkUrl"
              label="跳转链接"
              rules={[{ required: true, message: '请输入跳转链接' }]}
            >
              <Input placeholder="https://" />
            </Form.Item>
          </div>

          <Form.Item
            name="timeRange"
            label="展示时间"
            rules={[{ required: true, message: '请选择展示时间' }]}
          >
            <RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Divider>定向规则</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="channel" label="投放渠道">
              <Radio.Group>
                <Radio.Button value="all">全部</Radio.Button>
                <Radio.Button value="android">Android</Radio.Button>
                <Radio.Button value="ios">iOS</Radio.Button>
                <Radio.Button value="h5">H5</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="userType" label="用户类型">
              <Radio.Group>
                <Radio.Button value="all">全部</Radio.Button>
                <Radio.Button value="new">新用户</Radio.Button>
                <Radio.Button value="old">老用户</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="loginStatus" label="登录状态">
              <Radio.Group>
                <Radio.Button value="all">全部</Radio.Button>
                <Radio.Button value="logged_in">已登录</Radio.Button>
                <Radio.Button value="not_logged_in">未登录</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="cityCodes" label="城市/站点">
              <Select mode="tags" placeholder="输入城市编码，默认为all">
                <Option value="all">全部</Option>
                <Option value="110000">北京</Option>
                <Option value="310000">上海</Option>
                <Option value="440100">广州</Option>
                <Option value="440300">深圳</Option>
              </Select>
            </Form.Item>
          </div>

          <Divider>高级配置</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="weight" label="权重优先级" tooltip="数值越大优先级越高">
              <InputNumber min={0} max={1000} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item name="remark" label="备注说明">
              <TextArea rows={1} />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button onClick={() => navigate('/banners')}>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default BannerEdit;
