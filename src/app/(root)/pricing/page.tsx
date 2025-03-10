'use client'
import { RocketFilled, CrownFilled, CheckCircleFilled, StarFilled, ThunderboltFilled } from '@ant-design/icons'
import { Card, Button, Divider, Typography, Switch, Row, Col } from 'antd'
import { useState } from 'react'

const { Title, Text } = Typography

const pricingPlans = [
  {
    title: "Indító",
    price: "0",
    description: "Alapvető funkciók kezdőknek",
    features: [
      "5 projekt limit",
      "Alapvető sablonok",
      "Közösségi támogatás",
      "1GB tárhely"
    ],
    recommended: false,
    icon: <StarFilled />
  },
  {
    title: "Pro",
    price: "9",
    description: "Legnépszerűbb választás",
    features: [
      "Korlátlan projektek",
      "Prémium sablonok",
      "Prioritásos támogatás",
      "10GB tárhely",
      "Csapattámogatás"
    ],
    recommended: true,
    icon: <RocketFilled />
  },
  {
    title: "Vállalati",
    price: "29",
    description: "Testreszabott megoldások",
    features: [
      "Egyéni limitek",
      "Dedikált támogatás",
      "SLA 99.9%",
      "Egyéni integrációk",
      "SSO",
      "Audit logok"
    ],
    recommended: false,
    icon: <CrownFilled />
  }
]

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const calculatePrice = (price: string) => {
    const numericPrice = parseFloat(price)
    return annualBilling ? (numericPrice * 10).toFixed(0) : numericPrice
  }

  return (
    <div style={{ 
      background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Title level={2} style={{ color: '#fff', marginBottom: 16 }}>
            <ThunderboltFilled style={{ color: '#7c3aed', marginRight: 12 }}/>
            Válaszd ki a megfelelő csomagot
          </Title>
          <Text style={{ color: '#a1a1aa', fontSize: 16 }}>
            14 napos pénzvisszafizetési garancia · Egyszerű frissítés és lemondás
          </Text>
          
          <div style={{ marginTop: 24 }}>
            <Switch
              checkedChildren="Éves számlázás"
              unCheckedChildren="Havi számlázás"
              checked={annualBilling}
              onChange={setAnnualBilling}
              style={{ background: annualBilling ? '#7c3aed' : '#333' }}
            />
            {annualBilling && (
              <Text style={{ color: '#7c3aed', marginLeft: 12 }}>
                ✨ 2 hónap ingyen!
              </Text>
            )}
          </div>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {pricingPlans.map((plan, index) => (
            <Col key={index} xs={24} md={12} lg={8}>
              <Card
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#18181b',
                  border: `1px solid ${plan.recommended ? '#7c3aed' : '#333'}`,
                  borderRadius: 16,
                  transform: hoveredCard === index ? 'translateY(-10px)' : 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                bodyStyle={{ padding: 24 }}
              >
                {plan.recommended && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#7c3aed',
                    color: 'white',
                    padding: '4px 12px',
                    borderBottomLeftRadius: 8,
                    fontSize: 12
                  }}>
                    Legnépszerűbb
                  </div>
                )}
                
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ 
                    background: '#3f3f46',
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: 24
                  }}>
                    {plan.icon}
                  </div>
                  <Title level={3} style={{ color: '#fff', marginBottom: 8 }}>
                    {plan.title}
                  </Title>
                  <Text style={{ color: '#a1a1aa' }}>{plan.description}</Text>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    justifyContent: 'center',
                    marginBottom: 8
                  }}>
                    <Text style={{ 
                      fontSize: 48, 
                      fontWeight: 700, 
                      color: '#fff',
                      lineHeight: 1
                    }}>
                      ${calculatePrice(plan.price)}
                    </Text>
                    <Text style={{ color: '#a1a1aa', marginLeft: 8 }}>
                      /{annualBilling ? 'év' : 'hó'}
                    </Text>
                  </div>
                </div>

                <Button
                  block
                  size="large"
                  type={plan.recommended ? 'primary' : 'default'}
                  style={{ 
                    background: plan.recommended 
                      ? 'linear-gradient(135deg, #7c3aed, #5b21b6)' 
                      : '#3f3f46',
                    border: 'none',
                    height: 48,
                    fontWeight: 600,
                    borderRadius: 8,
                    marginBottom: 24
                  }}
                >
                  Kezdjük most
                </Button>

                <Divider style={{ borderColor: '#333' }} />

                <div style={{ textAlign: 'left' }}>
                  {plan.features.map((feature, i) => (
                    <div key={i} style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 12,
                      color: '#fff'
                    }}>
                      <CheckCircleFilled style={{ color: '#7c3aed' }}/>
                      <Text style={{ color: '#fff' }}>{feature}</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Feature Comparison Table */}
        <div style={{ 
          background: '#18181b',
          borderRadius: 16,
          padding: 24,
          marginTop: 60,
          border: '1px solid #333'
        }}>
          <Title level={4} style={{ color: '#fff', marginBottom: 24 }}>
            Részletes összehasonlítás
          </Title>
          
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Text strong style={{ color: '#fff' }}>Funkciók</Text>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Text strong style={{ color: '#fff' }}>Pro</Text>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Text strong style={{ color: '#fff' }}>Vállalati</Text>
            </Col>
          </Row>

          {[
            ['Felhasználók száma', '3', '10', 'Korlátlan'],
            ['Tárhely', '10GB', '50GB', '500GB+'],
            ['Támogatás', '24h', '1h', 'Azonnali'],
          ].map(([feature, ...values], i) => (
            <Row 
              key={i} 
              gutter={[24, 24]} 
              style={{ 
                padding: '12px 0',
                borderBottom: '1px solid #333',
                alignItems: 'center'
              }}
            >
              <Col span={8}>
                <Text style={{ color: '#a1a1aa' }}>{feature}</Text>
              </Col>
              {values.map((value, j) => (
                <Col 
                  key={j} 
                  span={8} 
                  style={{ 
                    textAlign: 'center',
                    color: j === values.length - 1 ? '#7c3aed' : '#fff'
                  }}
                >
                  {value}
                </Col>
              ))}
            </Row>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <Title level={3} style={{ color: '#fff' }}>
            Kérdéseid vannak?
          </Title>
          <div style={{ marginTop: 24 }}>
            <Button 
              size="large" 
              style={{ 
                marginRight: 16,
                background: '#3f3f46',
                border: 'none',
                color: '#fff'
              }}
            >
              Kapcsolatfelvétel
            </Button>
            <Button 
              type="primary" 
              size="large"
              style={{ 
                background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                border: 'none'
              }}
            >
              Ingyenes próba
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}