import React, { useEffect } from 'react';

// Componente para exibir anúncios laterais do AdSense
const AdSidebar = ({ slot, style = {} }) => {
  useEffect(() => {
    // Tenta carregar os anúncios quando o componente é montado
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('Erro ao carregar anúncio lateral:', e);
    }
  }, []);

  // Estilo padrão para o container de anúncios laterais
  const defaultStyle = {
    display: 'block',
    position: 'sticky',
    top: '20px',
    width: '300px',
    height: '600px',
    margin: '0 auto',
    ...style
  };

  return (
    <div className="ad-sidebar" style={defaultStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4313031369883797"
        data-ad-slot={slot}
        data-ad-format="vertical"
        data-full-width-responsive="false"
      />
    </div>
  );
};

export default AdSidebar;
