import React from 'react';

// Componente para layout responsivo que se adapta a diferentes tamanhos de tela
const ResponsiveContainer = ({ children, className = '' }) => {
  return (
    <div className={`responsive-container ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
