# 简介
在SCF中使用各种第三方log库的helper插件

# 用法
``` javascript
'use strict'
const winston = require('winston')
const log4js = require('log4js')
const EggLogger = require('egg-logger').Logger;
const ConsoleTransport = require('egg-logger').ConsoleTransport;
const logHelper = require('scf-log-helper')
 
const eggLogger = new EggLogger();

eggLogger.set('console', new ConsoleTransport({
  level: 'DEBUG',
}));

const winstonLogger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [],
})
const log4jsLogger = log4js.getLogger()
log4jsLogger.level = "debug";

winstonLogger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
)

exports.main_handler = async (event, context, callback) => {
	
	logHelper.init()

  //--- winston ---
	winstonLogger.info('abc in winston')
  winstonLogger.warn('warning in winston')
  
  //--- log4js ---
	log4jsLogger.trace('Entering cheese testing in log4js')
	log4jsLogger.debug('Got cheese. in log4js')
	log4jsLogger.info('Cheese is Comté.  in log4js')
	log4jsLogger.warn('Cheese is quite smelly. in log4js')
	log4jsLogger.error('Cheese is too ripe! in log4js')
  log4jsLogger.fatal('Cheese was breeding ground for listeria. in log4js')

  //--- eggLogger ---
  eggLogger.debug('debug foo'); // only output to stdout
  eggLogger.info('info foo');
  eggLogger.warn('warn foo');
  eggLogger.error(new Error('error foo'));

  //--- console logger ---
	console.log('abc in console')
	return 'hello world'
}

```

# 注意事项
0. 只适用于SCF线上环境，请勿在其他环境使用，模块中也有简单的判断，如果在其他环境中使用后果自负
1. 请勿使用logger的写log文件的功能，由于SCF环境只有tmp目录可写，除非自己处理log文件，否则文件log功能无意义，如果需要高级日志建议配合CLS使用
2. 使用上如果有问题欢迎在github提issue
