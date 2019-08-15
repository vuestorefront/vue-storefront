const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const SVGSpriter = require('svg-sprite')

const createSprites = (srcPath = '1x1') => {
  var spriter = new SVGSpriter({
    mode: {
      symbol: true
    }
  })

  fs.readdirSync(path.resolve(srcPath), { withFileTypes: true })
    .filter(file => file.isFile())
    .forEach(file => {
      const filePath = path.resolve(srcPath, file.name)
      spriter.add(filePath, null, fs.readFileSync(filePath, {encoding: 'utf-8'}))
    })

  spriter.compile((_error, result) => {
    for (var mode in result) {
      for (var resource in result[mode]) {
        let filePath = (mode === 'symbol') ? `./${srcPath}.svg` : result[mode][resource].path
        mkdirp.sync(path.dirname(filePath));
        fs.writeFileSync(filePath, result[mode][resource].contents);
      }
    }
  });
}

createSprites('1x1')
createSprites('4x3')
