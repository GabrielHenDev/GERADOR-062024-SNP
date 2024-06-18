import dotenv from 'dotenv'

export async function acessaDse(page){

    dotenv.config();

    const url = process.env.URL;
    const login = process.env.LOGIN;
    const senha = process.env.PASWD;

    await page.goto(url);
    
    // PREENCHE O LOGIN
    await page.waitForSelector("#login\\[username\\]");
    await page.type('#login\\[username\\]', login);

    // PREENCHE O PASSWORD
    await page.waitForSelector("#login\\[password\\]");
    await page.type('#login\\[password\\]', senha);

    // CLICK BOTÃO DE LOGIN
    await Promise.all([
        page.waitForNavigation(),
        page.click('#login\\[btnLogin\\]')
    ]);


    // document.querySelector("#group_1 > a:nth-child(1)")--- gerador centro
    // CLICK BOTÃO GERADOR
    await Promise.all([
        page.waitForNavigation(),
        page.click('#group_1 > a:nth-child(1)')
    ]);

    // document.querySelector("#group_1 > a:nth-child(2)") --- gerador aqua
    // CLICK BOTÃO GERADOR
    // await Promise.all([
    //     page.waitForNavigation(),
    //     page.click('#group_1 > a:nth-child(2)')
    // ]);

    return page;
}