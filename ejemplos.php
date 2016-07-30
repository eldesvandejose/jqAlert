<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>


		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

		<script src="jqAlert.js"></script>
		<script language="javascript">
			$(function(){
				$.alertOptions.useBootstrapClasses = true;
				$.alertOptions.overlayColor = '#000';
				$.alertOptions.overlayOpacity = .5;
				$.alertOptions.okButton = "Aceptar";
				$.alertOptions.cancelButton = "Cancelar";
				$('a').on('click', function(e){
					e.preventDefault();
					switch($(this).prop("id")){
						case "alerta":
							$.alertOptions.showCancelButton = false;
							jqAlert('Esto sustituye al alert', 'Barra de título', function() {
								console.log('Has cerrado el alert');
							});
							break;
						case "confirmacion":
							$.alertOptions.showCancelButton = true;
							jqConfirm('Confirma si aceptas las <u>condiciones</u>', '¿Aceptas?', function(aceptado) {
								if (aceptado){
									console.log('Has aceptado');
								} else {
									console.log('No has aceptado');
								}
							});
							break;
						case "pregunta":
							$.alertOptions.showCancelButton = false;
							jqPrompt('Escribe tu nombre', '', 'Barra de título', function(tecleado) {
								console.log('Tu nombre es ' + tecleado);
							});
							break;
						case "mensaje":
							$.alertOptions.showCancelButton = false;
							jqMessage('Esto es un cuadro de mensaje', 'Mensaje', function() {
								console.log('Has cerrado el mensaje');
							});
							break;
						case "aviso":
							$.alertOptions.showCancelButton = false;
							jqWarning('Esto es un cuadro de aviso', 'Aviso', function() {
								console.log('Has cerrado el aviso');
							});
							break;
						case "error":
							$.alertOptions.showCancelButton = true;
							jqError('Esto es un cuadro de error', 'Error', function(resultado) {
								if (resultado){
									console.log('Has corregido el error.');
								} else {
									console.log('Has ignorado el error.');
								}
							});
							break;
						case "auth":
							$.alertOptions.showCancelButton = true;
							jqAuth('Esto es un control de acceso', 'Acceso', function(acceso) {
								if (acceso){
									console.log('Usuario:' + acceso[0]);
									console.log('Contraseña:' + acceso[1]);
								} else {
									console.log("Has cancelado. Acceso denegado.");
								}
							});
							break;
					}
				console.log();
				});
			});
		</script>
	</head>
	<body>
		<div class="container">
			<div class="row">
				<a href='#' class="btn btn-primary" id="alerta">Ver un alert</a>
			</div><br />
			<div class="row">
				<a href='#' class="btn btn-primary" id="confirmacion">Ver un confirm</a>
			</div><br />
			<div class="row">
				<a href='#' class="btn btn-primary" id="pregunta">Ver un prompt</a>
			</div><br />
			<div class="row">
				<a href='#' class="btn btn-primary" id="mensaje">Ver un message</a>
			</div><br />
			<div class="row">
				<a href='#' class="btn btn-primary" id="aviso">Ver un warning</a>
			</div><br />
			<div class="row">
				<a href='#' class="btn btn-primary" id="error">Ver un error</a>
			</div><br />
			<div class="row">
				<a href='#' class="btn btn-primary" id="auth">Acceso</a>
			</div><br />
		</div>
	</body>
</html>