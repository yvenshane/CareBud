import React, { useState } from 'react';
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { AtButton, AtCard, AtList, AtListItem, AtActionSheet, AtActionSheetItem } from 'taro-ui';
import Taro from '@tarojs/taro';
import './index.scss'

interface Child {
  id: string;
  name: string;
}

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  // 模拟孩子数据，实际应从后端或本地存储获取
  const [children, setChildren] = useState<Child[]>([
    { id: '1', name: '孩子 A' },
    { id: '2', name: '孩子 B' },
  ]);
  const [currentChild, setCurrentChild] = useState<Child | null>(children[0] || null);
  const [showMenu, setShowMenu] = useState(false);

  // 点击导航栏孩子姓名，显示下拉菜单
  const handleChildClick = () => {
    if (children.length > 0) {
      setShowMenu(true);
    } else {
      // 没有孩子时，点击跳转到添加孩子页面
      Taro.navigateTo({ url: '/pages/addChild/index' });
    }
  };

  // 切换孩子
  const switchChild = (child: Child) => {
    setCurrentChild(child);
    setShowMenu(false);
  };

  // 添加孩子
  const addChild = () => {
    Taro.navigateTo({ url: '/pages/addChild/index' });
    setShowMenu(false);
  };

  return (
    <View className="index">
      {/* 自定义导航栏 */}
      <View className="custom-nav">
        {children.length > 0 ? (
          <Text className="child-name" onClick={handleChildClick}>
            {currentChild?.name || '选择孩子'}
          </Text>
        ) : (
          <AtButton type="primary" size="small" onClick={addChild}>
            添加孩子
          </AtButton>
        )}
      </View>

      {/* 快速操作区 */}
      <View className="actions">
        <AtButton type="primary" className="action-button">记录体温</AtButton>
        <AtButton type="secondary" className="action-button">记录用药</AtButton>
      </View>

      {/* 最近体温记录 */}
      <AtCard title="最近体温记录" className="recent-temp">
        <AtList>
          <AtListItem title="最近一次：37.5°C (腋下) 10:00" />
          <AtListItem title="前一次：37.2°C (腋下) 08:00" />
        </AtList>
      </AtCard>

      {/* 即将用药提醒 */}
      <AtCard title="即将用药提醒" className="upcoming-med">
        <AtList>
          <AtListItem title="12:00 - paracetamol 5ml" />
        </AtList>
      </AtCard>

      {/* 数据概览（占位） */}
      <View className="data-overview">
        <Text>体温趋势图（待实现）</Text>
        <Text>用药统计（待实现）</Text>
      </View>

      {/* 下拉菜单 */}
      <AtActionSheet isOpened={showMenu} onClose={() => setShowMenu(false)}>
        {children.map((child) => (
          <AtActionSheetItem key={child.id} onClick={() => switchChild(child)}>
            {child.name}
          </AtActionSheetItem>
        ))}
        <AtActionSheetItem onClick={addChild}>添加孩子</AtActionSheetItem>
      </AtActionSheet>
    </View>
  )
}
