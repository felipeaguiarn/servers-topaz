function init() {
    // console.log('test')
    let time = prompt('Digite o tempo para cada tarefa: ', '')
    let capacity = prompt('Digite o maximo de usuários por servidor: ', '')
    let users = [] //[1, 3, 0, 1, 0, 1]
    let servers = []
    let lastUser = 0
    let cost = 0
    
    do {
        let input = prompt('Digite as entradas no servidor ' + ' (Aperter Enter para encerrar):')
        Number(input) 
        users.push(input)
        
        if (input === '') {
            break
        }
    } while (users.length < 10)
    //console.log('Entradas registradas, iniciando ... ')
    
    do {
        let output = ''
        let active = 02
    
        for (let i = servers.length - 1; i >= 0; i--) { // existe server ativo?
            cost++
    
            for (let x = servers[i].userLogged.length - 1; x >= 0; x--) { // ver usuarios ativos 
                servers[i].userLogged[x].ticks++ // add tick
                if (servers[i].userLogged[x].ticks >= Number(time)) {
                    servers[i].userLogged.splice(x, 1) // remove usuario se o tempo max for atingido
                }
            }
            if (servers[i].userLogged != undefined) { // se tiver usuarios adiciona usuario no contador
                active += servers[i].userLogged.length
            }
            if (servers[i].userLogged.length === 0) { // caso nao tenha usuario, remove o servidor
                servers.splice(i, 1)
            }
        }
    
        let newUsers = 0
        if (users.length > lastUser) { // se o array de usuarios tiver usuarios, add novos usuarios
            newUsers = Number(users[lastUser])
            lastUser++
        }
    
        active += newUsers
        for (let i = 0; i < newUsers; i++) { // se add usuariosnovos verifica os servidores
            let find = false
    
            for (let x = 0; x < servers.length; x++) { // se servidor < max add usuario
                if (servers[x].userLogged.length < Number(capacity)) {
                    servers[x].userLogged.push({ ticks: 0 })
                    find = true
                    break
                }
            }
    
            if (find == false) {
                servers.push({ userLogged: [{ ticks: 0 }] }) // se servidores estiverem ocupados, cria um novo        
            }   
        }
    
        for (let index = 0; index < servers.length; index++) { // apresentação do output
            if (index === 0) {
                output += "" + servers[index].userLogged.length // não coloca virgula no primeiro resultado
            }
            else
                output += "," + servers[index].userLogged.length // inclui virgula nos demais resultados
        }
        if (output === '') { // apresenta 0 quando o ultimo servidor fecha
            output = '0'
        }
    
        console.log(output)
        //console.log(servers.length+' servidor para ' + active + ' usuario')
    
    } while (servers.length > 0)
    console.log(cost)
}

// console.log(users)



