import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'NewKenyan - Kenya Business Directory, Properties & Jobs'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            fontSize: '120px',
            fontWeight: 'bold',
            color: 'white',
            marginRight: '30px',
            fontFamily: 'system-ui, sans-serif',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            NK
          </div>
          <div style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            NewKenyan
          </div>
        </div>
        
        <div style={{
          fontSize: '36px',
          color: 'rgba(255,255,255,0.95)',
          textAlign: 'center',
          maxWidth: '900px',
          lineHeight: '1.3',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: '500',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Kenya's Leading Platform for Properties, Businesses & Jobs
        </div>
        
        <div style={{
          display: 'flex',
          marginTop: '60px',
          fontSize: '24px',
          color: 'rgba(255,255,255,0.9)',
          gap: '40px',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            🏠 Properties
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            🏢 Businesses
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            💼 Jobs
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}