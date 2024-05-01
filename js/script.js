// Função para salvar a reserva da vaga
function salvar() {

    // Obter os valores dos campos do formulário. O trim() irá retirar os espaços vazios do inicio e final
    //da string 
    const placa = document.getElementById('placa').value.trim();
    const proprietario = document.getElementById('proprietario').value.trim();
    const apartamento = document.getElementById('apartamento').value.trim();
    const bloco = document.getElementById('bloco').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const cor = document.getElementById('cor').value.trim();
    const vaga = document.getElementById('vaga').value.trim();

    // Verificar se algum campo está em branco
    if (placa === '' || proprietario === '' || apartamento === '' || bloco === '' || modelo === '' || cor === '' || vaga === '') {
        swal("Erro!", "Por favor, preencha todos os campos.", "error");
        return;
    }

    // Verifica se a vaga já está ocupada
    if (localStorage.getItem(`reserva_${vaga}`)) {
        swal("Erro!", "Esta vaga já está ocupada.", "error");
        return;
    }

    // Salva os dados da reserva no localStorage
 
    const reserva = {
        placa,
        proprietario,
        apartamento,
        bloco,
        modelo,
        cor,
        vaga
    };
    
    localStorage.setItem(`reserva_${vaga}`, JSON.stringify(reserva));

    // Decrementa o número de vagas disponíveis
    let vagasDisponiveis = localStorage.getItem('vagasDisponiveis') || 10;
    vagasDisponiveis = parseInt(vagasDisponiveis) - 1;
    localStorage.setItem('vagasDisponiveis', vagasDisponiveis);

     // Imprime os registros no console do DevTools
     console.log('Registros de Reservas:');
     for (let i = 1; i <= localStorage.length; i++) {
         const reserva = localStorage.getItem(`reserva_${i}`);
         if (reserva) {
             console.log(JSON.parse(reserva));
         }
     }

     limparFormulario()

    // Exibir mensagem de confirmação com SweetAlert
    swal("Cadastro realizado com sucesso!", "Sua reserva foi registrada.", "success");

}

// Função para listar vagas cadastradas
function consultaReservas() {
    const vagasCadastradasDiv = document.getElementById('vagasCadastradas');
    vagasCadastradasDiv.innerHTML = '';
    let reservaInfo = `
    <table border="1">
    <tr>
        <th class="tabela-consulta">Proprietário</th>
        <th class="tabela-consulta">Modelo</th>
        <th class="tabela-consulta">Placa</th>
        <th class="tabela-consulta">Apartamento</th>
        <th class="tabela-consulta">Bloco</th>
        <th class="tabela-consulta">Vaga</th>
    </tr>
    `;

    // Cria uma string para armazenar os registros no console
    let registrosConsole = '';

    // Percorre todas as chaves do localStorage
    for (let i = 1; i <= localStorage.length; i++) {
        const reserva = localStorage.getItem(`reserva_${i}`);
        if (reserva) {
            const reservaObj = JSON.parse(reserva);
            reservaInfo += `
            
                <tr>
                    <td>${reservaObj.proprietario}</td>
                    <td>${reservaObj.modelo}</td>
                    <td>${reservaObj.placa}</td>
                    <td>${reservaObj.apartamento}</td>
                    <td>${reservaObj.bloco}</td>
                    <td>${i}</td>
                </tr>
                `;

            // Adiciona os dados da reserva à string para o console.log
            registrosConsole += `Proprietário: ${reservaObj.proprietario}, Modelo: ${reservaObj.modelo}, Placa: ${reservaObj.placa}, Apartamento: ${reservaObj.apartamento}, Bloco: ${reservaObj.bloco}, Vaga: ${i}\n`;
            }
        }
        reservaInfo += `</table>`;
        vagasCadastradasDiv.innerHTML += reservaInfo;

        // Exibe os registros no console
        console.log('Registros de Reservas:');
        console.log(registrosConsole);
}

// Função para exibir vagas disponíveis
function vagasDisponiveis() {
    const vagasDisponiveisDiv = document.getElementById('vagasDisponiveis');
    const vagasDisponiveis = localStorage.getItem('vagasDisponiveis') || 10;
    vagasDisponiveisDiv.innerHTML = `<p>Vagas disponíveis: ${vagasDisponiveis}</p>`;
}

function limparFormulario(){
    // Limpa os valores dos campos do formulário
    document.getElementById('placa').value = '';
    document.getElementById('proprietario').value = '';
    document.getElementById('apartamento').value = '';
    document.getElementById('bloco').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('cor').value = '';
    document.getElementById('vaga').value = '';
    
}