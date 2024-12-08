import React, { ReactNode } from 'react';
import useOnlineStatus from '../utils/OnlineStatus';
import Image from 'next/image';
interface FallbackUIProps {
  children: ReactNode;
}

const FallbackUI: React.FC<FallbackUIProps> = ({ children }) => {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f2f5',
        color: '#333',
        flexDirection: 'column',
        padding: '20px',
      }}>

        <Image src={"/no-internet.svg"} alt="No Internet Connection" width={150} height={150}/>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>No Internet Connection</h1>
        <p style={{ marginBottom: '20px', fontSize: '1.2rem' }}>
          It seems you&apos;re offline. Check your connection and refresh the page.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default FallbackUI;