import React from 'react'
import { useGetChannel } from '@/hooks'
import { Select } from 'antd'
export default function Channel(props) {
    // console.log(props,'接收form-item组件的传值...');
    const {Option} = Select
    // 通过自定义hooks获取频道数据
    const channelList = useGetChannel()
    return (
        // ps:!!!! 一定要将 props 组件包装好的value和onChange传递给Select组件，否则封装后的组件，选完值没办法传给form表单的onFinsh收集.
        <Select style={{ width: 200 }} {...props}  allowClear>
              {channelList.map((item) => (
                <Option value={item.id} ke={item.id}>
                  {item.name}
                </Option>
              ))}
        </Select>
    )
}
