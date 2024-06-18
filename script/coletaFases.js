import dotenv from 'dotenv'

dotenv.config()

export async function coletaFases(page){

    let fases = {};
    let myReturn = {};

    let urlMain = process.env.URLMAIN;

    // CLICK BOTÃO MAIN
    await Promise.all([
        page.waitForNavigation(),
        page.click('#tabContainer > li:nth-child(2) > div > div.buttoncontainer > a')
    ]);

    await page.goto(urlMain);

    // PEGA FASES UNICAS
    const l1 = await page.$$eval(
        '#widgetCanvas > div:nth-child(6) > div > table > tbody > tr:nth-child(1) > td.value',
        elements => elements.map(element => element.innerText)  // Retorna o texto de cada elemento.
    );
    
    if (l1.length > 0) {
        fases.l1 = l1[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    const l2 = await page.$$eval(
        '#widgetCanvas > div:nth-child(6) > div > table > tbody > tr:nth-child(2) > td.value',
        elements => elements.map(element => element.innerText)  // Retorna o texto de cada elemento.
    );
    
    if (l2.length > 0) {
        fases.l2 = l2[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    const l3 = await page.$$eval(
        '#widgetCanvas > div:nth-child(6) > div > table > tbody > tr:nth-child(3) > td.value',
        elements => elements.map(element => element.innerText)  // Retorna o texto de cada elemento.
    );
    
    if (l3.length > 0) {
        fases.l3 = l3[0];  // Adiciona o primeiro elemento do resultado à lista.
    }


    // PEGA AS FASES EM GRUPO
    const l1l2 = await page.$$eval(
        '#widgetCanvas > div:nth-child(5) > div > table > tbody > tr:nth-child(1) > td.value',
        elements => elements.map(element => element.innerText)  // Retorna o texto de cada elemento.
    );
    
    if (l1l2.length > 0) {
        fases.l1l2 = l1l2[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    const l2l3 = await page.$$eval(
        '#widgetCanvas > div:nth-child(5) > div > table > tbody > tr:nth-child(2) > td.value',
        elements => elements.map(element => element.innerText)  // Retorna o texto de cada elemento.
    );
    
    if (l2l3.length > 0) {
        fases.l2l3 = l2l3[0];  // Adiciona o primeiro elemento do resultado à lista.
    }
    
    const l3l1 = await page.$$eval(
        '#widgetCanvas > div:nth-child(5) > div > table > tbody > tr:nth-child(3) > td.value',
        elements => elements.map(element => element.innerText)  // Retorna o texto de cada elemento.
    );
    
    if (l3l1.length > 0) {
        fases.l3l1 = l3l1[0];  // Adiciona o primeiro elemento do resultado à lista.
    }

    myReturn.page = page;
    myReturn.fases = fases;

    return myReturn;
}