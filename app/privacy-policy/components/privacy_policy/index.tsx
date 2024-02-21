const PrivacyPolicy = () => {
  return (
    <main className="flex flex-col items-start justify-center space-y-12 p-6 md:p-12">
      <h1 className="text-4xl font-bold">Política de Privacidade</h1>
      <section className="w-full max-w-3xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Introdução</h2>
          <p className="text-gray-600">
            No EchoSafe, estamos comprometidos em proteger suas informações
            pessoais e seu direito à privacidade. Esta política de privacidade
            explica o que coletamos de você, por que coletamos e como utilizamos
            essas informações.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Coleta de Dados</h2>
          <p className="text-gray-600">
            Coletamos vários tipos de informações, incluindo suas informações
            pessoais (como seu nome e detalhes de contato), atividade de
            navegação e informações do dispositivo. No entanto, suas informações
            pessoais permanecem seguras durante o processo de denúncia, não
            sendo incluídas na mesma.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Uso de Dados</h2>
          <p className="text-gray-600">
            Utilizamos os dados coletados exclusivamente para personalização do
            perfil, proporcionando uma experiência mais acolhedora em nossa
            plataforma. Não usamos nem tornamos públicos os seus dados em nenhum
            momento.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Compartilhamento de Dados</h2>
          <p className="text-gray-600">
            Não compartilhamos seus dados com terceiros sem o seu consentimento,
            a menos que seja necessário para fornecer nossos serviços ou cumprir
            a lei. Durante o compartilhamento com a escola, apenas o seu ano
            escolar e turma são enviados, sem incluir outras informações do seu
            perfil.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Segurança de Dados</h2>
          <p className="text-gray-600">
            Levamos a segurança de dados a sério. Utilizamos diversas medidas de
            segurança, incluindo criptografia e anonimização, para proteger suas
            informações e garantir sua confidencialidade.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Direitos do Usuário</h2>
          <p className="text-gray-600">
            Você tem o direito de acessar, modificar ou excluir suas informações
            pessoais. Você pode exercer esses direitos entrando em contato
            conosco diretamente.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Cookies</h2>
          <p className="text-gray-600">
            Utilizamos cookies em nossa plataforma para aprimorar sua
            experiência de usuário. Você pode desativar os cookies por meio das
            configurações do seu navegador, se preferir.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Informações de Contato</h2>
          <p className="text-gray-600">
            Se tiver alguma dúvida ou preocupação sobre nossa política de
            privacidade ou a privacidade de seus dados, entre em contato conosco
            em contact@echosafe.org.
          </p>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
