const puppeteer = require('puppeteer');

(async () => {


	const page = await puppeteer.launch({
		headless: true,
		timeout : 60000,
		args: ['--no-sandbox','--disable-setuid-sandbox']
	});

	const tab = await page.newPage();

	await tab.goto('https://liturgia.cancaonova.com/pb/')

	const html = await tab.evaluate(async () => {
        let data = []; 
        
        let elements = document.querySelectorAll('#liturgia-1 p')[1].innerHTML
        return elements
      })

	console.log(html)
	/*const liturgia = await tab.waitForSelector("#liturgia-1 p:first-child strong:nth-child(2)").textContent

	const temp = await tab.$$(`#liturgia-1`)


		console.log(liturgia)*/
	page.close()
})();