export default function App() {
  return (
    <div className="container mt-4">
      <h1 className="h3 mb-4">Cadastrar cliente</h1>

      <form className="card card-body shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input id="nome" type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="cpf" className="form-label">CPF</label>
            <input id="cpf" type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="telefone" className="form-label">Telefone</label>
            <input id="telefone" type="tel" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input id="email" type="email" className="form-control" />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary me-2">Salvar</button>
          <button type="reset" className="btn btn-outline-secondary">Limpar</button>
        </div>
      </form>
    </div>
  )
}