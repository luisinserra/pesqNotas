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
/*	
	var pastaAtual=document.getElementById('tPasta').value;
	var pasta='file://'+pastaAtual;
	alert("Pasta: "+pasta);
	window.resolveLocalFileSystemURI(pasta, pastaSucesso, pastaErro);
*/
	window.requestFileSystem(LocalFileSystem.PERSISTENT,0,  onFileSystemSuccess, onErrorRead);
}
function onFileSystemSuccess(fs) {
    alert("Sucesso");
    var pathInicial=fs.root.fullPath;
    alert("Entrando com "+pathInicial+"...");
    fs.root.fullPath = '/';
    alert("mudou o path...");
    var dirReader = fs.root.createReader();
    alert("reader criado para ler de "+fs.root.fullPath+"...");
    dirReader.readEntries(successRead,onErrorRead);
}
function successRead(entries){
    alert("sucesso lendo");
     var i;
     var objectType;
     var n=entries.length;
     alert("varrendo "+n+"...");
     for (i=0; i < entries.length; i++) {
        if(entries[i].isDirectory == true) {
            objectType = 'Directory';
        } else {
            objectType = 'File';
            alert("arquivo");
            alert(entries[i].name);
        }
        $('#dirList').append('<li><h3>' + entries[i].name + '</h3><p>' + entries[i].toURI() + '</p><p class="ui-li-aside">Type:<strong>' + objectType + '</strong></p></li>');
    }
    $('#dirList').listview("refresh");
}

function onErrorRead(error) {
    alert("Failed to list directory contents: " + error.code+","+error.message);
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