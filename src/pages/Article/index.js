import React, { useEffect, useRef } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Select,
  DatePicker,
  Table,
  Tag,
  Space,
  Image,
  Popconfirm,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Link,useHistory} from "react-router-dom";
import { getChannel,getArticleList,delArticle} from "@/store/actions/article";
import { useDispatch, useSelector } from "react-redux";
import request from "@/utils/request";
import img from "@/assets/error.png";

// 定义 Radio 状态数据
const STATUS = [
  { id: -1, title: '全部', color: 'magenta' },
  { id: 0, title: '草稿', color: 'red' },
  { id: 1, title: '待审核', color: 'volcano' },
  { id: 2, title: '审核通过', color: 'lime' },
  { id: 3, title: '审核失败', color: 'gold' }
]
export default function Article() {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch()
  const history = useHistory()
  const optionsData = useSelector(state => state.article.channelList)
  const articleData = useSelector(state => state.article.articleData)
  const params = useRef({}) // 使用 useRef 创建的对象可以一直保持状态，并且不会被重复创建. 适合作为全局变量来使用 (其实使用useState也能实现功能)
  // 获取频道数据
  useEffect(()=>{
    dispatch(getChannel())
    dispatch(getArticleList())
  },[])
  //表格的列设置
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key:'cover',
      //render 的参数 写 dataIndex的value，就可以拿对应列的值
      render(cover) {
        const {type,images} = cover
        if(type!=0) return <Image src={images[0]}></Image>
        else return <Image src={img}></Image>
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      key:'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key:'status',
      render: (status) => {
        const obj = STATUS.find(item => item.id === status)
        return <Tag color={obj.color}>{obj.title}</Tag>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      key:'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      key:'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key:'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
      key:'like_count'
    },
    {
      title: '操作',
      dataIndex: 'id',
      key:'id',
      render(id) {
        return (
          <Space>
            <Button
              shape="circle"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => history.push(`/home/publish/${id}`)}
            />
            <Popconfirm title="确定要删除该文章吗？" onConfirm={() => del(id)}>
              <Button shape="circle" type="danger" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  const onFinish = (value) => {
    const {channel_id,date,status} = value
    params.current.status = status == -1 ? undefined : status
    params.current.channel_id = channel_id
    if(date){
      // moment格式的数据 内部使用了moment插件
      params.current.begin_pubdate = date[0]
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
      params.current.end_pubdate = date[1]
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    }else{
      params.current.begin_pubdate = params.current.end_pubdate = undefined
    }
    // 筛选页码为1
    params.current.page = 1
    params.current.per_page = 10
    // 调用接口
    dispatch(getArticleList(params.current))
  }
  // 页码改变事件
  const onChangePage = (page,per_page) => {
    params.current.page = page
    params.current.per_page = per_page
    dispatch(getArticleList(params.current))
  }
  // 删除文章
  const del = async (id) => {
    await dispatch(delArticle(id))
    await dispatch(getArticleList(params.current))
    message.success('删除成功!')
  }
  return (
    <div className={styles.articleRoot}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/home/article">内容管理</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          initialValues={{ status: -1 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              {STATUS.map((item) => (
                <Radio value={item.id} key={item.id}>
                  {item.title}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select style={{ width: 200 }}  allowClear>
              {optionsData.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 20 }}>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格 */}
      <Card
        style={{ marginTop: 16 }}
        title={`根据筛选条件共查询到${articleData.total_count}条结果:`}
      >
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={articleData.results}
          pagination={{
            total: articleData.total_count,
            onChange: onChangePage,
            current:articleData.page
          }}
        />
      </Card>
    </div>
  );
}
