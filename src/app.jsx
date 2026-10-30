import { useEffect, useRef, useState } from 'react'
import { buscarEstados } from './utils/estados.js'
import { mascararTelefone } from './utils/telefone.js'
import { mascararCPF, validarCPF } from './utils/cpf.js'
import { mascararCEP, buscarEnderecoPorCEP } from './utils/cep.js'

export default function App() {
  const [cpf, setCpf] = useState('')
  const [erroCpf, setErroCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [cidade, setCidade] = useState('')
  const [erroCep, setErroCep] = useState('')
  const [buscandoCep, setBuscandoCep] = useState(false)
  const [estados, setEstados] = useState([])
  const [estado, setEstado] = useState('')
  const [erroEstados, setErroEstados] = useState('')
  const buscaCepRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    buscarEstados(controller.signal)
      .then(setEstados)
      .catch((erro) => {
        if (erro.name !== 'AbortError') setErroEstados(erro.message)
      })
    return () => controller.abort()
  }, [])

  const handleCepChange = async (event) => {
    const valor = mascararCEP(event.target.value)
    setCep(valor)
    setErroCep('')

    buscaCepRef.current?.abort()
    if (valor.length !== 9) {
      setBuscandoCep(false)
      return
    }

    const controller = new AbortController()
    buscaCepRef.current = controller
    setBuscandoCep(true)
    try {
      const endereco = await buscarEnderecoPorCEP(valor, controller.signal)
      setRua(endereco.rua)
      setCidade(endereco.cidade)
    } catch (erro) {
      if (erro.name === 'AbortError') return
      setRua('')
      setCidade('')
      setErroCep(erro.message)
    }
    if (!controller.signal.aborted) setBuscandoCep(false)
  }

  const handleReset = () => {
    buscaCepRef.current?.abort()
    setCpf('')
    setErroCpf('')
    setTelefone('')
    setCep('')
    setRua('')
    setCidade('')
    setEstado('')
    setErroCep('')
    setBuscandoCep(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (cpf && !validarCPF(cpf)) {
      setErroCpf('CPF inválido')
      return
    }
    setErroCpf('')

    const dados = Object.fromEntries(new FormData(event.currentTarget))
    const cliente = {
      nome: dados.nome,
      cpf: dados.cpf,
      telefone: dados.telefone,
      email: dados.email,
      endereco: {
        cep: dados.cep,
        rua: dados.rua,
        numero: dados.numero,
        complemento: dados.complemento,
        cidade: dados.cidade,
        estado: dados.estado
      }
    }

    console.log(JSON.stringify(cliente, null, 2))
  }

  return (
    <>
      <header className="site-header">
        <nav className="navigation" aria-label="Navegação principal">
          <a className="brand" href="../Index.html" aria-label="LembraFarma - início">
            <img src="../assets/Logo.png" alt="" />
            <span>LembraFarma</span>
          </a>

          <div className="nav-links">
            <a href="../Index.html">Início</a>
            <a href="clientes.html" aria-current="page">Clientes</a>
            <a href="Contato.html">Contato</a>
          </div>
        </nav>
      </header>

      <main className="page-shell">
        <form onSubmit={handleSubmit} onReset={handleReset}>
        <section className="page-panel" aria-labelledby="cliente-title">
          <div className="page-heading">
            <p className="eyebrow">Clientes</p>
            <h1 id="cliente-title">Cadastro de clientes</h1>
          </div>

          <div className="form-card">
            <div className="form-grid">
              <div className="field-group">
                <label htmlFor="nome">Nome completo</label>
                <input id="nome" name="nome" type="text" maxLength={120} required />
              </div>
              <div className="field-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  inputMode="numeric"
                  maxLength={14}
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(event) => setCpf(mascararCPF(event.target.value))}
                  onBlur={() => setErroCpf(cpf && !validarCPF(cpf) ? 'CPF inválido' : '')}
                  aria-invalid={erroCpf ? 'true' : 'false'}
                />
                {erroCpf && <span className="field-error">{erroCpf}</span>}
              </div>
              <div className="field-group">
                <label htmlFor="telefone">Telefone</label>
                <input id="telefone" name="telefone" type="tel" maxLength={15} placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(mascararTelefone(e.target.value))} />
              </div>
              <div className="field-group">
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" placeholder="cliente@email.com" />
              </div>
            </div>
          </div>
        </section>

        <section className="page-panel" aria-labelledby="endereco-title">
          <div className="page-heading">
            <p className="eyebrow">Endereço</p>
            <h2 id="endereco-title">Endereço do cliente</h2>
          </div>

          <div className="form-card">
            <div className="form-grid">
              <div className="field-group">
                <label htmlFor="cep">CEP</label>
                <input
                  id="cep"
                  name="cep"
                  type="text"
                  inputMode="numeric"
                  maxLength={9}
                  placeholder="00000-000"
                  value={cep}
                  onChange={handleCepChange}
                  aria-invalid={erroCep ? 'true' : 'false'}
                />
                {buscandoCep && <span className="field-error">Buscando endereço...</span>}
                {erroCep && <span className="field-error">{erroCep}</span>}
              </div>
              <div className="field-group">
                <label htmlFor="rua">Nome da rua</label>
                <input id="rua" name="rua" type="text" maxLength={120} value={rua} onChange={(e) => setRua(e.target.value)} />
              </div>
              <div className="field-group">
                <label htmlFor="numero">Número</label>
                <input id="numero" name="numero" type="text" maxLength={10} />
              </div>
              <div className="field-group">
                <label htmlFor="complemento">Complemento</label>
                <input id="complemento" name="complemento" type="text" maxLength={60} placeholder="Apto, bloco, sala..." />
              </div>
              <div className="field-group">
                <label htmlFor="cidade">Cidade</label>
                <input id="cidade" name="cidade" type="text" maxLength={80} value={cidade} onChange={(e) => setCidade(e.target.value)} />
              </div>
              <div className="field-group">
                <label htmlFor="estado">Estado</label>
                <select id="estado" name="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="">{estados.length || erroEstados ? 'Selecione' : 'Carregando...'}</option>
                  {estados.map(({ sigla, nome }) => (
                    <option key={sigla} value={sigla}>{nome}</option>
                  ))}
                </select>
                {erroEstados && <span className="field-error">{erroEstados}</span>}
              </div>
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="reset" className="button button-outline">Limpar</button>
          <button type="submit" className="button">Salvar cliente</button>
        </div>
        </form>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="../Index.html" aria-label="LembraFarma - voltar ao início">
          <img src="../assets/Logo.png" alt="" />
          <span>LembraFarma</span>
        </a>
        <p>Mais que um sistema, um parceiro da sua farmácia.</p>
      </footer>
    </>
  )
}
