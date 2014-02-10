TerminalShell.commands['logout'] =
TerminalShell.commands['exit'] = 
TerminalShell.commands['quit'] = function(terminal) {
	terminal.print('Bye.');
	$('#prompt, #cursor').hide();
	terminal.promptActive = false;
};

$(document).ready(function() {
	Terminal.promptActive = false;
	Terminal.config.typingSpeed = 10;
	Terminal.config.spinnerCharacters = ['[-]','[\\]','[|]','[/]'];
	Terminal.config.spinnerSpeed = 30,
	
	$('#screen').bind('cli-load', function(e) {
		Terminal.setPromptActive(false);
		Terminal.slowPrint("Booting MCP Kernel V1.0.1\n",
				function() { Terminal.setWorking(true); window.setTimeout(boot, 500);});
	});

	var $hazard = $('<div class="hazard">');
	function boot() {
		Terminal.setWorking(false);
		Terminal.slowPrint(
			"System Resource Hash: # AF23 4E2E 384B EE25\n"+
			"Terminal Mode: ASCII\n"+
			"Connecting to system network",
			function() { Terminal.setWorking(true); window.setTimeout(hazard, 500);});
	}
	
	function hazard() {
		Terminal.setWorking(false);
		Terminal.print ($hazard);
		jQuery.get('DimentionalTransferWarning.svg',function(data) {
			var $svg = $(data);
			$svg.find('path').css("stroke","#1f1");
			$svg.fadeIn(1000);
			$hazard.append($svg);
		},"http");
		window.setTimeout(hazard, 2000);
	}
	
	
	function done() {
		Terminal.setWorking(false);
		Terminal.setPromptActive(true);
	}	
});
