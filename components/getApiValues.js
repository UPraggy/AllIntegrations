
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBKYW4gMzAgMjAyMyAxMTo0MTo0MyBHTVQrMDAwMC5yYWdneWxlbmRhcmlvQGdtYWlsLmNvbSIsImlhdCI6MTY3NTA3ODkwM30.kUqAyOM_cgOytc0wPy-wxhcuIe6vx9VYIDIdZP1yg5E"

const GetBooksValue = async () =>{
	return new Promise ((resolve,reject) =>{
		resolve(fetch('https://www.abibliadigital.com.br/api/books',
			{	method :'GET', 
				headers: {
				Authorization: `Bearer ${token}`,
			}})
					.then(resp => resp.json())
					.catch(resp => console.log(resp)))
		})
}

const GetBookValue = async (abbrev) =>{
	return new Promise ((resolve,reject) =>{
		resolve(fetch(`https://www.abibliadigital.com.br/api/books/${abbrev}`,
			{	method :'GET', 
				headers: {
				Authorization: `Bearer ${token}`,
			}})
					.then(resp => resp.json())
					.catch(resp => resp.json()))
		})
}

const ShowCaptherValue = async (abbrev,cap) =>{
	return new Promise ((resolve,reject) =>{
		resolve(
			fetch(`https://www.abibliadigital.com.br/api/verses/acf/${abbrev}/${cap}`,
			{	method :'GET', 
				headers: {
				Authorization: `Bearer ${token}`
			}})
					.then(resp => resp.json())
					.catch(resp => resp.json()))
		})
}


export default {GetBooksValue,GetBookValue,ShowCaptherValue};
