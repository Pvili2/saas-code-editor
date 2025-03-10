import { ChangeEvent } from 'react';
import { 
    LockOutlined,
    ClockCircleOutlined,
    RocketOutlined,
  } from '@ant-design/icons';
  import { Modal, Button,Space, Divider, theme, Input, ConfigProvider } from 'antd';
  import { CustomModalProps } from '@/types';
  import { useDispatch, useSelector } from 'react-redux';
  import { useMutation } from 'convex/react';
  import { api } from '../../../../convex/_generated/api';
  import { RootState } from '@/lib/store';
  import html2canvas from 'html2canvas';
import { setProjectTitle, setPreviewImg } from '@/lib/reducers/codeStore';
  const darkTheme = {
    background: '#141414',
    primaryColor: '#1890ff',
    textColor: 'rgba(255, 255, 255, 0.85)',
    secondaryText: 'rgba(255, 255, 255, 0.65)',
    cardBackground: '#1d1d1d',
    borderColor: '#303030',
  };
  
  function ProModal({ open, onClose, canvasRef, setIsSuccessSave }: CustomModalProps) {
    const { token } = theme.useToken();
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.userSlicer.allData)
    const code = useSelector((state: RootState) => state.codeReducer.value)
    const language = useSelector((state :RootState) => state.codeReducer.language)
    const prevImg = useSelector((state: RootState) => state.codeReducer.previewImg)
    const title = useSelector((state: RootState) => state.codeReducer.projectTitle)
    const isSaved = useMutation(api.snippets.saveSnippets)
    
    const generatePreview = async () => {
        if(!canvasRef!.current) return null;
    
        try {
          const canvas = await html2canvas(canvasRef!.current, {
            scale: 3,
            x:20,
            y:70,
            height: 200,
            width: 400,
            backgroundColor: '#1e1e1e',
            useCORS: true,
            logging: true,
            windowWidth: 200,
            windowHeight: 400
          })
    
    
          dispatch(setPreviewImg(canvas.toDataURL('image/png') ))
          console.log(prevImg) 
        } catch (error) {
          console.error(error)
          dispatch(setPreviewImg(""))
        }
      }
    const save = async () => {
        if (!user?.isPro ) {
            await generatePreview()

            console.log(prevImg)
            isSaved({
              code: code || "",
              language,
              previewImg: prevImg,
              userId: user?._id || "",
              title: title || "",
              userName: user?.name || "",
              version: "",
            }).then(() => {
              setIsSuccessSave!(true)
              dispatch(setProjectTitle(""))
              onClose()
            }) 
          }
        }
    return (
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: token.colorText }}>
            <span style={{ 
              fontSize: '18px',
              fontWeight: 600,
              color: darkTheme.textColor 
            }}>
              Biztosan elakarod menteni ezt a kódot?
            </span>
          </div>
        }
        centered
        width={600}
        open={open}
        onOk={save}
        onCancel={onClose}
        footer={null}
        styles={{
          content: {
            background: darkTheme.background,
            border: `1px solid ${darkTheme.borderColor}`,
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.45)'
          },
          header: {
            background: darkTheme.background,
            borderBottom: `1px solid ${darkTheme.borderColor}`
          }
        }}
      >
        <div style={{ 
          textAlign: 'center',
          padding: '24px 0'
        }}>
          <LockOutlined style={{ 
            fontSize: '64px', 
            color: darkTheme.primaryColor,
            marginBottom: '24px',
            filter: 'drop-shadow(0 0 8px rgba(24, 144, 255, 0.4))'
          }} />
          
          <div style={{ 
            backgroundColor: darkTheme.cardBackground,
            padding: '24px',
            borderRadius: '12px',
            border: `1px solid ${darkTheme.borderColor}`,
            marginBottom: '24px',
            position: 'relative',
            overflow: 'hidden',
            
          }}>
            <Divider style={{ 
              color: darkTheme.secondaryText,
              borderColor: darkTheme.borderColor 
            }}>
              Add meg a projekt nevét:
            </Divider>
            <ConfigProvider theme={
                {
                    token:{
                        colorText: "white",
                        colorTextPlaceholder: "gray",
                    },
                }
            }>
                <Space.Compact>
                    <Input value={title} onChange={(e :ChangeEvent<HTMLInputElement>) => dispatch(setProjectTitle(e.target.value))} 
                    style={{
                        background: 'rgba(39, 39, 42, 0.8)',
                    }} placeholder='Írd be a projekt nevet' />
                </Space.Compact>
            </ConfigProvider>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center',
            marginTop: '32px'
          }}>
            <Button 
              shape="round"
              size="large"
              onClick={onClose}
              icon={<ClockCircleOutlined />}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: darkTheme.borderColor,
                color: darkTheme.textColor,
                padding: '0 24px',
              }}
            >
              Mégse
            </Button>
            <Button 
              type="primary"
              shape="round"
              size="large"
              onClick={save}
              icon={<RocketOutlined />}
              style={{
                background: `linear-gradient(45deg, ${token.colorPrimary}, #1a5bff)`,
                border: 'none',
                boxShadow: '0 4px 14px rgba(24, 144, 255, 0.4)',
                padding: '0 32px',
              }}
            >
              Kód mentése!
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  export default ProModal;