import { db } from "../script/db.js";

export async function sendInfoGeradorBD(litrosCombustivel,presaoOleo,temperatura,nivelCombustivel,voltagemBateria,alternadorCarga,rpm){

    let status_gerador;

    const q = "INSERT INTO `gb_gerador` (`id`, `litrosCombustivel`, `presaoOleo`, `temperatura`, `nivelCombustivel`, `voltagemBateria`, `alternadorCarga`, `rpm`, `status_gerador`, `data_registro`) VALUES (NULL, ?, current_timestamp());";

    if (presaoOleo == "####"){
        presaoOleo = "NULL";
    } else{
        presaoOleo = `${presaoOleo}`;
    }

    if (rpm == 0){
        status_gerador = "Desligado"
    }else{
        status_gerador = "Ligado"
    } 

    const values = [
        litrosCombustivel,
        presaoOleo,
        temperatura,
        nivelCombustivel,
        voltagemBateria,
        alternadorCarga,
        rpm,
        status_gerador,
    ];

    db.query(q, [values], (err,data) => {
    if (err) return console.log(err);

        return true;
    });

}

export async function sendInfoEnergiaBD(fase_l1,fase_l2,fase_l3,l1fasel2,l2fasel3,l3fasel1){

    let status_energia;
    let color;

    const q = "INSERT INTO `gb_energia` (`id`, `fase_l1`, `fase_l2`, `fase_l3`, `l1fasel2`, `l2fasel3`, `l3fasel1`, `status_energia`, `color`, `data_registro`) VALUES (NULL, ?, current_timestamp());";

    if (fase_l1 && fase_l2 && fase_l3 > 0){
        status_energia = "Normal";
        color = "#03fc35";
    }else if (fase_l1 && fase_l2 && fase_l3 == 0){
        status_energia = "Urgente";
        color = "#e7fc03";
    }else{
        status_energia = "Alerta";
        color = "#fc0303";
    }

    const values = [
        fase_l1,
        fase_l2,
        fase_l3,
        l1fasel2,
        l2fasel3,
        l3fasel1,
        status_energia,
        color,
    ];

    db.query(q, [values], (err,data) => {
    if (err) return console.log(err);

        return true;
    });

}