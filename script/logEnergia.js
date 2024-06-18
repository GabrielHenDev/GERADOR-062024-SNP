export async function logEnergia(fases){

    let qntdFaseOff = 0;
    let mensagem;

    if (fases.l1 == 0 && fases.l2 == 0 && fases.l3 == 0){
        mensagem = "\u{1F534} Sem energia no DTC AQUARELA, Status: Sem Fase \u{1F534}";
    }else if (fases.l1 == 0 || fases.l2 == 0 || fases.l3 == 0){
        if (fases.l1 == 0){
            qntdFaseOff = qntdFaseOff + 1;
        }if (fases.l2 ==0){
            qntdFaseOff = qntdFaseOff + 1;
        }if (fases.l3 ==0){
            qntdFaseOff = qntdFaseOff + 1;
        }
        mensagem = "\u{1F534} Sem energia AQUARELA, Status: Meia Fase, Fase(s) offline: ",qntdFaseOff;
    }else{
        mensagem = "\u{1F4B9} Energia DTC AQUARELA, Status: Fases OK ";
    }
    
    return mensagem;
}