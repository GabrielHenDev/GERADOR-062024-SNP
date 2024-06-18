// npm init -y
// npm i puppeteer
// npm i dotenv
// npm i telegraf

import { acessaDse } from "./acessaDse.js";
import { coletaFases } from "./coletaFases.js";
import { coletaEngine } from "./coletaEngine.js";
import { logEnergia } from "./logEnergia.js";
import { enviar_mensagem } from "./enviaMsgTelegram.js";
import { horaAtual } from "./horaatual.js";
import { sendInfoEnergiaBD } from "./enviaInfoBD.js";
import { sendInfoGeradorBD } from "./enviaInfoBD.js";
import pup from "puppeteer";


let fases = {};
let gerador = {};

let myReturn = {};

let cont = 1;

// #0 DESLIGADOS - #1 LIGADO
let estadoGerador = 0  
let condicaoMensagem = 0
let mensagemEnergia = "";

let statusGerador = "";

// #tempo equivale a 60 segundos ( todo o fluxo é feito em 10 segundos )
let tempoAtualizaPagina = 600000;
let tempoZero = 0;
let tempoAtual = 0;

let ultimoLog = 0; // 0 ou 1

console.log("-----------------------------------1-----------------------------------------");


const sleep = ms => new Promise(res => setTimeout(res, ms));

(async ()=>{
    const browser = await pup.launch({
		headless: false,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    let page = await browser.newPage();

    page = await acessaDse(page);

    while (true){

        console.log("-------------------------------------2---------------------------------------");

        myReturn = await coletaFases(page);
        fases = myReturn.fases;


        myReturn = await coletaEngine(page)
        gerador = myReturn.gerador;
        
        console.log(fases)
        console.log(gerador)

       await sendInfoEnergiaBD(fases.l1, fases.l2, fases.l3, fases.l1l2, fases.l2l3, fases.l3l1)

       await sendInfoGeradorBD(gerador.litros_disel, '####', gerador.temperatura, gerador.fuel_level, gerador.battery_volt, gerador.change_alt_volt, gerador.rpm)
        
        if (estadoGerador == 1 && gerador.rpm == 0){

            if (condicaoMensagem == 1){
                estadoGerador = 0
                condicaoMensagem = 0

                // energiaRua = validaEnergia(navegador2) agora virou 'fases'
                console.log(fases)
                mensagemEnergia = await logEnergia(fases)
                
                console.log("Gerador Desligado! ",mensagemEnergia)

                await enviar_mensagem(estadoGerador,gerador.temperatura,gerador.battery_volt,gerador.change_alt_volt,gerador.fuel_level,mensagemEnergia)

                console.log(statusGerador) 
            }    

        } else if (gerador.rpm > 0){

            estadoGerador = 1

            if (condicaoMensagem == 0){
                condicaoMensagem = 1

                // energiaRua = validaEnergia(navegador2) agora virou 'fases'
                console.log(fases)
                mensagemEnergia = await logEnergia(fases)
                
                console.log("Gerador Ligado! ",mensagemEnergia)

                await enviar_mensagem(estadoGerador,gerador.temperatura,gerador.battery_volt,gerador.change_alt_volt,gerador.fuel_level,mensagemEnergia)

                console.log(statusGerador) 

            }else if  (estadoGerador == 1){
                

                let data = await horaAtual()

                if (data.min % 10 == 0){
                    if (ultimoLog == 0){
                        // energiaRua = validaEnergia(navegador2) agora virou 'fases'
                        console.log(fases)
                        mensagemEnergia = await logEnergia(fases)
                        
                        console.log(`\n${statusGerador}\n${data.hrs}:${data.min}`)

                        await enviar_mensagem(estadoGerador,gerador.temperatura,gerador.battery_volt,gerador.change_alt_volt,gerador.fuel_level,mensagemEnergia)

                        console.log(statusGerador) 

                        ultimoLog = 1;
                    }else {
                        await sleep(60000);
                        ultimoLog = 0;
                        console.log("O último log foi redefinido para 0 após 60 segundos.");
                    }
                } else {
                    console.log("------------------------------------3---------------------------------------");
                }
            }
        }
        // #tempoAtualizaPagina = 6  #tempo equivale a 60 segundos ( todo o fluxo é feito em 10 segundos )
        // #tempoZero = 0
        // #tempoAtual = 0 

        // if (tempoAtual <= tempoAtualizaPagina){
        //     // # o valor 1 equivale a 10 segundos ( pois todo fluxo após o while )
        //     tempoAtual = tempoAtual + 1 
        // }else{
        //     tempoAtual = 0
        // }
    }

    await browser.close();
})();
