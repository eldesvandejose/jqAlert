(function($) {
	$.alertOptions = {
		/* A continuación se definen las propiedades de configuración del plugin. 
		Dentro del código serán accesibles mediante $.alertOptions.Propiedad. */
		
		verticalOffset: -75,					// Desplazamiento vertival del cuadro de diálogo con respecto a la mitad de la pantalla.
												// Negativo es hacia arriba y positivo es hacia abajo.
		horizontalOffset: 0,					// Desplazamiento horizontal del cuadro de diálogo con respecto al centro de la pantalla.
		repositionOnResize: true,				// Si está activado, centra el cuador de diálogo a las posiciones relativas cuando se reescala la pantalla.
		overlayOpacity: .01,					// Opacidad de la capa de overlay (la que cubre toda la pantalla). Por defecto es transparente.
		overlayColor: '#000',					// Color de la capa de overlay.
		draggable: true,						// Hace que el cuadro de diálogo sea draggable. (requiere la funcionalidad draggable de jQuery UI)
		okButton: '&nbsp;OK&nbsp;',				// Texto del botón de aceptación
		cancelButton: '&nbsp;Cancel&nbsp;',		// Texto del botón de NO aceptación.
		dialogClass: null,						// Una clase genérica para todos los díalogos.
		showConfirmButton: true,				// Si se mostrará el botón de aceptación.
		showCancelButton: true,					// Si se mostrará elbotón de no aceptación
		useBootstrapClasses: true,				// Si se usarán las clases de bootstrap o propias del plugin
		OK_Button_class: 'success',				// Clase para el boton de aceptación.
		Cancel_Button_class: 'danger',			// Clase para el boton de no aceptación.
		window_backgroundColor: '#FFF',			// Color de fondo del cuadro de diálogo.
		window_border: 'ridge 5px #999',		// Borde del cuadro de diálogo.
		window_corners: 10,						// Radio de las esquinas del cuadro de diálogo.
		cancelOnEscape: false,					// Cerrar el cuadro de diálogo con tecla esc.
		label_user_auth: 'Usuario:',			// La etiqueta para el campo de usuario en los cuadros de autenticación.
		label_pw_auth: 'Contraseña:',			// La etiqueta para el campo de contraseña en los cuadros de autenticación.
		imagesPath: 'images/',					// Las imágenes hay que buscarlas en la ruta especifcada.
		
		/* MÉTODOS PÚBLICOS */
		
		alert: function(message, title, callbackFunction) {
			if (title == null) title = '';
			$.alertOptions._show(title, message, null, 'alert', function(result) {
				if (callbackFunction) callbackFunction(result);
			});
		},
		
		confirm: function(message, title, callbackFunction) {
			if (title == null) title = '';
			$.alertOptions._show(title, message, null, 'confirm', function(result) {
				if (callbackFunction) callbackFunction(result);
			});
		},
			
		prompt: function(message, value, title, callbackFunction) {
			if (title == null) title = '';
			$.alertOptions._show(title, message, value, 'prompt', function(result) { 	
				if (callbackFunction) callbackFunction(result);
			});
		},
		
		auth: function(message, title, callbackFunction) {
			if (title == null) title = '';
			$.alertOptions._show(title, message, null, 'auth', function(result) { 	
				if (callbackFunction) callbackFunction(result);
			});
		},
		
		message: function(message, title, callbackFunction) {
			if (title == null) title = '';
			$.alertOptions._show(title, message, null, 'message', function(result) {
				if (callbackFunction) callbackFunction(result);
			});
		},
		
		warning: function(message, title, callbackFunction) {
			if (title == null) title = '';
			$.alertOptions._show(title, message, null, 'warning', function(result) {
				if (callbackFunction) callbackFunction(result);
			});
		},
		
		error: function(message, title, callbackFunction) {
			if (title == null) title = '';
			$.alertOptions._show(title, message, null, 'error', function(result) {
				if (callbackFunction) callbackFunction(result);
			});
		},
		
		/* MÉTODOS PRIVADOS */
		
		_show: function(title, msg, value, type, callbackFunction) {
			
			$.alertOptions._hide();
			$.alertOptions._overlay('show');
			
			var baseDeContainer = "font-family: Arial, sans-serif;	font-size: 12px; min-width: 300px; max-width: 600px; color: #000; ";
			var baseDeTitulo = "font-size: 14px; font-weight: bold; text-align: center; line-height: 1.75em; border-bottom: solid 1px #999; padding: 0em; margin: 0em; cursor: default; padding-bottom: 0px; ";
			var baseDeContent = "background: 16px 16px no-repeat url(" + $.alertOptions.imagesPath + "base.gif); padding: 1em 1.75em; margin: 0em;";
			
			var roundedBordersContainer = 	"border-radius: " + $.alertOptions.window_corners + "px; " + 
											"-moz-border-radius: " + $.alertOptions.window_corners + "px; " + 
											"-webkit-border-radius: " + $.alertOptions.window_corners + "px; ";
			var roundedBordersTitle = 	"border-radius: " + (($.alertOptions.window_corners * 1) - 2) + "px " + (($.alertOptions.window_corners * 1) - 2) + "px 0px 0px; " + 
										"-moz-border-radius: " + (($.alertOptions.window_corners * 1) - 2) + "px " + (($.alertOptions.window_corners * 1) - 2) + "px 0px 0px; " + 
										"-webkit-border-radius: " + (($.alertOptions.window_corners * 1) - 2) + "px " + (($.alertOptions.window_corners * 1) - 2) + "px 0px 0px; ";
			var titleBar_Style = (title > '')?"display:block":"display:none;";

			$("body").append(
			  '<div id="jqAlert_container" class="container" style="' + baseDeContainer + 'background-color:' + $.alertOptions.window_backgroundColor + '; ' 
			  + roundedBordersContainer + '; border:' + $.alertOptions.window_border + ';">' +
			    '<h1 id="jqAlert_title" style="' + baseDeTitulo + roundedBordersTitle + ' ' + titleBar_Style + '"></h1>' +
			    '<div id="jqAlert_content" style="' + baseDeContent + '">' +
			      '<div id="jqAlert_message" class="row col-sm-12" style="padding-left: 48px;"></div>' +
				'</div>' +
			  '</div>');
			
			if ($.alertOptions.dialogClass) $("#jqAlert_container").addClass($.alertOptions.dialogClass);
			
			var pos = 'fixed'; 
			
			$("#jqAlert_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			if ($.alertOptions.cancelOnEscape){
				$("body").on("keydown", function(e){
					if (e.which == 27) $.alertOptions._hide();
				});
			}
			
			if (title > '') $("#jqAlert_title").text(title);
			$("#jqAlert_message").text(msg + "<br /><br />");
			$("#jqAlert_message").html( $("#jqAlert_message").text().replace(/\n/g, '<br />') );
			
			$("#jqAlert_container").css({
				minWidth: $("#jqAlert_container").outerWidth(),
				maxWidth: $("#jqAlert_container").outerWidth()
			});
			
			$.alertOptions._reposition();
			$.alertOptions._maintainPosition(true);
			

			if ($.alertOptions.useBootstrapClasses){
				var boton_OK = '<input type="button" class="btn btn-' + $.alertOptions.OK_Button_class + '" value="' + $.alertOptions.okButton + '" id="jqAlert_ok" />';
				var boton_CANCEL = ' <input type="button" class="btn btn-' + $.alertOptions.Cancel_Button_class + '" value="' + $.alertOptions.cancelButton + '" id="jqAlert_cancel" />';
			} else {
				/* Se definen estilos alternativos por si se usa el plugin sin las clases de bootstrap. */
				var estiloBoton = "display: inline-block; margin-bottom: 0; font-weight: normal; text-align: center; vertical-align: middle; ";
				estiloBoton += "-ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; background-image: none; border: 1px solid transparent; ";
				estiloBoton += "white-space: nowrap; padding: 6px 12px; font-size: 12px; line-height: 1.42857143; border-radius: 4px; -webkit-user-select: none; ";
				estiloBoton += "-moz-user-select: none; -ms-user-select: none; user-select: none;";
				var estiloBoton_default = "color: #333; background-color: #FFF; border-color: #CCC;";
				var estiloBoton_primary = "color: #FFF; background-color: #337AB7; border-color: #2E6DA4;";
				var estiloBoton_success = "color: #FFF; background-color: #5CB85C; border-color: #4CAE4C;";
				var estiloBoton_warning = "color: #FFF; background-color: #f0AD4E; border-color: #EEA236;";
				var estiloBoton_danger = "color: #FFF; background-color: #D9534F; border-color: #D43F3A;";
				// Determinamos el estilos de los botones de aceptar y cancelar
				if ($.alertOptions.showConfirmButton){
					switch($.alertOptions.OK_Button_class){
						case "default":
							var estiloBotonAceptar = estiloBoton + estiloBoton_default;
							break;
						case "primary":
							var estiloBotonAceptar = estiloBoton + estiloBoton_primary;
							break;
						case "success":
							var estiloBotonAceptar = estiloBoton + estiloBoton_success;
							break;
						case "warning":
							var estiloBotonAceptar = estiloBoton + estiloBoton_warning;
							break;
						case "danger":
							var estiloBotonAceptar = estiloBoton + estiloBoton_danger;
							break;
					}
				}
				if ($.alertOptions.showCancelButton){
					switch($.alertOptions.Cancel_Button_class){
						case "default":
							var estiloBotonCancelar = estiloBoton + estiloBoton_default;
							break;
						case "primary":
							var estiloBotonCancelar = estiloBoton + estiloBoton_primary;
							break;
						case "success":
							var estiloBotonCancelar = estiloBoton + estiloBoton_success;
							break;
						case "warning":
							var estiloBotonCancelar = estiloBoton + estiloBoton_warning;
							break;
						case "danger":
							var estiloBotonCancelar = estiloBoton + estiloBoton_danger;
							break;
					}
				}
				/* Final de la definicion de estilos altenativa para si no se usan las clases de bootstrap. */
				var boton_OK = '<input type="button" value="' + $.alertOptions.okButton + '" id="jqAlert_ok" style="' + estiloBotonAceptar + '" />';
				var boton_CANCEL = ' <input type="button" value="' + $.alertOptions.cancelButton + '" id="jqAlert_cancel" style="' + estiloBotonCancelar + '" />';
			}
			
			var panelDeBotones = '';
			
			switch (type) {
				case 'alert':
					if (title > ''){
						$("#jqAlert_title").css({
							'color':'#666',
							'background':'url(' + $.alertOptions.imagesPath + 'title.gif) top repeat-x'
						});
					}
					$("#jqAlert_content").css('background-image', 'url(' + $.alertOptions.imagesPath + 'alert.gif)');
					panelDeBotones = '<div id="jqAlert_panel" style="text-align: center; margin: 1em 0em 0em 1em;">';
					if ($.alertOptions.showConfirmButton) panelDeBotones += boton_OK;
					panelDeBotones += '</div>';
					$("#jqAlert_message").after(panelDeBotones);
					$("#jqAlert_ok").click( function() {
						$.alertOptions._hide();
						callbackFunction(true);
					});
				break;
				case 'confirm':
					if (title > ''){
						$("#jqAlert_title").css({
							'color':'#666',
							'background':'url(' + $.alertOptions.imagesPath + 'title_info.gif) top repeat-x'
						});
					}
					$("#jqAlert_content").css('background-image', 'url(' + $.alertOptions.imagesPath + 'confirm.gif)');
					panelDeBotones = '<div id="jqAlert_panel" style="text-align: center; margin: 1em 0em 0em 1em;">';
					if ($.alertOptions.showConfirmButton) panelDeBotones += boton_OK;
					if ($.alertOptions.showCancelButton) panelDeBotones += boton_CANCEL;
					panelDeBotones += '</div>';

					$("#jqAlert_message").after(panelDeBotones);
					$("#jqAlert_ok").click( function() {
						$.alertOptions._hide();
						if ( callbackFunction ) callbackFunction(true);
					});
					$("#jqAlert_cancel").click( function() {
						$.alertOptions._hide();
						if ( callbackFunction ) callbackFunction(false);
					});
				break;
				case 'prompt':
					if (title > ''){
						$("#jqAlert_title").css({
							'color':'#666',
							'background':'url(' + $.alertOptions.imagesPath + 'title_info.gif) top repeat-x'
						});
					}
					$("#jqAlert_content").css('background-image', 'url(' + $.alertOptions.imagesPath + 'prompt.gif)');
					panelDeBotones = '<div id="jqAlert_panel" style="text-align: center; margin: 1em 0em 0em 1em;">';
					if ($.alertOptions.showConfirmButton) panelDeBotones += boton_OK;
					if ($.alertOptions.showCancelButton) panelDeBotones += boton_CANCEL;
					panelDeBotones += '</div>';

					$("#jqAlert_message").append('<div class="row col-sm-8"><input type="text" class="form-control" id="jqAlert_prompt" style="margin: .5em 0em;" /></div>').after(panelDeBotones);
					$("#jqAlert_prompt").width( $("#jqAlert_message").width() );
					$("#jqAlert_ok").click( function() {
						var val = $("#jqAlert_prompt").val();
						$.alertOptions._hide();
						if ( callbackFunction ) callbackFunction( val );
					});
					$("#jqAlert_cancel").click( function() {
						$.alertOptions._hide();
						if ( callbackFunction ) callbackFunction( null );
					});
					if ( value ) $("#jqAlert_prompt").val(value);
					$("#jqAlert_prompt").focus().select();
				break;

				case 'auth':
					if (title > ''){
						$("#jqAlert_title").css({
							'color':'#666',
							'background':'url(' + $.alertOptions.imagesPath + 'title_success.gif) top repeat-x'
						});
					}
					$("#jqAlert_content").css('background-image', 'url(' + $.alertOptions.imagesPath + 'auth.gif)');
					panelDeBotones = '<div id="jqAlert_panel" style="text-align: center; margin: 1em 0em 0em 1em;">';
					if ($.alertOptions.showConfirmButton) panelDeBotones += boton_OK;
					if ($.alertOptions.showCancelButton) panelDeBotones += boton_CANCEL;
					panelDeBotones += '</div>';
					
					var camposDeAcceso = '<label for="jqAlert_user">' + $.alertOptions.label_user_auth + '<br />';
					camposDeAcceso += '<input type="text" class="form-control" id="jqAlert_user" style="margin: .5em 0em;" /></label><br />';
					camposDeAcceso += '<label for="jqAlert_password">' + $.alertOptions.label_pw_auth + '<br />';
					camposDeAcceso += '<input type="password" class="form-control" id="jqAlert_password" style="margin: .5em 0em;" /></label>';

					$("#jqAlert_message").append('<div class="row col-sm-8">' + camposDeAcceso + '</div>').after(panelDeBotones);
					$("#jqAlert_user").width($("#jqAlert_message").width());
					$("#jqAlert_password").width($("#jqAlert_message").width());
					$("#jqAlert_ok").click( function() {
						var valUser = $("#jqAlert_user").val();
						var valPassword = $("#jqAlert_password").val();
						var datosDeAcceso = new Array(valUser, valPassword);
						$.alertOptions._hide();
						if (callbackFunction) callbackFunction(datosDeAcceso);
					});
					$("#jqAlert_cancel").click( function() {
						$.alertOptions._hide();
						if (callbackFunction) callbackFunction(false);
					});
					$("#jqAlert_user").focus().select();
				break;

				case 'message':
					if (title > ''){
						$("#jqAlert_title").css({
							'color':'#666',
							'background':'url(' + $.alertOptions.imagesPath + 'title_info.gif) top repeat-x'
						});
					}
					$("#jqAlert_content").css('background-image', 'url(' + $.alertOptions.imagesPath + 'message.gif)');
					panelDeBotones = '<div id="jqAlert_panel" style="text-align: center; margin: 1em 0em 0em 1em;">';
					if ($.alertOptions.showConfirmButton) panelDeBotones += boton_OK;
					panelDeBotones += '</div>';

					$("#jqAlert_message").after(panelDeBotones);
					$("#jqAlert_ok").click( function() {
						$.alertOptions._hide();
						callbackFunction(true);
					});
				break;
				case 'warning':
					if (title > ''){
						$("#jqAlert_title").css({
							'color':'#666',
							'background':'url(' + $.alertOptions.imagesPath + 'title_warning.gif) top repeat-x'
						});
					}
					$("#jqAlert_content").css('background-image', 'url(' + $.alertOptions.imagesPath + 'warning.gif)');
					panelDeBotones = '<div id="jqAlert_panel" style="text-align: center; margin: 1em 0em 0em 1em;">';
					if ($.alertOptions.showConfirmButton) panelDeBotones += boton_OK;
					panelDeBotones += '</div>';
					$("#jqAlert_message").after(panelDeBotones);
					$("#jqAlert_ok").click( function() {
						$.alertOptions._hide();
						callbackFunction(true);
					});
				break;
				case 'error':
					if (title > ''){
						$("#jqAlert_title").css({
							'color':'#333',
							'background':'url(' + $.alertOptions.imagesPath + 'title_error.gif) top repeat-x'
						});
					}
					$("#jqAlert_content").css('background-image', 'url(' + $.alertOptions.imagesPath + 'error.gif)');
					panelDeBotones = '<div id="jqAlert_panel" style="text-align: center; margin: 1em 0em 0em 1em;">';
					if ($.alertOptions.showConfirmButton) panelDeBotones += boton_OK;
					panelDeBotones += '</div>';
					$("#jqAlert_message").after(panelDeBotones);
					$("#jqAlert_ok").click( function() {
						$.alertOptions._hide();
						callbackFunction(true);
					});
				break;
			}
			
			/* Si el cuadro de diálogo es dragable */
			if ($.alertOptions.draggable) {
				try {
					if (title == ''){
						$("#jqAlert_container").draggable({ handle: $("#jqAlert_content") });
						$("#jqAlert_content").css({ cursor: 'move' });
					} else {
						$("#jqAlert_container").draggable({ handle: $("#jqAlert_title") });
						$("#jqAlert_title").css({ cursor: 'move' });
					}
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		/* Cierre del cuadro de diálogo */
		_hide: function() {
			$("#jqAlert_container").remove();
			$.alertOptions._overlay('hide');
			$.alertOptions._maintainPosition(false);
		},
		
		/* LA capa que cubre toda la pantalla, para bloquear los contenidos. */
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alertOptions._overlay('hide');
					$("BODY").append('<div id="jqAlert_overlay"></div>');
					$("#jqAlert_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alertOptions.overlayColor,
						opacity: $.alertOptions.overlayOpacity
					});
				break;
				case 'hide':
					$("#jqAlert_overlay").remove();
				break;
			}
		},
		
		/* Reposicionamiento cuando hay un resize. */
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#jqAlert_container").outerHeight() / 2)) + $.alertOptions.verticalOffset;
			var left = (($(window).width() / 2) - ($("#jqAlert_container").outerWidth() / 2)) + $.alertOptions.horizontalOffset;
			if ( top < 0 ) top = 0;
			if ( left < 0 ) left = 0;
			
			$("#jqAlert_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#jqAlert_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if ( $.alertOptions.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alertOptions._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alertOptions._reposition);
					break;
				}
			}
		}
		
	}
	
	/* Llamadas a las funciones. */
	jqAlert = function(message, title, callbackFunction) {
		$.alertOptions.alert(message, title, callbackFunction);
	}
	
	jqConfirm = function(message, title, callbackFunction) {
		$.alertOptions.confirm(message, title, callbackFunction);
	};
		
	jqPrompt = function(message, value, title, callbackFunction) {
		$.alertOptions.prompt(message, value, title, callbackFunction);
	};
	
	jqAuth = function(message, title, callbackFunction) {
		$.alertOptions.auth(message, title, callbackFunction);
	};
	
	jqMessage = function(message, title, callbackFunction) {
		$.alertOptions.message(message, title, callbackFunction);
	}
	
	jqWarning = function(message, title, callbackFunction) {
		$.alertOptions.warning(message, title, callbackFunction);
	}
	
	jqError = function(message, title, callbackFunction) {
		$.alertOptions.error(message, title, callbackFunction);
	}
	
})(jQuery);