export async function horaAtual(){
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let date_atual = {}

    let data = today.toLocaleString('pt-BR', { timezone: 'UTC' });
    let newdata = data.split(/[,/: ]/);

    date_atual.dia = newdata[0]
    date_atual.mes = newdata[1]
    date_atual.ano = newdata[2]

    date_atual.hrs = newdata[4]
    date_atual.min = newdata[5]
    date_atual.sec = newdata[6]

    return date_atual
}