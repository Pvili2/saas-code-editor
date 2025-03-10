import React, { useEffect } from 'react'
import { ConfigProvider,Select, SelectProps,Space } from 'antd'
import { useDispatch } from 'react-redux'
import { setLanguage } from '@/lib/reducers/codeStore';
import { Languages } from '@/types';
import { CaretDownOutlined, JavaScriptOutlined, PythonOutlined,JavaOutlined, Html5Outlined  } from '@ant-design/icons';
import { fetchLanguages } from './output_api';


const languageOptions: SelectProps['options'] = [
    {
      value: 'javascript',
      label: (
        <Space>
          <JavaScriptOutlined style={{ color: '#f7df1e' }} />
          JavaScript
        </Space>
      ),
    },
    {
      value: 'python',
      label: (
        <Space>
          <PythonOutlined style={{ color: '#3776ab' }} />
          Python
        </Space>
      ),
    },
    {
      value: 'java',
      label: (
        <Space>
          <JavaOutlined style={{ color: '#007396' }} />
          Java
        </Space>
      ),
    },
    {
      value: 'html',
      label: (
        <Space>
          <Html5Outlined style={{ color: '#e34f26' }} />
          HTML
        </Space>
      ),
    },
  ]
function LanguageSelector() {
    const dispatch = useDispatch();

    const fetchLangs = async ()=>{
         await fetchLanguages()
      }
    useEffect(() => {
      fetchLangs()
    }, [])
  return (
    <ConfigProvider
                theme={{
                  token:{
                    colorTextPlaceholder: "white",
                    colorText: '#fff',
                    colorBorder: "none"
                  },
                  components:{
                    Select: {
                      optionSelectedBg: 'rgba(39, 39, 42, 0.8)',
                      activeOutlineColor: 'white',
                      selectorBg: 'rgba(39, 39, 42, 0.8)',
                      optionSelectedColor: "white"
                      
                    }
                  }
                }}
              >

                <Select
                optionLabelProp='label'
                onChange={(value) => dispatch(setLanguage((Languages[value as keyof typeof Languages])))}
                style={{

                  width: 200,
                  background: 'rgba(39, 39, 42, 0.8)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(4px)',
                  color: "white"
                }}
                dropdownStyle={{
                  background: 'rgba(24, 24, 27, 0.95)',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
                  color: "white"
                }}
                suffixIcon={
                  <CaretDownOutlined 
                    style={{ 
                      color: '#a1a1aa',
                      fontSize: '12px',
                      transition: 'transform 0.2s',
                    }}
                    />
                  }
                  options={languageOptions}
                  optionRender={(option) => (
                    <div
                    className='opt'
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: "white"
                    }}
                    >
                    <style jsx>
                      {`
                        .opt:focus{
                          background-color:black;
                          }
                          `}
                    </style>
                    {option.data?.label}
                  </div>
                )}
                variant="filled"
                popupMatchSelectWidth={false}
                menuItemSelectedIcon={null}
                
                />
                </ConfigProvider>
  )
}

export default LanguageSelector