function autenticar(req, res, next) {
  console.log('Autenticado com sucesso');
  next();
}

function registrarLog(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}

function validarAgendamento(req, res, next) {
  const {
    clienteId,
    profissionalId,
    servicoId,
    dataHora
  } = req.body;

  if (!clienteId || !profissionalId || !servicoId || !dataHora) {
    return res.status(400).json({
      erro: 'Todos os campos são obrigatórios.'
    });
  }

  next();
}

app.post(
  '/agendamentos',
  [autenticar, validarAgendamento, registrarLog],
  (req, res) => {

    const {
      clienteId,
      profissionalId,
      servicoId,
      dataHora
    } = req.body;

    const conflito = agendamentos.find(a =>
      a.profissionalId == profissionalId &&
      a.dataHora == dataHora
    );

    if (conflito) {
      return res.status(400).json({
        erro: 'Esse horário já está ocupado.'
      });
    }

    const novoAgendamento = {
      id: agendamentos.length + 1,
      clienteId,
      profissionalId,
      servicoId,
      dataHora
    };

    agendamentos.push(novoAgendamento);

    res.status(201).json(novoAgendamento);
  }
);