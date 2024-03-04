const fs = require('fs');

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string, 
    cpf: string,
    profissao?: string
    endereco: Endereco | null
}

const lerArquivo = (): unknown =>{
    return JSON.parse(fs.readFileSync('../bd.json'));
}

const escreverArquivo = (dados: any): void =>{
    fs.writeFileSync('../bd.json', JSON.stringify(dados));
}

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];
    bd.push(dados);
    escreverArquivo(bd);
    return dados;
}

const listarUsuarios = (filtro?: string): Usuario[] => {
    const bd = lerArquivo() as Usuario[];

    if (filtro) {
        return bd.filter(usuario => usuario.profissao === filtro);
    }

    return bd;
}

const detalharUsuario = (cpf: string): Usuario =>{
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado!')
    }
    return usuario;
}

const atualizarUsuario = (cpf: string, dados: Usuario) => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado!')
    }

    Object.assign(usuario, dados);

    escreverArquivo(bd);

    return dados;
}

const excluirUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado!')
    }

    const exclusao = bd.filter(usuario => {
        return usuario.cpf !== cpf;
    });

    escreverArquivo(exclusao);

    return usuario;
}

// cadastrarUsuario({
//     nome: 'Muegel cu de mel',
//     email: 'cuzin@email.com',
//     cpf: '222245666',
//     profissao: 'Ladrao',
//     endereco: {
//         cep: '1234446554',
//         rua: '5555',
//         complemento: 'Só deus sabe',
//         bairro: 'Dos cornos',
//         cidade: 'Pau torno'
//     }
// })
const bd = listarUsuarios();
console.log(bd);


