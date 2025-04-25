import React, { useEffect } from 'react';

// Componente para exibir anúncios do AdSense
const AdBanner = ({ slot, format = 'auto', responsive = true, style = {} }) => {
  useEffect(() => {
    // Tenta carregar os anúncios quando o componente é montado
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('Erro ao carregar anúncio:', e);
    }
  }, []);

  // Estilo padrão para o container de anúncios
  const defaultStyle = {
    display: 'block',
    textAlign: 'center',
    margin: '15px auto',
    ...style
  };

  return (
    <div className="ad-container" style={defaultStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4313031369883797"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdBanner;
