import { Banner, User } from '../types';
import dayjs from 'dayjs';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    email: 'admin@example.com',
    name: '超级管理员',
    role: 'super_admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: 'u2',
    email: 'operator@example.com',
    name: '运营人员',
    role: 'operator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=operator'
  }
];

export const MOCK_BANNERS: Banner[] = [
  {
    id: 'b1',
    title: '春节大促活动',
    position: 'homepage_top',
    imageUrl: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20promotion%20banner%2C%20red%20and%20gold%20theme%2C%20festive%20atmosphere&image_size=landscape_16_9',
    linkUrl: 'https://example.com/cny2025',
    startTime: dayjs().add(1, 'day').toISOString(),
    endTime: dayjs().add(15, 'day').toISOString(),
    channel: 'all',
    cityCodes: ['all'],
    userType: 'all',
    loginStatus: 'all',
    weight: 100,
    status: 'online',
    remark: '春节主会场Banner',
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
    createdBy: 'u2'
  },
  {
    id: 'b2',
    title: '新人注册礼包',
    position: 'homepage_middle',
    imageUrl: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=New%20user%20gift%20package%20banner%2C%20gift%20box%20illustration%2C%20bright%20colors&image_size=landscape_16_9',
    linkUrl: 'https://example.com/newuser',
    startTime: dayjs().subtract(5, 'day').toISOString(),
    endTime: dayjs().add(25, 'day').toISOString(),
    channel: 'android',
    cityCodes: ['all'],
    userType: 'new',
    loginStatus: 'not_logged_in',
    weight: 80,
    status: 'online',
    remark: '针对安卓新用户的引导',
    createdAt: dayjs().subtract(5, 'day').toISOString(),
    updatedAt: dayjs().subtract(5, 'day').toISOString(),
    createdBy: 'u2'
  },
  {
    id: 'b3',
    title: '周末限时折扣',
    position: 'homepage_top',
    imageUrl: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Weekend%20flash%20sale%20banner%2C%20shopping%20cart%20and%20discount%20tags%2C%20modern%20style&image_size=landscape_16_9',
    linkUrl: 'https://example.com/weekend',
    startTime: dayjs().add(5, 'day').toISOString(),
    endTime: dayjs().add(7, 'day').toISOString(),
    channel: 'all',
    cityCodes: ['110000', '310000'],
    userType: 'old',
    loginStatus: 'logged_in',
    weight: 60,
    status: 'draft',
    remark: '周末活动待审核',
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    createdBy: 'u2'
  }
];
