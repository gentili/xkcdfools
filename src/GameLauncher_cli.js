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
				function() { Terminal.setWorking(true); window.setTimeout(starthazard, 500);});
	});

	function boot() {
		Terminal.setWorking(false);
		Terminal.slowPrint(
			""+
			"Connecting to system network\n"+
			"System Resource Hash: # AF23 4E2E 384B EE25"+
			"",
			function() { Terminal.setWorking(true); window.setTimeout(starthazard, 500);});
	}
	
	var $hazard = $('<div class="hazard">');
	var curhazard = 0;
	var hazardlist = [
	               {
	            	   "filename" : "DimentionalTransferWarning.svg",
	            	   "warning" : "WARNING: Antimatter power feed",
	               },
	               {
	            	   "filename" : "DimentionalTransferWarning.svg",
	            	   "warning" : "WARNING: Artificial black hole generated",
	               },
	               {
	            	   "filename" : "DimentionalTransferWarning.svg",
	            	   "warning" : "WARNING: Strange matter injector",
	               },
	               {
	            	   "filename" : "DimentionalTransferWarning.svg",
	            	   "warning" : "WARNING: Dimensional interface generated",
	               },
	               {
	            	   "filename" : "DimentionalTransferWarning.svg",
	            	   "warning" : "WARNING: Dimensional Transfer Engine Engaged",
	               },
	               ];
	
	function starthazard() {
		Terminal.clear();
		Terminal.print ($hazard);
		jQuery.get(hazardlist[curhazard].filename, processhazard ,"http");
	}
	
	function processhazard(data) {
		var $svg = $(data);
		$svg.find('path').css("stroke","#1f1");
		$svg.css("display","none");
		$hazard.append($svg);
		hazardlist[curhazard]['svg'] = $svg;
		curhazard = curhazard + 1;
		if (curhazard < hazardlist.length) {
			jQuery.get(hazardlist[curhazard].filename, processhazard ,"http");
		} else {
			curhazard = 0;
			showhazard();
		}
	}
	
	function showhazard() {
		if (curhazard >= hazardlist.length) {
			done();
		}
		hazardlist[curhazard].svg.fadeIn();
		Terminal.slowPrint(hazardlist[curhazard].warning, function() {window.setTimeout(showhazard,250);});
		curhazard = curhazard + 1;
	}
	
	function done() {
		Terminal.setWorking(false);
		Terminal.setPromptActive(true);
	}	
});
