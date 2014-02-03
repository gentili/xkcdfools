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
	var state = 0;
	function noData() {
		Terminal.setPromptActive(false);
		Terminal.slowPrint("Starting the state count");
	}
	$('#screen').bind('cli-load', function(e) {
		noData();
	});	
	$('#screen').bind('cli-ready', function(e) {
		if (state < 10) {
			Terminal.slowPrint("Current State "+state++);			
		} else {
			Terminal.setPromptActive(true);
		}
	});
});
