function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    if (email !== 'lembra@farma.com' || password !== '12345678') {
        showToast('E-mail ou senha incorretos.', 'error');
        return;
    }

    sessionStorage.setItem('lembrafarma.authenticated', 'true');
    showToast('Login efetuado! Redirecionando para o painel...', 'success');
    setTimeout(() => {
        window.location.href = '../Ferramentas%20-%20Crie%20aqui/Dashboard.html';
    }, 800);
}

document.getElementById('login-form').addEventListener('submit', handleLogin);
