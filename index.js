const express = require('express');
const app = express();
var x = require('x-ray')();

app.set('view engine', 'pug');
app.set('views', __dirname);

app.get('/LiturgiaDiaria', (req, res) => {
	res.send("nada Aqui")
})
//LiturgiaDiaria
app.get('/LiturgiaDiaria', (req, res) => {
	x('https://liturgia.cancaonova.com/pb/',
	{ 
    corLiturgica : ".cor-liturgica",
    titulo : ".entry-title",
		primeiraLeitura: "#liturgia-1",
    salmo: "#liturgia-2",
    evangelho: "#liturgia-4",
	}
	)(function(err, result){
    Object.keys(result).forEach((value,i)=>{
      result[value] = result[value].replace(/[\t\r]/g,"")

    })
    if (result['evangelho'].indexOf('breve') != -1){
      result['evangelho'] = result['evangelho'].split("— Glória a vós, Senhor.")
      result['evangelho'] = result['evangelho'][0]
      result['evangelho'] += '— Glória a vós, Senhor.'
    }
    result = formatBarraN(result);
    result.primeiraLeitura = formatPrimeiraLeitura(result.primeiraLeitura)
    result.salmo  = formatSalmo(result.salmo)
    result.evangelho  = formatEvangelho(result.evangelho)
    result.corLiturgica = [result.corLiturgica.split(":")[1],result.titulo.split("|")[0]]
		res.send(result)
	});
  

});

const port = process.env.PORT || 3000

app.listen(port, () => console.log('server started'));




async function getLiturgy(){
  x('https://liturgia.cancaonova.com/pb/',
	{ 
    corLiturgica : ".cor-liturgica",
    titulo : ".entry-title",
		primeiraLeitura: "#liturgia-1",
    salmo: "#liturgia-2",
    evangelho: "#liturgia-4",
	}
	)
} 


setInterval(()=>getLiturgy(),600000)






function formatPrimeiraLeitura(word){
	  word = word.split("\n")
	  let temp = []
	  temp[0] = word[0]
	  temp[1] = word[2]
	  temp[2] = word.slice(3).join("\n")
    temp[2] = temp[2].split("Palavra do Senhor.")[0]
    temp[2] = temp[2].slice(0,-2)
    
  return temp
}
function formatSalmo(word){
  word = word.split("\n")
  word = [word[0],word.slice(2)]
  word[1] = word[1].join("\n")
  return word
}

function formatEvangelho(word){
  let title = word.split("\n")[0]
	word = word.split("Glória a vós, Senhor.\n \n");
	word = word.slice(1).join("")
  word = word.split("Palavra da Salvação")[0]
  word = word.slice(0,-3)
  word = [title,word]
  return word
}


function formatBarraN(word){
   Object.keys(word).forEach((val,i)=>{
   	if (val != 'corLiturgica'){
	  word[val] = word[val].slice(1)
   	}
  })
  return word
}	
