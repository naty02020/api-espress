app.put('/agendamentos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const agendamento = agendamentos.find(
    a => a.id == id
  );

  if (!agendamento) {
    return res.status(404).json({
      erro: 'Agendamento não encontrado.'
    });
  }

  const conflito = agendamentos.find(a =>
    a.profissionalId == req.body.profissionalId &&
    a.dataHora == req.body.dataHora &&
    a.id != id
  );

  if (conflito) {
    return res.status(400).json({
      erro: 'Horário indisponível.'
    });
  }

  agendamento.profissionalId = req.body.profissionalId;
  agendamento.servicoId = req.body.servicoId;
  agendamento.dataHora = req.body.dataHora;

  res.json(agendamento);
});