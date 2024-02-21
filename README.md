![image](https://github.com/yagoandrade/echosafe/assets/70113380/43e06065-aa24-419f-80bb-7b0c3b3b4ea6)

# EchoSafe - Combate ao Bullying Escolar

O EchoSafe é um sistema projetado para abordar o problema do bullying nas escolas, proporcionando uma plataforma segura para denúncias e análises detalhadas. Nosso foco principal é garantir a privacidade dos usuários enquanto oferecemos ferramentas abrangentes para entender, monitorar e mitigar casos de bullying. Buscamos oferecer uma análise completa sobre as denúncias, o que será detalhado ao longo do texto. A privacidade dos usuários, especialmente dos alunos, é uma prioridade.

## Problemas

1. Dificuldade em identificar e dar voz a casos de bullying nas escolas.
2. Falta de ferramentas de análise de dados para compreender tendências e padrões de bullying e assédio moral.
3. Ausência de um canal seguro e confidencial para denúncias entre o aluno e a escola.

## Expectativas

1. **Facilitar a identificação do bullying nas escolas.** E também, facilitar a comunicação do aluno com os superiores da escola, garantindo sua privacidade e o incentivando a denunciar situações de violência, sejam elas sofridas ou presenciadas.
2. **Fornecer análises detalhadas sobre o bullying para ações direcionadas.** A escola pode observar as seguintes situações:
   - Acompanhar o andamento da situação da denúncia, onde ela possui os status de recebida, em observação, comprovada, falsa e resolvida;
   - Acompanhar as categorias em que a denúncia se enquadra, podendo ser homofobia, machismo, gordofobia, femismo, transfobia, xenofobia, racismo, intolerância religiosa etc;
   - Número de denúncias categorizados por gênero, idade e série;
   - Emitir relatórios para escolas detalhando quais as maiores incidências de bullying, de qual forma costuma acontecer mais, em qual época etc.
3. **Criar um ambiente escolar mais seguro e inclusivo.** Para isso, deve-se prezar pela segurança do aluno em todas as etapas da denúncia, desde a garantia da sua privacidade até a averiguação da veracidade dos fatos pela escola e, por fim, a ação escolhida pela escola para mitigar o problema denunciado.

## Personas

**Persona V:** Alunos do Ensino Fundamental II e Ensino Médio (faixa etária dos 11 aos 18 anos)

- **O que fazem?** Estuda e interage com colegas, podendo viver ou observar situações que podem ser resolvidas com o uso do aplicativo.
- **O que esperam?** Um meio seguro de reportar incidentes de bullying sem medo de retaliações e com mais chances de ter sua situação resolvida por alguma entidade responsável do colégio.

**Persona X:** Professores e Funcionários da Escola

- **O que fazem?** Professores e funcionários responsáveis por supervisionar e garantir a segurança dos alunos.
- **O que esperam?** Uma ferramenta que facilite a identificação e relato de incidentes de bullying, permitindo intervenção rápida e eficaz.

**Persona Y:** Administradores Escolares

- **O que fazem?** Membros da administração escolar responsáveis por tomar decisões de longo prazo e garantir a eficácia do programa contra o bullying.
- **O que esperam?** Dados e relatórios abrangentes que ajudem na formulação de políticas e práticas escolares voltadas para a prevenção do bullying.

**Persona Z:** Profissionais de Apoio à Saúde Mental

- **O que fazem?** Profissionais de saúde mental que trabalham em colaboração com a escola para oferecer apoio aos alunos afetados pelo bullying, oferecendo intervenções especializadas, orientação e estratégias de coping.
- **O que esperam?** Acessar informações relevantes e detalhadas sobre denúncias de bullying para fornecer suporte personalizado aos alunos de uma escola e utilizar ferramentas que facilitem a identificação precoce de problemas no ambiente escolar, promovendo um ambiente saudável.

## Marcos

### Marco 1 - 29/01/2024 (Deploy)

- Implementação de denúncias anônimas e interface intuitiva.
- Cadastro e login de usuários.
- Criação de um dashboard simples para exibição de dados das denúncias.

#### Funcionalidades:

1. Formulário de denúncia.
2. Listar as denúncias na plataforma.
3. Cadastro de usuário (aluno).
4. Cadastro de entidade (escolas).
5. Login de usuário (aluno).
6. Login da entidade (escolas).
7. Criação do dashboard para exibição de dados das denúncias.

#### Release Notes:

- Lançar uma nota de lançamento explicando o que foi implementado no Marco 1.

### Marco 2 - 25/03/2024

- Integração de mapeamento de dados e relatórios.
- Eficiência medida por métricas de uso e satisfação dos usuários.
- Avanços no dashboard que incluem filtros de local, data e série escolar, tendências, e insights melhores.
- Sistema de notificações para as autoridades escolares (pela plataforma e e-mail).
- Integração com uma IA para analisar os sentimentos de cada denúncia e categorizar as ofensas relatadas.

Acreditamos que o Marco 2, com a integração de mapeamento de dados e relatórios, vai conseguir o resultado esperado. A eficácia será medida por métricas de uso e satisfação dos usuários.

#### Funcionalidades:

1. Filtros e categorizações dos dados.
2. Sistema de alertas e notificações para autoridades escolares (via plataforma e e-mail).
3. Sistema de e-mails para divulgação para escolas não cadastradas.
4. Integração com o ChatGPT para analisar os sentimentos e categorizar as ofensas relatadas na denúncia.
5. Mapeamento e análise de dados de denúncias por escola.
6. Inclusão de funcionalidades adicionais relacionadas à análise de dados e relatórios.

#### Release Notes:

- Lançar uma nota de lançamento explicando o que foi implementado no Marco 2.

## Riscos

1. **Problemas de Privacidade e Segurança** (Severidade Alta, Probabilidade Média)

   **Mitigação:** Implementação de medidas rigorosas de segurança e privacidade.

   - Implementação de rigorosas medidas de segurança de dados e privacidade, garantindo que nenhum usuário tenha conhecimento da identidade de outro usuário (ex: escolas não podem saber o autor da denúncia, mas podem saber sobre o acusado, caso sua identidade seja revelada pelo autor da denúncia);
   - Realizar revisões regulares do sistema para garantir sua segurança contínua e aprimoramento com base nos melhores padrões da indústria;
   - Garantir que as informações compartilhadas nas denúncias sejam tratadas com extrema confidencialidade. Profissionais de saúde mental têm acesso apenas às informações essenciais para oferecer suporte, e todas as medidas são tomadas para preservar a identidade dos envolvidos;
   - Manter a transparência sobre como os dados são gerenciados e utilizados na plataforma. Manter uma comunicação aberta com os profissionais de saúde mental, educadores, alunos e responsáveis, proporcionando um ambiente de prestação de contas e confiança.

2. **Resistência à adoção do app por parte de alunos e professores** (Severidade Média, Probabilidade Alta):

   **Mitigação:** Campanhas de conscientização, melhorar o aplicativo continuamente com base no feedback constante recebido da comunidade alvo e incentivo de uso.

   - Campanhas de conscientização e treinamento;
   - Feedback constante da comunidade escolar para melhorias;
   - Incentivo de uso ao provar o bom desempenho do app ao monitorar os índices de violência escolar, além de atenuar os conflitos entre alunos.

## Componentes

### Aplicativo Web

O aplicativo web do EchoSafe é uma plataforma completa projetada para a gestão e análise eficiente de denúncias de bullying nas escolas. Com uma interface intuitiva e amigável, o aplicativo visa proporcionar uma experiência fluida para os usuários, especialmente para as autoridades escolares responsáveis pela administração e tomada de decisões com base nas denúncias recebidas.

#### Principais Funcionalidades:

1. **Dashboard Principal:**
   - Apresenta uma visão geral das estatísticas de denúncias, destacando o número total de incidentes reportados e os status correspondentes (recebida, em observação, comprovada, falsa, resolvida).
   - Oferece gráficos e visualizações para facilitar a compreensão das tendências e padrões de bullying.
2. **Gestão de Denúncias:**
   - Permite o acompanhamento detalhado de cada denúncia, com informações sobre o denunciante, o acusado, a categoria do incidente (homofobia, machismo, gordofobia, femismo, transfobia, racismo, xenofobia, intolerância religiosa, etc.) e o histórico de ações tomadas.
3. **Filtros e Categorizações:**
   - Facilita a análise de dados por meio de filtros avançados, permitindo a categorização das denúncias com base em critérios como gênero, idade, série e outros parâmetros relevantes.
4. **Alertas e Notificações:**
   - Implementa um sistema de alertas e notificações automáticas para as autoridades escolares, utilizando e-mails, sempre que uma denúncia relevante for recebida ou houver uma atualização no status da mesma.
5. **Relatórios Detalhados:**
   - Oferece relatórios abrangentes sobre as estatísticas de denúncias, facilitando a compreensão das dinâmicas de bullying na escola. Inclui análises aprofundadas sobre as categorias de incidentes e outros indicadores-chave.
6. **Integração com ChatGPT:**
   - Possui uma integração com o ChatGPT para analisar os sentimentos expressos nas denúncias, categorizando as ofensas relatadas de maneira mais precisa e identificando nuances emocionais.
7. **Sistema de E-mails:**
   - Implementa um sistema de e-mails para divulgação a escolas não cadastradas, incentivando a participação e conscientizando sobre a importância do aplicativo.
8. **Segurança e Privacidade:**
   - Garante rigorosas medidas de segurança e privacidade, assegurando que as informações do denunciante sejam mantidas confidenciais e que apenas as autoridades relevantes tenham acesso a detalhes específicos.
