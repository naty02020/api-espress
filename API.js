app.delete('/agendamentos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const indice = agendamentos.findIndex(
    a => a.id == id
  );

  if (indice == -1) {
    return res.status(404).json({
      erro: 'Agendamento não encontrado.'
    });
  }

  const dataAgendamento =
    new Date(agendamentos[indice].dataHora);

  const agora = new Date();

  const diferencaHoras =
    (dataAgendamento - agora) / (1000 * 60 * 60);

  if (diferencaHoras < 24) {
    return res.status(400).json({
      erro: 'Cancelamento permitido apenas com 24 horas de antecedência.'
    });
  }

  agendamentos.splice(indice, 1);

  res.json({
    mensagem: 'Agendamento cancelado com sucesso.'
  });
});