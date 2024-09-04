
import {Button} from "antd";
import {SaveOutlined} from "@ant-design/icons";
const Room_typePage = ()=>{
  return(
    <div>
      <h1>Welcome to Room-Type Page</h1>
      <Button>default</Button>
      <Button type="primary">Primary</Button>
      <Button type="dashed">Primary</Button>
      <Button type="disable">Primary</Button>
      <Button icon={<SaveOutlined/>} iconPositions="end">Button Test</Button>

    </div>
  );
};

export default Room_typePage;