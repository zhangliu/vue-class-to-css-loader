const { basename } = require('path');

class VueConvert {
    constructor(state) {
        const filename = state.opts.filename;
        const index = basename(filename).indexOf('.');
        this.cssFilename = `${basename(filename).substr(0, index)}.ctc.css`;

        const body = state.ast.program ? state.ast.program.body || [] : [];
        // 判断有没有导入 ctc.css 文件
        this.canConvert = body.find(node => {
            const isTypeOk = node.type === 'ImportDeclaration'
            return isTypeOk && this.cssFilename === basename(node.source.value)
        })
    }
    
    getNames = (node) => {
        try {
            if (!this.isCreateElementNode(node)) return [];

            const prop = this.getProp(node)
            if (!prop || !prop.value || !prop.value.value) return [];
            return prop.value.value.split(' ').filter(s => s.length)
        } catch (e) {
            console.log(e)
        }
    }
    
    isCreateElementNode = node => {
        if (!node || !node.callee) return false
    
        const {object = {}, property = {}} = node.callee
        return object.name === 'React' && property.name === 'createElement'
    }
    
    getProp = (node, name = 'className') => {
        const arg = node.arguments[1]
        if (arg.type !== 'ObjectExpression') return
        if (!Array.isArray(arg.properties))  return
        
        return arg.properties.find(prop => prop.key.name === name)
    }

    setClass = (node, names) => {
        const prop = this.getProp(node)
        if (!prop || !prop.value || !prop.value.value)  return
      
        const uniqNames = [...(new Set(names || []))]
        prop.value.value = uniqNames.join(' ')
    }
}

module.exports = VueConvert;