module.exports = {
	init: function(){
		if(process.env && process.env.SCF_FUNCTIONNAME){
			process.stderr.write = console._stderr.write = console._stdout.write = process.stdout.write = function () {
				console.log(...arguments)
			}
		}else{
			console.log('WARNING: PLEASE USE THIS MODULE IN SCF ONLY')
		}
	}
}