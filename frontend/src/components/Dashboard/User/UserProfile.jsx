import React from 'react';
import { Card, Avatar, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './UserProfile.module.css';

const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className={styles.userProfileContainer}>
      <Card 
        cover={
          <div className={styles.avatarContainer}>
            <Avatar 
              size={128} 
              icon={<UserOutlined />} 
              className={styles.userAvatar}
            />
          </div>
        }
        className={styles.userProfileCard}
      >
        <Descriptions 
          title="User Details" 
          column={1} 
          bordered
          className={styles.userDetailsDescriptions}
        >
          <Descriptions.Item label="User ID">
            {user.userId}
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {user.email}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default UserProfile;