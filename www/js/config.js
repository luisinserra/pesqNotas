function initConfig(){
	var pastaAtual=getPastaAtual();
	document.getElementById('tPasta').value=pastaAtual;
}
function getPastaAtual(){
	if (window.localStorage.getItem('parmPasta') == null){
		window.localStorage.setItem('parmPasta','/');
	}
	var pastaAtual=window.localStorage.getItem('parmPasta');
	return pastaAtual;
}
function goBuscaPasta() {
	var pastaAtual=document.getElementById('tPasta').value;
	var pasta='file://'+pastaAtual;
	alert("Pasta: "+pasta);
	window.resolveLocalFileSystemURI(pasta, pastaSucesso, pastaErro);
}
function pastaSucesso(entry){
	alert("Iniciando o scan...");
	if (entry.isFile) {
		alert("Achei um arquivo...");
            //fileHandler( entry );
            var nome=entry.name;
            var msg="arquivo "+nome;
        } else {
        	alert("Achei uma pasta...");
        	var nome=entry.name;
        	var msg="pasta "+nome;
        }
        var resultado=document.getElementById('spanResposta').innerHTML;
        alert("já pegou um resultado...");
        if (resultado != ''){
        	resultado+='<br>';
        }
        resultado+=msg;
        document.getElementById('spanResposta').innerHTML=resultado;
}
function pastaErro(erro){
	alert("Erro acessando arquivos: "+erro.code+","+erro.message)
}