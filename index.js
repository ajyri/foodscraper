const puppeteer = require('puppeteer')

async function start() {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto("https://fi.jamix.cloud/apps/menu/?anro=12347&k=48&mt=89", { waitUntil: 'networkidle0' })
	const data = await page.evaluate(() => {
		let title = Array.from(document.querySelectorAll('span[class=v-button-caption] > span[class=multiline-button-caption-text]'))
		let titles = title.map((title) => title.textContent.trim());
		let items = []
		let diets = []

		let index = 1;

		for (let i = 0; i < title.length; i++) {
			let item = Array.from(document.querySelectorAll(`div.v-slot-multiline:nth-child(${index}) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span[class=multiline-button-content-text] > span[class=menu-item] > span[class=item-name]`))

			let diet = Array.from(document.querySelectorAll(`div.v-slot-multiline:nth-child(${index}) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span[class=multiline-button-content-text] > span[class=menu-item] > span[class=menuitem-diets]`))

			let itemArray = item.map((item) => item.textContent.trim())
			let dietArray = diet.map((diet) => diet.textContent.trim())

			diets.push(dietArray)
			items.push(itemArray)
			index += 2
		}



		return { titles, items, diets }


	})

	await browser.close()
	console.log(data)

}

start()