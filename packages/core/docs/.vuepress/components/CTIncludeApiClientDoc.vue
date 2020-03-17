<template>
  <div>
    <template v-for="fn in functions">
    <h3><code>{{ fn.name }}</code></h3>
    <ul>
      <li v-for="(param, id) in fn.params">
        <code>{{ param.name }}: {{ param.type.name }}</code>
      </li>
      <li><code><b>returns:</b> {{ fn.returns }} </code></li>
      </ul>
    </template>
  </div>
</template>


<script>
import api from '../../api.json'

function parseType (type) {
  if (type.typeArguments) {
    return type.name + '<' + type.typeArguments[0].name + '>'
  }
  else {
    return type.name
  }
}

function getFunctions (children, file) {
  return children.filter(children => children.flags.isExported === true).map(fn => {
    return {
      name: fn.name,
      file: file.substring(file.indexOf("/packages") + 1),
      params: fn.signatures[0].parameters, 
      returns: parseType(fn.signatures[0].type)
    }
  })
}

function getFiles () {
  return api.children.map(file => {
    return {
      file: file.originalName,
      functions: getFunctions(file.children, file.originalName)
    }
  })
}

function parse() {
  const functions = [];
  const api = getFiles()
  api.map(file => functions.push(...file.functions))
  return functions
}

const parsedApi = parse()

export default {
  data () {
    return {
      functions: parsedApi
    }
  }
}
</script>  