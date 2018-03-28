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
	var pastaAtual=getPastaAtual();
	var pasta='file://'+pastaAtual;
	window.resolveLocalFileSystemURI(pasta, pastaSucesso, pastaErro);
}
function pastaSucesso(entry){
	if (entry.isFile) {
            //fileHandler( entry );
            var nome=entry.name;
            var msg="arquivo "+nome;
        } else {
        	var nome=entry.name;
        	var msg="pasta "+nome;
        }
        var resultado=document.getElementById('spanResposta').innerHTML;
        if (resultado != ''){
        	resultado+='<br>';
        }
        resultado+=msg;
        document.getElementById('spanResposta').innerHTML=resultado;
}
function pastaErro(erro){
	alert("Erro acessando arquivos: "+erro.code+","+erro.message)
}