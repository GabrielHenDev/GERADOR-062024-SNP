//BIBLIOTECAS
import dotenv from "dotenv"
import { Telegraf } from "telegraf";
import { horaAtual } from "./horaatual.js";


dotenv.config();


export async function enviar_mensagem(estadoGerador,temperatura,voltagemBateria,alternadorCarga,nivelCombustivel,mensagemEnergia){

    let data = await horaAtual();
    let mensagem;

    // \U00002714 bom
    // \U00002757 ruim
    // \U0000274c drastico
    if (estadoGerador == 1){
        if (nivelCombustivel < 50){
            mensagem = `\u{1F534} --- GERADOR CENTRO LIGADO ( COMBUSTIVEL BAIXO ) ---\u{1F534} \n\nTemperatura do motor: ${temperatura} \nVoltagem da bateria: ${voltagemBateria}\nTensão do alternador de carga: ${alternadorCarga}\n\n${mensagemEnergia}\n\nNível de combustível: ${nivelCombustivel}%\n\nHora: ${data.hrs}:${data.min}Hrs`;
        }else{
            mensagem = `\u{1F4B9} --- GERADOR CENTRO LIGADO ---\u{1F4B9} \n\nTemperatura do motor: ${temperatura}°C \nVoltagem da bateria: ${voltagemBateria}V\nTensão do alternador de carga: ${alternadorCarga}V\n\n${mensagemEnergia}\n\nNível de combustível: ${nivelCombustivel}%\n\nHora: ${data.hrs}:${data.min}Hrs`;
        }
    }else{
        mensagem =  `\u{1F537} --- GERADOR CENTRO DESLIGADO ---\u{1F537} \n\nTemperatura do motor: ${temperatura}°C \nVoltagem da bateria: ${voltagemBateria}V\nTensão do alternador de carga: ${alternadorCarga}V\n\n${mensagemEnergia}\n\nNível de combustível: ${nivelCombustivel}%\n\nHora: ${data.hrs}:${data.min}Hrs`;
    }

    const bot = new Telegraf(process.env.TOKEN);
    bot.telegram.sendMessage(process.env.CHATID, mensagem);

}
