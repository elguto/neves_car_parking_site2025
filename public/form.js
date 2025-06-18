const form = document.getElementById('contatoForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    nome: form.nome.value,
    email: form.email.value,
    mensagem: form.mensagem.value,
  };

  status.textContent = 'Enviando...';

  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      status.textContent = 'Mensagem enviada com sucesso!';
      form.reset();
    } else {
      status.textContent = 'Erro ao enviar a mensagem. Tente novamente.';
    }
  } catch (error) {
    status.textContent = 'Erro ao enviar a mensagem. Tente novamente.';
  }
});
