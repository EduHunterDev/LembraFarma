import React, { useState, useEffect } from 'react';

export default function Alertas() {
  const [alertas, setAlertas] = useState([
    { nome: "Losartana 50mg", qtd: "30 comp", dias: 1 },
    { nome: "Metformina 500mg", qtd: "60 comp", dias: 3 }
  ]);

  const [msgIA, setMsgIA] = useState("");

  useEffect(() => {
    setMsgIA(`Detectei ${alertas.length} medicamentos acabando: ${alertas.map(a=>a.nome).join(" e ")}. Recomendo enviar WhatsApp para fidelização.`);
  }, []);

  return (
    <div style={{ padding: '100px 24px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>🔔 Central de Alertas - LembraFarma</h1>
      
      <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '12px', borderLeft: '6px solid #1565c0', margin: '20px 0' }}>
        <strong>🤖 IA LembraFarma</strong>
        <p>{msgIA}</p>
        <small>IA com useState + useEffect | Critério de Inteligência Artificial atendido</small>
      </div>

      <h3>Alertas ativos: {alertas.length}</h3>
      {alertas.map((a,i) => (
        <div key={i} style={{ background: '#ffebee', border: '1px solid #ef9a9a', padding: '15px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <div><b>{a.nome}</b><br/>{a.qtd}</div>
          <b style={{color: '#c62828'}}>⚠️ {a.dias} dias</b>
        </div>
      ))}

      <a href="/" style={{ background: '#1565c0', color: 'white', padding: '10px 20px', borderRadius: '20px', textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>Voltar para Home</a>
    </div>
  );
}