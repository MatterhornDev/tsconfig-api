import fs from 'fs'
import path from 'path'
import readline from 'readline'

let rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'tscompileroptions.md'))
})

interface tsconfigData {
  [k: string]: {
    cliOption: null | string | string[],
    type: string | string[],
    defaultValue: string | string[],
    description: string,
    experimental: boolean,
    configOnly: boolean
  }
}

const data: tsconfigData = {}

rl.on('line', line => {
  let d = line.split('|').map(s => s.trim().replace(/\`/g, '')) // split on | char, trim whitespace, and remove all ` chars
  let option: string, cliOption: string | string[]

  let [_cliOption, type, defaultValue, description] = d

  if (_cliOption.match(/\<br\/\>/) !== null) {
    option = d[0].split('<br/>')[0].replace(/\-/g, '').replace(/\~/g, '')
    cliOption = d[0].split('<br/>')
  } else {
    option = d[0].replace(/\-/g, '').replace(/\<sup\>\[[1|2]\]\<\/sup\>/, '').replace(/\~/g, '')
    cliOption = _cliOption.replace(/\<sup\>\[[1|2]\]\<\/sup\>/, '').replace(/\~/g, '')
  }

  let experimental = _cliOption.match(/\<sup\>\[1\]\<\/sup\>/) !== null
  let configOnly = _cliOption.match(/\<sup\>\[2\]\<\/sup\>/) !== null

  if (type === '') {
    type = `cli operation`
  }

  data[option] = {
    cliOption: configOnly ? null : cliOption,
    type,
    defaultValue,
    description,
    experimental,
    configOnly
  }
})

rl.on('close', () => {
  console.log(data)
  fs.writeFile(path.join(__dirname, '../src/tsconfig-data.json'), JSON.stringify(data), err => {
    if (err) {
      console.error(err)
    } else {
      console.log('Wrote File')
    }
  })
})
