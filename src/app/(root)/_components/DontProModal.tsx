import { 
    CrownOutlined,
    LockOutlined,
    CheckCircleOutlined,
    StarOutlined,
    CloudOutlined,
    SafetyCertificateOutlined,
    ClockCircleOutlined,
    RocketOutlined,
  } from '@ant-design/icons';
  import { Modal, Button, Row, Col, Divider, theme } from 'antd';
  import { CustomModalProps } from '@/types';
  const darkTheme = {
    background: '#141414',
    primaryColor: '#1890ff',
    textColor: 'rgba(255, 255, 255, 0.85)',
    secondaryText: 'rgba(255, 255, 255, 0.65)',
    cardBackground: '#1d1d1d',
    borderColor: '#303030',
  };
  
  function CustomModal({ open, onClose }: CustomModalProps) {
    const { token } = theme.useToken();
    
    return (
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: token.colorText }}>
            <CrownOutlined style={{ 
              fontSize: '20px', 
              color: token.colorWarning, 
              filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.3))'
            }} />
            <span style={{ 
              fontSize: '18px',
              fontWeight: 600,
              color: darkTheme.textColor 
            }}>
              Hopp, ehhez előfizetés szükséges
            </span>
          </div>
        }
        centered
        width={600}
        open={open}
        onOk={onClose}
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
            <p style={{ 
              fontSize: '16px', 
              marginBottom: '20px',
              color: darkTheme.textColor
            }}>
              Ha szeretnéd menteni a kódot, előfizetés szükséges
            </p>
            
            <Divider style={{ 
              color: darkTheme.secondaryText,
              borderColor: darkTheme.borderColor 
            }}>
              Előfizetéssel járó előnyök
            </Divider>
            
            <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
              {[
                { icon: <CheckCircleOutlined />, text: 'Korlátlan kódmentés', color: token.colorSuccess },
                { icon: <StarOutlined />, text: 'Prémium támogatás', color: token.colorWarning },
                { icon: <CloudOutlined />, text: 'Felhőtárhely', color: token.colorPrimary },
                { icon: <SafetyCertificateOutlined />, text: 'Biztonsági mentések', color: token.colorPrimary },
              ].map((item, index) => (
                <Col span={12} key={index}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 12,
                    padding: '8px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    transition: 'all 0.3s',
                  }}>
                    <div style={{ 
                      fontSize: '20px',
                      color: item.color,
                      filter: 'drop-shadow(0 0 4px rgba(24, 144, 255, 0.3))'
                    }}>
                      {item.icon}
                    </div>
                    <span style={{ color: darkTheme.textColor }}>{item.text}</span>
                  </div>
                </Col>
              ))}
            </Row>
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
              Talán később
            </Button>
            <Button 
              type="primary"
              shape="round"
              size="large"
              onClick={onClose}
              icon={<RocketOutlined />}
              style={{
                background: `linear-gradient(45deg, ${token.colorPrimary}, #1a5bff)`,
                border: 'none',
                boxShadow: '0 4px 14px rgba(24, 144, 255, 0.4)',
                padding: '0 32px',
              }}
            >
              Előfizetek most!
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  export default CustomModal