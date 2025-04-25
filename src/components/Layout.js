import React, { useEffect } from 'react';
import AdBanner from './AdBanner';
import AdSidebar from './AdSidebar';
import ResponsiveContainer from './ResponsiveContainer';

// Componente de layout que organiza o conteúdo e os anúncios
const Layout = ({ children }) => {
  // Detecta se está em dispositivo móvel
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    // Função para verificar o tamanho da tela
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verifica inicialmente
    checkIfMobile();

    // Adiciona listener para redimensionamento
    window.addEventListener('resize', checkIfMobile);

    // Remove listener ao desmontar
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="layout-container">
      {/* Banner superior */}
      <div className="top-banner">
        <AdBanner 
          slot="1234567890" 
          format="horizontal" 
          style={{ marginBottom: '20px' }} 
        />
      </div>

      <ResponsiveContainer className="main-content-wrapper">
        <div className="content-and-sidebar" style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Conteúdo principal */}
          <main style={{ 
            flex: '1 1 auto',
            minWidth: 0,
            padding: isMobile ? '0' : '0 20px 0 0'
          }}>
            {children}
          </main>

          {/* Barra lateral com anúncios (apenas em desktop) */}
          {!isMobile && (
            <aside style={{ 
              flex: '0 0 300px',
              marginLeft: '20px'
            }}>
              <AdSidebar slot="0987654321" />
            </aside>
          )}
        </div>
      </ResponsiveContainer>

      {/* Banner inferior */}
      <div className="bottom-banner">
        <AdBanner 
          slot="5678901234" 
          format="horizontal" 
          style={{ marginTop: '30px' }} 
        />
      </div>
    </div>
  );
};

export default Layout;
