import React from 'react';

const App: React.FC <any> = ({ children }) => (
  <h1
    style={{
      fontSize: 'x-large',
      padding: '16px',
      textAlign: 'center',
      color: '#475E6B',
      fontWeight: 'bolder',
    }}
  >
    {children}
  </h1>
);
export default App;
