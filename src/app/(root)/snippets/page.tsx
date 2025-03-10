import React from 'react';
import { Card } from 'antd';
import { Meta } from 'antd/es/list/Item';


function Page() { // ← Komponens neve nagybetűvel kezdődik!
  return (
    <div className='flex flex-col'>
      <h3>All snippets</h3>
      <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
    </div>
  )
}

export default Page;