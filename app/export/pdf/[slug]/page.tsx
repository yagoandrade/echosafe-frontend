const ExportAsPDF = () => {
  return (
    <main className="max-w-screen margin-8 prose flex max-h-screen flex-col justify-start gap-6">
      <div className="flex w-full items-center justify-between">
        <img
          src="https://echosafe.org/assets/svg/iconless-logo.svg"
          className="h-auto w-64"
          alt="EchoSafe logo"
        />
        <div className="flex items-center gap-4">
          <img
            src="https://echosafe.org/_next/image?url=https%3A%2F%2Fechosafe-images-bucket.s3.sa-east-1.amazonaws.com%2Fic.png&w=384&q=75"
            className="h-auto w-44"
            alt="Logo da instituição"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/2912/2912794.png"
            className="h-auto w-16"
            alt="Ícone"
          />
        </div>
      </div>
      <div>
        <h1 className="border-b font-bold">Relatório anual</h1>

        <h4 className="-mt-2">
          Denúncias recebidas pela sua instituição nos últimos 12 meses
        </h4>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Categoria que mais apareceu nas denúncias</th>
            <th>Turma com mais denúncias</th>
            <th>Denúncias Recebidas</th>
            <th>Denúncias Resolvidas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Racismo</b> - 1.827 denúncias
            </td>
            <td>2º Ano B</td>
            <td>12.834</td>
            <td>10.341</td>
          </tr>
        </tbody>
      </table>

      <div className="flex w-full items-center justify-center">
        <p>
          A EchoSafe não é responsável por quaisquer decisões ou ações tomadas
          com base nessa informação.
        </p>
      </div>
      <footer className="flex w-full flex-col items-center justify-between">
        <p>Emitido em 23/12/23 às 15:03:06 BRT por: Yago Andrade</p>
        <span>
          Todos os Direitos Reservados ©
          <a href="https://echosafe.org" target="_blank">
            EchoSafe
          </a>
        </span>
      </footer>
    </main>
  );
};

export default ExportAsPDF;
