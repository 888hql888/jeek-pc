import React,{useState,useRef} from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Select,
  message,
  Input,
  Upload,
  Modal,
  Image
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill';
import { Link } from "react-router-dom";
import Channel from "@/components/Channel";
import 'react-quill/dist/quill.snow.css';
import styles from "./index.module.scss";
export default function Publish() {
  const [fileList,setFileList] = useState([])
  const [type,setType] = useState(0)
  const imageRef = useRef([])
  const [isModalVisible, setisModalVisible] = useState(false);
  const [imgPreSrc, setimgPre] = useState('');
  const formRef = useRef(null) //创建表单实例，方便后续调用 表单实例相关接口
  const [drag, setdrag] = useState(false);
  
  const onFinish = (v) => {
    console.log(v, "value...");
  };
  // 图片改变事件
  const handleChange = (v) => {
    console.log(type,v,'onimage');
    setFileList([...v.fileList])
    imageRef.current = v.fileList
    formRef.current.validateFields(['type'])
  }
  const handleRadio= (v) =>{
    const count = v.target.value
    setType(count)
    setFileList(
      imageRef.current.slice(0,count)
    )
  }
  const handlePreview = (file) => {
    setisModalVisible(true)
    setimgPre(file.response?.data?.url)
  }
  //自定义校验
  const validator = (rule,value) => {
    if(fileList.length<type){
      console.log(7777);
      return Promise.reject(new Error(`请上传${type}张图片`))
    }else return Promise.resolve()
  }
  //处理 发布/存入草稿 状态
  const handleStatus = (drag) => {
    console.log(5555);
    setdrag(drag)
    formRef.current.submit()
    // onFinish()
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="home/publish">发布文章</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form
          name='basic'
          ref={formRef}
          labelCol={{span:4}}
          wrapperCol={{span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={
           { richText:''} // ps:必须要给富文本设置默认值，否则报错
          }
        >
          <Form.Item label="标题" name="status"  rules={[
            {
              required: true,
              message: '标题不能为空',
            }
          ]}>
            <Input placeholder="请输入文章的标题" style={{width:400}}></Input>
          </Form.Item>
          {/* ps:封装的频道组件 有接收form.item的 value 和 onchange方法 */}
          <Form.Item label="频道" name="channel_id" rules={[
             {
              required: true,
              message: '频道不能为空',
            }
          ]}>
            <Channel></Channel>
          </Form.Item>
          <Form.Item label="封面" name="type"
            rules={
              [
                {
                  validator:validator
                }
              ]
            }
          >
            <Radio.Group onChange={handleRadio} defaultValue={type} value={type}>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item  wrapperCol={{offset:4,span: 20 }}>
          {
            type > 0 && <Upload
            listType="picture-card"
            fileList={fileList}
            name="image"
            maxCount={type}
            action={`${process.env.REACT_APP_URL}/upload`}
            onChange={handleChange}
            onPreview={handlePreview}
          >
             {fileList.length < type && <PlusOutlined />}
      </Upload>
          }
          </Form.Item>
          <Form.Item label="内容" name="richText" rules={[
             {
              required: true,
              message: '内容不能为空',
            }
          ]}>
            <ReactQuill style={{height:400,marginBottom:40}}></ReactQuill>
          </Form.Item>
          <Form.Item wrapperCol={{offset:4,span: 20 }}>
            <Button type="primary" htmlType="submit" >
              发布文章
            </Button>
            <Button  style={{marginLeft:20}}  onClick={()=>{handleStatus(true)}}>
              存入草稿
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* 图片预览框 */}
      <Modal title="图片预约" visible={isModalVisible} centered onCancel={()=>{setisModalVisible(false)}} footer={null}>
       <Image src={imgPreSrc}></Image>
      </Modal>
    </div>
  );
}
