const categorias = {
  produtos: [
    'palhetas','pneus','parachoques','parabrisas','maçanetas','suportes de parachoques','paralamas','paineis','almas de aço','lanternas','farois','fechaduras','latarias em geral'
  ],
  servicos: [
    'instalação de parabrisas','troca de pneus','alinhamento e balanceamento','instalação de multimidias','instalação de rádios','instalação de maçanetas','som','insufilm','troca de bateria'
  ],
  autocenter: [
    'alinhamento e balanceamento','troca de óleo'
  ]
}

const categoriaEl = document.getElementById('categoria')
const subEl = document.getElementById('subcategoria')
const abrirBtn = document.getElementById('abrir-whatsapp')

categoriaEl.addEventListener('change', ()=>{
  const val = categoriaEl.value
  subEl.innerHTML = ''
  const defaultOption = document.createElement('option')
  defaultOption.value = ''
  defaultOption.textContent = '-- Selecionar --'
  subEl.appendChild(defaultOption)
  if(!val || !categorias[val]) return
  categorias[val].forEach(item=>{
    const o = document.createElement('option')
    o.value = item
    o.textContent = item.charAt(0).toUpperCase()+item.slice(1)
    subEl.appendChild(o)
  })
})

function getFormData(){
  const marca = document.getElementById('marca').value.trim()
  const modelo = document.getElementById('modelo').value.trim()
  const ano = document.getElementById('ano').value.trim()
  const categoria = categoriaEl.value
  const sub = subEl.value
  return {marca,modelo,ano,categoria,sub}
}

abrirBtn.addEventListener('click', ()=>{
  const data = getFormData()
  if(!data.marca || !data.modelo || !data.ano || !data.categoria || !data.sub){
    alert('Por favor preencha todas as informações sobre o veículo e selecione uma opção.');
    return
  }
  // Escolher vendedor padrão (pode escolher manualmente na seção contatos)
  const vendedor = '5511999990001'
  const texto = `Olá, tenho interesse e preciso de atendimento.\nMarca: ${data.marca}\nModelo: ${data.modelo}\nAno: ${data.ano}\nCategoria: ${data.categoria}\nOpção: ${data.sub}`
  const url = `https://wa.me/${vendedor}?text=${encodeURIComponent(texto)}`
  window.open(url,'_blank')
})
