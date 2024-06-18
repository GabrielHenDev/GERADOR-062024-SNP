import dotenv from 'dotenv'

export async function coletaEngine(page){

    let gerador = {};
    let myReturn = {};

    dotenv.config()
    
    let urlEngine = process.env.URLENGINE;

    // PEGA DADOS DO GERADOR
    await page.goto(urlEngine);

    // PEGA ROTAÇÃO DO MOTOR
    const rpm = await page.$$eval(
        '#widgetCanvas > div:nth-child(1) > div > svg > text.dial_textValue1',
        elements => elements.map(element => element.innerHTML)  // Retorna o texto de cada elemento.
    );
    
    if (rpm.length > 0) {
        gerador.rpm = rpm[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    // PEGA TEMPERATURA DO MOTOR
    const temperatura = await page.$$eval(
        '#widgetCanvas > div:nth-child(3) > div > svg > text.dial_textValue2',
        elements => elements.map(element => element.innerHTML)  // Retorna o texto de cada elemento.
    );
    
    if (temperatura.length > 0) {
        gerador.temperatura = temperatura[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    // PEGA NIVEL DE GASOLINA EM %
    const fuel_level = await page.$$eval(
        '#widgetCanvas > div:nth-child(6) > div > svg > text.dial_textValue2',
        elements => elements.map(element => element.innerHTML)  // Retorna o texto de cada elemento.
    );
    
    if (fuel_level.length > 0) {
        gerador.fuel_level = fuel_level[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    // PEGA VOLTAGEM DA BATERIA
    const battery_volt = await page.$$eval(
        '#widgetCanvas > div:nth-child(4) > div > svg > text.dial_textValue2',
        elements => elements.map(element => element.innerHTML)  // Retorna o texto de cada elemento.
    );
    
    if (battery_volt.length > 0) {
        gerador.battery_volt = battery_volt[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    // PEGA VOLTAGEM DO ALTERNADOR DE CARGA
    const change_alt_volt = await page.$$eval(
        '#widgetCanvas > div:nth-child(5) > div > svg > text.dial_textValue2',
        elements => elements.map(element => element.innerHTML)  // Retorna o texto de cada elemento.
    );
    
    if (change_alt_volt.length > 0) {
        gerador.change_alt_volt = change_alt_volt[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    // PEGA OS LITROS DE GASOLINA MOTOR
    const litros_disel = await page.$$eval(
        '#widgetCanvas > div:nth-child(16) > div > table > tbody > tr > td',
        elements => elements.map(element => element.innerText)  // Retorna o texto de cada elemento.
    );
    
    if (litros_disel.length > 0) {
        gerador.litros_disel = litros_disel[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    myReturn.page = page;
    myReturn.gerador = gerador;

    return myReturn;
}